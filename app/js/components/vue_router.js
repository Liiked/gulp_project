// 1. 定义（路由）组件。
const giveID = {
    template: '<div>Param{{ $route.params.id }}</div>',

}
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
const routes = [{
        path: '/giveID/:id',
        component: giveID,
        methods: {
            execBefore: function() {
                console.log('object');
            }
        }
    },
    { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    routes, // （缩写）相当于 routes: routes
    methods: {
        execBefore: function() {
            console.log('object');
        }
    }
})

const app = new Vue({
    router,
    methods: {
        execBefore: function() {
            console.log('object');
        }
    }
}).$mount('#app')


// Vue.component('my-cmp', {
//     template: '<router-link to="/giveID/Foo">Go to Foo</router-link><router-link to="/bar">Go to Bar</router-link><router-view></router-view>',
//     data: function() {
//         return titledata
//     },
//     methods: {
//         execBefore: function() {
//             console.log('object');
//         }
//     }
// })

// var bpp = new Vue({
//     el: '#bpp',
// })


router.beforeEach(function() {
    console.log('haha')
})

router


// 外部js实现
// function execBefore() {
//     $('a').on('click', function(event) {
//         event.preventDefault();
//         console.log('fff')

//     })
// }

// execBefore()