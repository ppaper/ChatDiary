function ChatRoom(data) {
	
	console.log("data is "+data);
	var data = data;
	
	var titleView = Ti.UI.createLabel({
		text:data.title,
		color:'#333333',
		font:{fontSize:24},
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		shadowColor:'#fff',
		shadowOffset:{x:0,y:1}
	});
	
	
	var self = Ti.UI.createWindow({
		titleControl:titleView,
		backgroundColor:'white',
		barColor:'rgb(230,230,230)',
		tabBarHidden:true
		
	});
	
	//To fix the keyboard scroll problem, use the scrollView as container	
	var scrollView1 = Ti.UI.createScrollView({
		contentHeight:'auto',
		contentWidth:'auto'
	})
	
	var wholeView = Ti.UI.createView({
		top:0,
		left:0,
		right:0,
		height:Ti.UI.FILL
	});
	
	//display on bottom of view
	var sayPanel = Ti.UI.iOS.createToolbar({
		barColor:'rgb(230,230,230)',
		bottom:0,
		height:'auto'
	});
	
	var buttonSend = Ti.UI.createButton({
		title:'Send',
		font:{fontSize:12},
		height:30,
		right:10,
		width:44
	});
	
	var say = Ti.UI.createTextField({
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText:'say something...',
		left:10,
		right:60,
		width:250,
		bottom:7,
		color:'#333',
		font:{fontSize:16},
		height:Ti.UI.SIZE
	});
	
	var sayRef = Ti.UI.createLabel({
		left:10,
		width:250,
		font:{fontSize:16},
		height:Ti.UI.SIZE,
		visible:false,
		text:say.value
	});
	
	say.addEventListener('change',function(e){
		sayRef.text = e.vale;
		say.height = sayRef.height;
		sayPanel.height = sayRef.height;
		//console.log("saypanel height is "+sayPanel.height);
	});
	
	sayPanel.add(sayRef);
	sayPanel.add(say);
	sayPanel.add(buttonSend);
	
	wholeView.add(sayPanel);
	
	
	
	
	
	var supervisorPanel = Ti.UI.iOS.createToolbar({
		barColor:'#ffffff',
		top:0,
		borderBottom:true
	});
	
	var setupSupervisor = Ti.UI.createSwitch({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		value:false,
		right:20
	});
	
	var labelSupervisor = Ti.UI.createLabel({
		color:'#333',
		text:'Set as supervisor',
		left:10,
		shadowColor:'#fff',
		shadowOffset:{x:0,y:1},
		font:{fontSize:18}
	})
	
	supervisorPanel.add(labelSupervisor);
	supervisorPanel.add(setupSupervisor);
	
	
	
	//console.log("h1:"+supervisorPanel.getHeight());
	//console.log("h2:"+sayPanel.getHeight());
	
	var talks = Ti.UI.createTableView({
		top:0,
		bottom:44
	});
	
	wholeView.add(talks);
	
	wholeView.add(supervisorPanel);
	
	scrollView1.add(wholeView);
	
	self.add(scrollView1);
	
	return self;
};

module.exports = ChatRoom;
