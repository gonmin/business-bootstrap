import './index.styl';

import '../common/nav/index.js';

import _mm from 'utils/util.js';

import productService from 'service/product-service.js';

import cartService from 'service/cart-service.js';

import templateString from './index.string';

let detail = {
    data: {

    },
    init () {
        this.bindEvent();
        this.loadDetail();
    },
    bindEvent () {
        $(document).on('mouseover', '.thumbnail-list li img', function () {
            let imgPath = $(this).attr('src');
            $('.big-img img').attr('src', imgPath);
            $(this).parent().addClass('active');
        })

        $(document).on('mouseout', '.thumbnail-list li img', function () {
            $(this).parent().removeClass('active');
        })

        // 增加购物车数量
        $(document).on('click', '.add', () => {
            let num = parseInt($('.cart-text').val());
            if (num >= this.data.detailInfo.stock) {
                return;
            }

            $('.cart-text').val(num + 1);
        })

        // 减少购物车数量
        $(document).on('click', '.descrease', () => {
            let num = parseInt($('.cart-text').val());
            if (num <= 1) {
                return;
            }

            $('.cart-text').val(num - 1);
        })

        // 减少购物车数量
        $(document).on('click', '.add-cart', () => {
            let count = $('.cart-text').val();
            let id = this.data.detailInfo.id;
            cartService.addCart(id, count, data => {
                window.location.href = './result.html?type=addcart';
            }, errMsg => {
                alert(errMsg);
            })
        })

    },
    loadDetail () {
        $('.product-detail-con').html('<div class="loading-animate1"></div>')
        let productId = _mm.getUrlParam('productId');
        productService.getProductDetail(productId, data => {
            this.data.detailInfo = data;
            let subImages = data.subImages.split(',');
            data.subImgArr = subImages;
            var detailHtml = _mm.renderHtml(templateString, {
                detail: data
            })
            $('.product-detail-con').html(detailHtml);
        }, errMsg => {
            let errtips = `<div class="alert alert-danger" role="alert">
              找不到商品了。
            </div>`;
            $('.product-detail-con').html(errtips);
        })
    }
}

$(function () {
    detail.init();
})
