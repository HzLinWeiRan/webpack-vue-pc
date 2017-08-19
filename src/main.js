// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import 'element-ui/lib/theme-default/index.css'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
// import store from './store'
import api from './fetch/api'
import VeeValidate from 'vee-validate'
// import Hello from './components/Hello'

Vue.prototype.$api = api
Vue.use(VueRouter)
Vue.use(VeeValidate)

const routes = require('./routes.js')

const router = new VueRouter({ routes })

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
// store, //决定不使用vuex，vue够用
    router,
    render: h => h(App)
}).$mount('#app-box')

router.beforeEach(function (to, from, next) {
    /* store.commit('LOAD_ACTION', { isLoading: true }) */
    next()
})

router.afterEach(function (to) {
    /* var params = {}
    if (to.path === '/') {
        params.title = '首页'
        params.isHomePage = true
    } else {
        params.title = '子页面'
        params.isHomePage = false
    } */
})
