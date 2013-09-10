/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

//Ti.App.Properties.setString('first_run',0);

var db = Ti.Database.open('diaryQA');
	
	if (Ti.App.Properties.getString('first_run') == null){
		Ti.API.info("first time launch app!!");
		//init code
		//create database when the app launch (or open it if exist)
		
		//max. 8 questions TODO: make flexibile
		db.execute('CREATE TABLE IF NOT EXISTS chats (id INTEGER PRIMARY KEY,supervisor, date, msg, msg_type)');
		//config
		db.execute('CREATE TABLE IF NOT EXISTS configs (id INTEGER PRIMARY KEY, alert_time,supervisor,q1,q2,q3,q4,q5,q6,q7,q8)');
		//insert default settings (FROM SUN. 1 to SAT. 7)
		db.execute('INSERT INTO configs (alert_time,supervisor,q1,q2,q3,q4,q5) VALUES ("13:30",1,"Hey man! How\'s going!?","What do you feel about the day?","What did you eat today?","Anything special?","Great day! See you tomorrow!")');
		db.execute('INSERT INTO configs (alert_time,supervisor,q1,q2,q3,q4,q5) VALUES ("13:32",1,"Hey man! How\'s going!?","What do you feel about the day?","What did you eat today?","Anything special?","Great day! See you tomorrow!")');
		db.execute('INSERT INTO configs (alert_time,supervisor,q1,q2,q3,q4,q5) VALUES ("22:30",1,"Hey man! How\'s going!?","What do you feel about the day?","What did you eat today?","Anything special?","Great day! See you tomorrow!")');
		db.execute('INSERT INTO configs (alert_time,supervisor,q1,q2,q3,q4,q5) VALUES ("22:30",1,"Hey man! How\'s going!?","What do you feel about the day?","What did you eat today?","Anything special?","Great day! See you tomorrow!")');
		db.execute('INSERT INTO configs (alert_time,supervisor,q1,q2,q3,q4,q5) VALUES ("23:33",1,"Hey man! How\'s going!?","What do you feel about the day?","What did you eat today?","Anything special?","Great day! See you tomorrow!")');
		db.execute('INSERT INTO configs (alert_time,supervisor,q1,q2,q3,q4,q5) VALUES ("23:33",1,"Hey man! How\'s going!?","What do you feel about the day?","What did you eat today?","Anything special?","Great day! See you tomorrow!")');
		db.execute('INSERT INTO configs (alert_time,supervisor,q1,q2,q3,q4,q5) VALUES ("22:30",1,"Hey man! How\'s going!?","What do you feel about the day?","What did you eat today?","Anything special?","Great day! See you tomorrow!")');
		//friends
		db.execute('CREATE TABLE IF NOT EXISTS friends (id INTEGER PRIMARY KEY,name,source,enabled,unread,msgcount,update_time,last_msg)');
		db.execute('INSERT INTO friends (id,name,source,enabled,unread,msgcount,update_time) VALUES (1,"David Chang","manule",1,0,0,?)',new Date().toISOString());
		db.execute('INSERT INTO friends (id,name,source,enabled,unread,msgcount,update_time) VALUES (2,"Agora Chen","manule",1,0,0,?)',new Date().toISOString());
		db.execute('INSERT INTO friends (id,name,source,enabled,unread,msgcount,update_time) VALUES (3,"Queen","manule",1,0,0,?)',new Date().toISOString());
		
		
		
		Ti.App.Properties.setString('first_run',0);
	}
	
	Ti.App.iOS.setBubbleParent(true);
	//TODO: if over time
	var today = new Date();
	
	var rows = db.execute('SELECT * FROM configs WHERE id='+(today.getDay()+1));
	Ti.API.info("Today is "+today.getDay()+". Result has "+rows.rowCount+" rows. Revoke time is "+rows.fieldByName("alert_time")+". Id is "+rows.fieldByName("id"));
	var revokeTimeArray = rows.fieldByName("alert_time").split(":");
	//TODO:remove debug mode
	var revokeTime = new Date(new Date().getTime()+30000);
	//revokeTime.setHours(parseInt(revokeTimeArray[0]));
	//revokeTime.setMinutes(parseInt(revokeTimeArray[1]));
	//revokeTime.setMinutes(42);
	//revokeTime.setSeconds(0);
	console.log(revokeTime.toDateString()+" "+revokeTime.toTimeString());
	
	var supervisor = db.execute('SELECT id,name FROM friends WHERE id='+rows.fieldByName("supervisor"));
	
	var msg = supervisor.fieldByName("name")+": "+rows.fieldByName("q1");
	
	var timeToWrite = Ti.App.iOS.scheduleLocalNotification({
		date:revokeTime,
		alertBody:msg,
		userInfo:{
			supervisor:rows.fieldByName('supervisor'),
					q1:rows.fieldByName('q1'),
					date:revokeTime}
	});
	
	
	
	/*var revokeTime = new Date();
	
	var timeToWrite = Ti.App.iOS.scheduleLocalNotification({
		date:new Date
	});*/
	
	db.close();

