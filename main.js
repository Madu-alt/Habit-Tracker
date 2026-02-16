const path = require('path');
//require('electron-reload')(__dirname);

const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "pixelheart.png",});
    win.loadFile('habittracker.html');} 
    app.whenReady().then(createWindow);