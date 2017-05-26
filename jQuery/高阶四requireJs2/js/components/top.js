define(['jquery'],function($){
	   function Run(){
           this.scrollTop = 0
           this.Eltop = $('.top')
           this.back()
        }

        Run.prototype.running = function(){
            document.title = $(window).scrollTop()
            this.scrollTop = $(window).scrollTop()
            if(this.scrollTop > 600){
               console.log(1)
                this.Eltop.slideDown()
                console.log(1)
            }else if(this.scrollTop<600){
                this.Eltop.slideUp()
            }
        }
        Run.prototype.back = function(){
        	this.Eltop.on('click',function(){
        		console.log(1)
        		$('html,body').animate({scrollTop:'0'},800); 
        	})
        }
        // var run = new Run()
        // $(window).on('scroll',function(){
        //     run.running()
        // })
        return {
        	top: new Run()
        }
})