define(function(){var e={"/require":"AMD异步模块定义","/layout":"测试合成gulp-file","/router":"路由","/jq_in_require":"在require中使用jq"},i="";return{setTitle:function(r){if(i=/\/\w+\./.exec(r)[0].split(".")[0],console.log(i),e[i]){document.title=e[i];try{require(["business"+i])}catch(e){console.log(e)}}}}});
//# sourceMappingURL=maps/router.js.map
