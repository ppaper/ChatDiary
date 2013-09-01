var chatroomList;
var chatRoom = require('ui/handheld/ChatRoom');

var self;

function SayWindow(title) {
	/*var titleView = Ti.UI.createLabel({
		text:title,
		color:'#ffffff',
		font:{fontSize:24},
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		shadowColor:'#333',
		shadowOffset:{x:0,y:-1}
	});*/
	
	var titleView = Ti.UI.createImageView({
		image:'images/icon_logo@2x.png',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE
	});
	
	self = Ti.UI.createWindow({
		titleControl:titleView,
		backgroundColor:'white',
		barColor:'#3b5998'
	});
	
	var db = Ti.Database.open('diaryQA');
	
	var chatroomsRows = db.execute('SELECT * FROM friends ORDER BY update_time DESC');
	
	/*var chatrooms = [
					{title:'David Chang',id:1},
					{title:'Agora Chen',id:2},
					{title:'Queen',id:3}
					];*/
	
	var chatrooms = db2array(chatroomsRows);
	
	var chatroomsData = [];
	
	chatroomList = Ti.UI.createTableView({
		//data:chatrooms
		editable:true,
		moveable:true
	});
	
	
	
	for (var i=0;i<chatrooms.length;i++){
		var data = chatrooms[i];
		
		var row = Ti.UI.createTableViewRow({
			className:'row',
			objName:'row',
			touchEnabled:true,
			selectedBackgroundColor:'#d2d2d2',
			leftImage:'images/default_portrait.jpg',
			title:data.name,
			id:data.id
		});
		
		
		row.addEventListener('click',function(e){
			//self.open
			
			console.log("id is "+e.rowData.id);
			var cr = new chatRoom(e.rowData);
			self.containingTab.open(cr);
			//self.open(cr);
		});
		
		chatroomsData.push(row);
	}
	
	chatroomList.setData(chatroomsData);
	
	self.add(chatroomList);
	
	db.close();
	
	//Listening msg update event
	Ti.App.addEventListener("msgGot",function(msgData){
		//chatRoomList.statusUpdate()
		var db = Ti.Database.open("diaryQA");
		var supervisor = db.execute('SELECT * FROM friends WHERE id='+parseInt(msgData.supervisor));
		//db.execute('');
		//alert("There is a new msg from "+supervisor.fieldByName('name')+"\nWho said \""+msgData.msg+"\"\nUnread:"+supervisor.fieldByName("unread"));
		db.close();
		updateList();
	});
	
	/*var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('HERE IS SAY'),
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
	});*/
	
	return self;
};

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

function updateList(){
	//var self = Ti.UI.getCurrentWindow();
	
	var db = Ti.Database.open('diaryQA');
	
	var chatroomsRows = db.execute('SELECT * FROM friends ORDER BY update_time DESC');
	
	/*var chatrooms = [
					{title:'David Chang',id:1},
					{title:'Agora Chen',id:2},
					{title:'Queen',id:3}
					];*/
	
	var chatrooms = db2array(chatroomsRows);
	
	var chatroomsData = [];
	
	chatroomList = Ti.UI.createTableView({
		//data:chatrooms
		editable:true,
		moveable:true
	});
	
	
	
	for (var i=0;i<chatrooms.length;i++){
		var data = chatrooms[i];
		
		var row = Ti.UI.createTableViewRow({
			className:'row',
			objName:'row',
			touchEnabled:true,
			selectedBackgroundColor:'#d2d2d2',
			leftImage:'images/default_portrait.jpg',
			title:data.name,
			id:data.id
		});
		
		
		row.addEventListener('click',function(e){
			//self.open
			
			console.log("id is "+e.rowData.id);
			var cr = new chatRoom(e.rowData);
			self.containingTab.open(cr);
			//self.open(cr);
		});
		
		chatroomsData.push(row);
	}
	
	chatroomList.setData(chatroomsData);
	
	self.add(chatroomList);
	
	db.close();
}

module.exports = SayWindow;
