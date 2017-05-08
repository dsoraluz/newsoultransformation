!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,(e.braintree||(e.braintree={})).dataCollector=t()}}(function(){var t;return function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(i)return i(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var h=n[s]={exports:{}};t[s][0].call(h.exports,function(e){var n=t[s][1][e];return o(n?n:e)},h,h.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(t,e,n){!function(t){function n(){}function r(t,e){return function(){t.apply(e,arguments)}}function o(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],h(t,this)}function i(t,e){for(;3===t._state;)t=t._value;return 0===t._state?void t._deferreds.push(e):(t._handled=!0,void o._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?s:a)(e.promise,t._value);var r;try{r=n(t._value)}catch(o){return void a(e.promise,o)}s(e.promise,r)}))}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof o)return t._state=3,t._value=e,void c(t);if("function"==typeof n)return void h(r(n,e),t)}t._state=1,t._value=e,c(t)}catch(i){a(t,i)}}function a(t,e){t._state=2,t._value=e,c(t)}function c(t){2===t._state&&0===t._deferreds.length&&o._immediateFn(function(){t._handled||o._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;n>e;e++)i(t,t._deferreds[e]);t._deferreds=null}function u(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function h(t,e){var n=!1;try{t(function(t){n||(n=!0,s(e,t))},function(t){n||(n=!0,a(e,t))})}catch(r){if(n)return;n=!0,a(e,r)}}var f=setTimeout;o.prototype["catch"]=function(t){return this.then(null,t)},o.prototype.then=function(t,e){var r=new this.constructor(n);return i(this,new u(t,e,r)),r},o.all=function(t){var e=Array.prototype.slice.call(t);return new o(function(t,n){function r(i,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(t){r(i,t)},n)}e[i]=s,0===--o&&t(e)}catch(c){n(c)}}if(0===e.length)return t([]);for(var o=e.length,i=0;i<e.length;i++)r(i,e[i])})},o.resolve=function(t){return t&&"object"==typeof t&&t.constructor===o?t:new o(function(e){e(t)})},o.reject=function(t){return new o(function(e,n){n(t)})},o.race=function(t){return new o(function(e,n){for(var r=0,o=t.length;o>r;r++)t[r].then(e,n)})},o._immediateFn="function"==typeof setImmediate&&function(t){setImmediate(t)}||function(t){f(t,0)},o._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},o._setImmediateFn=function(t){o._immediateFn=t},o._setUnhandledRejectionFn=function(t){o._unhandledRejectionFn=t},"undefined"!=typeof e&&e.exports?e.exports=o:t.Promise||(t.Promise=o)}(this)},{}],2:[function(t,e,n){"use strict";function r(t){return function(){var e=arguments;setTimeout(function(){t.apply(null,e)},1)}}e.exports=r},{}],3:[function(t,e,n){"use strict";function r(t){var e=!1;return function(){e||(e=!0,t.apply(null,arguments))}}e.exports=r},{}],4:[function(t,e,n){"use strict";function r(t,e){return e?void t.then(function(t){e(null,t)})["catch"](function(t){e(t)}):t}e.exports=r},{}],5:[function(t,e,n){"use strict";function r(t){return function(){var e,n=Array.prototype.slice.call(arguments),r=n[n.length-1];return"function"==typeof r&&(e=n.pop(),e=i(o(e))),s(t.apply(this,n),e)}}var o=t("./lib/deferred"),i=t("./lib/once"),s=t("./lib/promise-or-callback");r.wrapPrototype=function(t,e){var n,o,i;return e=e||{},o=e.ignoreMethods||[],i=e.transformPrivateMethods===!0,n=Object.getOwnPropertyNames(t.prototype).filter(function(e){var n,r="constructor"!==e&&"function"==typeof t.prototype[e],s=-1===o.indexOf(e);return n=i?!0:"_"!==e.charAt(0),r&&n&&s}),n.forEach(function(e){var n=t.prototype[e];t.prototype[e]=r(n)}),t},e.exports=r},{"./lib/deferred":2,"./lib/once":3,"./lib/promise-or-callback":4}],6:[function(t,e,n){"use strict";var r=t("../lib/braintree-error");e.exports={DATA_COLLECTOR_KOUNT_NOT_ENABLED:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_KOUNT_NOT_ENABLED",message:"Kount is not enabled for this merchant."},DATA_COLLECTOR_KOUNT_ERROR:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_KOUNT_ERROR"},DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS",message:"Data Collector must be created with Kount and/or PayPal."}}},{"../lib/braintree-error":11}],7:[function(t,e,n){"use strict";function r(){return new o}function o(){this.sessionId=i(),this._beaconId=s(this.sessionId),this._parameterBlock=a(this.sessionId,this._beaconId),this._thirdPartyBlock=c()}function i(){var t,e="";for(t=0;32>t;t++)e+=Math.floor(16*Math.random()).toString(16);return e}function s(t){var e=(new Date).getTime()/1e3;return"https://b.stats.paypal.com/counter.cgi?i=127.0.0.1&p="+t+"&t="+e+"&a=14"}function a(t,e){var n=document.body.appendChild(document.createElement("script"));return n.type="application/json",n.setAttribute("fncls","fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99"),n.text=JSON.stringify({f:t,s:"BRAINTREE_SIGNIN",b:e}),n}function c(){function t(){n._l()}var e,n,r="https://www.paypalobjects.com/webstatic/r/fb/",o=document.createElement("iframe");o.src="about:blank",o.title="",o.role="presentation",(o.frameElement||o).style.cssText="width: 0; height: 0; border: 0; position: absolute; z-index: -999",document.body.appendChild(o);try{n=o.contentWindow.document}catch(i){e=document.domain,o.src='javascript:var d=document.open();d.domain="'+e+'";void(0);',n=o.contentWindow.document}return n.open()._l=function(){var t=this.createElement("script");e&&(this.domain=e),t.id="js-iframe-async",t.src=r+"fb-all-prod.pp.min.js",this.body.appendChild(t)},o.addEventListener?o.addEventListener("load",t,!1):o.attachEvent?o.attachEvent("onload",t):n.write('<body onload="document._l();">'),n.close(),o}o.prototype.teardown=function(){this._thirdPartyBlock.parentNode.removeChild(this._thirdPartyBlock)},e.exports={setup:r}},{}],8:[function(t,e,n){"use strict";function r(t){var e,n,r,c,u,d={},m=[],y=o(d,m);if(null==t.client)return f.reject(new a({type:l.INSTANTIATION_OPTION_REQUIRED.type,code:l.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating Data Collector."}));if(c=t.client.getConfiguration(),u=c.analyticsMetadata.sdkVersion,u!==h)return f.reject(new a({type:l.INCOMPATIBLE_VERSIONS.type,code:l.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+u+") and Data Collector (version "+h+") components must be from the same SDK version."}));if(t.kount===!0){if(!c.gatewayConfiguration.kount)return f.reject(new a(p.DATA_COLLECTOR_KOUNT_NOT_ENABLED));try{n=i.setup({environment:c.gatewayConfiguration.environment,merchantId:c.gatewayConfiguration.kount.kountMerchantId})}catch(v){return f.reject(new a({type:p.DATA_COLLECTOR_KOUNT_ERROR.type,code:p.DATA_COLLECTOR_KOUNT_ERROR.code,message:v.message}))}e=n.deviceData,m.push(n)}else e={};return t.paypal===!0&&(r=s.setup(),e.correlation_id=r.sessionId,m.push(r)),0===m.length?f.reject(new a(p.DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS)):(d.deviceData=JSON.stringify(e),d.teardown=y,f.resolve(d))}function o(t,e){return d(function(){return new f(function(n){var r;for(r=0;r<e.length;r++)e[r].teardown();u(t,c(t)),n()})})}var i=t("./kount"),s=t("./fraudnet"),a=t("../lib/braintree-error"),c=t("../lib/methods"),u=t("../lib/convert-methods-to-error"),h="3.14.0",f=t("../lib/promise"),d=t("wrap-promise"),l=t("../lib/errors"),p=t("./errors");e.exports={create:d(r),VERSION:h}},{"../lib/braintree-error":11,"../lib/convert-methods-to-error":13,"../lib/errors":15,"../lib/methods":16,"../lib/promise":17,"./errors":6,"./fraudnet":7,"./kount":9,"wrap-promise":5}],9:[function(t,e,n){"use strict";function r(t){var e=null!=t?t:{};return new o(e)}function o(t){i.random.startCollectors(),this._currentEnvironment=this._initializeEnvironment(t),this._deviceSessionId=this._generateDeviceSessionId(),this.deviceData=this._getDeviceData(),this._iframe=this._setupIFrame()}var i=t("./vendor/sjcl"),s=t("../lib/camel-case-to-snake-case"),a="https://assets.qa.braintreepayments.com/data",c="braintreeDataFrame",u={development:a,qa:a,sandbox:"https://assets.braintreegateway.com/sandbox/data",production:"https://assets.braintreegateway.com/data"};o.prototype.teardown=function(){i.random.stopCollectors(),this._removeIframe()},o.prototype._removeIframe=function(){this._iframe.parentNode.removeChild(this._iframe)},o.prototype._getDeviceData=function(){return s({deviceSessionId:this._deviceSessionId,fraudMerchantId:this._currentEnvironment.id})},o.prototype._generateDeviceSessionId=function(){var t,e;return t=i.random.randomWords(4,0),e=i.codec.hex.fromBits(t)},o.prototype._setupIFrame=function(){var t,e=this,n=document.getElementById(c);return null!=n?n:(t="?m="+this._currentEnvironment.id+"&s="+this._deviceSessionId,n=document.createElement("iframe"),n.width=1,n.id=c,n.height=1,n.frameBorder=0,n.scrolling="no",document.body.appendChild(n),setTimeout(function(){n.src=e._currentEnvironment.url+"/logo.htm"+t,n.innerHTML='<img src="'+e._currentEnvironment.url+"/logo.gif"+t+'" />'},10),n)},o.prototype._initializeEnvironment=function(t){var e=u[t.environment];if(null==e)throw new Error(t.environment+" is not a valid environment for kount.environment");return{url:e,name:t.environment,id:t.merchantId}},e.exports={setup:r,Kount:o,environmentUrls:u}},{"../lib/camel-case-to-snake-case":12,"./vendor/sjcl":10}],10:[function(e,n,r){"use strict";function o(t,e,n){if(4!==e.length)throw new f.exception.invalid("invalid aes block size");var r=t.b[n],o=e[0]^r[0],i=e[n?3:1]^r[1],s=e[2]^r[2];e=e[n?1:3]^r[3];var a,c,u,h,d=r.length/4-2,l=4,p=[0,0,0,0];a=t.l[n],t=a[0];var m=a[1],y=a[2],v=a[3],w=a[4];for(h=0;d>h;h++)a=t[o>>>24]^m[i>>16&255]^y[s>>8&255]^v[255&e]^r[l],c=t[i>>>24]^m[s>>16&255]^y[e>>8&255]^v[255&o]^r[l+1],u=t[s>>>24]^m[e>>16&255]^y[o>>8&255]^v[255&i]^r[l+2],e=t[e>>>24]^m[o>>16&255]^y[i>>8&255]^v[255&s]^r[l+3],l+=4,o=a,i=c,s=u;for(h=0;4>h;h++)p[n?3&-h:h]=w[o>>>24]<<24^w[i>>16&255]<<16^w[s>>8&255]<<8^w[255&e]^r[l++],a=o,o=i,i=s,s=e,e=a;return p}function i(t,e){var n,r,o,i=t.u,s=t.b,a=i[0],c=i[1],u=i[2],h=i[3],f=i[4],d=i[5],l=i[6],p=i[7];for(n=0;64>n;n++)16>n?r=e[n]:(r=e[n+1&15],o=e[n+14&15],r=e[15&n]=(r>>>7^r>>>18^r>>>3^r<<25^r<<14)+(o>>>17^o>>>19^o>>>10^o<<15^o<<13)+e[15&n]+e[n+9&15]|0),r=r+p+(f>>>6^f>>>11^f>>>25^f<<26^f<<21^f<<7)+(l^f&(d^l))+s[n],p=l,l=d,d=f,f=h+r|0,h=u,u=c,c=a,a=r+(c&u^h&(c^u))+(c>>>2^c>>>13^c>>>22^c<<30^c<<19^c<<10)|0;i[0]=i[0]+a|0,i[1]=i[1]+c|0,i[2]=i[2]+u|0,i[3]=i[3]+h|0,i[4]=i[4]+f|0,i[5]=i[5]+d|0,i[6]=i[6]+l|0,i[7]=i[7]+p|0}function s(t,e){var n,r=f.random.B[t],o=[];for(n in r)r.hasOwnProperty(n)&&o.push(r[n]);for(n=0;n<o.length;n++)o[n](e)}function a(t,e){"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?t.addEntropy(window.performance.now(),e,"loadtime"):t.addEntropy((new Date).valueOf(),e,"loadtime")}function c(t){t.b=u(t).concat(u(t)),t.C=new f.cipher.aes(t.b)}function u(t){for(var e=0;4>e&&(t.g[e]=t.g[e]+1|0,!t.g[e]);e++);return t.C.encrypt(t.g)}function h(t,e){return function(){e.apply(t,arguments)}}var f={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(t){this.toString=function(){return"CORRUPT: "+this.message},this.message=t},invalid:function(t){this.toString=function(){return"INVALID: "+this.message},this.message=t},bug:function(t){this.toString=function(){return"BUG: "+this.message},this.message=t},notReady:function(t){this.toString=function(){return"NOT READY: "+this.message},this.message=t}}};f.cipher.aes=function(t){this.l[0][0][0]||this.G();var e,n,r,o,i=this.l[0][4],s=this.l[1];e=t.length;var a=1;if(4!==e&&6!==e&&8!==e)throw new f.exception.invalid("invalid aes key size");for(this.b=[r=t.slice(0),o=[]],t=e;4*e+28>t;t++)n=r[t-1],(0===t%e||8===e&&4===t%e)&&(n=i[n>>>24]<<24^i[n>>16&255]<<16^i[n>>8&255]<<8^i[255&n],0===t%e&&(n=n<<8^n>>>24^a<<24,a=a<<1^283*(a>>7))),r[t]=r[t-e]^n;for(e=0;t;e++,t--)n=r[3&e?t:t-4],o[e]=4>=t||4>e?n:s[0][i[n>>>24]]^s[1][i[n>>16&255]]^s[2][i[n>>8&255]]^s[3][i[255&n]]},f.cipher.aes.prototype={encrypt:function(t){return o(this,t,0)},decrypt:function(t){return o(this,t,1)},l:[[[],[],[],[],[]],[[],[],[],[],[]]],G:function(){var t,e,n,r,o,i,s,a=this.l[0],c=this.l[1],u=a[4],h=c[4],f=[],d=[];for(t=0;256>t;t++)d[(f[t]=t<<1^283*(t>>7))^t]=t;for(e=n=0;!u[e];e^=r||1,n=d[n]||1)for(i=n^n<<1^n<<2^n<<3^n<<4,i=i>>8^255&i^99,u[e]=i,h[i]=e,o=f[t=f[r=f[e]]],s=16843009*o^65537*t^257*r^16843008*e,o=257*f[i]^16843008*i,t=0;4>t;t++)a[t][e]=o=o<<24^o>>>8,c[t][i]=s=s<<24^s>>>8;for(t=0;5>t;t++)a[t]=a[t].slice(0),c[t]=c[t].slice(0)}},f.bitArray={bitSlice:function(t,e,n){return t=f.bitArray.M(t.slice(e/32),32-(31&e)).slice(1),void 0===n?t:f.bitArray.clamp(t,n-e)},extract:function(t,e,n){var r=Math.floor(-e-n&31);return(-32&(e+n-1^e)?t[e/32|0]<<32-r^t[e/32+1|0]>>>r:t[e/32|0]>>>r)&(1<<n)-1},concat:function(t,e){if(0===t.length||0===e.length)return t.concat(e);var n=t[t.length-1],r=f.bitArray.getPartial(n);return 32===r?t.concat(e):f.bitArray.M(e,r,0|n,t.slice(0,t.length-1))},bitLength:function(t){var e=t.length;return 0===e?0:32*(e-1)+f.bitArray.getPartial(t[e-1])},clamp:function(t,e){if(32*t.length<e)return t;t=t.slice(0,Math.ceil(e/32));var n=t.length;return e=31&e,n>0&&e&&(t[n-1]=f.bitArray.partial(e,t[n-1]&2147483648>>e-1,1)),t},partial:function(t,e,n){return 32===t?e:(n?0|e:e<<32-t)+1099511627776*t},getPartial:function(t){return Math.round(t/1099511627776)||32},equal:function(t,e){if(f.bitArray.bitLength(t)!==f.bitArray.bitLength(e))return!1;var n,r=0;for(n=0;n<t.length;n++)r|=t[n]^e[n];return 0===r},M:function(t,e,n,r){var o;for(o=0,void 0===r&&(r=[]);e>=32;e-=32)r.push(n),n=0;if(0===e)return r.concat(t);for(o=0;o<t.length;o++)r.push(n|t[o]>>>e),n=t[o]<<32-e;return o=t.length?t[t.length-1]:0,t=f.bitArray.getPartial(o),r.push(f.bitArray.partial(e+t&31,e+t>32?n:r.pop(),1)),r},Y:function(t,e){return[t[0]^e[0],t[1]^e[1],t[2]^e[2],t[3]^e[3]]},byteswapM:function(t){var e,n;for(e=0;e<t.length;++e)n=t[e],t[e]=n>>>24|n>>>8&65280|(65280&n)<<8|n<<24;return t}},f.codec.utf8String={fromBits:function(t){var e,n,r="",o=f.bitArray.bitLength(t);for(e=0;o/8>e;e++)0===(3&e)&&(n=t[e/4]),r+=String.fromCharCode(n>>>24),n<<=8;return decodeURIComponent(escape(r))},toBits:function(t){t=unescape(encodeURIComponent(t));var e,n=[],r=0;for(e=0;e<t.length;e++)r=r<<8|t.charCodeAt(e),3===(3&e)&&(n.push(r),r=0);return 3&e&&n.push(f.bitArray.partial(8*(3&e),r)),n}},f.codec.hex={fromBits:function(t){var e,n="";for(e=0;e<t.length;e++)n+=((0|t[e])+0xf00000000000).toString(16).substr(4);return n.substr(0,f.bitArray.bitLength(t)/4)},toBits:function(t){var e,n,r=[];for(t=t.replace(/\s|0x/g,""),n=t.length,t+="00000000",e=0;e<t.length;e+=8)r.push(0^parseInt(t.substr(e,8),16));return f.bitArray.clamp(r,4*n)}},f.hash.sha256=function(t){this.b[0]||this.G(),t?(this.u=t.u.slice(0),this.o=t.o.slice(0),this.h=t.h):this.reset()},f.hash.sha256.hash=function(t){return(new f.hash.sha256).update(t).finalize()},f.hash.sha256.prototype={blockSize:512,reset:function(){return this.u=this.K.slice(0),this.o=[],this.h=0,this},update:function(t){"string"==typeof t&&(t=f.codec.utf8String.toBits(t));var e,n=this.o=f.bitArray.concat(this.o,t);if(e=this.h,t=this.h=e+f.bitArray.bitLength(t),t>9007199254740991)throw new f.exception.invalid("Cannot hash more than 2^53 - 1 bits");if("undefined"!=typeof Uint32Array){var r=new Uint32Array(n),o=0;for(e=512+e-(512+e&511);t>=e;e+=512)i(this,r.subarray(16*o,16*(o+1))),o+=1;n.splice(0,16*o)}else for(e=512+e-(512+e&511);t>=e;e+=512)i(this,n.splice(0,16));return this},finalize:function(){var t,e=this.o,n=this.u,e=f.bitArray.concat(e,[f.bitArray.partial(1,1)]);for(t=e.length+2;15&t;t++)e.push(0);for(e.push(Math.floor(this.h/4294967296)),e.push(0|this.h);e.length;)i(this,e.splice(0,16));return this.reset(),n},K:[],b:[],G:function(){function t(t){return 4294967296*(t-Math.floor(t))|0}for(var e,n,r=0,o=2;64>r;o++){for(n=!0,e=2;o>=e*e;e++)if(0===o%e){n=!1;break}n&&(8>r&&(this.K[r]=t(Math.pow(o,.5))),this.b[r]=t(Math.pow(o,1/3)),r++)}}},f.prng=function(t){this.c=[new f.hash.sha256],this.i=[0],this.H=0,this.v={},this.F=0,this.J={},this.L=this.f=this.j=this.T=0,this.b=[0,0,0,0,0,0,0,0],this.g=[0,0,0,0],this.C=void 0,this.D=t,this.s=!1,this.B={progress:{},seeded:{}},this.m=this.S=0,this.w=1,this.A=2,this.O=65536,this.I=[0,48,64,96,128,192,256,384,512,768,1024],this.P=3e4,this.N=80},f.prng.prototype={randomWords:function(t,e){var n,r=[];n=this.isReady(e);var o;if(n===this.m)throw new f.exception.notReady("generator isn't seeded");if(n&this.A){n=!(n&this.w),o=[];var i,s=0;for(this.L=o[0]=(new Date).valueOf()+this.P,i=0;16>i;i++)o.push(4294967296*Math.random()|0);for(i=0;i<this.c.length&&(o=o.concat(this.c[i].finalize()),s+=this.i[i],this.i[i]=0,n||!(this.H&1<<i));i++);for(this.H>=1<<this.c.length&&(this.c.push(new f.hash.sha256),this.i.push(0)),this.f-=s,s>this.j&&(this.j=s),this.H++,this.b=f.hash.sha256.hash(this.b.concat(o)),this.C=new f.cipher.aes(this.b),n=0;4>n&&(this.g[n]=this.g[n]+1|0,!this.g[n]);n++);}for(n=0;t>n;n+=4)0===(n+1)%this.O&&c(this),o=u(this),r.push(o[0],o[1],o[2],o[3]);return c(this),r.slice(0,t)},setDefaultParanoia:function(t,e){if(0===t&&"Setting paranoia=0 will ruin your security; use it only for testing"!==e)throw new f.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");this.D=t},addEntropy:function(t,e,n){n=n||"user";var r,o,i=(new Date).valueOf(),a=this.v[n],c=this.isReady(),u=0;switch(r=this.J[n],void 0===r&&(r=this.J[n]=this.T++),void 0===a&&(a=this.v[n]=0),this.v[n]=(this.v[n]+1)%this.c.length,typeof t){case"number":void 0===e&&(e=1),this.c[a].update([r,this.F++,1,e,i,1,0|t]);break;case"object":if(n=Object.prototype.toString.call(t),"[object Uint32Array]"===n){for(o=[],n=0;n<t.length;n++)o.push(t[n]);t=o}else for("[object Array]"!==n&&(u=1),n=0;n<t.length&&!u;n++)"number"!=typeof t[n]&&(u=1);if(!u){if(void 0===e)for(n=e=0;n<t.length;n++)for(o=t[n];o>0;)e++,o>>>=1;this.c[a].update([r,this.F++,2,e,i,t.length].concat(t))}break;case"string":void 0===e&&(e=t.length),this.c[a].update([r,this.F++,3,e,i,t.length]),this.c[a].update(t);break;default:u=1}if(u)throw new f.exception.bug("random: addEntropy only supports number, array of numbers or string");this.i[a]+=e,this.f+=e,c===this.m&&(this.isReady()!==this.m&&s("seeded",Math.max(this.j,this.f)),s("progress",this.getProgress()))},isReady:function(t){return t=this.I[void 0!==t?t:this.D],this.j&&this.j>=t?this.i[0]>this.N&&(new Date).valueOf()>this.L?this.A|this.w:this.w:this.f>=t?this.A|this.m:this.m},getProgress:function(t){return t=this.I[t?t:this.D],this.j>=t?1:this.f>t?1:this.f/t},startCollectors:function(){if(!this.s){if(this.a={loadTimeCollector:h(this,this.V),mouseCollector:h(this,this.W),keyboardCollector:h(this,this.U),accelerometerCollector:h(this,this.R),touchCollector:h(this,this.X)},window.addEventListener)window.addEventListener("load",this.a.loadTimeCollector,!1),window.addEventListener("mousemove",this.a.mouseCollector,!1),window.addEventListener("keypress",this.a.keyboardCollector,!1),window.addEventListener("devicemotion",this.a.accelerometerCollector,!1),window.addEventListener("touchmove",this.a.touchCollector,!1);else{if(!document.attachEvent)throw new f.exception.bug("can't attach event");document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector)}this.s=!0}},stopCollectors:function(){this.s&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,!1),window.removeEventListener("mousemove",this.a.mouseCollector,!1),window.removeEventListener("keypress",this.a.keyboardCollector,!1),window.removeEventListener("devicemotion",this.a.accelerometerCollector,!1),window.removeEventListener("touchmove",this.a.touchCollector,!1)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.s=!1)},addEventListener:function(t,e){this.B[t][this.S++]=e},removeEventListener:function(t,e){var n,r,o=this.B[t],i=[];for(r in o)o.hasOwnProperty(r)&&o[r]===e&&i.push(r);for(n=0;n<i.length;n++)r=i[n],delete o[r]},U:function(){a(this,1)},W:function(t){var e,n;try{e=t.x||t.clientX||t.offsetX||0,n=t.y||t.clientY||t.offsetY||0}catch(r){n=e=0}0!=e&&0!=n&&this.addEntropy([e,n],2,"mouse"),a(this,0)},X:function(t){t=t.touches[0]||t.changedTouches[0],this.addEntropy([t.pageX||t.clientX,t.pageY||t.clientY],1,"touch"),a(this,0)},V:function(){a(this,2)},R:function(t){if(t=t.accelerationIncludingGravity.x||t.accelerationIncludingGravity.y||t.accelerationIncludingGravity.z,window.orientation){var e=window.orientation;"number"==typeof e&&this.addEntropy(e,1,"accelerometer")}t&&this.addEntropy(t,2,"accelerometer"),a(this,0)}},f.random=new f.prng(6);t:try{var d,l,p,m;if(m="undefined"!=typeof n&&n.exports){var y;try{y=e("crypto")}catch(v){y=null}m=l=y}if(m&&l.randomBytes)d=l.randomBytes(128),d=new Uint32Array(new Uint8Array(d).buffer),f.random.addEntropy(d,1024,"crypto['randomBytes']");else if("undefined"!=typeof window&&"undefined"!=typeof Uint32Array){if(p=new Uint32Array(32),window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(p);else{if(!window.msCrypto||!window.msCrypto.getRandomValues)break t;window.msCrypto.getRandomValues(p)}f.random.addEntropy(p,1024,"crypto['getRandomValues']")}}catch(v){"undefined"!=typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(v))}"undefined"!=typeof n&&n.exports&&(n.exports=f),"function"==typeof t&&t([],function(){return f})},{crypto:void 0}],11:[function(t,e,n){"use strict";function r(t){if(!r.types.hasOwnProperty(t.type))throw new Error(t.type+" is not a valid type.");if(!t.code)throw new Error("Error code required.");if(!t.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=t.code,this.message=t.message,this.type=t.type,this.details=t.details}var o=t("./enumerate");r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r.types=o(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),r.findRootError=function(t){return t instanceof r&&t.details&&t.details.originalError?r.findRootError(t.details.originalError):t},e.exports=r},{"./enumerate":14}],12:[function(t,e,n){"use strict";function r(t){return t.replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g,"$1_$2").toLowerCase()}e.exports=function(t){return Object.keys(t).reduce(function(e,n){var o=r(n);return e[o]=t[n],e},{})}},{}],13:[function(t,e,n){"use strict";var r=t("./braintree-error"),o=t("./errors");e.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":11,"./errors":15}],14:[function(t,e,n){"use strict";function r(t,e){return e=null==e?"":e,t.reduce(function(t,n){return t[n]=e+n,t},{})}e.exports=r},{}],15:[function(t,e,n){"use strict";var r=t("./braintree-error");e.exports={CALLBACK_REQUIRED:{type:r.types.MERCHANT,code:"CALLBACK_REQUIRED"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INVALID_OPTION:{type:r.types.MERCHANT,code:"INVALID_OPTION"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"},BRAINTREE_API_ACCESS_RESTRICTED:{type:r.types.MERCHANT,code:"BRAINTREE_API_ACCESS_RESTRICTED",message:"Your access is restricted and cannot use this part of the Braintree API."}}},{"./braintree-error":11}],16:[function(t,e,n){"use strict";e.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],17:[function(t,e,n){(function(n){"use strict";var r=n.Promise||t("promise-polyfill");e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":1}]},{},[8])(8)});