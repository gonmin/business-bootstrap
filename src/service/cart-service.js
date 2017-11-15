import _mm from 'utils/util.js';

let cartService = {
    addCart: function (productId, count, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/add.do'),
            data: {
                productId,
                count
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
}

export default cartService;
