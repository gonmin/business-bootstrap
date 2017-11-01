import '../common/nav/index.js';

import './index.css';

import _mm from 'utils/util.js';

import Pagination from 'utils/pagination/index.js';



import productService from 'service/product-service.js';

import templateString from './index.string';

let list = {
    data: {
        listParam: {
            categoryId: _mm.getUrlParam('categoryId') || '',
            keyword: _mm.getUrlParam('keyword') || '',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 10,
            orderBy: _mm.getUrlParam('orderBy') || 'default'
        }
    },
    init () {
        this.loadList();
        this.bindEvent();
    },
    bindEvent () {
        const _this = this;
        $('.sort-box span').click(function (e) {
            if ($(this).hasClass('active')) {
                return;
            }

            _this.data.listParam.pageNum = 1;
            $(this).addClass('active')
            .siblings().removeClass('active');


            if ($(this).hasClass('default')) {
                _this.data.listParam.orderBy = 'default';
            } else if ($(this).hasClass('price-down')) {
                _this.data.listParam.orderBy = 'price_desc';
            } else if ($(this).hasClass('price-up')) {
                _this.data.listParam.orderBy = 'price_asc';
            }

            _this.loadList();


        })
    },
    loadList () {
        const _this = this;
        productService.getProductList(this.data.listParam, data => {
            var listHtml = _mm.renderHtml(templateString, {
                list: data.list
            })

            $('.product-box').html(listHtml);
            _this.loadPagination({
                hasPreviousPage: data.hasPreviousPage,
                prePage: data.prePage,
                hasNextPage: data.hasNextPage,
                nextPage: data.nextPage,
                pageNum: data.pageNum,
                pages: data.pages
            })
        }, errMsg => {

        })
    },
    // 加载分页信息
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo,{
            container: $('.pagination-nav'),
            onSelectPage: function (page) {
                _this.data.listParam.pageNum = page;
                _this.loadList();
            }
        }));
    }
}
$(function () {
    list.init();
})
