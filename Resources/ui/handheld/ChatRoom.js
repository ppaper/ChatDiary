var roomData;

//TODO:msgGot
function ChatRoom(data) {
	
	console.log("id is "+data.id);
	
	roomData = data;
	
	var titleView = Ti.UI.createLabel({
		text:roomData.title,
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
	});
	
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
		backgroundColor:'#e6e6e6'
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
		scrollable:false,
		returnKeyType:Ti.UI.RETURNKEY_SEND
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
		barColor:'#50ffffff',
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
	});
	
	supervisorPanel.add(labelSupervisor);
	supervisorPanel.add(setupSupervisor);
	
	
	
	//console.log("h1:"+supervisorPanel.getHeight());
	//console.log("h2:"+sayPanel.getHeight());
	
	//---- chat history -----
	
	var db = Ti.Database.open('diaryQA');
	var chatsRows = db.execute('SELECT * FROM chats WHERE supervisor='+roomData.id);
	var talks_data = db2array(chatsRows);
	/*var talks_data = [{fromMe:false,content:"Hi there!"},{fromMe:false,content:"How's going, buddy?"},{fromMe:false,content:"I'm having a similar problem. I assumed the argument was a float to account for half pixels, but I'm not really sure. It's not clear to me that any adjustment to the caps is doing anything currently."}
	,{fromMe:true,content:"What did you eat today?"}
	,{fromMe:false,content:"Hi there!"},{fromMe:false,content:"How's going, buddy?"},{fromMe:true,content:"I'm having a similar problem. I assumed the argument was a float to account for half pixels, but I'm not really sure. It's not clear to me that any adjustment to the caps is doing anything currently."}
	,{fromMe:false,content:"What did you eat today?"}
	];*/
	db.close();
	
	var talks_rows = [];
	
	var talks = Ti.UI.createTableView({
		top:0,
		bottom:44,
		separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		backgroundColor:'#f2f2f2',
		allowsSelection:false
	});
	
	var row;
	var talk_bubble;
	var msg;
	var MSG_MINI_HEIGHT = 50;
	
	// assign chat history
	talks_data.forEach(function(element,index,array){
		row = Ti.UI.createTableViewRow();
		
		//TopCap and LeftCap only work in TextField and button
		
		if (fromMe(element)){
			//my msg
			talk_bubble = assambleMyMsg(element.msg);
			/*talk_bubble = Ti.UI.createTextField({
				width:242,
				height:Ti.UI.SIZE,
				backgroundImage:'images/talk_bubble_me@2x.png',
				backgroundLeftCap:30,
				backgroundTopCap:40,
				backgroundColor:'transparent',
				top:6,
				bottom:6,
				paddingLeft:6,
				paddingRight:26,
				editable:false
			});
			
			msg = Ti.UI.createTextArea({
				width:210,
				height:'auto',
				value:element.content,
				font:{fontSize:14},
				color:'#666666',
				backgroundColor:'transparent',
				top:6,
				bottom:6,
				left:6,
				right:20,
				verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
				editable:false
			});*/
		}else{
			//others msg
			talk_bubble = assambleYourMsg(element.msg);
			/*talk_bubble = Ti.UI.createTextField({
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
				value:element.content,
				font:{fontSize:14},
				color:'#666666',
				backgroundColor:'transparent',
				top:6,
				bottom:6,
				left:20,
				right:6,
				verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
				editable:false
			});*/
		}
		
		/*if (msg.rect.height < MSG_MINI_HEIGHT){
			msg.height = MSG_MINI_HEIGHT;
		}*/
		
		//talk_bubble.add(msg);
		
		row.add(talk_bubble);
		
		//console.log("h is "+msg.height);
		
		//talk_bubble.height = msg.rect.height + 12;
		
		talks_rows.push(row);
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
	
	//send out msg
	say.addEventListener('return',function(e){
		console.log(e.source+"::"+e.type+"::"+e.value);
		if (e.value != ""||e.value != undefined){
			//assamble msg
			talks_data.unshift({fromMe:true, content:e.value});
			//append chat row
			var talk_bubble = assambleMyMsg(e.value);
			var row = Ti.UI.createTableViewRow();
			row.add(talk_bubble);
			talks_rows.unshift(row);
			talks.appendRow(row,{
				animated:Ti.UI.ANIMATION_CURVE_EASE_IN,
				animationStyle:Ti.UI.iPhone.RowAnimationStyle.FADE,
				position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM
			});
			talks.scrollToIndex(talks_rows.length-1,{
				animated:Ti.UI.ANIMATION_CURVE_EASE_IN,
				position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM
			});
			
			var msgTime = new Date();
			
			//insert into database
			//TODO:determine which type of msg is it, now still use 'a1'
			var db = Ti.Database.open("diaryQA");
			db.execute('INSERT INTO chats (supervisor, date, msg, msg_type) VALUES (?,?,?,?)',roomData.id,msgTime.toISOString(),e.value,'a1');
			//db.execute('');
			console.log('MSG is sent and in the database! supervisor is '+roomData.id);
			//alert("There is a new msg from "+supervisor.fieldByName('name')+"\nWho said \""+msgData.msg+"\"\nUnread:"+supervisor.fieldByName("unread"));
			db.close();
			
			//clean typed in msg
			say.value = '';
			sayRef.text = '';
		}
	});
	
	
	wholeView.add(supervisorPanel);
	
	scrollView1.add(wholeView);
	
	self.add(scrollView1);
	
	return self;
};

function assambleYourMsg(content){
	var talk_bubble = Ti.UI.createTextField({
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
			
	var msg = Ti.UI.createTextArea({
				width:210,
				height:'auto',
				value:content,
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
			
	talk_bubble.add(msg);
	return talk_bubble;
}

function assambleMyMsg(content){
	var talk_bubble = Ti.UI.createTextField({
				width:242,
				height:Ti.UI.SIZE,
				backgroundImage:'images/talk_bubble_me@2x.png',
				backgroundLeftCap:30,
				backgroundTopCap:40,
				backgroundColor:'transparent',
				top:6,
				bottom:6,
				paddingLeft:6,
				paddingRight:26,
				editable:false
			});
			
	var msg = Ti.UI.createTextArea({
				width:210,
				height:'auto',
				value:content,
				font:{fontSize:14},
				color:'#666666',
				backgroundColor:'transparent',
				top:6,
				bottom:6,
				left:6,
				right:20,
				verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
				editable:false
			});
	talk_bubble.add(msg);
	return talk_bubble;
}

function fromMe(chat_data){
	console.log("okay go");
	console.log(chat_data);
	var pattern = /^q[0-9]$/g;
	if (pattern.exec(chat_data.msg_type) == null){
		return true;
	} else {
		return false;
	}
	/*if (chat_data.type.test(/^q[0-9]$/g)){
		//it's question and from Robot
		return false;
	} else {
		return true;
	}*/
}

function db2array(rows){
	var returnArray = [];
	
	var fieldCount;
	//fieldCount is property in Android
	if (Ti.Platform.name === 'android') {
    	fieldCount = rows.fieldCount;
	} else {
    	fieldCount = rows.fieldCount();
	}
	
	var obj = {};
	
	while (rows.isValidRow()){
		obj = new Object();
		for (var i=0;i<fieldCount;i++){
			obj[rows.fieldName(i)] = rows.field(i);
		}
		console.log(obj);
		returnArray.push(obj);
		rows.next();
	}
	console.log(returnArray);
	return returnArray;
}

module.exports = ChatRoom;
