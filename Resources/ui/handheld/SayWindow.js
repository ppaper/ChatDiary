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
	
	var self = Ti.UI.createWindow({
		titleControl:titleView,
		backgroundColor:'white',
		barColor:'#3b5998'
	});
	
	var chatrooms = [
					{title:'David Chang'},
					{title:'Agora Chen'},
					{title:'Queen'}
					];
	
	var chatroomsData = [];
	
	var chatroomList = Ti.UI.createTableView({
		//data:chatrooms
		editable:true,
		moveable:true
	});
	
	var chatRoom = require('ui/handheld/ChatRoom');
	
	for (var i=0;i<chatrooms.length;i++){
		var data = chatrooms[i];
		
		var row = Ti.UI.createTableViewRow({
			className:'row',
			objName:'row',
			touchEnabled:true,
			selectedBackgroundColor:'rgb(210,210,210)',
			leftImage:'images/default_portrait.jpg',
			title:data.title
		});
		
		
		row.addEventListener('click',function(e){
			//self.open
			console.log("i is "+i);
			var cr = new chatRoom(e.rowData);
			self.containingTab.open(cr);
			//self.open(cr);
		});
		
		chatroomsData.push(row);
	}
	
	chatroomList.setData(chatroomsData);
	
	self.add(chatroomList);
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

module.exports = SayWindow;
