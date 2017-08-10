module.exports = [{
	path: "/",
	component: function (resolve) {
    require(['./pages/homepage'], resolve);
  },
}];