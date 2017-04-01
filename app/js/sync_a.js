define(function() {
    var route = {
        '/require': 'AMD异步模块定义',
        '/layout': '测试合成gulp-file'
    }

    function setTitle() {
        var pathname = /\/\w+\./.exec(location.pathname)[0].split('.')[0]
        console.log(pathname)
        if (!route[pathname]) {
            return
        }
        document.title = route[pathname]
    }
    setTitle();
});