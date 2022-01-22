/* global __DEV__ */
import 'phaser'
import '@babel/polyfill'
import { Plugins, Capacitor } from '@capacitor/core'

import config from './config'

const { StatusBar, App } = Plugins

window.addEventListener('load', () => {
	if (!__DEV__ && 'serviceWorker' in navigator) {
		navigator.serviceWorker.register('./sw.js')
	}
	
	if (Capacitor.isPluginAvailable('StatusBar')) {
		StatusBar.hide()
	}
	
	App.addListener('appStateChange', (state) => {
		if (Capacitor.isPluginAvailable('StatusBar')) {
			StatusBar.hide()
		}
	})
	
	if (window.screen.orientation && window.screen.orientation.lock) {
		window.screen.orientation.lock('landscape')
			.catch(() => {})
	}
	
	/* eslint-disable-next-line no-unused-vars */
	const game = new Phaser.Game(config)
})
