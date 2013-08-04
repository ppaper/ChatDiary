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
	
	var talks = Ti.UI.createTableView({
		top:0,
		bottom:44
	});
	
	wholeView.add(talks);
	
	var sayRefRect;
	
	//display on bottom of view
	var sayPanel = Ti.UI.createView({
		bottom:0,
		height:44,
		backgroundColor:'rgb(230,230,230)'
	});
	
	var buttonSend = Ti.UI.createButton({
		title:'Send',
		font:{fontSize:12},
		height:30,
		right:10,
		width:44,
		botton:7
	});
	
	var say = Ti.UI.createTextArea({
		//borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText:'say something...',
		left:10,
		right:60,
		bottom:4,
		width:250,
		color:'#333',
		font:{fontSize:16},
		height:Ti.UI.SIZE,
		scrollable:false
	});
	
	var sayRef = Ti.UI.createLabel({
		left:10,
		width:250,
		font:{fontSize:16},
		height:Ti.UI.SIZE,
		visible:false,
		text:"hi there"
	});
	
	say.addEventListener('change',function(e){
		console.log("height diff is "+(sayRef.rect.height-say.rect.height));
		sayRef.text = say.value;
		console.log("text is "+e.source.vale+"::"+e.source+"::"+e);
		console.log("1height become "+sayRef.size.height);
		console.log("2height become "+sayRef.rect.height);
		console.log("3height become "+sayRef.height);
		
		//diff between TextArea and Label is 16
		say.height = sayRef.size.height+16;
		sayPanel.height = sayRef.size.height+24;
		talks.bottom = sayPanel.height;
		console.log("saypanel height is "+sayPanel.height);
	});
	
	sayPanel.add(sayRef);
	sayPanel.add(say);
	sayPanel.add(buttonSend);
	
	wholeView.add(sayPanel);
	
	sayRef.addEventListener('postlayout',function(e){
		sayRefRect = sayRef.rect;
		//console.log("height is "+sayRefRect.height);
	});
	
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
	
	
	
	wholeView.add(supervisorPanel);
	
	scrollView1.add(wholeView);
	
	self.add(scrollView1);
	
	return self;
};

module.exports = ChatRoom;
