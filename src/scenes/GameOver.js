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
	}
}
