import './index.styl';

import '../common/nav/index.js';

import _mm from 'utils/util.js';

import productService from 'service/product-service.js';

import templateString from './index.string';

let detail = {
    init () {
        this.bindEvent();
        this.loadDetail();
    },
    bindEvent () {

    },
    loadDetail () {
        let productId = _mm.getUrlParam('productId');
        productService.getProductDetail(productId, data => {
            var detailHtml = _mm.renderHtml(templateString, {
                detail: data
            })
            $('.product-detail-con').html(detailHtml);
        }, errMsg => {

        })
    }
}

$(function () {
    detail.init();
})
