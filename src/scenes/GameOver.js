import config from '../config'
import Button from '../objects/Button'
import SoundControls from '../objects/SoundControls'

export default class GameOver extends Phaser.Scene {
	constructor () {
		super({ key: 'GameOver' })
	}
	
	create () {
		const { width } = this.sys.canvas
		
		const startButton = new Button(
			this,
			450,
			'Restart Game',
			() => {
				this.scene.start('Main')
			}
		)
		startButton.setPosition(width / 2, 500)
		
		const mainMenuButton = new Button(
			this,
			450,
			'Main Menu',
			() => {
				this.scene.start('Menu')
			}
		)
		mainMenuButton.setPosition(width / 2, 700)

		this.add.image(width / 2, 540, 'gameOver');
		
		this.add.existing(startButton)
		this.add.existing(mainMenuButton)
		this.track = this.sound.add('track3');
		this.track.play({
				loop: true
			});

		const soundControls = new SoundControls(this)
		soundControls.setPosition(width - 450, 50)
		this.add.existing(soundControls)
	}
}
