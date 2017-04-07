define(function() {
    var route = {
        '/require': 'AMD异步模块定义',
        '/layout': '测试合成gulp-file',
        '/router': '路由',
        '/jq_in_require': '在require中使用jq',
    }

    var path = '',
        pathname = '';

    return {
        setTitle: function(path) {
            pathname = /\/\w+\./.exec(path)[0].split('.')[0]
            console.log(pathname)
            if (!route[pathname]) {
                return
            }
            document.title = route[pathname]
            try {
                require(['business' + pathname])
            } catch (error) {
                console.log(error)
            }
        }
    }

});