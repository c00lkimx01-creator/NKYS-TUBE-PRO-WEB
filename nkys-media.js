/* NKYSTubeMusic (YouTube Music 風) と NKYSTubeTV (TVer 風 + 番組表) */
(function () {
  "use strict";
  var H = function (s) { return esc(s); };
  var css = document.createElement("style");
  css.textContent = [
    /* ---- Music ---- */
    "body.nk-music{background:#030303}",
    ".ytm{color:#fff;min-height:100vh;padding:0 24px 120px;background:linear-gradient(180deg,#1d1d1d 0,#030303 360px);font-family:Roboto,'Noto Sans JP',sans-serif}",
    ".ytm-top{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:20px;padding:14px 0;background:rgba(3,3,3,.85);backdrop-filter:blur(12px)}",
    ".ytm-logo{display:flex;align-items:center;gap:8px;font-weight:700;font-size:20px;cursor:pointer;white-space:nowrap}",
    ".ytm-logo i{width:28px;height:28px;border-radius:50%;background:#f00;display:grid;place-items:center;font-style:normal;font-size:13px}",
    ".ytm-search{flex:1;max-width:560px;display:flex;align-items:center;background:#ffffff1a;border:1px solid #ffffff1f;border-radius:8px;padding:0 12px}",
    ".ytm-search input{flex:1;background:none;border:0;color:#fff;font-size:15px;padding:11px 8px;outline:none}",
    ".ytm-search svg{width:22px;fill:#aaa}",
    ".ytm-chips{display:flex;gap:10px;overflow-x:auto;padding:10px 0 18px;scrollbar-width:none}",
    ".ytm-chip{flex:none;background:#ffffff1a;border:0;color:#fff;border-radius:8px;padding:8px 14px;font-size:14px;cursor:pointer}",
    ".ytm-chip.on{background:#fff;color:#000}",
    ".ytm h2{font-size:24px;font-weight:700;margin:28px 0 14px}",
    ".ytm .sub{color:#aaa;font-size:13px;text-transform:uppercase;letter-spacing:.06em}",
    ".ytm-qp{display:grid;grid-auto-flow:column;grid-template-rows:repeat(4,auto);grid-auto-columns:minmax(300px,1fr);gap:4px 20px;overflow-x:auto;scrollbar-width:none}",
    ".ytm-row{display:grid;grid-template-columns:48px minmax(0,1fr) auto;gap:14px;align-items:center;padding:6px;border-radius:6px;cursor:pointer}",
    ".ytm-row:hover{background:#ffffff14}",
    ".ytm-row.playing .t{color:#ff4e45}",
    ".ytm-sq{position:relative;width:48px;height:48px;border-radius:4px;overflow:hidden;background:#222}",
    ".ytm-sq img{width:100%;height:100%;object-fit:cover;transform:scale(1.35)}",
    ".ytm-row .t,.ytm-card .t{font-size:15px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".ytm-row .a,.ytm-card .a{font-size:13px;color:#aaa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:3px}",
    ".ytm-row .d{color:#aaa;font-size:13px}",
    ".ytm-shelf{display:grid;grid-auto-flow:column;grid-auto-columns:180px;gap:20px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none}",
    ".ytm-card{cursor:pointer;min-width:0}",
    ".ytm-card .art{position:relative;aspect-ratio:1;border-radius:6px;overflow:hidden;background:#222;margin-bottom:10px}",
    ".ytm-card .art img{width:100%;height:100%;object-fit:cover;transform:scale(1.35);transition:filter .2s}",
    ".ytm-card:hover .art img{filter:brightness(.6)}",
    ".ytm-card .pl{position:absolute;right:10px;bottom:10px;width:40px;height:40px;border-radius:50%;background:#000c;display:grid;place-items:center;opacity:0;transition:.2s}",
    ".ytm-card:hover .pl{opacity:1}",
    ".ytm svg.ic,.ytmp svg{width:24px;height:24px;fill:currentColor}",
    ".ytm-list .ytm-row{grid-template-columns:56px minmax(0,1fr) minmax(0,.6fr) 60px;border-bottom:1px solid #ffffff12;border-radius:0}",
    ".ytm-list .ytm-sq{width:56px;height:56px}",
    ".ytm-empty{color:#aaa;padding:40px 0;text-align:center}",
    ".ytm-ghost{background:#ffffff10;border-radius:6px;animation:ytmp 1.2s infinite alternate}",
    "@keyframes ytmp{to{opacity:.4}}",
    /* player bar */
    ".ytmp{position:fixed;left:0;right:0;bottom:0;z-index:9000;height:72px;background:#212121;color:#fff;display:none;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:16px;padding:0 16px;font-family:Roboto,'Noto Sans JP',sans-serif}",
    ".ytmp.on{display:grid}",
    ".ytmp .bar{position:absolute;left:0;right:0;top:-2px;height:3px;background:#ffffff33;cursor:pointer}",
    ".ytmp .bar b{display:block;height:100%;background:#f00;width:0}",
    ".ytmp .ctl{display:flex;align-items:center;gap:6px}",
    ".ytmp button{background:none;border:0;color:#fff;cursor:pointer;padding:8px;border-radius:50%;display:grid;place-items:center}",
    ".ytmp button:hover{background:#ffffff1a}",
    ".ytmp .big svg{width:36px;height:36px}",
    ".ytmp .tm{color:#aaa;font-size:12px;min-width:84px}",
    ".ytmp .info{display:flex;align-items:center;gap:12px;min-width:0}",
    ".ytmp .info>div{min-width:0}",
    ".ytmp .info .t{font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".ytmp .info .a{font-size:13px;color:#aaa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".ytmp .vid{width:96px;height:54px;border-radius:4px;overflow:hidden;background:#000;flex:none}",
    ".ytmp .vid iframe{width:100%;height:100%;border:0}",
    "@media (max-width:640px){.ytmp .tm,.ytmp .prev{display:none}.ytm{padding:0 12px 120px}.ytm-list .ytm-row{grid-template-columns:56px minmax(0,1fr) 50px}.ytm-list .al{display:none}}",
    /* ---- TV (TVer 風) ---- */
    "body.nk-tv{background:#f4f5f7}",
    ".tvr{--tb:#1aa0dc;color:#222;background:#f4f5f7;min-height:100vh;font-family:'Noto Sans JP',sans-serif;padding-bottom:60px}",
    ".tvr-head{position:sticky;top:0;z-index:5;background:#fff;box-shadow:0 1px 0 #e3e5e8}",
    ".tvr-head .in{max-width:1280px;margin:0 auto;display:flex;align-items:center;gap:28px;padding:0 20px;height:60px}",
    ".tvr-logo{font-weight:900;font-size:22px;color:var(--tb);letter-spacing:-.02em;cursor:pointer;white-space:nowrap}",
    ".tvr-logo small{color:#222;font-size:12px;font-weight:700;margin-left:4px}",
    ".tvr-tabs{display:flex;gap:4px;height:100%;overflow-x:auto;scrollbar-width:none}",
    ".tvr-tab{flex:none;background:none;border:0;border-bottom:3px solid transparent;padding:0 14px;font-size:15px;font-weight:700;color:#555;cursor:pointer}",
    ".tvr-tab.on{color:var(--tb);border-bottom-color:var(--tb)}",
    ".tvr-srch{margin-left:auto;display:flex;align-items:center;background:#f0f1f3;border-radius:20px;padding:0 14px}",
    ".tvr-srch input{border:0;background:none;padding:9px 6px;outline:none;font-size:14px;width:180px;color:#222}",
    ".tvr-body{max-width:1280px;margin:0 auto;padding:20px}",
    ".tvr-hero{position:relative;border-radius:12px;overflow:hidden;aspect-ratio:21/8;background:#ccc;cursor:pointer;margin-bottom:12px}",
    ".tvr-hero img{width:100%;height:100%;object-fit:cover}",
    ".tvr-hero .cap{position:absolute;left:0;right:0;bottom:0;padding:60px 28px 22px;background:linear-gradient(transparent,#000c);color:#fff}",
    ".tvr-hero .cap b{display:block;font-size:24px;line-height:1.35;max-width:760px}",
    ".tvr-hero .cap span{display:inline-block;background:var(--tb);font-size:12px;font-weight:700;padding:3px 8px;border-radius:3px;margin-bottom:8px}",
    ".tvr-dots{display:flex;justify-content:center;gap:8px;margin-bottom:8px}",
    ".tvr-dots button{width:8px;height:8px;border-radius:50%;border:0;background:#c7cbd1;cursor:pointer;padding:0}",
    ".tvr-dots button.on{background:var(--tb);width:22px;border-radius:4px}",
    ".tvr h2{font-size:19px;font-weight:900;margin:26px 0 12px;display:flex;align-items:center;gap:8px}",
    ".tvr h2:before{content:'';width:4px;height:20px;background:var(--tb);border-radius:2px}",
    ".tvr-shelf{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(240px,1fr);gap:16px;overflow-x:auto;padding-bottom:8px;scrollbar-width:thin}",
    ".tvr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px 16px}",
    ".tvr-card{background:#fff;border-radius:8px;overflow:hidden;cursor:pointer;box-shadow:0 1px 3px #0000001a;transition:transform .15s;min-width:0;position:relative}",
    ".tvr-card:hover{transform:translateY(-2px)}",
    ".tvr-card .th{position:relative;aspect-ratio:16/9;background:#ddd}",
    ".tvr-card .th img{width:100%;height:100%;object-fit:cover}",
    ".tvr-card .du{position:absolute;right:6px;bottom:6px;background:#000b;color:#fff;font-size:11px;padding:1px 5px;border-radius:3px}",
    ".tvr-card .rk{position:absolute;left:0;top:0;background:var(--tb);color:#fff;font-weight:900;font-size:18px;width:34px;height:34px;display:grid;place-items:center;border-bottom-right-radius:8px}",
    ".tvr-card .bd{padding:10px 12px 12px}",
    ".tvr-card .ch{font-size:11px;color:var(--tb);font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".tvr-card .t{font-size:14px;font-weight:700;line-height:1.45;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.9em}",
    ".tvr-genres{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px}",
    ".tvr-genres button{background:#fff;border:1px solid #d9dce1;border-radius:20px;padding:7px 16px;font-size:14px;font-weight:700;color:#444;cursor:pointer}",
    ".tvr-genres button.on{background:var(--tb);border-color:var(--tb);color:#fff}",
    ".tvr-ghost{aspect-ratio:16/12;border-radius:8px;background:#e3e5e8;animation:ytmp 1.2s infinite alternate}",
    /* 番組表 */
    ".epg-days{display:flex;gap:6px;overflow-x:auto;margin-bottom:12px}",
    ".epg-days button{flex:none;background:#fff;border:1px solid #d9dce1;border-radius:6px;padding:6px 14px;font-weight:700;cursor:pointer;color:#444;line-height:1.3}",
    ".epg-days button.on{background:var(--tb);border-color:var(--tb);color:#fff}",
    ".epg-days small{display:block;font-size:11px;font-weight:500}",
    ".epg-note{font-size:12px;color:#888;margin:0 0 10px}",
    ".epg{position:relative;overflow:auto;max-height:calc(100vh - 210px);background:#fff;border:1px solid #e3e5e8;border-radius:8px}",
    ".epg-grid{display:grid;position:relative}",
    ".epg-ch{position:sticky;top:0;z-index:3;background:#fff;border-bottom:2px solid var(--tb);border-left:1px solid #eee;height:44px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px}",
    ".epg-ch.corner{left:0;z-index:4}",
    ".epg-hr{position:sticky;left:0;z-index:2;background:#f7f8fa;border-top:1px solid #e3e5e8;font-weight:900;font-size:13px;color:#555;text-align:center;padding-top:4px}",
    ".epg-col{position:relative;border-left:1px solid #eee}",
    ".epg-p{position:absolute;left:0;right:0;border-top:1px solid #e3e5e8;padding:4px 6px;font-size:12px;line-height:1.4;overflow:hidden;cursor:pointer;background:#fff}",
    ".epg-p:hover{background:#eaf6fc;z-index:1}",
    ".epg-p b{color:var(--tb);margin-right:4px}",
    ".epg-p.now{background:#fff8e1}",
    ".epg-p.g-news{border-left:3px solid #8bc34a}.epg-p.g-drama{border-left:3px solid #e91e63}.epg-p.g-var{border-left:3px solid #ff9800}.epg-p.g-anime{border-left:3px solid #9c27b0}.epg-p.g-sports{border-left:3px solid #2196f3}.epg-p.g-doc{border-left:3px solid #607d8b}",
    ".epg-now{position:absolute;left:0;right:0;height:2px;background:#f44336;z-index:2;pointer-events:none}",
    "@media (max-width:640px){.tvr-srch{display:none}.tvr-hero{aspect-ratio:16/9}.tvr-hero .cap b{font-size:17px}}"
  ].join("\n");
  document.head.appendChild(css);

  var ICON = {
    search: '<svg viewBox="0 0 24 24"><path d="M20.87 20.17l-5.59-5.59A6.94 6.94 0 0016.5 10a7 7 0 10-7 7 6.94 6.94 0 004.58-1.72l5.59 5.59zM3.5 10a6 6 0 116 6 6 6 0 01-6-6z"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',
    prev: '<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
  };
  function idOf(v) { return vidOf(v); }
  function img(v) { return "https://i.ytimg.com/vi/" + idOf(v) + "/hqdefault.jpg"; }
  function sp() { return new URLSearchParams(currentSearch()); }
  function sig() { return nav.abort ? nav.abort.signal : undefined; }
  var cache = {};
  function fetchList(q) {
    if (cache[q]) return Promise.resolve(cache[q]);
    return searchVideos(q, 1, sig()).then(function (l) { l = l || []; if (l.length) cache[q] = l; return l; });
  }

  /* ================= Music ================= */
  var NG = /(#?shorts?\b|ショート|ライブ配信|生配信|live stream|reaction|リアクション|解説|まとめ|講座|vlog|作業用|playlist|プレイリスト|メドレー|1時間|耐久|\bfull album\b|歌ってみた.*切り抜き|切り抜き)/i;
  function songsOnly(list) {
    var seen = {};
    return (list || []).filter(function (v) {
      var id = idOf(v); if (!id || seen[id]) return false; seen[id] = 1;
      if (v.liveNow || v.isLive || v.type === "channel" || v.type === "playlist") return false;
      var s = Number(v.lengthSeconds || v.duration || 0);
      if (s && (s < 80 || s > 660)) return false;
      if (NG.test(v.title || "")) return false;
      return true;
    }).map(function (v) {
      return { id: idOf(v), title: cleanTitle(v.title || ""), artist: cleanArtist(v.author || v.uploader || v.channel || ""), len: Number(v.lengthSeconds || 0) };
    });
  }
  function cleanTitle(t) { return String(t).replace(/[\[【(（](official|公式|MV|M\/V|music video|audio|lyric|歌詞)[^\]】)）]*[\]】)）]/ig, "").replace(/\s{2,}/g, " ").trim(); }
  function cleanArtist(a) { return String(a).replace(/\s*-\s*Topic$/i, "").replace(/\s*(official|公式)\s*(channel|チャンネル)?$/i, "").trim(); }
  function songQuery(q) { return q + " official audio"; }

  var P = { queue: [], idx: -1, playing: false, t: 0, d: 0, el: null, frame: null };
  function ensurePlayer() {
    if (P.el) return P.el;
    var b = document.createElement("div");
    b.className = "ytmp";
    b.innerHTML = '<div class="bar"><b></b></div>' +
      '<div class="ctl"><button class="prev" aria-label="前の曲">' + ICON.prev + '</button><button class="big pp" aria-label="再生/一時停止">' + ICON.pause + '</button><button class="nx" aria-label="次の曲">' + ICON.next + '</button><span class="tm">0:00 / 0:00</span></div>' +
      '<div class="info"><div class="vid"></div><div><div class="t"></div><div class="a"></div></div></div>' +
      '<div class="ctl"><button class="cl" aria-label="プレーヤーを閉じる">' + ICON.close + '</button></div>';
    document.body.appendChild(b);
    b.querySelector(".prev").onclick = function () { step(-1); };
    b.querySelector(".nx").onclick = function () { step(1); };
    b.querySelector(".pp").onclick = function () { cmd(P.playing ? "pauseVideo" : "playVideo"); P.playing = !P.playing; paint(); };
    b.querySelector(".cl").onclick = stopMusic;
    b.querySelector(".bar").onclick = function (e) { if (P.d) cmd("seekTo", [P.d * (e.offsetX / this.clientWidth), true]); };
    P.el = b;
    return b;
  }
  function cmd(func, args) {
    if (P.frame && P.frame.contentWindow) P.frame.contentWindow.postMessage(JSON.stringify({ event: "command", func: func, args: args || [] }), "*");
  }
  function playQueue(list, i) {
    P.queue = list.slice(); P.idx = i; load();
  }
  function step(d) {
    var n = P.idx + d; if (n < 0 || n >= P.queue.length) return;
    P.idx = n; load();
  }
  function load() {
    var s = P.queue[P.idx]; if (!s) return;
    var b = ensurePlayer(); b.classList.add("on");
    var box = b.querySelector(".vid"); box.innerHTML = "";
    var f = document.createElement("iframe");
    f.setAttribute("allow", "autoplay; encrypted-media");
    f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    f.src = "https://www.youtube-nocookie.com/embed/" + s.id + "?autoplay=1&enablejsapi=1&playsinline=1&controls=0&origin=" + encodeURIComponent(location.origin);
    f.onload = function () { f.contentWindow.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*"); };
    box.appendChild(f); P.frame = f;
    P.playing = true; P.t = 0; P.d = s.len || 0;
    b.querySelector(".t").textContent = s.title;
    b.querySelector(".a").textContent = s.artist;
    paint();
    document.querySelectorAll(".ytm-row").forEach(function (r) { r.classList.toggle("playing", r.dataset.id === s.id); });
  }
  function stopMusic() {
    if (!P.el) return;
    P.el.classList.remove("on"); P.el.querySelector(".vid").innerHTML = ""; P.frame = null; P.playing = false;
    document.body.classList.remove("nk-mp-on");
  }
  function paint() {
    if (!P.el) return;
    document.body.classList.toggle("nk-mp-on", P.el.classList.contains("on"));
    P.el.querySelector(".pp").innerHTML = P.playing ? ICON.pause : ICON.play;
    P.el.querySelector(".tm").textContent = fmtDur(P.t) + " / " + fmtDur(P.d);
    P.el.querySelector(".bar b").style.width = (P.d ? Math.min(100, P.t / P.d * 100) : 0) + "%";
  }
  addEventListener("message", function (e) {
    if (!P.frame || e.source !== P.frame.contentWindow) return;
    var d; try { d = typeof e.data === "string" ? JSON.parse(e.data) : e.data; } catch (x) { return; }
    if (!d) return;
    var info = d.info;
    if (d.event === "onStateChange") info = { playerState: d.info };
    if (!info || typeof info !== "object") return;
    if (typeof info.currentTime === "number") P.t = info.currentTime;
    if (typeof info.duration === "number" && info.duration) P.d = info.duration;
    if (typeof info.playerState === "number") {
      if (info.playerState === 0) { if (P.idx < P.queue.length - 1) return step(1); P.playing = false; }
      else if (info.playerState === 1) P.playing = true;
      else if (info.playerState === 2) P.playing = false;
    }
    paint();
  });

  function rowEl(s, list, i) {
    var r = el("div", "ytm-row"); r.dataset.id = s.id;
    if (P.queue[P.idx] && P.queue[P.idx].id === s.id) r.classList.add("playing");
    r.innerHTML = '<div class="ytm-sq"><img loading="lazy" referrerpolicy="no-referrer" src="' + img(s) + '" alt=""></div>' +
      '<div style="min-width:0"><div class="t">' + H(s.title) + '</div><div class="a">' + H(s.artist) + '</div></div>' +
      '<div class="d">' + (s.len ? fmtDur(s.len) : "") + '</div>';
    r.onclick = function () { playQueue(list, i); };
    return r;
  }
  function cardEl(s, list, i) {
    var c = el("div", "ytm-card");
    c.innerHTML = '<div class="art"><img loading="lazy" referrerpolicy="no-referrer" src="' + img(s) + '" alt=""><div class="pl">' + ICON.play.replace("<svg", '<svg class="ic"') + '</div></div>' +
      '<div class="t">' + H(s.title) + '</div><div class="a">曲・' + H(s.artist) + '</div>';
    c.onclick = function () { playQueue(list, i); };
    return c;
  }
  function ghosts(box, n, cls, h) { for (var i = 0; i < n; i++) { var g = el("div", "ytm-ghost " + (cls || "")); g.style.height = h + "px"; box.appendChild(g); } }

  var MOODS = ["リラックス", "エナジー", "ワークアウト", "通勤・通学", "集中", "パーティー", "ロマンス", "悲しい", "眠る"];
  var SHELVES = [
    { t: "J-POP ヒット", s: "おすすめ", q: "J-POP ヒット曲 2024" },
    { t: "アニソン", s: "人気の曲", q: "アニメ 主題歌 人気" },
    { t: "洋楽ヒット", s: "グローバル", q: "global top hits 2024" },
    { t: "ボカロ", s: "定番", q: "ボカロ 人気曲" },
    { t: "K-POP", s: "トレンド", q: "K-POP hits 2024" }
  ];
  function ytmShell(active) {
    var w = el("div", "ytm");
    w.innerHTML = '<div class="ytm-top"><div class="ytm-logo"><i>▶</i>Music</div>' +
      '<form class="ytm-search">' + ICON.search + '<input name="q" placeholder="曲、アーティストを検索" autocomplete="off"></form></div>' +
      '<div class="ytm-chips"></div><div class="ytm-body"></div>';
    w.querySelector(".ytm-logo").onclick = function () { go("/tubemusic"); };
    var f = w.querySelector("form"), inp = f.querySelector("input");
    inp.value = sp().get("q") || "";
    f.onsubmit = function (e) { e.preventDefault(); var v = inp.value.trim(); if (v) go("/tubemusic?q=" + encodeURIComponent(v)); };
    var chips = w.querySelector(".ytm-chips");
    MOODS.forEach(function (m) {
      var c = el("button", "ytm-chip" + (active === m ? " on" : ""), m); c.type = "button";
      c.onclick = function () { go(active === m ? "/tubemusic" : "/tubemusic?mood=" + encodeURIComponent(m)); };
      chips.appendChild(c);
    });
    view().replaceChildren(w);
    return w.querySelector(".ytm-body");
  }
  function musicHome(mood) {
    var body = ytmShell(mood);
    body.innerHTML = '<div class="sub">' + (mood ? H(mood) : "まずはここから") + '</div><h2 style="margin-top:4px">クイックピック</h2>';
    var qp = el("div", "ytm-qp"); body.appendChild(qp); ghosts(qp, 12, "", 56);
    fetchList(songQuery(mood ? mood + " 曲 人気" : "人気曲 ランキング")).then(function (l) {
      var s = songsOnly(l).slice(0, 20); qp.innerHTML = "";
      if (!s.length) qp.outerHTML = '<div class="ytm-empty">曲を読み込めませんでした</div>';
      s.forEach(function (x, i) { qp.appendChild(rowEl(x, s, i)); });
    }).catch(function () { qp.innerHTML = '<div class="ytm-empty">曲を読み込めませんでした</div>'; });
    (mood ? [{ t: mood + "の曲", s: "ムード", q: mood + " 音楽 おすすめ" }].concat(SHELVES.slice(0, 2)) : SHELVES).forEach(function (sh) {
      var h = el("div"); h.innerHTML = '<div class="sub" style="margin-top:28px">' + H(sh.s) + '</div><h2 style="margin-top:4px">' + H(sh.t) + '</h2>';
      var box = el("div", "ytm-shelf"); h.appendChild(box); body.appendChild(h); ghosts(box, 6, "", 220);
      fetchList(songQuery(sh.q)).then(function (l) {
        var s = songsOnly(l).slice(0, 16); box.innerHTML = "";
        if (!s.length) h.remove();
        s.forEach(function (x, i) { box.appendChild(cardEl(x, s, i)); });
      }).catch(function () { h.remove(); });
    });
  }
  function musicSearch(q) {
    var body = ytmShell(null);
    body.innerHTML = '<h2>「' + H(q) + '」の曲</h2>';
    var list = el("div", "ytm-list"); body.appendChild(list); ghosts(list, 8, "", 64);
    Promise.all([fetchList(songQuery(q)).catch(function () { return []; }), fetchList(q + " 曲").catch(function () { return []; })]).then(function (r) {
      var s = songsOnly(r[0].concat(r[1])).slice(0, 40); list.innerHTML = "";
      if (!s.length) { list.innerHTML = '<div class="ytm-empty">曲が見つかりませんでした</div>'; return; }
      s.forEach(function (x, i) {
        var row = rowEl(x, s, i);
        row.innerHTML = row.innerHTML.replace('<div class="d">', '<div class="a al">' + H(x.artist) + '</div><div class="d">');
        list.appendChild(row);
      });
    });
  }

  /* ================= TV (TVer 風) ================= */
  var GENRES = [
    { k: "drama", t: "ドラマ", q: "ドラマ 公式 第1話" },
    { k: "variety", t: "バラエティ", q: "バラエティ 公式 見逃し" },
    { k: "anime", t: "アニメ", q: "アニメ 公式 第1話 全話" },
    { k: "news", t: "報道・ドキュメンタリー", q: "ドキュメンタリー 公式" },
    { k: "sports", t: "スポーツ", q: "スポーツ ハイライト 公式" },
    { k: "movie", t: "映画", q: "映画 予告 公式" }
  ];
  function tvCard(v, rank) {
    var c = el("div", "tvr-card");
    var s = Number(v.lengthSeconds || 0);
    c.innerHTML = '<div class="th"><img loading="lazy" referrerpolicy="no-referrer" src="' + img(v) + '" alt="">' + (s ? '<span class="du">' + fmtDur(s) + '</span>' : "") + (rank ? '<span class="rk">' + rank + '</span>' : "") + '</div>' +
      '<div class="bd"><div class="ch">' + H(v.author || "") + '</div><div class="t">' + H(v.title || "") + '</div></div>';
    c.onclick = function () { go("/watch?v=" + idOf(v)); };
    return c;
  }
  function tvList(l) { var seen = {}; return (l || []).filter(function (v) { var id = idOf(v); if (!id || seen[id] || v.type === "channel" || v.type === "playlist") return false; seen[id] = 1; return !/#shorts?/i.test(v.title || ""); }); }
  function tvGhosts(box, n) { for (var i = 0; i < n; i++) box.appendChild(el("div", "tvr-ghost")); }
  function tvShell(tab) {
    var w = el("div", "tvr");
    var tabs = [["home", "ホーム"], ["epg", "番組表"], ["ranking", "ランキング"], ["genre", "ジャンル"]];
    w.innerHTML = '<div class="tvr-head"><div class="in"><div class="tvr-logo">NKYSTube<small>TV</small></div><div class="tvr-tabs">' +
      tabs.map(function (t) { return '<button type="button" class="tvr-tab' + (t[0] === tab ? " on" : "") + '" data-t="' + t[0] + '">' + t[1] + "</button>"; }).join("") +
      '</div><form class="tvr-srch">' + ICON.search.replace("<svg", '<svg style="width:18px;fill:#888"') + '<input placeholder="番組を探す"></form></div></div><div class="tvr-body"></div>';
    w.querySelector(".tvr-logo").onclick = function () { go("/tubetv"); };
    w.querySelectorAll(".tvr-tab").forEach(function (b) { b.onclick = function () { go(b.dataset.t === "home" ? "/tubetv" : "/tubetv?tab=" + b.dataset.t); }; });
    w.querySelector("form").onsubmit = function (e) { e.preventDefault(); var v = this.querySelector("input").value.trim(); if (v) go("/tubetv?tab=genre&q=" + encodeURIComponent(v)); };
    view().replaceChildren(w);
    return w.querySelector(".tvr-body");
  }
  function shelf(body, title, q, rank) {
    var h = el("div"); h.innerHTML = "<h2>" + H(title) + "</h2>";
    var box = el("div", "tvr-shelf"); h.appendChild(box); body.appendChild(h); tvGhosts(box, 5);
    return fetchList(q).then(function (l) { var s = tvList(l).slice(0, 15); box.innerHTML = ""; if (!s.length) h.remove(); s.forEach(function (v, i) { box.appendChild(tvCard(v, rank ? i + 1 : 0)); }); return s; }).catch(function () { h.remove(); return []; });
  }
  function tvHome() {
    var body = tvShell("home");
    var hero = el("div", "tvr-hero"); hero.innerHTML = '<div class="tvr-ghost" style="height:100%;aspect-ratio:auto"></div>';
    var dots = el("div", "tvr-dots");
    body.appendChild(hero); body.appendChild(dots);
    fetchList("テレビ 公式 見逃し配信 最新話").then(function (l) {
      var s = tvList(l).slice(0, 5); if (!s.length) { hero.remove(); return; }
      var i = 0;
      function show(n) {
        i = n; var v = s[i];
        hero.innerHTML = '<img referrerpolicy="no-referrer" src="https://i.ytimg.com/vi/' + idOf(v) + '/maxresdefault.jpg" onerror="this.src=\'' + img(v) + '\'" alt=""><div class="cap"><span>' + H(v.author || "おすすめ") + '</span><b>' + H(v.title || "") + '</b></div>';
        hero.onclick = function () { go("/watch?v=" + idOf(v)); };
        dots.innerHTML = s.map(function (_, k) { return '<button type="button" aria-label="' + (k + 1) + '枚目" class="' + (k === i ? "on" : "") + '"></button>'; }).join("");
        dots.querySelectorAll("button").forEach(function (b, k) { b.onclick = function () { show(k); }; });
      }
      show(0);
    }).catch(function () { hero.remove(); });
    shelf(body, "新着", "見逃し配信 最新話 公式");
    GENRES.slice(0, 4).forEach(function (g) { shelf(body, g.t, g.q); });
  }
  function tvRanking() {
    var body = tvShell("ranking");
    body.innerHTML = "<h2>総合ランキング</h2>";
    var grid = el("div", "tvr-grid"); body.appendChild(grid); tvGhosts(grid, 8);
    fetchList("テレビ番組 公式 人気").then(function (l) { grid.innerHTML = ""; tvList(l).slice(0, 20).forEach(function (v, i) { grid.appendChild(tvCard(v, i + 1)); }); });
  }
  function tvGenre(k, q) {
    var body = tvShell("genre");
    var g = GENRES.filter(function (x) { return x.k === k; })[0] || (q ? null : GENRES[0]);
    var gl = el("div", "tvr-genres");
    gl.innerHTML = GENRES.map(function (x) { return '<button type="button" data-k="' + x.k + '" class="' + (g && g.k === x.k ? "on" : "") + '">' + x.t + "</button>"; }).join("");
    gl.querySelectorAll("button").forEach(function (b) { b.onclick = function () { go("/tubetv?tab=genre&g=" + b.dataset.k); }; });
    body.appendChild(gl);
    var h = el("h2", "", g ? g.t : "「" + H(q) + "」の番組"); h.textContent = g ? g.t : "「" + q + "」の番組"; body.appendChild(h);
    var grid = el("div", "tvr-grid"); body.appendChild(grid); tvGhosts(grid, 8);
    fetchList(g ? g.q : q + " 番組").then(function (l) { grid.innerHTML = ""; var s = tvList(l); if (!s.length) grid.innerHTML = '<p class="epg-note">番組が見つかりませんでした</p>'; s.forEach(function (v) { grid.appendChild(tvCard(v)); }); });
  }

  /* ---- 番組表（サンプル） ---- */
  var CHANNELS = [
    { n: "NHK総合", k: "nhk" }, { n: "NHK Eテレ", k: "etv" }, { n: "日本テレビ", k: "ntv" }, { n: "テレビ朝日", k: "ex" },
    { n: "TBS", k: "tbs" }, { n: "テレビ東京", k: "tx" }, { n: "フジテレビ", k: "cx" }
  ];
  var POOL = {
    news: ["ニュース", "おはようニュース", "ニュース7", "報道ステーション", "news every.", "Nスタ", "イット！", "WBS", "ニュースウオッチ9", "天気予報"],
    drama: ["月曜ドラマ「青い海の約束」", "連続テレビ小説", "木曜劇場「午後の証言」", "日曜劇場「再起動」", "ドラマ24「深夜食堂の灯」", "刑事ドラマ「特捜係」"],
    var: ["ザ・クイズ王", "全国おでかけ旅", "芸人トークSP", "世界のびっくり映像", "グルメ王決定戦", "朝の情報ワイド", "昼のバラエティ", "歌の祭典"],
    anime: ["アニメ「星の旅人」", "アニメ「放課後ヒーロー」", "子ども向けアニメ", "アニメ「龍の剣」"],
    sports: ["スポーツニュース", "プロ野球中継", "サッカー ハイライト", "大相撲中継"],
    doc: ["ドキュメント72時間", "地球ふしぎ紀行", "歴史探訪", "サイエンスZERO", "趣味の園芸", "語学講座"]
  };
  var CH_BIAS = { nhk: ["news", "doc", "drama", "news"], etv: ["doc", "anime", "doc", "doc"], ntv: ["var", "news", "drama", "sports"], ex: ["news", "drama", "var", "anime"], tbs: ["var", "drama", "news", "sports"], tx: ["anime", "var", "news", "doc"], cx: ["var", "drama", "news", "anime"] };
  function rnd(seed) { var x = seed % 2147483647; if (x <= 0) x += 2147483646; return function () { x = x * 16807 % 2147483647; return (x - 1) / 2147483646; }; }
  function buildDay(ch, dayKey) {
    var r = rnd(dayKey * 31 + ch.k.charCodeAt(0) * 977 + ch.k.length * 13);
    var progs = [], m = 5 * 60, end = 29 * 60;
    var lens = [15, 30, 30, 54, 60, 60, 90, 114, 120];
    while (m < end) {
      var hour = Math.floor(m / 60);
      var bias = CH_BIAS[ch.k];
      var g = (hour < 9 || (hour >= 17 && hour < 20) || (hour >= 21 && hour < 23 && r() < .3)) && r() < .6 ? "news" : bias[Math.floor(r() * bias.length)];
      if (hour >= 23 && r() < .4) g = "anime";
      var len = lens[Math.floor(r() * lens.length)];
      if (m % 30) len = 30 - (m % 30);
      len = Math.min(len, end - m);
      var pool = POOL[g]; var t = pool[Math.floor(r() * pool.length)];
      progs.push({ s: m, e: m + len, t: t, g: g });
      m += len;
    }
    return progs;
  }
  function hm(min) { var h = Math.floor(min / 60), m = min % 60; return h + ":" + (m < 10 ? "0" : "") + m; }
  function tvEpg(dayOff) {
    var body = tvShell("epg");
    var now = new Date();
    var base = new Date(now.getTime() - 5 * 3600 * 1000); /* 放送日は朝5時区切り */
    base.setHours(0, 0, 0, 0);
    var WD = "日月火水木金土";
    var days = el("div", "epg-days");
    for (var i = -1; i < 7; i++) {
      var d = new Date(base.getTime() + i * 86400000);
      days.innerHTML += '<button type="button" data-d="' + i + '" class="' + (i === dayOff ? "on" : "") + '">' + (i === 0 ? "今日" : i === -1 ? "昨日" : i === 1 ? "明日" : (d.getMonth() + 1) + "/" + d.getDate()) + "<small>" + (d.getMonth() + 1) + "/" + d.getDate() + "（" + WD[d.getDay()] + "）</small></button>";
    }
    days.querySelectorAll("button").forEach(function (b) { b.onclick = function () { go("/tubetv?tab=epg&d=" + b.dataset.d); }; });
    body.appendChild(days);
    var note = el("p", "epg-note", "※ 表示している番組表はサンプルです。番組をクリックすると関連する動画を探せます。");
    body.appendChild(note);
    var day = new Date(base.getTime() + dayOff * 86400000);
    var dayKey = Math.floor(day.getTime() / 86400000);
    var PX = 2; /* 1分 = 2px */
    var wrap = el("div", "epg");
    var grid = el("div", "epg-grid");
    grid.style.gridTemplateColumns = "48px repeat(" + CHANNELS.length + ", minmax(150px,1fr))";
    grid.style.gridTemplateRows = "44px " + (24 * 60 * PX) + "px";
    var corner = el("div", "epg-ch corner"); grid.appendChild(corner);
    CHANNELS.forEach(function (c) { grid.appendChild(el("div", "epg-ch", H(c.n))); });
    var hrs = el("div"); hrs.style.position = "sticky"; hrs.style.left = "0"; hrs.style.zIndex = "2";
    for (var h = 5; h < 29; h++) { var hd = el("div", "epg-hr", String(h)); hd.style.height = (60 * PX) + "px"; hd.style.boxSizing = "border-box"; hrs.appendChild(hd); }
    grid.appendChild(hrs);
    var nowMin = -1;
    if (dayOff === 0) { nowMin = Math.floor((now.getTime() - base.getTime()) / 60000); }
    CHANNELS.forEach(function (c) {
      var col = el("div", "epg-col");
      buildDay(c, dayKey).forEach(function (p) {
        var b = el("div", "epg-p g-" + p.g + (nowMin >= p.s && nowMin < p.e ? " now" : ""));
        b.style.top = ((p.s - 300) * PX) + "px"; b.style.height = ((p.e - p.s) * PX) + "px";
        b.innerHTML = "<b>" + hm(p.s % 1440 === p.s ? p.s : p.s) .replace(/^(\d+)/, function (x) { return String(Number(x)); }) + "</b>" + H(p.t);
        b.title = c.n + " " + hm(p.s) + "〜" + hm(p.e) + " " + p.t;
        b.onclick = function () { go("/tubetv?tab=genre&q=" + encodeURIComponent(p.t.replace(/[「」]/g, " "))); };
        col.appendChild(b);
      });
      grid.appendChild(col);
    });
    wrap.appendChild(grid); body.appendChild(wrap);
    if (nowMin >= 300 && nowMin < 1740) {
      var line = el("div", "epg-now"); line.style.top = (44 + (nowMin - 300) * PX) + "px"; grid.appendChild(line);
      wrap.scrollTop = Math.max(0, (nowMin - 300) * PX - 120);
    } else if (dayOff !== 0) { wrap.scrollTop = (18 - 5) * 60 * PX; }
  }

  /* ================= ルーティング差し替え ================= */
  var origService = pageService;
  pageService = function (key) {
    var q = sp();
    if (key === "tubemusic") {
      if (q.get("q")) return musicSearch(q.get("q"));
      return musicHome(q.get("mood"));
    }
    if (key === "tubetv") {
      var tab = q.get("tab") || "home";
      if (tab === "epg") return tvEpg(Math.max(-1, Math.min(6, parseInt(q.get("d") || "0", 10) || 0)));
      if (tab === "ranking") return tvRanking();
      if (tab === "genre") return tvGenre(q.get("g"), q.get("q"));
      return tvHome();
    }
    return origService(key);
  };
  var origRender = renderPage;
  renderPage = function () {
    var p = currentPath();
    document.body.classList.toggle("nk-music", p === "/tubemusic");
    document.body.classList.toggle("nk-tv", p === "/tubetv");
    if (P.playing && (p === "/watch" || /^\/short/.test(p))) { cmd("pauseVideo"); P.playing = false; paint(); }
    return origRender.apply(this, arguments);
  };
  var st = document.createElement("style");
  st.textContent = "body.nk-mp-on #view{padding-bottom:80px}";
  document.head.appendChild(st);
  /* 初回表示がサービスページなら描き直す */
  if (/^\/(tubemusic|tubetv)$/.test(currentPath())) render();
})();
