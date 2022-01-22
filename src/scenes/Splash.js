export default class SplashScene extends Phaser.Scene {
	constructor () {
		super({ key: 'Splash' })
	}

	preload () {
		this.load.image('bg', '/assets/images/FirstBackground.png');
	}

	create () {
		this.scene.start('Main')
	}
}
