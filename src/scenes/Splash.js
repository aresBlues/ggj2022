export default class SplashScene extends Phaser.Scene {
	constructor () {
		super({ key: 'Splash' })
	}

	preload () {
	}

	create () {
		this.scene.start('Main')
	}
}
