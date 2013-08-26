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

var db = Ti.Database.open('diaryQA');
	
	if (Ti.App.Properties.getString('first_run') == null){
		Ti.API.info("first time launch app!!");
		//init code
		//create database when the app launch (or open it if exist)
		
		//max. 8 questions TODO: make flexibile
		db.execute('CREATE TABLE IF NOT EXISTS chats (id INTEGER PRIMARY KEY,supervisor, date, q1, a1, q2, a2, q3, a3, q4, a4, q5, a5, q6, a6, q7, a7, q8, a8)');
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
		db.execute('CREATE TABLE IF NOT EXISTS friends (id INTEGER PRIMARY KEY,name,source)');
		db.execute('INSERT INTO friends (id,name,source) VALUES (1,"David Chang","manule")');
		db.execute('INSERT INTO friends (id,name,source) VALUES (2,"Agora Chen","manule")');
		db.execute('INSERT INTO friends (id,name,source) VALUES (3,"Queen","manule")');
		
		
		
		Ti.App.Properties.setString('first_run',0);
	}
	
	Ti.App.iOS.setBubbleParent(true);
	//TODO: if over time
	var today = new Date();
	
	var rows = db.execute('SELECT * FROM configs WHERE id='+(today.getDay()+1));
	Ti.API.info("Today is "+today.getDay()+". Result has "+rows.rowCount+" rows. Revoke time is "+rows.fieldByName("alert_time")+". Id is "+rows.fieldByName("id"));
	var revokeTimeArray = rows.fieldByName("alert_time").split(":");
	var revokeTime = new Date();
	//revokeTime.setHours(parseInt(revokeTimeArray[0]));
	//revokeTime.setMinutes(parseInt(revokeTimeArray[1]));
	revokeTime.setMinutes(42);
	//revokeTime.setSeconds(0);
	console.log(revokeTime.toDateString()+" "+revokeTime.toTimeString());
	
	var supervisor = db.execute('SELECT id,name FROM friends WHERE id='+rows.fieldByName("supervisor"));
	
	var msg = supervisor.fieldByName("name")+": "+rows.fieldByName("q1");
	
	var timeToWrite = Ti.App.iOS.scheduleLocalNotification({
		date:revokeTime,
		alertBody:msg,
		repeat:'daily',
		userInfo:{supervisor:rows.fieldByName('supervisor'),
					q1:rows.fieldByName('q1'),
					date:revokeTime}
	});
	
	
	
	/*var revokeTime = new Date();
	
	var timeToWrite = Ti.App.iOS.scheduleLocalNotification({
		date:new Date
	});*/
	
	db.close();

//TODO:background service (what will happen when app is paused)
	Ti.App.iOS.addEventListener('notification',function(data){
		var db = Ti.Database.open('diaryQA');
		
		console.log(data.userInfo['date']);
		console.log(data.userInfo['q1']);
		console.log(data.userInfo['supervisor']);
		//Insert init question to databse
		console.log('INSERT INTO chats (supervisor, date, q1) VALUES (?,?,?)',data.userInfo['supervisor'],data.userInfo['date'].toString(),data.userInfo['q1']);
		db.execute('INSERT INTO chats (supervisor, date, q1) VALUES (?,?,?)',data.userInfo['supervisor'],data.userInfo['date'].toString(),data.userInfo['q1']);
		db.close();
	});


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

	