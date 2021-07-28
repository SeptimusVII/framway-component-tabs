module.exports = function(app){
	var Tabs = Object.getPrototypeOf(app).Tabs = new app.Component("tabs");
	// Tabs.debug = true;
	Tabs.createdAt      = "2.0.0";
	Tabs.lastUpdate     = "2.0.0";
	Tabs.version        = "1";
	// Tabs.factoryExclude = true;
	// Tabs.loadingMsg     = "This message will display in the console when component will be loaded.";
	Tabs.prototype.onCreate = function(){
		var tabs = this;
		tabs.nav = {$el : tabs.$el.children('.tabs__nav'),};
		tabs.content = {$el : tabs.$el.children('.tabs__content'),};

		tabs.nav.buttons = tabs.nav.$el.children('button');
		tabs.content.tabs = tabs.content.$el.children('.tab');

		tabs.nav.buttons.on('click',function(){
			tabs.nav.buttons.removeClass('active');
			tabs.content.tabs.removeClass('active');
			$(this).addClass('active');
			$(tabs.content.tabs[$(this).index()]).addClass('active');
		})
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
	}

	return Tabs;
}
