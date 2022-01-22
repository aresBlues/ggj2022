export default class SplashScene extends Phaser.Scene {
	constructor () {
		super({ key: 'Splash' })
	}

	preload () {
		this.load.image('character', 'assets/images/CharacterPlaceHolder.png')
	}

	create () {
		this.scene.start('Main')
	}
}
