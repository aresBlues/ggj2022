import Phaser from 'phaser'
import WebFont from 'webfontloader'
import config from '../config'

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'Boot' })
	}
	
	initialize () {
		this.fontsReady = false
	}
	
	preload () {
		WebFont.load({
			custom: {
				families: ['Amatic SC:n4,n7', 'Neonderthaw'],
				urls: ['assets/fonts/fonts.css']
			},
			active: this.fontsLoaded.bind(this)
		})
		
		const text = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
		text.setOrigin(0.5, 0.5)
	}
	
	update () {
		if (this.fontsReady) {
			this.scene.start('Splash')
		}
	}
	
	fontsLoaded () {
		this.fontsReady = true
	}
}
