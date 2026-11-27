/* Static-hosting CORS fallback for public, read-only API requests. */
(function (root) {
    "use strict";
    var DEFAULT_RELAY = "";
    function relayUrl(template, source) {
        var value = String(template || "").trim();
        if (value.indexOf("{url}") < 0) throw new Error("中継先 URL に {url} が必要です");
        var target = new URL(value.replace("{url}", encodeURIComponent(source)));
        if (target.protocol !== "https:" || target.username || target.password)
            throw new Error("中継先は認証情報を含まない HTTPS URL を指定してください");
        return target.href;
    }
    function request(url, options, config) {
        options = options || {};
        config = config || {};
        var source = new URL(url, root.location.href);
        var signal = options.signal;
        var headers = new Headers(options.headers || {});
        var eligible = config.enabled && String(config.relay || "").trim() && source.protocol === "https:" &&
            source.origin !== root.location.origin && !source.username && !source.password &&
            (options.method || "GET").toUpperCase() === "GET" && !options.body &&
            !headers.has("Authorization") && !headers.has("X-API-Key") && options.credentials !== "include";
        var limit = config.timeout || 7000;
        var started = Date.now();
        function attempt(target, ms, relay) {
            var controller = new AbortController();
            var abort = function () { controller.abort(); };
            if (signal) {
                if (signal.aborted) abort();
                else signal.addEventListener("abort", abort, { once: true });
            }
            var timer = setTimeout(abort, ms);
            var opts = Object.assign({}, options, { signal: controller.signal });
            if (relay) opts = { signal: controller.signal, headers: { Accept: headers.get("Accept") || "application/json" }, credentials: "omit", referrerPolicy: "no-referrer" };
            return root.fetch(target, opts).finally(function () {
                clearTimeout(timer);
                if (signal) signal.removeEventListener("abort", abort);
            });
        }
        return attempt(source.href, eligible ? Math.max(1, Math.floor(limit * .45)) : limit, false)
            .catch(function (error) {
                if (!eligible || (signal && signal.aborted)) throw error;
                // HTTP responses (including 403/429) never reach this branch.
                if (error.name !== "TypeError" && error.name !== "AbortError") throw error;
                var remaining = limit - (Date.now() - started);
                if (remaining <= 0) throw error;
                return attempt(relayUrl(config.relay, source.href), remaining, true);
            }).catch(function (error) {
                if (signal && signal.aborted) throw error;
                throw new Error(source.hostname + " の API に接続できません: " + error.message);
            });
    }
    root.NKYSCors = { defaultRelay: DEFAULT_RELAY, relayUrl: relayUrl, fetch: request };
})(window);
