define(['jquery'],function($){
		function Tab(){
			this.index = 0
			this.tab = null
			this.settings={

			}
		}
		Tab.prototype.init = function(opt){
			$.extend(this.settings,opt)
			this.tab = $('.'+this.settings.el)
			this.switchover()
		}
		Tab.prototype.switchover=function(){
			this.tab.on('click',function(e){
				if(e.target.tagName.toLowerCase() == 'li'){
				  Array.prototype.forEach.call(this.children,function($el){
				   $el.classList.remove('active')
				})
				   e.target.classList.add('active')
				}
			})
		}
		// var tab = new Tab()
		// 	tab.init({
		// 	el: 'm-tab'
		// })
		return {
			tab: new Tab()
		}
})