(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"1KBa":function(e,t,r){"use strict";function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var s=r("Ff2n"),o=r("q1tI"),a=r.n(o),i=r("YFqc"),c=r.n(i),l=a.a.createElement;t.a=function(e){var t=e.href,r=Object(s.a)(e,["href"]);return l(c.a,n({href:t,as:"".concat("/bestfetch").concat(t)},r))}},Ff2n:function(e,t,r){"use strict";function n(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r,n,s={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}r.d(t,"a",(function(){return n}))},RNiq:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return i}));var n=r("q1tI"),s=r.n(n),o=r("1KBa"),a=s.a.createElement;function i(){return a("div",{className:"page",style:{"--maxAppWidth":"1150px"}},a("div",{className:"hero"},a("h1",{className:"indexTitle"},"bestfetch"),a("div",{className:"badgeList"},a("a",{href:"https://travis-ci.org/jamesplease/bestfetch"},a("img",{src:"http://img.shields.io/travis/jamesplease/bestfetch.svg?style=flat",alt:"Travis build status"})),a("a",{href:"https://www.npmjs.com/package/bestfetch"},a("img",{src:"https://img.shields.io/npm/v/bestfetch.svg",alt:"npm version"})),a("a",{href:"https://coveralls.io/github/jamesplease/bestfetch?branch=master"},a("img",{src:"https://coveralls.io/repos/github/jamesplease/bestfetch/badge.svg?branch=master",alt:"Test Coverage"})),a("a",{href:"https://unpkg.com/bestfetch/lib/index.js"},a("img",{src:"http://img.badgesize.io/https://unpkg.com/bestfetch/lib/index.js?compression=gzip",alt:"gzip size"}))),a("div",{className:"heroProps"},a("div",{className:"heroPropContainer"},a("div",{className:"heroEmoji"},"\ud83c\udfce"),a("div",{className:"heroProp"},"Fast"),a("div",{className:"heroDescription"},"Speed up your app ",a("i",null,"considerably")," by caching responses. Only make network requests when you need to.")),a("div",{className:"heroPropContainer"},a("div",{className:"heroEmoji"},"\ud83d\udc2d"),a("div",{className:"heroProp"},"Small"),a("div",{className:"heroDescription"},"bestfetch is tiny but mighty. With its reasonable file size (",a("code",null,"<3kb")," gzipped) you can feel responsible adding it to an existing codebase."))),a("div",{className:"heroProps"},a("div",{className:"heroPropContainer"},a("div",{className:"heroEmoji"},"\u2699\ufe0f"),a("div",{className:"heroProp"},"Flexible"),a("div",{className:"heroDescription"},"bestfetch has great defaults that work for many apps. If something doesn't work for your use case, change it: bestfetch's flexible API keeps you in control.")),a("div",{className:"heroPropContainer"},a("div",{className:"heroEmoji"},"\u26a1\ufe0f"),a("div",{className:"heroProp"},"Efficient"),a("div",{className:"heroDescription"},"bestfetch is great for your users, too: many people worldwide browse the web on mobile phones with limited data plans. Use less of their data by leveraging bestfetch."))),a(o.a,{href:"/getting-started"},a("a",{className:"getStartedLink"},"Get Started"))))}},YFqc:function(e,t,r){e.exports=r("cTJO")},cTJO:function(e,t,r){"use strict";var n=r("lwsE"),s=r("W8MJ"),o=r("a1gu"),a=r("Nsbk"),i=r("7W2i"),c=r("TqRt"),l=r("284h");t.__esModule=!0,t.default=void 0;var p,f=l(r("q1tI")),h=r("QmWs"),u=r("g/15"),d=c(r("nOHt"));function v(e){return e&&"object"===typeof e?(0,u.formatWithValidation)(e):e}var m=new Map,g=window.IntersectionObserver,b={};function y(){return p||(g?p=new g((function(e){e.forEach((function(e){if(m.has(e.target)){var t=m.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(p.unobserve(e.target),m.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0)}var w=function(e){function t(e){var r;return n(this,t),(r=o(this,a(t).call(this,e))).p=void 0,r.cleanUpListeners=function(){},r.formatUrls=function(e){var t=null,r=null,n=null;return function(s,o){if(n&&s===t&&o===r)return n;var a=e(s,o);return t=s,r=o,n=a,a}}((function(e,t){return{href:v(e),as:t?v(t):t}})),r.linkClicked=function(e){var t=e.currentTarget,n=t.nodeName,s=t.target;if("A"!==n||!(s&&"_self"!==s||e.metaKey||e.ctrlKey||e.shiftKey||e.nativeEvent&&2===e.nativeEvent.which)){var o=r.formatUrls(r.props.href,r.props.as),a=o.href,i=o.as;if(function(e){var t=(0,h.parse)(e,!1,!0),r=(0,h.parse)((0,u.getLocationOrigin)(),!1,!0);return!t.host||t.protocol===r.protocol&&t.host===r.host}(a)){var c=window.location.pathname;a=(0,h.resolve)(c,a),i=i?(0,h.resolve)(c,i):a,e.preventDefault();var l=r.props.scroll;null==l&&(l=i.indexOf("#")<0),d.default[r.props.replace?"replace":"push"](a,i,{shallow:r.props.shallow}).then((function(e){e&&l&&(window.scrollTo(0,0),document.body.focus())}))}}},r.p=!1!==e.prefetch,r}return i(t,e),s(t,[{key:"componentWillUnmount",value:function(){this.cleanUpListeners()}},{key:"getPaths",value:function(){var e=window.location.pathname,t=this.formatUrls(this.props.href,this.props.as),r=t.href,n=t.as,s=(0,h.resolve)(e,r);return[s,n?(0,h.resolve)(e,n):s]}},{key:"handleRef",value:function(e){var t=this;this.p&&g&&e&&e.tagName&&(this.cleanUpListeners(),b[this.getPaths().join("%")]||(this.cleanUpListeners=function(e,t){var r=y();return r?(r.observe(e),m.set(e,t),function(){try{r.unobserve(e)}catch(t){console.error(t)}m.delete(e)}):function(){}}(e,(function(){t.prefetch()}))))}},{key:"prefetch",value:function(e){if(this.p){var t=this.getPaths();d.default.prefetch(t[0],t[1],e).catch((function(e){0})),b[t.join("%")]=!0}}},{key:"render",value:function(){var e=this,t=this.props.children,r=this.formatUrls(this.props.href,this.props.as),n=r.href,s=r.as;"string"===typeof t&&(t=f.default.createElement("a",null,t));var o=f.Children.only(t),a={ref:function(t){e.handleRef(t),o&&"object"===typeof o&&o.ref&&("function"===typeof o.ref?o.ref(t):"object"===typeof o.ref&&(o.ref.current=t))},onMouseEnter:function(t){o.props&&"function"===typeof o.props.onMouseEnter&&o.props.onMouseEnter(t),e.prefetch({priority:!0})},onClick:function(t){o.props&&"function"===typeof o.props.onClick&&o.props.onClick(t),t.defaultPrevented||e.linkClicked(t)}};return!this.props.passHref&&("a"!==o.type||"href"in o.props)||(a.href=s||n),f.default.cloneElement(o,a)}}]),t}(f.Component);t.default=w},vlRD:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r("RNiq")}])}},[["vlRD",0,1,3]]]);