define(['jquery'],function(){
		//在可视区发送ajax请求
		//加载下来生成Dom
		//用瀑布流布局排列

		//接口：每次请求的图片的数量，是否resize
		function WaterFull() {
		   this.rowList = []
           this.wrap = $('.wrap')
           this.check = true
           this.content = $('#pic-ct')
           this.elShow = $('#load')
           this.curpage = 0
           this.flag = true
           this.settings = {
             pageCount: 10
           }
		}
		WaterFull.prototype.init = function(opt){
            $.extend(this.settings,opt)
            if(this.isShow(this.elShow)){
	            if(!this.flag) return
	            this.flag = false
            	this.sendHttp(this.renderDate)
            }
		}

		//判断是不是在视口内
		WaterFull.prototype.isShow = function($el){

			var offsetTop = $el.offset().top
	        var windowHeight = $(window).height()
	        var windowScroll = $(window).scrollTop()
	        var selfHeight = $el.outerHeight(true)
	        if( offsetTop < windowHeight + windowScroll && windowScroll < selfHeight + offsetTop){
	            return true
	        }else{
	            return false
	        }
		}
		//发送ajax请求
		WaterFull.prototype.sendHttp = function(callback){
			var This = this
			$.ajax({
						url: 'http://platform.sina.com.cn/slide/album_tech',
						dataType: 'jsonp',   
						jsonp:"jsoncallback",
						data: {
							app_key: '1271687855',
							num: this.perPageCount,
							page: this.settings.curPage
					}
				}).done(function(ret){ 
					if(ret.status.code==='0'){ 
						callback(ret.data,This)
						++This.curPage
						This.elShow.animate({'opacity': '1'},500)
				}
			})
		}
		WaterFull.prototype.renderDate = function(list,Obj){
	        $.each(list,function(idx,news){
	            var $node = Obj.createElement(news)
	            $node.find('img').on('load',function(){
	                Obj.content.append($node)
	                Obj.load($node)
	                Obj.flag = true
	            })
	        })

	    }
	    WaterFull.prototype.load = function($node){
	    	var This = this
			var len = parseInt(this.wrap.width()/$('.item').width())
			if(this.check){
				for(var i = 0; i<len;i++){
				   this.rowList[i] = 0
				}
			}
			this.check = false
			$node.each(function(){
				var minValue = Math.min.apply(null, This.rowList)//每列最小值
				var minIndex = This.rowList.indexOf(minValue)//最小值对应的位置
				$(this).css({
					top: This.rowList[minIndex],
					left: minIndex * $(this).outerWidth(true),
					opacity: 1
				})
				This.rowList[minIndex] += $(this).outerHeight(true)
				var maxValue = Math.max.apply(null, This.rowList)
				This.content.height(maxValue)
			})
	    }

	    WaterFull.prototype.createElement = function(obj){
		    var tpl = ''
	            tpl += '<li class="item">'
	            tpl += ' <a href='+ obj.url +'class="link"><img src=' + obj.img_url + ' alt=""></a>'
	            tpl += ' <h4 class=header>'+ obj.short_name +'</h4>'
	            tpl += '<p class=desp>'+ obj.short_intro+'</p>'
	            tpl += '</li>'
	        return $(tpl)
	    }

        // var p1 = new WaterFull()
        // p1.init({
        // 	pageCount: 10
        // })
        // $(window).on('scroll',function(){
	       //  p1.init({
	       //  	pageCount: 10
	       //  })
        // })
        return {
        	full: new WaterFull()
        }
})
