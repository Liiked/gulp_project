// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
var Foo = { template: '<div>哈哈哈</div>' }
var Bar = { template: '<div>啦啦啦啦</div>' }
var User = {
    template: '<div class="user"><h2>User {{ $route.params.id }}</h2><router-view></router-view></div>'
}
var UserPorfile = { template: '' }
var UserPosts = { template: '' }
var UserHome = { template: '' }
    // 2. 定义路由
    // 每个路由应该映射一个组件。 其中"component" 可以是
    // 通过 Vue.extend() 创建的组件构造器，
    // 或者，只是一个组件配置对象。
    // 我们晚点再讨论嵌套路由。
    // var routes = [
    //     { path: '/foo', component: Foo },
    //     { path: '/bar', component: Bar },
    //     {
    //         path: '/user/:id',
    //         component: User,
    //         name: 'user',
    //         children: [
    //             { path: '', component: UserHome },
    //             {
    //                 path: 'profile',
    //                 component: UserPorfile
    //             },
    //             {
    //                 // 当 /user/:id/posts 匹配成功
    //                 // UserPosts 会被渲染在 User 的 <router-view> 中
    //                 path: 'posts',
    //                 component: UserPosts
    //             }
    //         ]
    //     }
    // ]
    // var routes = [{

//     path: '/',
//     components: {
//         defualt: Foo,
//         a: Bar,
//         b: UserPorfile
//     }

// }]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
var router = new VueRouter({
    routes: routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
var app = new Vue({
    router: router
}).$mount('#app')

// 现在，应用已经启动了！