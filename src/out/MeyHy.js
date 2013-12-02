goog.provide('chrome_console');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('cljs.compiler');
goog.require('cljs.analyzer');
/**
* hacked from cljs.repl/evaluate-next-form
*/
chrome_console.compile_next_form = (function compile_next_form(rdr){
try{var form = cljs.reader.read.call(null,rdr,false,"\uFDD0'chrome-console/finished-reading");
var _ = (cljs.core.truth_(chrome_console._STAR_debug_STAR_)?cljs.core.println.call(null,"READ:",cljs.core.pr_str.call(null,form)):null);
if(cljs.core._EQ_.call(null,form,"\uFDD0'chrome-console/finished-reading"))
{return cljs.core.ObjMap.fromObject(["\uFDD0'finished"],{"\uFDD0'finished":true});
} else
{var env = cljs.core.assoc.call(null,cljs.analyzer.empty_env.call(null),"\uFDD0'context","\uFDD0'expr");
var body = cljs.analyzer.analyze.call(null,env,form);
var ___$1 = (cljs.core.truth_(chrome_console._STAR_debug_STAR_)?cljs.core.println.call(null,"ANALYZED:",cljs.core.pr_str.call(null,(new cljs.core.Keyword("\uFDD0'form")).call(null,body))):null);
var res = cljs.compiler.emit_str.call(null,body);
var ___$2 = (cljs.core.truth_(chrome_console._STAR_debug_STAR_)?cljs.core.println.call(null,"EMITTED:",cljs.core.pr_str.call(null,res)):null);
return cljs.core.ObjMap.fromObject(["\uFDD0'js"],{"\uFDD0'js":res});
}
}catch (e3214){if(cljs.core.instance_QMARK_.call(null,Error,e3214))
{var e = e3214;
return cljs.core.ObjMap.fromObject(["\uFDD0'error","\uFDD0'line-number"],{"\uFDD0'error":e,"\uFDD0'line-number":cljs.reader.get_line_number.call(null,rdr)});
} else
{if("\uFDD0'else")
{throw e3214;
} else
{return null;
}
}
}});
/**
* hacked from cljs.repl/evaluate-code
*/
chrome_console.compile_code = (function compile_code(text){
var text__$1 = [cljs.core.str("(do\n\n"),cljs.core.str(text),cljs.core.str("\n\n)\n")].join('');
var rdr = cljs.reader.indexing_push_back_reader.call(null,text__$1);
var emitted_js = "";
while(true){
var output = chrome_console.compile_next_form.call(null,rdr);
var emitted_js__$1 = [cljs.core.str(emitted_js),cljs.core.str("\n"),cljs.core.str((new cljs.core.Keyword("\uFDD0'js")).call(null,output))].join('');
if(cljs.core.not.call(null,(new cljs.core.Keyword("\uFDD0'finished")).call(null,output)))
{var temp__4090__auto__ = (new cljs.core.Keyword("\uFDD0'error")).call(null,output);
if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;
cljs.core._STAR_e = err;
return emitted_js__$1;
} else
{{
var G__3215 = emitted_js__$1;
emitted_js = G__3215;
continue;
}
}
} else
{return emitted_js__$1;
}
break;
}
});
