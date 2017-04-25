var titledata = {
    title: '啦啦啦'
}

// 注册
Vue.component('my-head', {
    template: '<div>{{ title }}</div>',
    data: function() {
        return titledata
    },
    methods: {
        execBefore: function() {
            console.log(object);
        }
    }
})

var head = new Vue({
    el: '#head',

})