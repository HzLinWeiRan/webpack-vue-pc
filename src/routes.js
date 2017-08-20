module.exports = [{
    path: '/h',
    name: '首页',
    component: function(resolve) {
        require(['./pages/homepage'], resolve)
    },
    children: [{
        path: 'test1',
        name: 'test1',
        component: function(resolve) {
            require(['./pages/test1'], resolve)
        }
    }]
}, {
    path: '/test2',
    name: 'test2',
    component: resolve => require(['./pages/test2'], resolve)
}]