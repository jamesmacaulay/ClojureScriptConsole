chrome.devtools.panels.create(
    "ClojureScriptConsole",
    "badge.png",
    "cljs-console.html",
    function cb(panel) {
        panel.onShown.addListener(function(win){ win.focus(); });
    }
);
