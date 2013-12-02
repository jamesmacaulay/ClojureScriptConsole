var tabId = chrome.devtools.inspectedWindow.tabId;
var err = document.getElementById('error');
var editor = ace.edit("cc-editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/clojure");
editor.session.setUseSoftTabs(true);
editor.session.setTabSize(2);
editor.setShowPrintMargin(false);

var compiled = ace.edit("cc-results");
compiled.setTheme("ace/theme/twilight");
compiled.session.setMode("ace/mode/javascript");
compiled.session.setUseSoftTabs(true);
compiled.session.setTabSize(2);
compiled.setShowPrintMargin(false);

function evalIt(){
  // var cljs = "(try* (.log js/console (do " + editor.session.getValue() + " (catch e (.error js/console e)))))";
  // var cljs = "(.error js/console (try* " + editor.session.getValue() + " (catch e e)))"
  var cljs = "(.log js/console (try* " + editor.session.getValue() + "(catch e (.error js/console e (.-message e)))))"
  var compiledSource = chrome_console.compile_code(cljs);
  chrome.devtools.inspectedWindow.eval( compiledSource );
}

function update(){
    try {
        var compiledSource = chrome_console.compile_code( editor.session.getValue(), {bare:true});
        compiled.session.setValue(compiledSource);
        err.className = 'is-hidden';
    } catch (error) {
        err.className = '';
        err.innerHTML = error.message;
    }
    localStorage.setItem("state" + tabId, editor.session.getValue());
}

schedule = function(fn, timeout) {
    if (fn.$timer) return;
    fn.$timer = setTimeout(function() {fn.$timer = null; fn()}, timeout || 10);
}

editor.on("change", function(e){
    schedule(update, 20);
});

var evalOptions = {
    name: "evalIt",
    exec: evalIt,
    bindKey: "Ctrl-Return|Command-Return|Shift-Return"
};

editor.commands.addCommand(evalOptions);
compiled.commands.addCommand(evalOptions);

document.getElementById('runcc').addEventListener('click', evalIt);
editor.session.setValue(localStorage.getItem("state" + tabId));
schedule(function(){ editor.focus() }, 20);
