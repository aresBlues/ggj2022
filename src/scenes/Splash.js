export default class SplashScene extends Phaser.Scene {
	constructor () {
		super({ key: 'Splash' })
	}

	preload () {
		this.load.image('bg', '/assets/images/Background1.png');
		this.load.image('bg2', '/assets/images/SecondBackground.png');
		this.load.image('white_run1', 'assets/images/Character_White/White_Run1.png')
		this.load.image('white_run2', 'assets/images/Character_White/White_Run2.png')
		this.load.image('white_run3', 'assets/images/Character_White/White_Run3.png')
		this.load.image('black_run1', 'assets/images/Character_Black/Black_Run1.png')
		this.load.image('black_run2', 'assets/images/Character_Black/Black_Run2.png')
		this.load.image('black_run3', 'assets/images/Character_Black/Black_Run3.png')
	}

	create () {
		this.anims.create({
            key: 'white_run',
            frames: [
                { key: 'white_run1' },
                { key: 'white_run2' },
                { key: 'white_run3' }
            ],
            frameRate: 8,
            repeat: -1
        })

		this.anims.create({
            key: 'black_run',
            frames: [
                { key: 'black_run1' },
                { key: 'black_run2' },
                { key: 'black_run3' }
            ],
            frameRate: 8,
            repeat: -1
        })
		
		this.scene.start('Main')
	}
}
