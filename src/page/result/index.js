import './index.styl';

import _mm from 'utils/util';

$(() => {
    let type = _mm.getUrlParam('type');

    $( `.${type}-success`).show();
})
