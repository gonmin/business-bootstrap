require('./index.css');

var templatePagination = require('./index.string');

import _mm from 'utils/util.js';

var Pagination = function () {
	var _this = this;
	this.defaultOption = {
		container: null,
		pageNum: 1,
		pageRange: 3,
		onSelectPage: null
	}

	// 事件绑定
	$(document).on('click', '.page-item', function () {
		var $this = $(this);
		// 对于active 和 disabled
		if ($this.hasClass('active') || $this.hasClass('disabled')) {
			return;
		}
		typeof _this.option.onSelectPage === 'function'
			? _this.option.onSelectPage($this.data('value')) : null;
	})
}
// 渲染分页插件
Pagination.prototype.render = function (userOption) {
	// 合并对象
	this.option = $.extend({}, this.defaultOption, userOption);
	// 判断容器是否为合法的jQuery对象
	if (!(this.option.container instanceof jQuery)) {
		return;
	}

	// 判断是否只有一页
	if (this.option.pages <= 1) {
		return;
	}

	// 渲染分页内容
	this.option.container.html(this.getPaginationHtml());
}

// 获取分页的html
Pagination.prototype.getPaginationHtml = function () {
	var html = '',
		option = this.option,
		pageArray = [],
		start = option.pageNum - this.option.pageRange > 0
		? option.pageNum - this.option.pageRange : 1,
		end = option.pageNum + option.pageRange < option.pages
		? option.pageNum + option.pageRange : option.pages;

	// 上一页循环的数据
	pageArray.push({
		name: '上一页',
		value: this.option.prePage,
		disabled: !this.option.hasPreviousPage
	});

	// 数字按钮的处理
	for (var i = start; i <= end; i++) {
		pageArray.push({
			name: i,
			value: i,
			active: (i === option.pageNum)
		});
	}

	// 下一页循环的数据
	pageArray.push({
		name: '下一页',
		value: this.option.nextPage,
		disabled: !this.option.hasNextPage
	});


	html = _mm.renderHtml(templatePagination, {
		pageArray: pageArray,
		pageNum: option.pageNum,
		pages: option.pages
	})

	return html;

}

export default Pagination;
