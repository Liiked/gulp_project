require.config({baseUrl:"../js",paths:{jquery:"https://cdn.bootcss.com/jquery/3.1.1/jquery.min",Vue:"https://cdn.bootcss.com/vue/2.2.4/vue",polyfill:"https://cdn.bootcss.com/babel-polyfill/7.0.0-alpha.1/polyfill",VueRouter:["https://cdn.bootcss.com/vue-router/2.3.0/vue-router","vendor/vue-router"],router:"router"},shim:{VueRouter:{deps:["Vue"],exports:"VueRouter"}}}),require.onError=function(e){console.warn(e)},require(["router"],function(e){e.setTitle(location.pathname)});