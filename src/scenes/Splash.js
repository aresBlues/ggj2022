export default class SplashScene extends Phaser.Scene {
	constructor () {
		super({ key: 'Splash' })
	}

	preload () {
		this.load.image('bg', '/assets/images/Background1.png');
		this.load.image('character', 'assets/images/CharacterPlaceHolder.png')
		this.load.image('bg2', '/assets/images/SecondBackground.png');
	}

	create () {
		this.scene.start('Main')
	}
}
