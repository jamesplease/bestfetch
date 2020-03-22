(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"4mpA":function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/guides/deduplicating-requests",function(){return o("SQy0")}])},Qetd:function(e,t,o){"use strict";var n=Object.assign.bind(Object);e.exports=n,e.exports.default=e.exports},SQy0:function(e,t,o){"use strict";o.r(t),o.d(t,"default",(function(){return u}));var n=o("q1tI"),s=o.n(n),l=o("10ji"),a=o.n(l),i=s.a.createElement;function u(){return i("div",{className:"page"},i("h1",null,"Deduplicating Requests"),i("p",null,"bestfetch automatically prevents multiple identical requests from being made at the same time. It will batch all identical requests into a single request and then reuse the response."),i("p",null,"This is best understood with an example. Consider the following fetch code:"),i(a.a,{language:"js",inline:!1,value:"fetch('/api/books/2')\n  .then(res => {\n    console.log('Received the book:', res);\n  });\n\nfetch('/api/books/2')\n  .then(res => {\n    console.log('Received the book:', res);\n  });"}),i("p",null,"This code makes two requests to the same exact endpoint, and, accordingly, two network requests are made. Because these requests are targeting the same exact endpoint, it would be more efficient to make just one network request. That's what bestfetch will do:"),i(a.a,{language:"js",inline:!1,value:"bestfetch('/api/books/2')\n  .then(res => {\n    console.log('Received the book:', res);\n  });\n\n// This request will \"piggy-back\" on the previous one;\n// a new network request is not made.\nbestfetch('/api/books/2')\n  .then(res => {\n    console.log('Received the book:', res);\n  });"}),i("h2",null,"What Makes a Request Identical?"),i("p",null,"This library looks at the following pieces of information about a request:"),i("ul",null,i("li",null,"The URL"),i("li",null,"The request body"),i("li",null,"The request method (i.e.; ",i("code",null,"GET"),")"),i("li",null,"The ",i("code",null,"responseType"))),i("p",null,"Requests are only deduped when ",i("b",null,"all")," of these things are identical between two or more requests."),i("h2",null,"When is This Useful?"),i("p",null,"The example code provided above may seem contrived. When would you ever make two requests back-to-back?"),i("p",null,"Consider an application that lets a user choose their country, where the list of countries is pulled from an API. You might choose to create a dropdown component that manages fetching its own list of countries."),i("p",null,"If you only have one of these dropdowns on the page at a time, then you should have no problems. But if you were to render two of these dropdowns at the same time, then they would each would make a request to fetch the same list of countries."),i("p",null,"One solution to avoid this inefficiency is hoist the call to fetch the countries outside of the dropdown, and then pass the response into the components. Sometimes, this solution is what is most appropriate."),i("p",null,"Other times, you may not wish to, or you may be unable to, move the network call. Using bestfetch allows you to keep the network call in the component without worrying about how many instances of the component are on the page at one time."),i("h2",null,"Disabling Deduplication"),i("p",null,"Pass ",i("code",null,"dedupe: false")," when calling ",i("code",null,"bestfetch")," to disable request deduplication for a particular request."),i(a.a,{language:"js",inline:!1,value:"bestfetch('/api/books/2', { dedupe: false })\n  .then(res => {\n    console.log('Received the book:', res);\n  });"}),i("h2",null,"Configuring the Deduplication Behavior"),i("div",{className:"advanced"},i("span",{className:"emoji"},"\ud83d\udc81\u200d\u2640\ufe0f")," ",i("b",null,"Heads up!")," This is an advanced API that very few applications should ever need to use. Be careful if you decide to use it in your app."),i("p",null,"In rare situations, you may wish to have control over when two requests are considered to be identical. You can do this by specifying a"," ",i("code",null,"requestKey")," when calling ",i("code",null,"bestfetch"),". A"," ",i("code",null,"requestKey")," is a string that bestfetch uses to determine when two requests are identical."),i("p",null,"When two requests have the same key, then they are deduped. Additionally, the request key is used to determine when to pull from the cache."),i("p",null,"By default, a ",i("code",null,"requestKey")," is generated for you, but you may pass your own to override this behavior."),i(a.a,{language:"js",inline:!1,value:"bestfetch('/api/books/2', { requestKey: 'my-custom-key' })\n  .then(res => {\n    console.log('Received the book:', res);\n  });"}))}}},[["4mpA",0,1,3]]]);