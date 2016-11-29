"use strict";function devTools(e){e=e||BrowserWindow.getFocusedWindow(),e&&e.toggleDevTools()}function openDevTools(e,o){if(e=e||BrowserWindow.getFocusedWindow()){var r=o===!0?void 0:o;e.webContents.openDevTools({mode:r})}}function refresh(e){e=e||BrowserWindow.getFocusedWindow(),e&&e.webContents.reloadIgnoringCache()}function inspectElements(){var e=BrowserWindow.getFocusedWindow(),o=function(){e.devToolsWebContents.executeJavaScript("DevToolsAPI.enterInspectElementMode()")};e&&(e.webContents.isDevToolsOpened()?o():(e.webContents.on("devtools-opened",o),e.openDevTools()))}var electron=require("electron"),localShortcut=require("electron-localshortcut"),isDev=require("electron-is-dev"),app=electron.app,BrowserWindow=electron.BrowserWindow,isMacOS="darwin"===process.platform;module.exports=function(e){e=Object.assign({enabled:null,showDevTools:!1},e),e.enabled===!1||null===e.enabled&&!isDev||(app.on("browser-window-created",function(o,r){e.showDevTools&&openDevTools(r,e.showDevTools)}),app.on("ready",function(){try{var e=BrowserWindow.getDevToolsExtensions&&{}.hasOwnProperty.call(BrowserWindow.getDevToolsExtensions(),"devtron");e||BrowserWindow.addDevToolsExtension(require("devtron").path)}catch(e){}localShortcut.register("CmdOrCtrl+Shift+C",inspectElements),localShortcut.register(isMacOS?"Cmd+Alt+I":"Ctrl+Shift+I",devTools),localShortcut.register("F12",devTools),localShortcut.register("CmdOrCtrl+R",refresh),localShortcut.register("F5",refresh)}))},module.exports.refresh=refresh,module.exports.devTools=devTools,module.exports.openDevTools=openDevTools;
//# sourceMappingURL=electron-debug.js.map
