function ApplicationWindow(title) {
	var subWindow;
	if (title == 'SAY'){
		//SAY window
		subWindow = require('ui/handheld/SayWindow');
	} else {
		//DAY window
		subWindow = require('ui/handheld/DayWindow');
	}
	
	var self = new subWindow(title);
	return self;
	/*var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	/*var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		}));
	});
	
	return self;*/
};

module.exports = ApplicationWindow;
