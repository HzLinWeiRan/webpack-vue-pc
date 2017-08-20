module.exports = [{
    path: '/',
    name: '首页',
    component: function(resolve) {
        require(['./pages/homepage'], resolve)
    }
}, {
    path: 'test1',
    name: 'test1',
    component: function(resolve) {
        require(['./pages/test1'], resolve)
    }
}]