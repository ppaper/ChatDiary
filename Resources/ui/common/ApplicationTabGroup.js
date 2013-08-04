function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup({});
	
	//create app tabs
	var sayWin = new Window(L('SAY')),
		dayWin = new Window(L('DAY'));
	
	var tab1 = Ti.UI.createTab({
		title: L('SAY'),
		icon: '/images/KS_nav_ui.png',
		window: sayWin
	});
	sayWin.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('DAY'),
		icon: '/images/KS_nav_views.png',
		window: dayWin
	});
	dayWin.containingTab = tab2;
	
	self.addTab(tab1);
	self.addTab(tab2);
	
	return self;
};

module.exports = ApplicationTabGroup;
