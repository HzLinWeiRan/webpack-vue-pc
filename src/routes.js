module.exports = [{
    path: '/test10',
    name: 'test10',
    component: function(resolve) {
        require(['./pages/test10'], resolve)
    }
}, {
    path: 'test66',
    name: 'test66',
    component: function(resolve) {
        require(['./pages/' + data.fileName], resolve)
    }
}]