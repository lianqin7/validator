define("arale/validator/0.9.3/core",["$","./async","arale/widget/1.1.0/widget","arale/base/1.1.0/base","arale/class/1.1.0/class","arale/events/1.1.0/events","./utils","./rule","./item"],function(e,t,r){function n(e,t){for(var r=0;t.length>r;r++)if(e===t[r])return t.splice(r,1),t}function a(e,t){var r;return i.each(t,function(t,n){return e.get(0)===n.element.get(0)?(r=n,!1):void 0}),r}var i=e("$"),l=e("./async"),u=e("arale/widget/1.1.0/widget"),o=e("./utils"),s=e("./item"),c=[],f={value:i.noop,setter:function(e){return i.isFunction(e)?e:o.helper(e)}},d=u.extend({attrs:{triggerType:"blur",checkOnSubmit:!0,stopOnError:!1,autoSubmit:!0,checkNull:!0,onItemValidate:f,onItemValidated:f,onFormValidate:f,onFormValidated:f,displayHelper:function(e){var t,r,n=e.element.attr("id");return n&&(t=i("label[for="+n+"]").text(),t&&(t=t.replace(/^[\*\s\:\：]*/,"").replace(/[\*\s\:\：]*$/,""))),r=e.element.attr("name"),t||r},showMessage:f,hideMessage:f,autoFocus:!0,failSilently:!1,skipHidden:!1},setup:function(){var e=this;if(e.items=[],e.element.is("form")){e._novalidate_old=e.element.attr("novalidate");try{e.element.attr("novalidate","novalidate")}catch(t){}e.get("checkOnSubmit")&&e.element.on("submit.validator",function(t){t.preventDefault(),e.execute(function(t){t||e.get("autoSubmit")&&e.element.get(0).submit()})})}e.on("formValidate",function(){i.each(e.items,function(t,r){r.get("hideMessage").call(e,null,r.element)})}),e.on("itemValidated",function(e,t,r,n){this.query(r).get(e?"showMessage":"hideMessage").call(this,t,r,n)}),e.get("autoFocus")&&e.on("formValidated",function(t,r){if(t){var n=null;i.each(r,function(e,t){var r=t[0],a=t[2];return r?(n=a,!1):void 0}),e.trigger("autoFocus",n),n.focus()}}),c.push(e)},Statics:i.extend({helper:o.helper},e("./rule"),{autoRender:function(e){var t=new this(e);i("input, textarea, select",t.element).each(function(e,r){r=i(r);var n=r.attr("type");if("button"==n||"submit"==n||"reset"==n)return!0;var a={};if(a.element="radio"==n||"checkbox"==n?i("[type="+n+"][name="+r.attr("name")+"]",t.element):r,!t.query(a.element)){var l=o.parseDom(r);if(!l.rule)return!0;i.extend(a,l),t.addItem(a)}})},query:function(e){return u.query(e)},validate:function(e){var t=i(e.element),r=new d({element:t.parents()});r.addItem(e),r.query(t).execute(),r.destroy()}}),addItem:function(e){var t=this;if(i.isArray(e))return i.each(e,function(e,r){t.addItem(r)}),this;if(e=i.extend({triggerType:t.get("triggerType"),checkNull:t.get("checkNull"),displayHelper:t.get("displayHelper"),showMessage:t.get("showMessage"),hideMessage:t.get("hideMessage"),failSilently:t.get("failSilently"),skipHidden:t.get("skipHidden")},e),!i(e.element).length){if(e.failSilently)return t;throw Error("element does not exist")}var r=new s(e);return t.items.push(r),r.delegateEvents(r.get("triggerType"),function(e){(this.get("checkNull")||this.element.val())&&this.execute(null,{event:e})}),r.on("all",function(){this.trigger.apply(this,[].slice.call(arguments))},this),this},removeItem:function(e){var t=this,r=e instanceof s?e:a(i(e),t.items);return n(r,t.items),r.get("hideMessage").call(t,null,r.element),r.destroy(),t},execute:function(e){var t=this;t.trigger("formValidate",t.element);var r=function(){var r=!1;i.each(n,function(e,t){return r=!!t[0],!r}),t.trigger("formValidated",r,n,t.element),e&&e(r,n,t.element)},n=[];return l[t.get("stopOnError")?"forEachSeries":"forEach"](t.items,function(e,r){e.execute(function(e){n.push([].slice.call(arguments,0)),r(t.get("stopOnError")?e:null)})},r),t},destroy:function(){var e=this;e.element.is("form")&&(void 0==e._novalidate_old?e.element.removeAttr("novalidate"):e.element.attr("novalidate",e._novalidate_old),e.element.off("submit.validator"));for(var t=0;e.items.length-1>=t;t++)e.removeItem(e.items[t]);n(e,c),d.superclass.destroy.call(this)},query:function(e){return a(i(e),this.items)}});r.exports=d}),define("arale/validator/0.9.3/async",[],function(e,t,r){var n={};r.exports=n;var a=function(e,t){if(e.forEach)return e.forEach(t);for(var r=0;e.length>r;r+=1)t(e[r],r,e)},i=function(e,t){if(e.map)return e.map(t);var r=[];return a(e,function(e,n,a){r.push(t(e,n,a))}),r},l=function(e){if(Object.keys)return Object.keys(e);var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push(r);return t};n.nextTick="undefined"!=typeof process&&process.nextTick?process.nextTick:function(e){setTimeout(e,0)},n.forEach=function(e,t,r){if(r=r||function(){},!e.length)return r();var n=0;a(e,function(a){t(a,function(t){t?(r(t),r=function(){}):(n+=1,n===e.length&&r(null))})})},n.forEachSeries=function(e,t,r){if(r=r||function(){},!e.length)return r();var n=0,a=function(){t(e[n],function(t){t?(r(t),r=function(){}):(n+=1,n===e.length?r(null):a())})};a()};var u=function(e){return function(){var t=Array.prototype.slice.call(arguments);return e.apply(null,[n.forEach].concat(t))}},o=function(e){return function(){var t=Array.prototype.slice.call(arguments);return e.apply(null,[n.forEachSeries].concat(t))}},s=function(e,t,r,n){var a=[];t=i(t,function(e,t){return{index:t,value:e}}),e(t,function(e,t){r(e.value,function(r,n){a[e.index]=n,t(r)})},function(e){n(e,a)})};n.map=u(s),n.mapSeries=o(s),n.series=function(e,t){if(t=t||function(){},e.constructor===Array)n.mapSeries(e,function(e,t){e&&e(function(e){var r=Array.prototype.slice.call(arguments,1);1>=r.length&&(r=r[0]),t.call(null,e,r)})},t);else{var r={};n.forEachSeries(l(e),function(t,n){e[t](function(e){var a=Array.prototype.slice.call(arguments,1);1>=a.length&&(a=a[0]),r[t]=a,n(e)})},function(e){t(e,r)})}}}),define("arale/validator/0.9.3/utils",["$","arale/validator/0.9.3/rule"],function(require,exports,module){function unique(){return"__anonymous__"+u_count++}function parseRules(e){return e?e.match(/[a-zA-Z0-9\-\_]+(\{[^\{\}]*\})?/g):null}function parseDom(e){var e=$(e),t={},r=[],n=e.attr("required");n&&(r.push("required"),t.required=!0);var a=e.attr("type");if(a&&"submit"!=a&&"cancel"!=a&&"checkbox"!=a&&"radio"!=a&&"select"!=a&&"select-one"!=a&&"file"!=a&&"hidden"!=a&&"textarea"!=a){if(!Rule.getRule(a))throw Error('Form field with type "'+a+'" not supported!');r.push(a)}var i=e.attr("min");i&&r.push('min{"min":"'+i+'"}');var l=e.attr("max");l&&r.push("max{max:"+l+"}");var u=e.attr("minlength");u&&r.push("minlength{min:"+u+"}");var o=e.attr("maxlength");o&&r.push("maxlength{max:"+o+"}");var s=e.attr("pattern");if(s){var c=RegExp(s),f=unique();Rule.addRule(f,c),r.push(f)}var d=e.attr("data-rule");return d=d&&parseRules(d),d&&(r=r.concat(d)),t.rule=0==r.length?null:r.join(" "),t}function parseJSON(str){function getValue(str){return'"'==str.charAt(0)&&'"'==str.charAt(str.length-1)||"'"==str.charAt(0)&&"'"==str.charAt(str.length-1)?eval(str):str}if(!str)return null;var NOTICE='Invalid option object "'+str+'".';str=str.slice(1,-1);var result={},arr=str.split(",");return $.each(arr,function(e,t){if(arr[e]=$.trim(t),!arr[e])throw Error(NOTICE);var r=arr[e].split(":"),n=$.trim(r[0]),a=$.trim(r[1]);if(!n||!a)throw Error(NOTICE);result[getValue(n)]=$.trim(getValue(a))}),result}var $=require("$"),Rule=require("arale/validator/0.9.3/rule"),u_count=0,helpers={};module.exports={parseRule:function(e){var t=e.match(/([^{}:\s]*)(\{[^\{\}]*\})?/);return{name:t[1],param:parseJSON(t[2])}},parseRules:parseRules,parseDom:parseDom,helper:function(e,t){return t?(helpers[e]=t,this):helpers[e]}}}),define("arale/validator/0.9.3/rule",["$"],function(e,t,r){function n(e,t){var r=this;if(r.name=e,t instanceof RegExp)r.operator=function(e,r){var n=t.test(s(e.element).val());r(n?null:e.rule,i(e,n))};else{if(!s.isFunction(t))throw Error("The second argument must be a regexp or a function.");r.operator=function(e,r){var n=t(e,function(t,n){r(t?null:e.rule,n||i(e,t))});void 0!==n&&r(n?null:e.rule,i(e,n))}}}function a(e,t,r){return s.isPlainObject(e)?(s.each(e,function(e,t){s.isArray(t)?a(e,t[0],t[1]):a(e,t)}),this):(c[e]=t instanceof n?new n(e,t.operator):new n(e,t),l(e,r),this)}function i(e,t){var r,n=e.rule;return r=e.message?s.isPlainObject(e.message)?e.message[t?"success":"failure"]:t?"":e.message:f[n][t?"success":"failure"],r?o(e,r):r}function l(e,t){return s.isPlainObject(e)?(s.each(e,function(e,t){l(e,t)}),this):(f[e]=s.isPlainObject(t)?t:{failure:t},this)}function u(e,t){if(t){var r=c[e];return new n(null,function(e,n){r.operator(s.extend(null,e,t),n)})}return c[e]}function o(e,t){var r=t,n=/\{\{[^\{\}]*\}\}/g,a=/\{\{(.*)\}\}/,i=t.match(n);return i&&s.each(i,function(t,n){var i=n.match(a)[1],l=e[s.trim(i)];r=r.replace(n,l)}),r}var s=e("$"),c={},f={};n.prototype.and=function(e,t){var r=e instanceof n?e:u(e,t);if(!r)throw Error('No rule with name "'+e+'" found.');var a=this,l=function(e,t){a.operator(e,function(n){n?t(n,i(e,!n)):r.operator(e,t)})};return new n(null,l)},n.prototype.or=function(e,t){var r=e instanceof n?e:u(e,t);if(!r)throw Error('No rule with name "'+e+'" found.');var a=this,l=function(e,t){a.operator(e,function(n){n?r.operator(e,t):t(null,i(e,!0))})};return new n(null,l)},n.prototype.not=function(e){var t=u(this.name,e),r=function(e,r){t.operator(e,function(t){t?r(null,i(e,!0)):r(!0,i(e,!1))})};return new n(null,r)},a("required",function(e){var t=s(e.element),r=t.attr("type");switch(r){case"checkbox":case"radio":var n=!1;return t.each(function(e,t){return s(t).prop("checked")?(n=!0,!1):void 0}),n;default:return Boolean(t.val())}},"请输入{{display}}"),a("email",/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,"{{display}}的格式不正确"),a("text",/.*/),a("password",/.*/),a("radio",/.*/),a("checkbox",/.*/),a("url",/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,"{{display}}的格式不正确"),a("number",/^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/,"{{display}}的格式不正确"),a("date",/^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}年[01]?\d月[0-3]?\d[日号]$/,"{{display}}的格式不正确"),a("min",function(e){var t=e.element,r=e.min;return Number(t.val())>=Number(r)},"{{display}}必须大于或者等于{{min}}"),a("max",function(e){var t=e.element,r=e.max;return Number(t.val())<=Number(r)},"{{display}}必须小于或者等于{{max}}"),a("minlength",function(e){var t=e.element,r=t.val().length;return r>=Number(e.min)},"{{display}}的长度必须大于或等于{{min}}"),a("maxlength",function(e){var t=e.element,r=t.val().length;return Number(e.max)>=r},"{{display}}的长度必须小于或等于{{max}}"),a("mobile",/^1\d{10}$/,"请输入正确的{{display}}"),a("confirmation",function(e){var t=e.element,r=s(e.target);return t.val()==r.val()},"两次输入的{{display}}不一致，请重新输入"),r.exports={addRule:a,setMessage:l,getRule:u,getOperator:function(e){return c[e].operator}}}),define("arale/validator/0.9.3/item",["$","arale/validator/0.9.3/utils","arale/validator/0.9.3/rule","arale/widget/1.1.0/widget","arale/base/1.1.0/base","arale/class/1.1.0/class","arale/events/1.1.0/events","arale/validator/0.9.3/async"],function(e,t,r){function n(e){return e+="",e.charAt(0).toUpperCase()+e.slice(1)}function a(e,t,r,n,a){if(!t){var u=!1,c=e.attr("type");switch(c){case"checkbox":case"radio":var f=!1;e.each(function(e,t){return i(t).prop("checked")?(f=!0,!1):void 0}),u=f;break;default:u=!!e.val()}if(!u)return a&&a(null,null),void 0}if(!i.isArray(r))throw Error("No validation rule specified or not specified as an array.");var d=[];i.each(r,function(t,r){var a=l.parseRule(r),u=a.name,o=a.param,c=s.getOperator(u);if(!c)throw Error('Validation rule with name "'+u+'" cannot be found.');var f=i.extend({},o,{element:e,display:o&&o.display||n,rule:u});d.push(function(e){c(f,e)})}),o.series(d,function(e,t){a&&a(e,t[t.length-1])})}var i=e("$"),l=e("arale/validator/0.9.3/utils"),u=e("arale/widget/1.1.0/widget"),o=e("arale/validator/0.9.3/async"),s=e("arale/validator/0.9.3/rule"),c={value:i.noop,setter:function(e){return i.isFunction(e)?e:l.helper(e)}},f=u.extend({attrs:{rule:"",display:null,displayHelper:null,triggerType:{setter:function(e){if(!e)return e;var t=i(this.get("element")),r=t.attr("type"),n=t.is("select")||"radio"==r||"checkbox"==r;return n&&(e.indexOf("blur")>-1||e.indexOf("key")>-1)?"change":e}},required:!1,checkNull:!0,errormessage:null,onItemValidate:c,onItemValidated:c,showMessage:c,hideMessage:c},setup:function(){this.get("required")&&(!this.get("rule")||0>this.get("rule").indexOf("required"))&&this.set("rule","required "+this.get("rule")),!this.get("display")&&i.isFunction(this.get("displayHelper"))&&this.set("display",this.get("displayHelper")(this))},execute:function(e,t){var r=this;if(t=t||{},r.get("skipHidden")&&!r.element.is(":visible"))return e&&e(null,"",r.element),r;r.trigger("itemValidate",r.element,t.event);var i=l.parseRules(r.get("rule"));return i?(a(r.element,r.get("required"),i,r.get("display"),function(a,i){var l=a?r.get("errormessage")||r.get("errormessage"+n(a))||i:i;r.trigger("itemValidated",a,l,r.element,t.event),e&&e(a,l,r.element)}),r):(e&&e(null,"",r.element),r)}});r.exports=f});
