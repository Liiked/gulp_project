define(['../components/mod_a', 'css!../../css/async.css'], function(mod) {
    console.log('is_login', is_login);
    mod.good()
    $('#app').text('成功')
    is_login = true
    var b = require(['sync_b'])
});