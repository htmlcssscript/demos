define(['jquery','components/banner','components/waterFull','components/top','components/tab'],function($,banner,waterFull,Top,Tab){
	//轮播
	banner.p1.init({
		speed: 2000
	})

	//瀑布流布局
	waterFull.full.init({
		pageCount: 5
	})

	waterFull.full.elShow.on('click',function(){
			waterFull.full.init({
			pageCount: 5
		})
	})

	// 回到顶部
	  Top.top.running()
	   $(window).on('scroll',function(){
	        Top.top.running()
	    })

	 //选项卡
	   Tab.tab.init({
	   	el: 'm-tab'
	   })

})