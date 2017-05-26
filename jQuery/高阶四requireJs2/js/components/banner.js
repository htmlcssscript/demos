define(['jquery'],function($){
		function Banner() {
	       	this.container = $('.container')
	       	this.banner = $('.banner>ul')
	       	this.prev = $('.prev')
	       	this.next = $('.next')
	       	this.btnLi = $('.btn>ul>li')
	       	this.imgW = this.banner.find('li').eq(0).outerWidth(true)
	       	this.btnPrev = $('.btn-prev')
	       	this.btnNext = $('.btn-next')
	        this.liLength = this.banner.find('li').length
	        this.iNow = 0
	        this.timer = null
	        this.settings = {

	        }
	      }
       //按钮显示/隐藏
       //点击按钮图片切换
       //点击小圆点图片切换
       //自动播放图片，移动到图片停止自动播放，拿开自动播放

       //初始化
       Banner.prototype.init = function(opt){
          var This = this

        	$.extend(this.settings,opt)

        	this.timer = setInterval(function(){
            This.self()
          },this.settings.speed)

        	this.banner.css({'width': this.imgW})
        	this.btn()
        	this.btnClick()
        	this.move()
       }
       //鼠标移入移出
       Banner.prototype.btn = function(){
       	  var This = this
	       	this.prev.on('mouseover',function(){ //z-index(prev)>z-index($btnPrev)
	            This.btnPrev.animate({'opacity': 1})
	        }).on('mouseout',function(){
	            This.btnPrev.animate({'opacity': 0})
	        })

	        this.next.on('mouseover',function(){
	            This.btnNext.animate({'opacity': 1})
	        }).on('mouseout',function(){
	            This.btnNext.animate({'opacity': 0})
	        })

	        this.next.on('click',function(){  //点击按钮切换图片
    				if(This.banner.is(':animated')) return 
    				  This.self()
	        })

	        this.prev.on('click',function(){
    				if(This.banner.is(':animated')) return 
    				 playPrev()
	        })
	        function playPrev(){
        			if(This.banner.is(':animated')) return
        				   --This.iNow
              This.btnChangeColor()
              This.banner.find('li').eq(This.iNow).animate({'opacity': 1})
              if(This.iNow<0){
                 This.iNow = This.liLength - 1
              }
              This.banner.find('li').eq(This.iNow+1).animate({'opacity': 0})
              }
            }
       //点击按钮切换图片
       Banner.prototype.self = function(){
				if(this.banner.is(':animated')) return
				this.iNow++
				if(this.iNow === this.liLength){
				   this.iNow = 0
				}
				this.banner.find('li').eq(this.iNow-1).animate({'opacity':'0'})
				this.banner.find('li').eq(this.iNow).animate({'opacity':'1'})
				this.btnChangeColor(this.iNow)
       }
       //点击按钮小圆点切换颜色
       Banner.prototype.btnChangeColor = function(){
	       	    this.btnLi.attr('class','')
	            this.btnLi.eq(this.iNow).attr('class','active')
       }

       Banner.prototype.btnClick = function(){
       	  var This = this
	       	this.btnLi.on('click',function(){
  				var $index = $(this).index()

  				This.banner.find('li').eq(This.iNow).animate({'opacity':'0'})

  				This.banner.find('li').eq($index).animate({'opacity': '1'})

  				This.btnLi.attr('class','') .eq($index).attr('class','active')

  				This.iNow = $index
	       	})
       }

       Banner.prototype.move = function(){
       	    var This = this

        			this.container[0].onmouseover=function(){
        			  clearInterval(This.timer)
        			}

        			this.container[0].onmouseout=function(){
        			  This.timer = setInterval(function(){
                  This.self()
                },This.settings.speed)
        			}
       }

       return {
       	p1: new Banner()
       }
})
