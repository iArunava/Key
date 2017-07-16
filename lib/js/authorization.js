const {app, BrowserWindow, ipcRenderer} = require ('electron');
const path = require ('path');
const url = require ('url');

/* TODO Remove currPass as being a global var */
var currPass = "123456789"; // Storing pass as Global var for testing purposes

var enteredPass = "";
var authSubBtnID = document.getElementById ('id--master-password-submit');
var authPassEntrField = document.getElementById ('id--master-password-input');

/*let win;

function createStartupWindow () {
	
	win = new BrowserWindow ({width: 800, height: 600});

	win.loadURL (url.format ({
				pathname: path.join (__dirname, "../html/index.html"),
				protocol: 'file:',
				slashes: true
	}));

	win.once ('ready-to-show', () => {
		win.show();
	});

	win.on ('closed', () => {
		win = null;
	});
};*/

document.addEventListener ("DOMContentLoaded" , function (event) {
	
	authSubBtnID.onclick = function () {
		
		enteredPass = authPassEntrField.value;

		if (currPass == enteredPass) {
			ipcRenderer.send ('master-password-verified');
		} else {
			alert ('Wrong Password!');
		}
	};
});
