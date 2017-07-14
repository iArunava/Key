const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;
let authorizationWin;

function createWindow () {
	
	win = new BrowserWindow ({width: 800, height: 600});

	authorizationWin = new BrowserWindow ({ width: 550, 
						height: 200, 
						parent: win,
						resizable: false,
						movable: false});

	authorizationWin.loadURL(url.format ({
		pathname: path.join(__dirname, '/public/html/authorization.html'),
		protocol: 'file:',
		slashes: true
	}));
	authorizationWin.once ('ready-to-show', () => {
		
		authorizationWin.show();
	});
	win.loadURL(url.format ({
		pathname: path.join(__dirname, '/public/html/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	win.on('closed', () => {
		win = null;
	});

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (win == null) {
		createWindow();
	}
});
