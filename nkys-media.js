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
    if (window.__nkMusicPaint) window.__nkMusicPaint();
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
    r.onclick = function () { playQueue(list, i); go("/music/" + s.id); };
    return r;
  }
  function cardEl(s, list, i) {
    var c = el("div", "ytm-card");
    c.innerHTML = '<div class="art"><img loading="lazy" referrerpolicy="no-referrer" src="' + img(s) + '" alt=""><div class="pl">' + ICON.play.replace("<svg", '<svg class="ic"') + '</div></div>' +
      '<div class="t">' + H(s.title) + '</div><div class="a">曲・' + H(s.artist) + '</div>';
    c.onclick = function () { playQueue(list, i); go("/music/" + s.id); };
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
    w.querySelector(".ytm-logo").onclick = function () { go("/music"); };
    var f = w.querySelector("form"), inp = f.querySelector("input");
    inp.value = sp().get("q") || "";
    f.onsubmit = function (e) { e.preventDefault(); var v = inp.value.trim(); if (v) go("/music?q=" + encodeURIComponent(v)); };
    var chips = w.querySelector(".ytm-chips");
    MOODS.forEach(function (m) {
      var c = el("button", "ytm-chip" + (active === m ? " on" : ""), m); c.type = "button";
      c.onclick = function () { go(active === m ? "/music" : "/music?mood=" + encodeURIComponent(m)); };
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
    c.onclick = function () { go("/tv/" + idOf(v)); };
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
    w.querySelector(".tvr-logo").onclick = function () { go("/tv"); };
    w.querySelectorAll(".tvr-tab").forEach(function (b) { b.onclick = function () { go(b.dataset.t === "home" ? "/tv" : "/tv?tab=" + b.dataset.t); }; });
    w.querySelector("form").onsubmit = function (e) { e.preventDefault(); var v = this.querySelector("input").value.trim(); if (v) go("/tv?tab=genre&q=" + encodeURIComponent(v)); };
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
        hero.onclick = function () { go("/tv/" + idOf(v)); };
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
    gl.querySelectorAll("button").forEach(function (b) { b.onclick = function () { go("/tv?tab=genre&g=" + b.dataset.k); }; });
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
    days.querySelectorAll("button").forEach(function (b) { b.onclick = function () { go("/tv?tab=epg&d=" + b.dataset.d); }; });
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
        b.onclick = function () { go("/tv?tab=genre&q=" + encodeURIComponent(p.t.replace(/[「」]/g, " "))); };
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
    if (key === "music") {
      if (q.get("q")) return musicSearch(q.get("q"));
      return musicHome(q.get("mood"));
    }
    if (key === "tv") {
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
    document.body.classList.toggle("nk-music", p === "/music");
    document.body.classList.toggle("nk-tv", p === "/tv");
    if (P.playing && (p === "/watch" || /^\/short/.test(p))) { cmd("pauseVideo"); P.playing = false; paint(); }
    return origRender.apply(this, arguments);
  };
  var st = document.createElement("style");
  st.textContent = "body.nk-mp-on #view{padding-bottom:80px}";
  document.head.appendChild(st);
  /* 初回表示がサービスページなら描き直す */
  

  /* ================= TV 再生 UI (/tv/{videoId}) — 独自プレーヤー ================= */
  (function () {
    var st2 = document.createElement("style");
    st2.textContent = [
      "body.nk-tvplay{overflow:hidden}",
      ".tvp{position:fixed;inset:0;z-index:10000;background:#000;color:#fff;font-family:'Noto Sans JP',Roboto,sans-serif;user-select:none;cursor:default}",
      ".tvp.idle{cursor:none}",
      ".tvp video,.tvp iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000;object-fit:contain}",
      ".tvp iframe{pointer-events:none}",
      ".tvp-hit{position:absolute;inset:0}",
      ".tvp-ui{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;transition:opacity .3s;pointer-events:none}",
      ".tvp.idle .tvp-ui{opacity:0}",
      ".tvp-top{padding:28px 40px 80px;background:linear-gradient(#000c,transparent);display:flex;align-items:flex-start;gap:20px;pointer-events:auto}",
      ".tvp-top .ti{min-width:0;flex:1}",
      ".tvp-top .ch{color:#1aa0dc;font-weight:700;font-size:15px}",
      ".tvp-top h1{margin:4px 0 0;font-size:26px;font-weight:900;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}",
      ".tvp-bot{padding:80px 40px 30px;background:linear-gradient(transparent,#000d);pointer-events:auto}",
      ".tvp-seek{position:relative;height:22px;display:flex;align-items:center;cursor:pointer}",
      ".tvp-seek .tr{position:relative;width:100%;height:6px;border-radius:3px;background:#ffffff40;overflow:hidden;transition:height .15s}",
      ".tvp-seek:hover .tr,.tvp-seek:focus-visible .tr{height:10px}",
      ".tvp-seek .bf{position:absolute;left:0;top:0;bottom:0;background:#ffffff55}",
      ".tvp-seek .pg{position:absolute;left:0;top:0;bottom:0;background:#1aa0dc}",
      ".tvp-seek .kn{position:absolute;top:50%;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;background:#fff;box-shadow:0 0 0 4px #1aa0dc80}",
      ".tvp-row{display:flex;align-items:center;gap:10px;margin-top:12px}",
      ".tvp-row .tm{font-variant-numeric:tabular-nums;font-size:16px;margin-left:8px}",
      ".tvp-row .sp{flex:1}",
      ".tvp button,.tvp select{font:inherit;color:#fff;background:#ffffff1a;border:2px solid transparent;border-radius:999px;height:52px;min-width:52px;padding:0 14px;display:inline-grid;place-items:center;cursor:pointer;font-size:15px;font-weight:700}",
      ".tvp button:hover,.tvp select:hover{background:#ffffff33}",
      ".tvp button:focus-visible,.tvp select:focus-visible,.tvp-seek:focus-visible,.tvp-card:focus-visible{outline:none;border-color:#1aa0dc;box-shadow:0 0 0 3px #1aa0dc66}",
      ".tvp button svg{width:28px;height:28px;fill:currentColor}",
      ".tvp .pp{height:64px;min-width:64px;background:#1aa0dc}",
      ".tvp .pp:hover{background:#38b4ec}",
      ".tvp .pp svg{width:36px;height:36px}",
      ".tvp select{appearance:none;padding:0 18px}",
      ".tvp select option{color:#000}",
      ".tvp-vol{width:110px;accent-color:#1aa0dc}",
      ".tvp-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);pointer-events:none;display:grid;place-items:center;gap:14px;text-align:center}",
      ".tvp-spin{width:56px;height:56px;border-radius:50%;border:5px solid #ffffff33;border-top-color:#1aa0dc;animation:tvpspin .9s linear infinite}",
      "@keyframes tvpspin{to{transform:rotate(360deg)}}",
      ".tvp-flash{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#000a;border-radius:16px;padding:16px 24px;font-size:22px;font-weight:900;opacity:0;transition:opacity .25s;pointer-events:none}",
      ".tvp-flash.on{opacity:1}",
      ".tvp-next{margin-top:18px}",
      ".tvp-next h3{margin:0 0 10px;font-size:16px;font-weight:900;color:#ddd}",
      ".tvp-next .ls{display:grid;grid-auto-flow:column;grid-auto-columns:240px;gap:14px;overflow-x:auto;padding:4px 4px 8px;scrollbar-width:thin}",
      ".tvp-card{background:#ffffff12;border:2px solid transparent;border-radius:10px;overflow:hidden;cursor:pointer;text-align:left;padding:0;height:auto!important;display:block!important;min-width:0}",
      ".tvp-card img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;background:#222}",
      ".tvp-card div{padding:8px 10px;font-size:13px;font-weight:700;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;white-space:normal}",
      ".tvp.paused .tvp-next,.tvp.ended .tvp-next{display:block}",
      ".tvp-next{display:none}",
      ".tvp-err{color:#ffb4b4;font-size:14px}",
      "@media (max-width:720px){.tvp-top{padding:16px 16px 60px}.tvp-top h1{font-size:18px}.tvp-bot{padding:60px 16px 16px}.tvp-vol,.tvp .hide-sm{display:none}.tvp button,.tvp select{height:44px;min-width:44px;padding:0 10px}.tvp .pp{height:52px;min-width:52px}}"
    ].join("\n");
    document.head.appendChild(st2);

    var I = {
      play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
      pause: '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',
      back: '<svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
      rw: '<svg viewBox="0 0 24 24"><path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/><text x="12" y="16" font-size="6.5" text-anchor="middle" font-weight="700">10</text></svg>',
      ff: '<svg viewBox="0 0 24 24"><path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/><text x="12" y="16" font-size="6.5" text-anchor="middle" font-weight="700">10</text></svg>',
      vol: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8v8a4.5 4.5 0 002.5-4zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',
      mute: '<svg viewBox="0 0 24 24"><path d="M16.5 12A4.5 4.5 0 0014 8v2.18l2.45 2.45c.03-.2.05-.41.05-.63zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',
      fs: '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
      fsx: '<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>'
    };

    var T = null; /* 現在のプレーヤー状態 */
    function destroy() {
      if (!T) return;
      clearTimeout(T.idleT); clearInterval(T.poll);
      try { if (T.video) { T.video.pause(); T.video.removeAttribute("src"); T.video.load(); } } catch (e) {}
      try { if (T.audio) { T.audio.pause(); T.audio.removeAttribute("src"); } } catch (e) {}
      document.removeEventListener("keydown", T.onKey, true);
      document.removeEventListener("fullscreenchange", T.onFs);
      removeEventListener("message", T.onMsg);
      if (T.root && T.root.parentNode) T.root.parentNode.removeChild(T.root);
      document.body.classList.remove("nk-tvplay");
      T = null;
    }

    function tvPlay(id) {
      destroy();
      document.title = "TV 再生 - NKYS Tube Pro";
      var known = (typeof previewVideos !== "undefined" && previewVideos.get && previewVideos.get(id)) || null;
      var r = document.createElement("div");
      r.className = "tvp paused";
      r.setAttribute("role", "region");
      r.setAttribute("aria-label", "TV プレーヤー");
      r.innerHTML =
        '<div class="tvp-media"></div><div class="tvp-hit"></div>' +
        '<div class="tvp-center"><div class="tvp-spin"></div><div class="tvp-msg"></div></div>' +
        '<div class="tvp-flash"></div>' +
        '<div class="tvp-ui">' +
          '<div class="tvp-top"><button type="button" class="bk" aria-label="戻る">' + I.back + '</button>' +
            '<div class="ti"><div class="ch"></div><h1></h1></div>' +
            '<button type="button" class="ow hide-sm" aria-label="通常の再生ページで開く">通常画面</button></div>' +
          '<div class="tvp-bot">' +
            '<div class="tvp-seek" tabindex="0" role="slider" aria-label="再生位置" aria-valuemin="0"><div class="tr"><div class="bf"></div><div class="pg"></div></div><div class="kn"></div></div>' +
            '<div class="tvp-row">' +
              '<button type="button" class="rw" aria-label="10秒戻る">' + I.rw + '</button>' +
              '<button type="button" class="pp" aria-label="再生/一時停止">' + I.play + '</button>' +
              '<button type="button" class="ff" aria-label="10秒進む">' + I.ff + '</button>' +
              '<span class="tm">0:00 / 0:00</span><span class="sp"></span>' +
              '<button type="button" class="mu" aria-label="ミュート">' + I.vol + '</button>' +
              '<input class="tvp-vol" type="range" min="0" max="1" step="0.05" value="1" aria-label="音量">' +
              '<select class="rt hide-sm" aria-label="再生速度"><option value="0.75">0.75x</option><option value="1" selected>1.0x</option><option value="1.25">1.25x</option><option value="1.5">1.5x</option><option value="2">2.0x</option></select>' +
              '<select class="ql" aria-label="画質"></select>' +
              '<button type="button" class="fs" aria-label="全画面">' + I.fs + '</button>' +
            '</div>' +
            '<div class="tvp-next"><h3>次に見る</h3><div class="ls"></div></div>' +
          '</div>' +
        '</div>';
      document.body.appendChild(r);
      document.body.classList.add("nk-tvplay");
      var q = function (s) { return r.querySelector(s); };
      T = { root: r, id: id, video: null, audio: null, frame: null, t: 0, d: 0, playing: false, streams: [], mode: "" };
      var me = T;
      var setInfo = function (v) {
        if (!v) return;
        q(".ch").textContent = v.author || v.uploader || "";
        q("h1").textContent = v.title || "";
        if (v.title) document.title = v.title + " - NKYS TubeTV";
        if (v.lengthSeconds && !T.d) T.d = Number(v.lengthSeconds) || 0;
      };
      setInfo(known);
      var msg = function (s, err) { var m = q(".tvp-msg"); m.textContent = s || ""; m.className = "tvp-msg" + (err ? " tvp-err" : ""); };
      var spin = function (on) { q(".tvp-spin").style.display = on ? "" : "none"; };
      var flashT = 0;
      var flash = function (s) { var f = q(".tvp-flash"); f.textContent = s; f.classList.add("on"); clearTimeout(flashT); flashT = setTimeout(function () { f.classList.remove("on"); }, 700); };

      /* ---- 共通コントロール (video / iframe 両対応) ---- */
      var api = {
        play: function () {
          if (T.video) { var p = T.video.play(); if (p && p.catch) p.catch(function () {}); if (T.audio) { T.audio.currentTime = T.video.currentTime; T.audio.play().catch(function () {}); } }
          else ycmd("playVideo");
          T.playing = true; paint();
        },
        pause: function () {
          if (T.video) { T.video.pause(); if (T.audio) T.audio.pause(); } else ycmd("pauseVideo");
          T.playing = false; paint();
        },
        seek: function (s) {
          s = Math.max(0, Math.min(T.d || s, s));
          if (T.video) { T.video.currentTime = s; if (T.audio) T.audio.currentTime = s; } else ycmd("seekTo", [s, true]);
          T.t = s; paint();
        },
        vol: function (v, muted) {
          var m = T.video ? (T.audio || T.video) : null;
          if (m) { m.volume = v; m.muted = muted; } else { ycmd("setVolume", [Math.round(v * 100)]); ycmd(muted ? "mute" : "unMute"); }
          T.v = v; T.muted = muted;
          q(".mu").innerHTML = muted || v === 0 ? I.mute : I.vol; q(".tvp-vol").value = String(muted ? 0 : v);
        },
        rate: function (x) { if (T.video) { T.video.playbackRate = x; if (T.audio) T.audio.playbackRate = x; } else ycmd("setPlaybackRate", [x]); }
      };
      T.v = 1; T.muted = false;
      function ycmd(func, args) { if (T && T.frame && T.frame.contentWindow) T.frame.contentWindow.postMessage(JSON.stringify({ event: "command", func: func, args: args || [] }), "*"); }
      function paint() {
        if (!T) return;
        r.classList.toggle("paused", !T.playing && !T.ended);
        r.classList.toggle("ended", !!T.ended);
        q(".pp").innerHTML = T.playing ? I.pause : I.play;
        q(".tm").textContent = fmtDur(T.t) + " / " + fmtDur(T.d);
        var pct = T.d ? Math.min(100, T.t / T.d * 100) : 0;
        q(".pg").style.width = pct + "%"; q(".kn").style.left = pct + "%";
        var sk = q(".tvp-seek"); sk.setAttribute("aria-valuemax", String(Math.round(T.d))); sk.setAttribute("aria-valuenow", String(Math.round(T.t)));
        if (T.video && T.video.buffered && T.video.buffered.length && T.d) q(".bf").style.width = Math.min(100, T.video.buffered.end(T.video.buffered.length - 1) / T.d * 100) + "%";
      }
      var toggle = function () { if (T.playing) { api.pause(); flash("一時停止"); } else { T.ended = false; api.play(); flash("再生"); } };

      /* ---- 自動で隠れる UI ---- */
      var wake = function () {
        r.classList.remove("idle"); clearTimeout(T.idleT);
        T.idleT = setTimeout(function () { if (T && T.playing) r.classList.add("idle"); }, 3000);
      };
      r.addEventListener("mousemove", wake); r.addEventListener("touchstart", wake, { passive: true });
      q(".tvp-hit").onclick = function () { if (r.classList.contains("idle")) return wake(); toggle(); wake(); };
      q(".tvp-hit").ondblclick = function () { fsToggle(); };
      q(".pp").onclick = toggle;
      q(".rw").onclick = function () { api.seek(T.t - 10); flash("-10秒"); };
      q(".ff").onclick = function () { api.seek(T.t + 10); flash("+10秒"); };
      q(".mu").onclick = function () { api.vol(T.v || 1, !T.muted); };
      q(".tvp-vol").oninput = function () { var v = parseFloat(this.value); api.vol(v, v === 0); };
      q(".rt").onchange = function () { api.rate(parseFloat(this.value)); };
      var back = function () { if (history.length > 1) history.back(); else go("/tv"); };
      q(".bk").onclick = back;
      q(".ow").onclick = function () { go("/watch?v=" + id); };
      var seekAt = function (e) { var b = q(".tvp-seek").getBoundingClientRect(); if (T.d) api.seek(T.d * Math.max(0, Math.min(1, (e.clientX - b.left) / b.width))); };
      var dragging = false;
      q(".tvp-seek").addEventListener("pointerdown", function (e) { dragging = true; this.setPointerCapture(e.pointerId); seekAt(e); });
      q(".tvp-seek").addEventListener("pointermove", function (e) { if (dragging) seekAt(e); });
      q(".tvp-seek").addEventListener("pointerup", function () { dragging = false; });
      function fsToggle() {
        if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
        else if (r.requestFullscreen) r.requestFullscreen().catch(function () {});
      }
      q(".fs").onclick = fsToggle;
      T.onFs = function () { if (T) q(".fs").innerHTML = document.fullscreenElement ? I.fsx : I.fs; };
      document.addEventListener("fullscreenchange", T.onFs);

      /* ---- TV リモコン / キーボード ---- */
      T.onKey = function (e) {
        if (!T || T !== me) return;
        var tag = (e.target && e.target.tagName) || "";
        var onCtl = /BUTTON|SELECT|INPUT/.test(tag) && r.contains(e.target);
        var k = e.key;
        wake();
        if (k === "Escape" || k === "Backspace" || k === "BrowserBack" || k === "GoBack") {
          if (document.fullscreenElement && k === "Escape") return;
          e.preventDefault(); e.stopPropagation(); return back();
        }
        if (k === " " || k === "k" || k === "MediaPlayPause") { if (tag === "SELECT") return; e.preventDefault(); e.stopPropagation(); return toggle(); }
        if (k === "MediaPlay") { e.preventDefault(); return api.play(); }
        if (k === "MediaPause" || k === "MediaStop") { e.preventDefault(); return api.pause(); }
        if (k === "Enter" && !onCtl) { e.preventDefault(); e.stopPropagation(); return toggle(); }
        if (onCtl && tag !== "BUTTON") return; /* 音量スライダー・セレクトは標準操作 */
        if (k === "ArrowLeft" || k === "j" || k === "MediaRewind") { if (onCtl) return; e.preventDefault(); e.stopPropagation(); api.seek(T.t - 10); return flash("-10秒"); }
        if (k === "ArrowRight" || k === "l" || k === "MediaFastForward") { if (onCtl) return; e.preventDefault(); e.stopPropagation(); api.seek(T.t + 10); return flash("+10秒"); }
        if (k === "ArrowUp" && !onCtl) { e.preventDefault(); e.stopPropagation(); var v = Math.min(1, (T.v || 0) + 0.1); api.vol(v, false); return flash("音量 " + Math.round(v * 100)); }
        if (k === "ArrowDown" && !onCtl) { e.preventDefault(); e.stopPropagation(); var v2 = Math.max(0, (T.v || 0) - 0.1); api.vol(v2, v2 === 0); return flash("音量 " + Math.round(v2 * 100)); }
        if (k === "f") { e.preventDefault(); return fsToggle(); }
        if (k === "m") { e.preventDefault(); return api.vol(T.v || 1, !T.muted); }
      };
      document.addEventListener("keydown", T.onKey, true);

      /* ---- iframe (予備) のイベント ---- */
      T.onMsg = function (e) {
        if (!T || !T.frame || e.source !== T.frame.contentWindow) return;
        var d; try { d = typeof e.data === "string" ? JSON.parse(e.data) : e.data; } catch (x) { return; }
        if (!d) return;
        var info = d.info; if (d.event === "onStateChange") info = { playerState: d.info };
        if (!info || typeof info !== "object") return;
        if (typeof info.currentTime === "number") T.t = info.currentTime;
        if (typeof info.duration === "number" && info.duration) T.d = info.duration;
        if (typeof info.playerState === "number") {
          if (info.playerState === 1) { T.playing = true; T.ended = false; spin(false); msg(""); }
          else if (info.playerState === 2) T.playing = false;
          else if (info.playerState === 0) { T.playing = false; T.ended = true; }
        }
        paint();
      };
      addEventListener("message", T.onMsg);

      function useIframe() {
        if (!T || T !== me) return;
        T.mode = "iframe"; T.video = null; T.audio = null;
        var box = q(".tvp-media"); box.innerHTML = "";
        var f = document.createElement("iframe");
        f.setAttribute("allow", "autoplay; encrypted-media; fullscreen");
        f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
        f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&enablejsapi=1&playsinline=1&controls=0&disablekb=1&fs=0&rel=0&iv_load_policy=3&modestbranding=1&origin=" + encodeURIComponent(location.origin);
        f.onload = function () { f.contentWindow.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*"); spin(false); };
        box.appendChild(f); T.frame = f; T.playing = true;
        var sel = q(".ql"); sel.innerHTML = '<option>自動</option>'; sel.disabled = true;
        paint(); wake();
      }

      function useStream(s, at) {
        if (!T || T !== me) return;
        T.mode = "video"; T.frame = null;
        var box = q(".tvp-media"); box.innerHTML = "";
        var v = document.createElement("video");
        v.playsInline = true; v.autoplay = true; v.preload = "auto";
        v.setAttribute("referrerpolicy", "no-referrer");
        var a = null;
        if (s.adaptive && s.audioUrl) { a = document.createElement("audio"); a.preload = "auto"; a.src = s.audioUrl; v.muted = true; }
        v.src = s.url;
        box.appendChild(v); T.video = v; T.audio = a;
        var tgt = a || v; tgt.volume = T.v; tgt.muted = a ? T.muted : T.muted;
        if (a) v.muted = true;
        v.addEventListener("loadedmetadata", function () { if (v.duration && isFinite(v.duration)) T.d = v.duration; if (at) { v.currentTime = at; if (a) a.currentTime = at; } paint(); });
        v.addEventListener("waiting", function () { spin(true); if (a) a.pause(); });
        v.addEventListener("playing", function () { spin(false); msg(""); T.playing = true; T.ended = false; if (a) { if (Math.abs(a.currentTime - v.currentTime) > 0.3) a.currentTime = v.currentTime; a.play().catch(function () {}); } paint(); wake(); });
        v.addEventListener("pause", function () { T.playing = false; if (a) a.pause(); paint(); wake(); });
        v.addEventListener("timeupdate", function () { T.t = v.currentTime; if (a && !a.paused && Math.abs(a.currentTime - v.currentTime) > 0.35) a.currentTime = v.currentTime; paint(); });
        v.addEventListener("progress", paint);
        v.addEventListener("ended", function () { T.playing = false; T.ended = true; if (a) a.pause(); paint(); wake(); });
        v.addEventListener("error", function () {
          if (!T || T !== me || T.video !== v) return;
          var i = T.streams.indexOf(s);
          var nx = T.streams.slice(i + 1).find(function (x) { return !x.live; });
          if (nx) { msg("別の画質で再試行しています…"); selectQ(nx, T.t); }
          else { msg("YouTube プレーヤーで再生します"); useIframe(); }
        });
        var p = v.play(); if (p && p.catch) p.catch(function () { T.playing = false; paint(); });
        T.cur = s;
      }
      function selectQ(s, at) { var sel = q(".ql"); sel.value = String(T.streams.indexOf(s)); useStream(s, at); }
      q(".ql").onchange = function () { var s = T.streams[parseInt(this.value, 10)]; if (s) useStream(s, T.t); };

      function fillNext(v) {
        var list = (v && v.recommendedVideos || []).filter(function (x) { return idOf(x) && idOf(x) !== id; }).slice(0, 16);
        var ls = q(".tvp-next .ls"); ls.innerHTML = "";
        if (!list.length) { q(".tvp-next").style.visibility = "hidden"; return; }
        list.forEach(function (x) {
          var b = document.createElement("button"); b.type = "button"; b.className = "tvp-card";
          b.innerHTML = '<img loading="lazy" referrerpolicy="no-referrer" src="' + img(x) + '" alt=""><div>' + H(x.title || "") + "</div>";
          b.onclick = function () { go("/tv/" + idOf(x)); };
          ls.appendChild(b);
        });
      }

      spin(true); msg("番組を読み込んでいます…"); paint(); wake();
      q(".pp").focus({ preventScroll: true });
      var startAt = Math.max(0, parseInt(new URLSearchParams(currentSearch()).get("t") || "0", 10) || 0);
      getVideo(id, sig()).then(function (v) {
        if (!T || T !== me) return;
        setInfo(v); fillNext(v);
        var streams = (typeof pickStreams === "function" ? pickStreams(v) : []).filter(function (s) { return !s.live; });
        T.streams = streams;
        var sel = q(".ql"); sel.disabled = false;
        sel.innerHTML = streams.map(function (s, i) { return '<option value="' + i + '">' + H(s.h ? s.h + "p" : s.label) + "</option>"; }).join("");
        /* 既定は 1080p 以下で最も高い画質 */
        var first = streams.find(function (s) { return s.h && s.h <= 1080; }) || streams[0];
        if (first) selectQ(first, startAt); else { msg("YouTube プレーヤーで再生します"); useIframe(); }
      }).catch(function (e) {
        if (!T || T !== me || (e && e.name === "AbortError")) return;
        useIframe();
      });
    }

    var prevRender = renderPage;
    renderPage = function () {
      var p = currentPath();
      var m = p.match(/^\/tv\/([\w-]{11})\/?$/);
      if (p === "/tubetv" || p.indexOf("/tubetv/") === 0) { go(p.replace(/^\/tubetv/, "/tv") + currentSearch(), true); return; }
      if (m) {
        if (nav.abort) nav.abort.abort();
        nav.abort = new AbortController();
        if (T && T.id === m[1]) return;
        return tvPlay(m[1]);
      }
      destroy();
      return prevRender.apply(this, arguments);
    };
  })();

  /* 初回表示がサービス・TV 再生ページなら描き直す */


  /* ================= Music 再生 UI (/music/{videoId}) ================= */
  (function () {
    var st3 = document.createElement("style");
    st3.textContent = [
      "body.nk-mplay{background:#030303}",
      "body.nk-mplay .ytmp{display:none!important}",
      ".ytmn{position:relative;min-height:100vh;color:#fff;font-family:Roboto,'Noto Sans JP',sans-serif;overflow:hidden;background:#030303}",
      ".ytmn-bg{position:absolute;inset:-60px;background-size:cover;background-position:center;filter:blur(60px) brightness(.35) saturate(1.4);transform:scale(1.2);z-index:0}",
      ".ytmn-in{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:20px 32px 48px;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(320px,.85fr);gap:48px;min-height:100vh;box-sizing:border-box}",
      ".ytmn-top{grid-column:1/-1;display:flex;align-items:center;gap:12px}",
      ".ytmn button{font:inherit;color:#fff;background:none;border:0;cursor:pointer;border-radius:50%;display:grid;place-items:center}",
      ".ytmn button:hover{background:#ffffff1a}",
      ".ytmn button:focus-visible,.ytmn-q:focus-visible{outline:2px solid #fff;outline-offset:2px}",
      ".ytmn svg{width:26px;height:26px;fill:currentColor}",
      ".ytmn-top .bk{width:44px;height:44px}",
      ".ytmn-top .lg{font-weight:700;font-size:18px}",
      ".ytmn-main{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;min-width:0}",
      ".ytmn-art{width:min(480px,80vw);aspect-ratio:1;border-radius:10px;overflow:hidden;background:#222;box-shadow:0 24px 60px #000a}",
      ".ytmn-art img{width:100%;height:100%;object-fit:cover;transform:scale(1.35)}",
      ".ytmn-meta{width:min(480px,80vw);text-align:center;min-width:0}",
      ".ytmn-meta h1{margin:0;font-size:26px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".ytmn-meta p{margin:6px 0 0;color:#ffffffb3;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".ytmn-seek{width:min(480px,80vw)}",
      ".ytmn-seek input{width:100%;accent-color:#fff;cursor:pointer}",
      ".ytmn-seek .tm{display:flex;justify-content:space-between;color:#ffffffb3;font-size:13px;font-variant-numeric:tabular-nums}",
      ".ytmn-ctl{display:flex;align-items:center;gap:18px}",
      ".ytmn-ctl .sm{width:48px;height:48px}",
      ".ytmn-ctl .sm.on{color:#ff4e45}",
      ".ytmn-ctl .pp{width:72px;height:72px;background:#fff!important;color:#000}",
      ".ytmn-ctl .pp svg{width:40px;height:40px}",
      ".ytmn-ctl .nv svg{width:36px;height:36px}",
      ".ytmn-ctl .nv{width:56px;height:56px}",
      ".ytmn-vol{display:flex;align-items:center;gap:8px;color:#ffffffb3}",
      ".ytmn-vol input{width:140px;accent-color:#fff}",
      ".ytmn-side{display:flex;flex-direction:column;min-width:0;min-height:0;background:#0000004d;border-radius:12px;padding:8px 0;max-height:calc(100vh - 110px);align-self:center}",
      ".ytmn-side h2{margin:8px 20px 8px;font-size:15px;letter-spacing:.06em;color:#ffffffb3;font-weight:700}",
      ".ytmn-list{overflow-y:auto;padding:0 8px}",
      ".ytmn-q{display:grid!important;place-items:center stretch!important;justify-items:stretch!important;box-sizing:border-box;grid-template-columns:48px minmax(0,1fr) auto;gap:12px;align-items:center;padding:8px 12px;border-radius:6px;cursor:pointer;width:100%;text-align:left;border-radius:6px!important}",
      ".ytmn-q img{width:48px;height:48px;border-radius:4px;object-fit:cover}",
      ".ytmn-q .t{font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".ytmn-q .a{font-size:12px;color:#ffffffa0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}",
      ".ytmn-q .d{font-size:12px;color:#ffffffa0}",
      ".ytmn-q.cur{background:#ffffff1f!important}",
      ".ytmn-q.cur .t{color:#ff4e45}",
      ".ytmn-ghost{color:#ffffffa0;padding:20px;text-align:center}",
      "@media (max-width:900px){.ytmn-in{grid-template-columns:1fr;gap:28px;padding:12px 16px 40px}.ytmn-side{max-height:none}.ytmn-art,.ytmn-meta,.ytmn-seek{width:min(420px,88vw)}.ytmn-ctl{gap:8px}}"
    ].join("\n");
    document.head.appendChild(st3);
    var MI = {
      back: '<svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
      shuffle: '<svg viewBox="0 0 24 24"><path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>',
      repeat: '<svg viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>',
      vol: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8v8a4.5 4.5 0 002.5-4z"/></svg>'
    };
    var R = { root: null, id: "", repeat: false, vol: 100, dragging: false };

    function close() { R.root = null; window.__nkMusicPaint = null; document.body.classList.remove("nk-mplay"); }

    function cur() { return P.queue[P.idx] || null; }
    function syncUrl() {
      var s = cur();
      if (R.root && s && s.id !== R.id && /^\/music\/[\w-]{11}$/.test(currentPath())) {
        R.id = s.id; history.replaceState({}, "", APP_FILE_MODE ? "/app.html#/music/" + s.id : "/music/" + s.id);
      }
    }
    function mpaint() {
      var r = R.root; if (!r || !r.isConnected) return close();
      syncUrl();
      var s = cur(); var q = function (x) { return r.querySelector(x); };
      if (s) {
        if (q(".ytmn-art img").dataset.id !== s.id) {
          q(".ytmn-art img").dataset.id = s.id;
          q(".ytmn-art img").src = "https://i.ytimg.com/vi/" + s.id + "/hqdefault.jpg";
          q(".ytmn-bg").style.backgroundImage = "url(https://i.ytimg.com/vi/" + s.id + "/hqdefault.jpg)";
          q("h1").textContent = s.title; q(".ytmn-meta p").textContent = s.artist;
          document.title = s.title + " - NKYSTubeMusic";
          renderQueue();
        }
      }
      q(".pp").innerHTML = P.playing ? ICON.pause : ICON.play;
      q(".pp").setAttribute("aria-label", P.playing ? "一時停止" : "再生");
      if (!R.dragging) { var sk = q(".ytmn-seek input"); sk.max = String(Math.max(1, Math.round(P.d))); sk.value = String(Math.round(P.t)); }
      q(".tm .c").textContent = fmtDur(P.t); q(".tm .e").textContent = fmtDur(P.d);
      q(".nv.pv").disabled = P.idx <= 0; q(".nv.nx").disabled = P.idx >= P.queue.length - 1;
      q(".rp").classList.toggle("on", R.repeat);
      /* リピート: 終了直前で頭に戻す */
      if (R.repeat && P.d && P.t >= P.d - 0.6 && P.playing) cmd("seekTo", [0, true]);
    }
    function renderQueue() {
      var r = R.root; if (!r) return;
      var box = r.querySelector(".ytmn-list"); box.innerHTML = "";
      P.queue.forEach(function (s, i) {
        var b = document.createElement("button"); b.type = "button";
        b.className = "ytmn-q" + (i === P.idx ? " cur" : "");
        b.innerHTML = '<img loading="lazy" referrerpolicy="no-referrer" src="' + img(s) + '" alt=""><div style="min-width:0"><div class="t">' + H(s.title) + '</div><div class="a">' + H(s.artist) + '</div></div><div class="d">' + (s.len ? fmtDur(s.len) : "") + "</div>";
        b.onclick = function () { P.idx = i; load(); };
        box.appendChild(b);
      });
      var c = box.querySelector(".cur"); if (c) c.scrollIntoView({ block: "nearest" });
    }

    function musicPlay(id) {
      document.body.classList.add("nk-music", "nk-mplay");
      var w = el("div", "ytmn");
      w.innerHTML = '<div class="ytmn-bg"></div><div class="ytmn-in">' +
        '<div class="ytmn-top"><button type="button" class="bk" aria-label="戻る">' + MI.back + '</button><span class="lg">NKYSTubeMusic</span></div>' +
        '<div class="ytmn-main"><div class="ytmn-art"><img referrerpolicy="no-referrer" alt=""></div>' +
        '<div class="ytmn-meta"><h1>読み込み中…</h1><p></p></div>' +
        '<div class="ytmn-seek"><input type="range" min="0" max="1" value="0" aria-label="再生位置"><div class="tm"><span class="c">0:00</span><span class="e">0:00</span></div></div>' +
        '<div class="ytmn-ctl"><button type="button" class="sm sh" aria-label="シャッフル">' + MI.shuffle + '</button>' +
        '<button type="button" class="nv pv" aria-label="前の曲">' + ICON.prev + '</button>' +
        '<button type="button" class="pp" aria-label="再生">' + ICON.play + '</button>' +
        '<button type="button" class="nv nx" aria-label="次の曲">' + ICON.next + '</button>' +
        '<button type="button" class="sm rp" aria-label="リピート">' + MI.repeat + '</button></div>' +
        '<div class="ytmn-vol">' + MI.vol + '<input type="range" min="0" max="100" value="' + R.vol + '" aria-label="音量"></div></div>' +
        '<div class="ytmn-side"><h2>次のトラック</h2><div class="ytmn-list"><div class="ytmn-ghost">読み込み中…</div></div></div></div>';
      view().replaceChildren(w);
      R.root = w; R.id = id;
      window.__nkMusicPaint = mpaint;
      var q = function (x) { return w.querySelector(x); };
      q(".bk").onclick = function () { if (history.length > 1) history.back(); else go("/music"); };
      q(".pp").onclick = function () { cmd(P.playing ? "pauseVideo" : "playVideo"); P.playing = !P.playing; paint(); };
      q(".pv").onclick = function () { if (P.t > 3) cmd("seekTo", [0, true]); else step(-1); };
      q(".nx").onclick = function () { step(1); };
      q(".rp").onclick = function () { R.repeat = !R.repeat; mpaint(); };
      q(".sh").onclick = function () {
        var c = cur(); if (!c) return;
        var rest = P.queue.filter(function (_, i) { return i !== P.idx; });
        for (var i = rest.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = rest[i]; rest[i] = rest[j]; rest[j] = t; }
        P.queue = [c].concat(rest); P.idx = 0; renderQueue(); mpaint();
      };
      var sk = q(".ytmn-seek input");
      sk.oninput = function () { R.dragging = true; q(".tm .c").textContent = fmtDur(+sk.value); };
      sk.onchange = function () { R.dragging = false; cmd("seekTo", [+sk.value, true]); P.t = +sk.value; paint(); };
      q(".ytmn-vol input").oninput = function () { R.vol = +this.value; cmd("setVolume", [R.vol]); };
      document.onkeydown = function (e) {
        if (!R.root || /INPUT|TEXTAREA/.test((e.target && e.target.tagName) || "")) return;
        if (e.key === " " || e.key === "k" || e.key === "MediaPlayPause") { e.preventDefault(); q(".pp").click(); }
        else if (e.key === "MediaTrackNext" || (e.shiftKey && e.key === "N")) step(1);
        else if (e.key === "MediaTrackPrevious" || (e.shiftKey && e.key === "P")) step(-1);
        else if (e.key === "ArrowRight") cmd("seekTo", [P.t + 10, true]);
        else if (e.key === "ArrowLeft") cmd("seekTo", [Math.max(0, P.t - 10), true]);
      };

      var c = cur();
      if (c && c.id === id) { renderQueue(); mpaint(); return; }
      /* 直接開いた場合: 曲情報と関連曲からキューを作って再生 */
      var me = R.root;
      var seed = { id: id, title: "読み込み中…", artist: "", len: 0 };
      playQueue([seed], 0); mpaint();
      getVideo(id, sig()).then(function (v) {
        if (R.root !== me || !v) return;
        var head = { id: id, title: cleanTitle(v.title || ""), artist: cleanArtist(v.author || ""), len: Number(v.lengthSeconds || 0) };
        var rec = songsOnly(v.recommendedVideos || []).filter(function (s) { return s.id !== id; });
        var playingNow = cur();
        P.queue = [head].concat(rec);
        if (playingNow && playingNow.id === id) P.idx = 0;
        if (!P.d) P.d = head.len;
        var art = me.querySelector(".ytmn-art img"); art.dataset.id = "";
        mpaint();
        renderQueue();
        if (rec.length < 5 && head.artist) {
          fetchList(songQuery(head.artist)).then(function (l) {
            if (R.root !== me) return;
            var have = {}; P.queue.forEach(function (s) { have[s.id] = 1; });
            songsOnly(l).forEach(function (s) { if (!have[s.id]) { have[s.id] = 1; P.queue.push(s); } });
            renderQueue(); mpaint();
          }).catch(function () {});
        }
      }).catch(function () {});
    }

    var prev = renderPage;
    renderPage = function () {
      var p = currentPath();
      if (p === "/tubemusic" || p.indexOf("/tubemusic/") === 0) { go(p.replace(/^\/tubemusic/, "/music") + currentSearch(), true); return; }
      var m = p.match(/^\/music\/([\w-]{11})\/?$/);
      if (m) {
        if (R.root && R.root.isConnected && R.id === m[1]) return;
        if (nav.abort) nav.abort.abort();
        nav.abort = new AbortController();
        scrollTo(0, 0);
        return musicPlay(m[1]);
      }
      close();
      return prev.apply(this, arguments);
    };
  })();

  if (/^\/(tubemusic|music|tv|tubetv)(\/|$)/.test(currentPath())) render();
})();
