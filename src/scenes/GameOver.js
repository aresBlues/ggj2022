import config from '../config'
import Button from '../objects/Button'

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
				this.track.pause()
				this.scene.start('Main')
			}
		)
		startButton.setPosition(width / 2, 500)
		startButton.setOrigin(0.5, 0.5)
		startButton.setInteractive()
		startButton.on('pointerdown', () => {
			this.scene.start('Main')
			this.track.pause()
		})
		
		const mainMenuButton = new Button(
			this,
			450,
			'Main Menu',
			() => {
				this.track.pause()
				this.scene.start('Menu')
			}
		)
		mainMenuButton.setPosition(width / 2, 700)
		mainMenuButton.setOrigin(0.5, 0.5)
		mainMenuButton.setInteractive()
		mainMenuButton.on('pointerdown', () => {
			this.track.pause()
			this.scene.start('Menu')
		})


		this.add.image(width / 2, 540, 'gameOver');
		
		this.add.existing(startButton)
		this.add.existing(mainMenuButton)
		this.track = this.sound.add('track3');
		this.track.play({
				loop: true
			});
	}
}
