import _mm from 'utils/util.js';

let productService = {
    getProductList: function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    getProductDetail: function (productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
}

export default productService;