//TODO:background service (what will happen when app is paused)
//TODO:It won't be revoked when the user goes back in app by pressing app icon directly instead of pressing the notification
	Ti.App.iOS.addEventListener('notification',function(data){
		var db = Ti.Database.open('diaryQA');
		
		console.log(data.userInfo['date']);
		console.log(data.userInfo['q1']);
		console.log(data.userInfo['supervisor']);
		//Insert init question to databse
		//console.log('INSERT INTO chats (supervisor, date, q1) VALUES (?,?,?)',data.userInfo['supervisor'],data.userInfo['date'].toString(),data.userInfo['q1']);
		//get last q1 msg in database and check if today existed
		var lastQ1row = db.execute('SELECT * FROM chats WHERE msg_type=\'q1\' ORDER BY id DESC LIMIT 1');
		console.log("last q1 query has "+lastQ1row.rowCount+" result");
		if (isNewDay(lastQ1row,data.userInfo['date'])){
			console.log("It's new day thou!!");
			db.execute('INSERT INTO chats (supervisor, date, msg, msg_type) VALUES (?,?,?,?)',data.userInfo['supervisor'],data.userInfo['date'].toISOString(),data.userInfo['q1'],'q1');
			var msgId = db.execute('SELECT id FROM chats ORDER BY id DESC LIMIT 1');
			var supervisor = db.execute('SELECT unread,msgcount FROM friends WHERE id='+parseInt(data.userInfo['supervisor']));
			
			console.log("unread:"+supervisor.fieldByName('unread')+" msg:"+supervisor.fieldByName('msgcount'));
			db.execute('UPDATE friends SET unread=?,msgcount=?,update_time=? WHERE id=?',parseInt(supervisor.fieldByName('unread'))+1,parseInt(supervisor.fieldByName('msgcount'))+1,data.userInfo['date'].toISOString(),parseInt(data.userInfo['supervisor']));
			Ti.App.fireEvent("msgGot",{id:msgId.fieldByName('id'),supervisor:data.userInfo['supervisor'],date:data.userInfo['date'].toISOString(),msg:data.userInfo['q1'],msg_type:'q1'});
		} else {
			console.log("......OP");
		}
		
		db.close();
	});

	Ti.App.addEventListener("msgSent",function(){
		//Receive msg
		//TODO:Do ssomething when receive response
		Ti.API.info("MSG SENT!!");
	});

function isNewDay(lastQ1,msgDate){
	console.log(lastQ1.rowCount);
	if (lastQ1.rowCount < 1 || lastQ1 == "undefined" || lastQ1.rowCount == null){
		
		//there is no data
		return true;
	}
	var lastQ1Day = new Date(lastQ1.fieldByName('date'));
	var msgDay = new Date(msgDate);
	console.log("last: "+lastQ1Day.getDate());
	console.log("now: "+msgDay.getDate());
	return lastQ1Day.getDate() != msgDay.getDate();
}

// This is a single context application with mutliple windows in a stack
(function() {
	
	Ti.UI.iPhone.statusBarStyle = Ti.UI.iPhone.StatusBar.OPAQUE_BLACK;
	
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		Window = require('ui/handheld/ApplicationWindow');
	}

	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	new ApplicationTabGroup(Window).open();
	
	
	
})();

	