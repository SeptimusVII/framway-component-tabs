module.exports = function(){
    let Tabs = Object.getPrototypeOf(fw).Tabs = class Tabs extends fw.Component{
        static {
            this.debug = true;
            this.createdAt  = "3.0.0";
            this.lastUpdate = "3.0.0";
            this.version    = "2.0.0";
            this.tpl = utils.htmlToNode(require('bundle-tpl:./tabs.html')).outerHTML;
            // this.describe();
        }
        onCreate(){
        	this.nav = {
        		el: this.el.querySelector(':scope>.tabs__nav'),
        		buttons: this.el.querySelector(':scope>.tabs__nav').querySelectorAll(':scope>button:not(.exclude),:scope>.nav__button')
        	};
        	this.content = {
        		el: this.el.querySelector(':scope>.tabs__content'),
        		tabs: this.el.querySelectorAll(':scope>.tabs__content>.tab')
        	};
	        this.beforeChange = (this.beforeChange !== undefined) ? this.beforeChange : function(){
	    		this.log('beforeChange');
	        };
	        this.afterChange = (this.afterChange !== undefined)   ? this.afterChange  : function(){
	        	this.log('afterChange');
	        };

        	// init active state
        	if (!this.nav.el.querySelector('.active')) {
        		this.content.tabs.forEach((tab)=>{
        			tab.classList.remove('active')
        		})
        		this.nav.buttons[0].classList.add('active');
        		this.content.tabs[0].classList.add('active');
        	} else {
        		this.content.tabs.forEach((tab)=>{
        			tab.classList.remove('active')
        		})
        		this.content.tabs[this.getCurrentIndex()].classList.add('active')
        	}

        	// buttons events
        	this.nav.buttons.forEach((btn)=>{
    			btn.addEventListener('click',()=>{
    				Promise.resolve(this.beforeChange()).then(()=>{
	    				this.nav.buttons.forEach((b)=>{b.classList.remove('active'); })
	    				this.content.tabs.forEach((tab)=>{tab.classList.remove('active'); })
	    				btn.classList.add('active');
	    				this.content.tabs[this.getCurrentIndex()].classList.add('active');
	    				this.afterChange();
    				})
    				.catch(function(err){
    					console.log('Error on tabs change (tab '+btn.innerHTML.trim()+'): ',err);
    				})
    			})
        	})
        }

        getCurrentIndex(){
        	return this.nav.buttons.indexOf(this.nav.el.querySelector('.active'));
        }
    }
    return Tabs;
}