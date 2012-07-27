define("#validator/0.8.5/async",[],function(e,t,n){var r={};n.exports=r;var i=function(e,t){if(e.forEach)return e.forEach(t);for(var n=0;n<e.length;n+=1)t(e[n],n,e)},s=function(e,t){if(e.map)return e.map(t);var n=[];return i(e,function(e,r,i){n.push(t(e,r,i))}),n},o=function(e){if(Object.keys)return Object.keys(e);var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t};typeof process=="undefined"||!process.nextTick?r.nextTick=function(e){setTimeout(e,0)}:r.nextTick=process.nextTick,r.forEach=function(e,t,n){n=n||function(){};if(!e.length)return n();var r=0;i(e,function(i){t(i,function(t){t?(n(t),n=function(){}):(r+=1,r===e.length&&n(null))})})},r.forEachSeries=function(e,t,n){n=n||function(){};if(!e.length)return n();var r=0,i=function(){t(e[r],function(t){t?(n(t),n=function(){}):(r+=1,r===e.length?n(null):i())})};i()};var u=function(e){return function(){var t=Array.prototype.slice.call(arguments);return e.apply(null,[r.forEach].concat(t))}},a=function(e){return function(){var t=Array.prototype.slice.call(arguments);return e.apply(null,[r.forEachSeries].concat(t))}},f=function(e,t,n,r){var i=[];t=s(t,function(e,t){return{index:t,value:e}}),e(t,function(e,t){n(e.value,function(n,r){i[e.index]=r,t(n)})},function(e){r(e,i)})};r.map=u(f),r.mapSeries=a(f),r.series=function(e,t){t=t||function(){};if(e.constructor===Array)r.mapSeries(e,function(e,t){e&&e(function(e){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),t.call(null,e,n)})},t);else{var n={};r.forEachSeries(o(e),function(t,r){e[t](function(e){var i=Array.prototype.slice.call(arguments,1);i.length<=1&&(i=i[0]),n[t]=i,r(e)})},function(e){t(e,n)})}}}),define("#validator/0.8.5/rule",["./async","$","#widget/0.9.16/widget","#base/0.9.16/base","#events/0.9.1/events","#class/0.9.2/class"],function(e,t,n){function f(e,t,n){if(r[e])throw new Error("The rule with the same name has existed and overriding a rule is not allowed!");t instanceof a?r[e]=new a(e,t.operator):r[e]=new a(e,t),c(e,n)}function l(e,t){var n=e.rule,r;return e.message?s.isPlainObject(e.message)?r=e.message[t?"success":"failure"]:r=t?"":e.message:r=i[n][t?"success":"failure"],r?d(e,r):r}function c(e,t){s.isPlainObject(t)?i[e]=t:i[e]={failure:t}}function h(e){return r[e].operator}function p(e,t){if(t){var n=r[e];return new a(null,function(e,r){n.operator(s.extend(null,e,t),r)})}return r[e]}function d(e,t){var n=t,r=/\{\{[^\{\}]*\}\}/g,i=/\{\{(.*)\}\}/,o=t.match(r);return o&&s.each(o,function(t,r){var o=r.match(i)[1],u=e[s.trim(o)];n=n.replace(r,u)}),n}var r={},i={},s=e("$"),o=e("./async"),u=e("#widget/0.9.16/widget"),a=u.extend({initialize:function(e,t){this.name=e;if(t instanceof RegExp)this.operator=function(e,n){var r=t.test(s(e.element).val());n(r?null:e.rule,l(e,r))};else{if(typeof t!="function")throw new Error("The second argument must be a regexp or a function.");this.operator=function(e,n){var r=t(e,n);r!==undefined&&n(r?null:e.rule,l(e,r))}}},and:function(e,t){if(e instanceof a)var n=e;else var n=p(e,t);if(!n)throw new Error('No rule with name "'+e+'" found.');var r=this,i=function(e,t){r.operator(e,function(r,i){r?t(r,l(e,!r)):n.operator(e,t)})};return new a(null,i)},or:function(e,t){if(e instanceof a)var n=e;else var n=p(e,t);if(!n)throw new Error('No rule with name "'+e+'" found.');var r=this,i=function(e,t){r.operator(e,function(r,i){r?n.operator(e,t):t(null,l(e,!0))})};return new a(null,i)},not:function(e){var t=p(this.name,e),n=function(e,n){t.operator(e,function(t,r){t?n(null,l(e,!0)):n(!0,l(e,!1))})};return new a(null,n)}});f("required",function(e){var t=s(e.element),n=t.attr("type");switch(n){case"checkbox":case"radio":var r=!1;return t.each(function(e,t){if(s(t).prop("checked"))return r=!0,!1}),r;default:return Boolean(t.val())}},"{{display}}不能为空。"),f("email",/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,"{{display}}的格式不正确。"),f("text",/.*/),f("password",/.*/),f("radio",/.*/),f("checkbox",/.*/),f("url",/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,"{{display}}的格式不正确。"),f("number",/^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/,"{{display}}的格式不正确。"),f("date",/^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}年[01]?\d月[0-3]?\d[日号]$/,"{{display}}的格式不正确。"),f("min",function(e){var t=e.element,n=e.min;return Number(t.val())>=Number(n)},"{{display}}必须大于或者等于{{min}}。"),f("max",function(e){var t=e.element,n=e.max;return Number(t.val())<=Number(n)},"{{display}}必须小于或者等于{{max}}。"),f("minlength",function(e){var t=e.element,n=t.val().length;return n>=Number(e.min)},"{{display}}的长度必须大于或等于{{min}}。"),f("maxlength",function(e){var t=e.element,n=t.val().length;return n<=Number(e.max)},"{{display}}长度必须小于或等于{{max}}。"),f("mobile",/^1\d{10}$/,"请输入正确的{{display}}。"),f("confirmation",function(e){var t=e.element,n=s(e.target);return t.val()==n.val()},"{{display}}的内容和{{name}}不同。"),n.exports={addRule:f,setMessage:c,getRule:p,getOperator:h}}),define("#validator/0.8.5/utils",["./async","./rule","$","#widget/0.9.16/widget","#base/0.9.16/base","#events/0.9.1/events","#class/0.9.2/class"],function(require,exports,module){function unique(){return"__anonymous__"+u_count++}function parseRule(e){var t=e.match(/([^{}:\s]*)(\{[^\{\}]*\})?/);return{name:t[1],param:parseJSON(t[2])}}function parseJSON(str){function getValue(str){return str[0]=='"'&&str[str.length-1]=='"'||str[0]=="'"&&str[str.length-1]=="'"?eval(str):str}if(!str)return null;var NOTICE='Invalid option object "'+str+'".';str=str.slice(1,-1);var result={},arr=str.split(",");return $.each(arr,function(e,t){arr[e]=$.trim(t);if(!arr[e])throw new Error(NOTICE);var n=arr[e].split(":"),r=$.trim(n[0]),i=$.trim(n[1]);if(!r||!i)throw new Error(NOTICE);result[getValue(r)]=$.trim(getValue(i))}),result}function parseRules(e){return e?e.match(/[a-zA-Z0-9\-\_]+(\{.*\})?/g):null}function parseDom(e){var e=$(e),t={},n=[],r=e.attr("required");r&&(n.push("required"),t.required=!0);var i=e.attr("type");if(i&&i!="submit"&&i!="cancel"&&i!="checkbox"&&i!="radio"&&i!="select"&&i!="select-one"&&i!="file"&&i!="hidden"){if(!Rule.getRule(i))throw new Error('Form field with type "'+i+'" not supported!');n.push(i)}var s=e.attr("min");s&&n.push('min{"min":"'+s+'"}');var o=e.attr("max");o&&n.push("max{max:"+o+"}");var u=e.attr("minlength");u&&n.push("minlength{min:"+u+"}");var a=e.attr("maxlength");a&&n.push("maxlength{max:"+a+"}");var f=e.attr("pattern");if(f){var l=new RegExp(f),c=unique();Rule.addRule(c,l),n.push(c)}var h=e.attr("data-rule");return h=h&&parseRules(h),h&&(n=n.concat(h)),t.rule=n.length==0?null:n.join(" "),t}function helper(e,t){return t?(helpers[e]=t,this):helpers[e]}var $=require("$"),Rule=require("./rule"),u_count=0,helpers={};module.exports={parseRule:parseRule,parseRules:parseRules,parseDom:parseDom,helper:helper}}),define("#validator/0.8.5/item",["./async","./rule","./utils","$","#widget/0.9.16/widget","#base/0.9.16/base","#events/0.9.1/events","#class/0.9.2/class"],function(e,t,n){function l(e){return e=String(e),e.charAt(0).toUpperCase()+e.slice(1)}function c(e,t,n,s,a){if(!t){var f=!1,l=e.attr("type");switch(l){case"checkbox":case"radio":var c=!1;e.each(function(e,t){if(r(t).prop("checked"))return c=!0,!1}),f=c;break;default:f=Boolean(e.val())}if(!f){a&&a(null,null);return}}if(!r.isArray(n))throw new Error("No validation rule specified or not specified as an array.");var h=[];r.each(n,function(t,n){var o=i.parseRule(n),a=o.name,f=o.param,l=u.getOperator(a);if(!l)throw new Error('Validation rule with name "'+a+'" cannot be found.');var c=r.extend({},f,{element:e,display:f&&f.display||s||r(e).attr("name"),rule:a});h.push(function(e){l(c,e)})}),o.series(h,function(e,t){a&&a(e,t[t.length-1])})}var r=e("$"),i=e("./utils"),s=e("#widget/0.9.16/widget"),o=e("./async"),u=e("./rule"),a={value:function(){},setter:function(e){return typeof e!="function"?i.helper(e):e}},f=s.extend({attrs:{rule:"",display:null,triggerType:{setter:function(e){if(!e)return e;var t=r(this.get("element")),n=t.attr("type"),i=t.get(0).tagName.toLowerCase().indexOf("select")>-1||n=="radio"||n=="checkbox";return i&&(e.indexOf("blur")>-1||e.indexOf("key")>-1)?"change":e}},required:!1,checkNull:!0,errormessage:null,onItemValidate:a,onItemValidated:a,showMessage:a,hideMessage:a},setup:function(){this.get("required")&&(!this.get("rule")||this.get("rule").indexOf("required")<0)&&this.set("rule","required "+this.get("rule"))},execute:function(e){this.trigger("itemValidate",this.element);var t=i.parseRules(this.get("rule")),n=this;return t?(c(this.element,this.get("required"),t,this.get("display"),function(t,r){if(t)var i=n.get("errormessage")||n.get("errormessage"+l(t))||r;else var i=r;n.trigger("itemValidated",t,i,n.element),e&&e(t,i,n.element)}),this):(e&&e(null,"",this.element),this)}});n.exports=f}),define("#validator/0.8.5/core",["./async","./rule","./utils","./item","$","#widget/0.9.16/widget","#base/0.9.16/base","#events/0.9.1/events","#class/0.9.2/class"],function(e,t,n){function h(e){var t=e.element.attr(c);return t||(t=e.cid,e.element.attr(c,t)),t}var r=e("$"),i=e("./async"),s=e("#widget/0.9.16/widget"),o=e("./utils"),u=e("./item"),a=[],f={value:function(){},setter:function(e){return typeof e!="function"?o.helper(e):e}},l=s.extend({attrs:{triggerType:"blur",checkOnSubmit:!0,stopOnError:!1,autoSubmit:!0,checkNull:!0,onItemValidate:f,onItemValidated:f,onFormValidate:f,onFormValidated:f,showMessage:f,hideMessage:f},setup:function(){this.element.attr("novalidate","novalidate"),this.items=[];var e=this;this.get("checkOnSubmit")&&this.element.submit(function(t){t.preventDefault(),e.execute(function(t){t||e.get("autoSubmit")&&e.element.get(0).submit()})}),this.on("formValidate",function(){var e=this;r.each(this.items,function(t,n){e.query(n.element).get("hideMessage").call(e,null,n.element)})}),this.on("itemValidated",function(e,t,n){e?this.query(n).get("showMessage").call(this,t,n):this.query(n).get("hideMessage").call(this,t,n)}),a.push(this)},Statics:r.extend({helper:o.helper},e("./rule"),{autoRender:function(e){var t=new this(e);r("input, textarea, select",t.element).each(function(e,n){n=r(n);var i=n.attr("type");if(i=="button"||i=="submit"||i=="reset")return!0;var s={};i=="radio"||i=="checkbox"?s.element=r("[type="+i+"][name="+n.attr("name")+"]",t.element):s.element=n;if(!t.query(s.element)){var u=o.parseDom(n);if(!u.rule)return!0;r.extend(s,u),t.addItem(s)}})},query:function(e){var t=r(e),n=null;return r.each(a,function(e,r){if(t.get(0)==r.element.get(0))return n=r,!1;var i=r.query(t);if(i)return n=i,!1}),n},validate:function(e){var t=r(e.element),n=new l({element:t.parents("form")});n.addItem(e),n.query(t).execute(),n.destroy()}}),addItem:function(e){var t=new u(r.extend({triggerType:this.get("triggerType"),checkNull:this.get("checkNull"),showMessage:this.get("showMessage"),hideMessage:this.get("hideMessage")},e));this.items.push(t),t.set("_handler",function(){if(!t.get("checkNull")&&!t.element.val())return;t.execute()});var n=t.get("triggerType");return n&&this.element.on(n,"["+c+"="+h(t)+"]",t.get("_handler")),t.on("all",function(e){this.trigger.apply(this,[].slice.call(arguments))},this),this},removeItem:function(e){var t=e instanceof u?e.element:r(e),n=this.items,i=this,s;return r.each(this.items,function(e,n){if(t.get(0)==n.element.get(0))return s=e,i.element.off(n.get("triggerType"),"["+c+"="+h(n)+"]",n.get("_handler")),n.destroy(),!1}),s!==undefined&&this.items.splice(s,1),this},execute:function(e){var t=this;this.trigger("formValidate",this.element);var n=function(n){t.trigger("formValidated",t.element,Boolean(n)),e&&e(Boolean(n))};if(this.get("stopOnError")){var s={};r.each(this.items,function(e,t){s[e]=function(e){t.execute(e)}}),i.series(s,n)}else i.forEach(this.items,function(e,t){e.execute(t)},n);return this},destroy:function(){this.element.unbind("submit");var e=this;r.each(this.items,function(t,n){e.removeItem(n)});var t;r.each(a,function(e,n){if(n==this)return t=e,!1}),a.splice(t,1),l.superclass.destroy.call(this)},query:function(e){var t=r(e);if(t.length==0||r(t,this.element).length==0)return null;var n=null;return r.each(this.items,function(e,r){if(t.get(0)==r.element.get(0))return n=r,!1}),n}}),c="data-validator-set";n.exports=l});