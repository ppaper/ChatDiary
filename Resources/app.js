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
	
	//create database when the app launch (or open it if exist)
	var db = Ti.Database.open('diaryQA');
	//max. 8 questions
	db.execute('CREATE TABLE IF NOT EXISTS chats (supervisor, date, q1, a1, q2, a2, q3, a3, q4, a4, q5, a5, q6, a6, q7, a7, q8, a8)');
	//config
	db.execute('CREATE TABLE IF NOT EXISTS config (s_mon, s_tue, s_wed, s_thu, s_fri, s_sat, s_sun)');
	db.close();
	
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		Window = require('ui/handheld/ApplicationWindow');
	}

	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	new ApplicationTabGroup(Window).open();
})();
