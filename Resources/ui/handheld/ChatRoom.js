function ChatRoom(data) {
	
	console.log("data is "+data);
	var data = data;
	
	var titleView = Ti.UI.createLabel({
		text:data.title,
		color:'#fff',
		font:{fontSize:20},
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		shadowColor:'#333',
		shadowOffset:{x:0,y:-1},
		minimumFontSize:12
	});
	
	
	var self = Ti.UI.createWindow({
		titleControl:titleView,
		backgroundColor:'white',
		barColor:'#3b5998',
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
	
	//---- chat history -----
	var talks_data = ["Hi there!","How's going, buddy?","I'm having a similar problem. I assumed the argument was a float to account for half pixels, but I'm not really sure. It's not clear to me that any adjustment to the caps is doing anything currently.","What did you eat today?",
	"Hi there!","How's going, buddy?","I'm having a similar problem. I assumed the argument was a float to account for half pixels, but I'm not really sure. It's not clear to me that any adjustment to the caps is doing anything currently.","What did you eat today?"];
	
	var talks_rows = [];
	
	var talks = Ti.UI.createTableView({
		top:0,
		bottom:44,
		separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		backgroundColor:'#f2f2f2'
	});
	
	var row;
	var talk_bubble;
	var msg;
	var MSG_MINI_HEIGHT = 50;
	
	// assign chat history
	talks_data.forEach(function(element,index,array){
		row = Ti.UI.createTableViewRow({
			
		});
		
		//TopCap and LeftCap only work in TextField and button
		
		talk_bubble = Ti.UI.createTextField({
			width:242,
			height:Ti.UI.SIZE,
			backgroundImage:'images/talk_bubble@2x.png',
			backgroundLeftCap:30,
			backgroundTopCap:40,
			backgroundColor:'transparent',
			top:6,
			bottom:6,
			paddingLeft:26,
			paddingRight:6,
			editable:false
		});
		
		msg = Ti.UI.createTextArea({
			width:210,
			height:'auto',
			value:element,
			font:{fontSize:14},
			color:'#666666',
			backgroundColor:'transparent',
			top:6,
			bottom:6,
			left:20,
			right:6,
			verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
			editable:false
		});
		

		
		/*if (msg.rect.height < MSG_MINI_HEIGHT){
			msg.height = MSG_MINI_HEIGHT;
		}*/
		
		talk_bubble.add(msg);
		
		row.add(talk_bubble);
		
		console.log("h is "+msg.height);
		
		//talk_bubble.height = msg.rect.height + 12;
		
		talks_rows.unshift(row);
	});
	
	// first void element
	row = Ti.UI.createTableViewRow();
	row.add(Ti.UI.createView({
		width:Ti.UI.INHERIT,
		height:44,
		backgroundColor:'transparent'
	}));
	
	talks_rows.unshift(row);
	
	//set chat history rows
	talks.setData(talks_rows);
	
	//console.log(talks.index);
	
	//scroll to last msg (TODO: to previously read)
	setTimeout(function(){
			talks.scrollToIndex(talks_rows.length-1,{
				animated:Ti.UI.ANIMATION_CURVE_EASE_IN,
				position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM
			});
	},0);
	//talks.scrollToIndex()
	
	wholeView.add(talks);
	// ------ end of chat history -----
	
	
	wholeView.add(supervisorPanel);
	
	scrollView1.add(wholeView);
	
	self.add(scrollView1);
	
	return self;
};

module.exports = ChatRoom;
