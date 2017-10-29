import '../common/nav/index.js';

import './index.css';

require('page/common/footer/index.css');

$(function () {
	var swiper = {
		init () {
			this.swiperEvent();
		},
		swiperEvent () {
			$('.carousel').carousel({
			  interval: 2500
			})

			$('.carousel-control-prev').click(function () {
				$('.carousel').carousel({
				  interval: 2500
				}).carousel('prev')
			})

			$('.carousel-control-next').click(function () {
				$('.carousel').carousel({
				  interval: 2500
				}).carousel('next')
			})

			$('.carousel-indicators li').click(function () {
				$('.carousel').carousel({
				  interval: 2500
				}).carousel($(this).data('slide-to'))
			})
		}
	}
	swiper.init();
})
