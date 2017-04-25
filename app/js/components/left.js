var left = {
    template: '<ul><li v-for="item in arr">{{item}}</li></ul>'
}

var data = {
    arr: ['测试哈哈', '火星', '地球'],
    current: ''
}

Vue.component('my-left', {
    template: '<ul><li v-for="item in arr" @click="pushstats($event)">{{item}}</li></ul>',
    data: function() {
        return data
    },
    methods: {
        pushstats: function(e) {
            var text = e.target.childNodes[0]
            console.log(text.length)
            console.log(typeof text)
            titledata.title = text
        }
    }
})

var b = new Vue({
    el: '#left'
})

// var a = new Vue({
//     components: {
//         'left': left
//     },
//     el: '#left',
//     data: function() {
//         return data
//     }
// })