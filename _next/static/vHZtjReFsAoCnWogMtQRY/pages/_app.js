(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{0:function(e,t,n){n("GcxT"),e.exports=n("nOHt")},"1KBa":function(e,t,n){"use strict";function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var r=n("Ff2n"),s=n("q1tI"),o=n.n(s),i=n("YFqc"),c=n.n(i),l=o.a.createElement;t.a=function(e){var t=e.href,n=Object(r.a)(e,["href"]);return l(c.a,a({href:t,as:"".concat("/bestfetch").concat(t)},n))}},"1TCz":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return W}));var a=n("q1tI"),r=n.n(a),s=n("10ji"),o=n.n(s);function i(e){return(i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function l(){var e=Error.apply(this,arguments);e.name=this.name="CacheMissError",this.message=e.message,this.stack=e.stack}l.prototype=Object.create(Error.prototype,{constructor:{value:l,writable:!0,configurable:!0}});var u=["headers","ok","redirected","status","statusText","trailers","type","url","useFinalURL","data"];function f(e){var t={};return u.map((function(n){t[n]=e[n]})),t}var p={},v=function(){return!0},m={get:function(e){if(m.has(e)){var t=p[e];return t.accessCount+=1,t.lastAccessedAt=Date.now(),f(t.res)}},set:function(e,t){return p[e]={res:t,createdAt:Date.now(),accessCount:0,lastAccessedAt:null},m},has:function(e){return"undefined"!==typeof p[e]},delete:function(e){return!!m.has(e)&&(delete m[e],!0)},clear:function(){p={}},useCachedResponse:function(e){if("function"!==typeof e)throw new TypeError("The first argument to `responseCache.useCachedResponse()` must be a function.");accssFn=e}};var h={};function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.url,n=void 0===t?"":t,a=e.method,r=void 0===a?"":a,s=e.responseType,o=void 0===s?"":s,i=e.body,c=void 0===i?"":i;return[n,r.toUpperCase(),o,c].join("||")}var b={isRequestInFlight:function(e){var t=h[e];return!(!t||!t.length)&&Boolean(t.length)},clear:function(){h={}}};function y(e){var t=e.requestKey,n=e.res,a=e.err;(h[t]||[]).forEach((function(e){n?e.resolve(f(n)):e.reject(a)})),h[t]=null}var _=n("TdF3"),g=n.n(_),N=(n("Bxp/"),n("dLEc"),n("jAFw")),L=n.n(N),E=n("1KBa"),k=n("xI/i"),w=n.n(k),S=r.a.createElement;function C(){return S("header",{className:w.a.header},S(E.a,{href:"/",as:"/bestfetch/"},S("a",{className:w.a.logo},"\u2b50\ufe0f bestfetch")),S("a",{className:w.a.githubLink,href:"https://github.com/jamesplease/bestfetch"},"GitHub"))}var O=n("Ff2n"),I=n("nOHt"),T=r.a.createElement,A=function(e){var t=e.children,n=e.activeClassName,s=void 0===n?"active":n,o=Object(O.a)(e,["children","activeClassName"]),i=Object(I.useRouter)().pathname,c=a.Children.only(t),l=c.props.className||"",u=i===o.href?"".concat(l," ").concat(s).trim():l;return T(E.a,o,r.a.cloneElement(c,{className:u||null}))},R=n("4v7x"),x=n.n(R),j=r.a.createElement;function M(){return j("nav",{className:x.a.nav},j("ul",{className:x.a.navList},j("li",{className:x.a.navListItem},j(A,{activeClassName:"activeNavLink",href:"/"},j("a",{className:x.a.navSectionLink},"Home"))),j("li",{className:x.a.navListItem},j(A,{activeClassName:"activeNavLink",href:"/getting-started"},j("a",{className:x.a.navSectionLink},"Getting Started"))),j("li",{className:x.a.navListItem},j(A,{activeClassName:"activeNavLink",href:"/guides"},j("a",{className:x.a.navSectionLink},"Guides")),j("ul",{className:x.a.navSubList},j("li",{className:x.a.navSubListItem},j(A,{activeClassName:"activeNavLink",href:"/guides/making-requests"},j("a",{className:x.a.navLink},"Making Requests"))),j("li",{className:x.a.navSubListItem},j(A,{activeClassName:"activeNavLink",href:"/guides/caching-responses"},j("a",{className:x.a.navLink},"Caching Responses"))),j("li",{className:x.a.navSubListItem},j(A,{activeClassName:"activeNavLink",href:"/guides/invalidating-the-cache"},j("a",{className:x.a.navLink},"Invalidating the Cache"))),j("li",{className:x.a.navSubListItem},j(A,{activeClassName:"activeNavLink",href:"/guides/deduplicating-requests"},j("a",{className:x.a.navLink},"Deduplicating Requests"))),j("li",{className:x.a.navSubListItem},j(A,{activeClassName:"activeNavLink",href:"/guides/identical-requests"},j("a",{className:x.a.navLink},"Identical Requests"))),j("li",{className:x.a.navSubListItem},j(A,{activeClassName:"activeNavLink",href:"/guides/other-response-types"},j("a",{className:x.a.navLink},"Other Response Types"))),j("li",{className:x.a.navSubListItem},j(A,{activeClassName:"activeNavLink",href:"/guides/faq"},j("a",{className:x.a.navLink},"FAQ"))))),j("li",{className:x.a.navListItem},j(A,{activeClassName:"activeNavLink",href:"/api-reference"},j("a",{className:x.a.navSectionLink},"API")),j("ul",{className:"".concat(x.a.navSubList," ").concat(x.a.navApiSubList)},j("li",{className:x.a.navSubListItem},j(A,{activeClassName:"activeNavLink",href:"/api-reference/bestfetch"},j("a",{className:x.a.navLink},"bestfetch()"))),j("li",{className:x.a.navSubListItem},j(A,{activeClassName:"activeNavLink",href:"/api-reference/response-cache"},j("a",{className:x.a.navLink},"responseCache"))),j("li",{className:x.a.navSubListItem},j(A,{activeClassName:"activeNavLink",href:"/api-reference/cache-miss-error"},j("a",{className:x.a.navLink},"CacheMissError"))),j("li",{className:x.a.navSubListItem},j(A,{activeClassName:"activeNavLink",href:"/api-reference/active-requests"},j("a",{className:x.a.navLink},"activeRequests"))),j("li",{className:x.a.navSubListItem},j(A,{activeClassName:"activeNavLink",href:"/api-reference/get-request-key"},j("a",{className:x.a.navLink},"getRequestKey()")))))))}function P(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function U(e){return(U="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function q(e){return(q="function"===typeof Symbol&&"symbol"===U(Symbol.iterator)?function(e){return U(e)}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":U(e)})(e)}function D(e,t){return!t||"object"!==q(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function K(e){return(K=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var B=n("ykX2"),z=n.n(B),G=r.a.createElement,H=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),D(this,K(t).apply(this,arguments))}var n,a,r;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(t,e),n=t,(a=[{key:"render",value:function(){return G("footer",{className:z.a.footer},G("span",{className:z.a.footer_licenseText},"bestfetch is licensed under the"," ",G("a",{href:"https://github.com/jamesplease/bestfetch/blob/master/LICENSE",className:z.a.footer_licenseLink},"MIT License"),"."),G("span",{className:z.a.footer_licenseTextShort},G("i",{className:"zmdi zmdi-globe footer_icon"}),G("a",{href:"https://github.com/jamesplease/bestfetch/blob/master/LICENSE",className:"footer_licenseLink footer_licenseLink-short"},"MIT License")),G("a",{className:z.a.footer_githubLink,href:"https://github.com/jamesplease/bestfetch"},G("i",{className:"zmdi zmdi-github footer_icon"})," ",G("span",{className:z.a.footer_githubLinkText},"View Project on GitHub")))}}])&&P(n.prototype,a),r&&P(n,r),t}(a.Component),Z=r.a.createElement;function W(e){var t=e.Component,n=e.pageProps;return Z(r.a.Fragment,null,Z(C,null),Z("div",null,Z(M,null),Z("div",{className:L.a.bodyContents},Z(t,n),Z(H,null))))}o.a.registerLanguage("js",g.a),window.bestfetch=function(e,t){var n,a;"string"===typeof e?(n=e,a=t||{}):"object"===i(e)&&(n=(a=e||{}).url);var r,s=a,o=s.requestKey,u=s.responseType,p=void 0===u?"":u,b=s.dedupe,_=void 0===b||b,g=s.cachePolicy,N=c(s,["requestKey","responseType","dedupe","cachePolicy"]),L=(N.method||"").toUpperCase();r=g||("GET"===L||"OPTIONS"===L||"HEAD"===L||""===L?"cache-first":"network-only");var E,k=o||d({url:n,method:N.method||"",body:N.body||""});if("network-only"!==r){if(function(e){if(m.has(e)){m.get(e);var t=v();return t||m.delete(e),t}return!1}(k))return Promise.resolve(m.get(k));if("cache-only"===g){var w=new l("Response for fetch request not found in cache.");return Promise.reject(w)}}if(_){h[k]||(h[k]=[]);var S=h[k],C=Boolean(S.length),O={};if(E=new Promise((function(e,t){O.resolve=e,O.reject=t})),S.push(O),C)return E}var I=fetch(n,N).then((function(e){var t;return t=p instanceof Function?p(e):p||(204===e.status?"text":"json"),e[t]().then((function(t){if(e.data=t,m.set(k,e),!_)return f(e);y({requestKey:k,res:e})}),(function(){if(e.data=null,!_)return f(e);y({requestKey:k,res:e})}))}),(function(e){if(!_)return Promise.reject(e);y({requestKey:k,err:e})}));return _?E:I},window.CacheMissError=l,window.responseCache=m,window.activeRequests=b,window.getRequestKey=d},"4v7x":function(e,t,n){e.exports={nav:"nav_nav__2DIZA",navSubList:"nav_navSubList__1sPlE",navList:"nav_navList__1XQQy",navListItem:"nav_navListItem__2RyNo",navSubLink:"nav_navSubLink__2VtrR",navLink:"nav_navLink__1mlDR",navSectionLink:"nav_navSectionLink__1KpdU",navApiSubList:"nav_navApiSubList__15FUT",active:"nav_active__dfayY"}},"Bxp/":function(e,t,n){},Ff2n:function(e,t,n){"use strict";function a(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}n.d(t,"a",(function(){return a}))},GcxT:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n("1TCz")}])},TdF3:function(e,t){e.exports=function(e){var t="[A-Za-z$_][0-9A-Za-z$_]*",n={keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},a={className:"number",variants:[{begin:"\\b(0[bB][01]+)n?"},{begin:"\\b(0[oO][0-7]+)n?"},{begin:e.C_NUMBER_RE+"n?"}],relevance:0},r={className:"subst",begin:"\\$\\{",end:"\\}",keywords:n,contains:[]},s={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,r],subLanguage:"xml"}},o={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,r],subLanguage:"css"}},i={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,r]};r.contains=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,s,o,i,a,e.REGEXP_MODE];var c=r.contains.concat([e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]);return{aliases:["js","jsx"],keywords:n,contains:[{className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},{className:"meta",begin:/^#!/,end:/$/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,s,o,i,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,a,{begin:/[{,\n]\s*/,relevance:0,contains:[{begin:t+"\\s*:",returnBegin:!0,relevance:0,contains:[{className:"attr",begin:t,relevance:0}]}]},{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.REGEXP_MODE,{className:"function",begin:"(\\(.*?\\)|"+t+")\\s*=>",returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t},{begin:/\(\s*\)/},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:n,contains:c}]}]},{className:"",begin:/\s/,end:/\s*/,skip:!0},{begin:/</,end:/(\/[A-Za-z0-9\\._:-]+|[A-Za-z0-9\\._:-]+\/)>/,subLanguage:"xml",contains:[{begin:/<[A-Za-z0-9\\._:-]+\s*\/>/,skip:!0},{begin:/<[A-Za-z0-9\\._:-]+/,end:/(\/[A-Za-z0-9\\._:-]+|[A-Za-z0-9\\._:-]+\/)>/,skip:!0,contains:[{begin:/<[A-Za-z0-9\\._:-]+\s*\/>/,skip:!0},"self"]}]}],relevance:0},{className:"function",beginKeywords:"function",end:/\{/,excludeEnd:!0,contains:[e.inherit(e.TITLE_MODE,{begin:t}),{className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,contains:c}],illegal:/\[|%/},{begin:/\$[(.]/},e.METHOD_GUARD,{className:"class",beginKeywords:"class",end:/[{;=]/,excludeEnd:!0,illegal:/[:"\[\]]/,contains:[{beginKeywords:"extends"},e.UNDERSCORE_TITLE_MODE]},{beginKeywords:"constructor get set",end:/\{/,excludeEnd:!0}],illegal:/#(?!!)/}}},YFqc:function(e,t,n){e.exports=n("cTJO")},cTJO:function(e,t,n){"use strict";var a=n("lwsE"),r=n("W8MJ"),s=n("a1gu"),o=n("Nsbk"),i=n("7W2i"),c=n("TqRt"),l=n("284h");t.__esModule=!0,t.default=void 0;var u,f=l(n("q1tI")),p=n("QmWs"),v=n("g/15"),m=c(n("nOHt"));function h(e){return e&&"object"===typeof e?(0,v.formatWithValidation)(e):e}var d=new Map,b=window.IntersectionObserver,y={};function _(){return u||(b?u=new b((function(e){e.forEach((function(e){if(d.has(e.target)){var t=d.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(u.unobserve(e.target),d.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0)}var g=function(e){function t(e){var n;return a(this,t),(n=s(this,o(t).call(this,e))).p=void 0,n.cleanUpListeners=function(){},n.formatUrls=function(e){var t=null,n=null,a=null;return function(r,s){if(a&&r===t&&s===n)return a;var o=e(r,s);return t=r,n=s,a=o,o}}((function(e,t){return{href:h(e),as:t?h(t):t}})),n.linkClicked=function(e){var t=e.currentTarget,a=t.nodeName,r=t.target;if("A"!==a||!(r&&"_self"!==r||e.metaKey||e.ctrlKey||e.shiftKey||e.nativeEvent&&2===e.nativeEvent.which)){var s=n.formatUrls(n.props.href,n.props.as),o=s.href,i=s.as;if(function(e){var t=(0,p.parse)(e,!1,!0),n=(0,p.parse)((0,v.getLocationOrigin)(),!1,!0);return!t.host||t.protocol===n.protocol&&t.host===n.host}(o)){var c=window.location.pathname;o=(0,p.resolve)(c,o),i=i?(0,p.resolve)(c,i):o,e.preventDefault();var l=n.props.scroll;null==l&&(l=i.indexOf("#")<0),m.default[n.props.replace?"replace":"push"](o,i,{shallow:n.props.shallow}).then((function(e){e&&l&&(window.scrollTo(0,0),document.body.focus())}))}}},n.p=!1!==e.prefetch,n}return i(t,e),r(t,[{key:"componentWillUnmount",value:function(){this.cleanUpListeners()}},{key:"getPaths",value:function(){var e=window.location.pathname,t=this.formatUrls(this.props.href,this.props.as),n=t.href,a=t.as,r=(0,p.resolve)(e,n);return[r,a?(0,p.resolve)(e,a):r]}},{key:"handleRef",value:function(e){var t=this;this.p&&b&&e&&e.tagName&&(this.cleanUpListeners(),y[this.getPaths().join("%")]||(this.cleanUpListeners=function(e,t){var n=_();return n?(n.observe(e),d.set(e,t),function(){try{n.unobserve(e)}catch(t){console.error(t)}d.delete(e)}):function(){}}(e,(function(){t.prefetch()}))))}},{key:"prefetch",value:function(e){if(this.p){var t=this.getPaths();m.default.prefetch(t[0],t[1],e).catch((function(e){0})),y[t.join("%")]=!0}}},{key:"render",value:function(){var e=this,t=this.props.children,n=this.formatUrls(this.props.href,this.props.as),a=n.href,r=n.as;"string"===typeof t&&(t=f.default.createElement("a",null,t));var s=f.Children.only(t),o={ref:function(t){e.handleRef(t),s&&"object"===typeof s&&s.ref&&("function"===typeof s.ref?s.ref(t):"object"===typeof s.ref&&(s.ref.current=t))},onMouseEnter:function(t){s.props&&"function"===typeof s.props.onMouseEnter&&s.props.onMouseEnter(t),e.prefetch({priority:!0})},onClick:function(t){s.props&&"function"===typeof s.props.onClick&&s.props.onClick(t),t.defaultPrevented||e.linkClicked(t)}};return!this.props.passHref&&("a"!==s.type||"href"in s.props)||(o.href=r||a),f.default.cloneElement(s,o)}}]),t}(f.Component);t.default=g},dLEc:function(e,t,n){},jAFw:function(e,t,n){e.exports={bodyContents:"app_bodyContents__1IGMp"}},"xI/i":function(e,t,n){e.exports={header:"header_header__3w6qi",logo:"header_logo__25JoG",githubLink:"header_githubLink__1pmaw"}},ykX2:function(e,t,n){e.exports={footer:"footer_footer__1tNtI",footer_licenseIcon:"footer_footer_licenseIcon__3o2uN",footer_licenseLink:"footer_footer_licenseLink__dv4-a","focus-visible":"footer_focus-visible__3p-Ts","footer_licenseLink-short":"footer_footer_licenseLink-short__e16bu",footer_githubLink:"footer_footer_githubLink__U0tlu",footer_icon:"footer_footer_icon__cf8zQ",footer_licenseTextShort:"footer_footer_licenseTextShort__3u4Up",footer_licenseText:"footer_footer_licenseText__1WWRm"}}},[[0,0,1,2,3]]]);