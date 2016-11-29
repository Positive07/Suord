'use strict';

const electron = require('electron');

const DOM_VK_A = 0x41; // (65) "A" key.
const DOM_VK_C = 0x43; // (67) "C" key.
const DOM_VK_V = 0x56; // (86) "V" key.
const DOM_VK_X = 0x58; // (88) "X" key.
const DOM_VK_Z = 0x5A; // (90) "Z" key.

const menuTemplate = [{
	label: 'Deshacer',
	role: 'undo'
}, {
	label: 'Rehacer',
	role: 'redo'
}, {
	type: 'separator'
}, {
	label: 'Cortar',
	role: 'cut'
}, {
	label: 'Copiar',
	role: 'copy'
}, {
	label: 'Pegar',
	role: 'paste'
}, {
	type: 'separator'
}, {
	label: 'Seleccionar Todo',
	role: 'selectall'
}];

if (window.debug)
    menuTemplate.push({type: 'separator'});

function action(name, evt) {
	const win = electron.remote.getCurrentWindow();
	win.webContents[name]();
	evt.preventDefault();
	return false;
}

function isEditable(node) {
	return node.matches('input, textarea, [contenteditable]');
}

function handleInputShortcuts(evt) {
	const c = evt.keyCode;
	const ctrlDown = evt.ctrlKey || evt.metaKey; // OSX support
	const altDown = evt.altKey;
	const shiftDown = evt.shiftKey;

	if (altDown) {
		return true;
	}

	if (!isEditable(evt.target)) {
		return true;
	}

	if (ctrlDown && !shiftDown && c === DOM_VK_C) {
		return action('copy', evt);
	}

	if (ctrlDown && !shiftDown && c === DOM_VK_V) {
		return action('paste', evt);
	}

	if (ctrlDown && !shiftDown && c === DOM_VK_X) {
		return action('cut', evt);
	}

	if (ctrlDown && !shiftDown && c === DOM_VK_A) {
		return action('selectAll', evt);
	}

	if (ctrlDown && !shiftDown && c === DOM_VK_Z) {
		return action('undo', evt);
	}

	if (ctrlDown && shiftDown && c === DOM_VK_Z) {
		return action('redo', evt);
	}

	return true;
}

function registerShortcuts() {
	if (document.body) {
		document.body.addEventListener('keydown', handleInputShortcuts);
	} else {
		document.addEventListener('DOMContentLoaded', () => {
			document.body.addEventListener('keydown', handleInputShortcuts);
		});
	}
}

function inputMenu(ctx, next) {
	let node = ctx.elm;

	while (node) {
		if (isEditable(node)) {
			[].push.apply(ctx.menu, menuTemplate);
			break;
		}
		node = node.parentElement;
	}
	next();
}

inputMenu.registerShortcuts = registerShortcuts;

module.exports = inputMenu;
