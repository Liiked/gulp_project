const router = new VueRouter({
    routes: [
        { path: '/a', redirect: '/b' }
    ]
})

var app = new Vue({
    router: router
}).$mount('#app')