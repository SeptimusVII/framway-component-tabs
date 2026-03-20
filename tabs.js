module.exports = function(app){
	var Tabs = Object.getPrototypeOf(app).Tabs = new app.Component("tabs");
	// Tabs.debug = true;
	Tabs.createdAt      = "2.0.0";
	Tabs.lastUpdate     = "2.8.0";
	Tabs.version        = "1.1.0";
	// Tabs.factoryExclude = true;
	// Tabs.loadingMsg     = "This message will display in the console when component will be loaded.";
	Tabs.prototype.onCreate = function(){
		var tabs = this;
		tabs.nav = {$el : tabs.$el.find('.tabs__nav').first(),};
		tabs.content = {$el : tabs.$el.find('.tabs__content').first(),};
		// callbacks
        tabs.beforeChange = (tabs.beforeChange !== undefined) 	? tabs.beforeChange	: function(){tabs.log('beforeChange'); };
        tabs.afterChange  = (tabs.afterChange !== undefined)	? tabs.afterChange 	: function(){ tabs.log('afterChange'); };
        
		tabs.nav.buttons = tabs.nav.$el.find('button,.nav__button').not('.exclude');
		tabs.content.tabs = tabs.content.$el.find('.tab').filter(function(){
			return $(this).closest('.tabs__content').get(0) == tabs.content.$el.get(0);
		});


		if(!tabs.nav.buttons.hasClass('active')){
			// tabs.nav.buttons.first().trigger('click');
			tabs.nav.buttons.first().addClass('active');
			tabs.content.tabs.removeClass('active')
			$(tabs.content.tabs).first().addClass('active');
		}
		else{
			// tabs.nav.buttons.filter('.active').trigger('click');
			tabs.content.tabs.removeClass('active');
			$(tabs.content.tabs[tabs.nav.buttons.filter('.active').index()]).addClass('active');
		}

		return tabs;
	}

	Tabs.prototype.getCurrentIndex = function(){
		return this.nav.buttons.toArray().indexOf(this.nav.$el.get(0).querySelector('.active'));
	}

    $(function () {
        $('body').on('click', '.tabs__nav button:not(.exclude), .nav__button', function(e) {
        	let btn = this;
        	let tabs = $(btn).closest('.tabs').tabs('get'); 
        	Promise.resolve(tabs.beforeChange()).then(function(tab){
        		tabs.nav.buttons.removeClass('active');
        		tabs.content.tabs.removeClass('active');
        		$(btn).addClass('active');
        		$(tabs.content.tabs[tabs.getCurrentIndex()]).addClass('active');
        		tabs.afterChange();
        	})
        	.catch(function(err){
        		console.log('Error on tabs change (tab '+btn.innerHTML.trim()+'): ',err);
        	})
        });
    });

	return Tabs;
}

