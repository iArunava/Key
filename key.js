const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

let win;
let authorizationWin;

function createAuthWindow () {
	
	authorizationWin = new BrowserWindow ({ width: 550, 
						height: 200, 
						resizable: false,
						center: true,
						movable: false});

	authorizationWin.loadURL(url.format ({
		pathname: path.join(__dirname, '/lib/html/authorization.html'),
		protocol: 'file:',
		slashes: true
	}));

	authorizationWin.once ('ready-to-show', () => {
		
		authorizationWin.show();
	});


};

function createMainWin () {
	
	win = new BrowserWindow ({width: 800, height: 600});

	win.loadURL(url.format ({
				pathname: path.join(__dirname, "/lib/html/index.html"),
				protocol: 'file',
				slashes: true
	
	}));

	win.once ('ready-to-show', () => {
		win.show();
	});

	win.on ('closed', () => {
		win = null;
	});
};

ipcMain.on ('master-password-verified', function () {
	
	if (!win) {
		createMainWin();
	}
	authorizationWin.close();

	return (!win.isDestroyed() && !win.isVisible()) ? win.hide() : win.show();
});

/* TODO Disabling Auth Window for ease of testing the application, revert it */
//app.on('ready', createAuthWindow);
app.on ('ready', createMainWin);

app.on('window-all-closed', () => {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (authorizationWin == null) {
		createAuthWindow();
	}
});
