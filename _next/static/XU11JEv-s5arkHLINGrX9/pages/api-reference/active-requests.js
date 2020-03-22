(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"K+Lz":function(e,l,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/api-reference/active-requests",function(){return n("pYxW")}])},pYxW:function(e,l,n){"use strict";n.r(l);var u=n("q1tI"),t=n.n(u),s=n("10ji"),a=n.n(s),i=t.a.createElement;l.default=function(){return i("div",{className:"page"},i("h1",null,i("code",null,"activeRequests")),i("div",{className:"advanced"},i("span",{className:"emoji"},"\ud83d\udc81\u200d\u2640\ufe0f")," ",i("b",null,"Heads up!")," Most apps never need to use this object."),i("p",null,"An object for managing the active requests."),i(a.a,{language:"js",inline:!1,value:"import { activeRequests } from 'bestfetch';"}),i("p",null,i("code",null,"activeRequests")," has two methods:"),i("ul",null,i("li",null,i("b",null,i("code",null,"isRequestInFlight"))),i("li",null,i("b",null,i("code",null,"clear")))),i("h2",null,i("code",null,"isRequestInFlight")),i("p",null,"A method you can call to determine if a request is in flight for a given"," ",i("code",null,"requestKey"),"."),i("h3",null,"Arguments"),i("ol",null,i("li",null,i("b",null,i("code",null,"requestKey")),": The ",i("code",null,"requestKey")," to check.")),i("h3",null,"Returns"),i("p",null,"A ",i("code",null,"boolean")," representing whether or not a request is in flight for the specified ",i("code",null,"requestKey"),"."),i("h3",null,"Example Usage"),i(a.a,{language:"js",inline:!1,value:"activeRequests.isRequestInFlight('my-request-key')"}),i("h2",null,i("code",null,"clear")),i("p",null,"Removes tracking on all in-flight requests. In-flight requests are"," ",i("b",null,"not")," cancelled: calling this method only ensures that subsequent identical requests are not deduped."),i("h3",null,"Arguments"),i("p",null,"This method does not accept any arguments."),i("h3",null,"Returns"),i("p",null,"This method does not return anything."),i("h3",null,"Example Usage"),i(a.a,{language:"js",inline:!1,value:"activeRequests.clear()"}))}}},[["K+Lz",0,1,2]]]);