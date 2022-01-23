import config from '../config'
import Button from '../objects/Button'

export default class GameOver extends Phaser.Scene {
	constructor () {
		super({ key: 'GameOver' })
	}
	
	create () {
		const { width } = this.sys.canvas
		
		const nameText = new Phaser.GameObjects.Text(
			this,
			width / 2,
			200,
			'Game Over :(',
			config.menuFontStyle
		)
		nameText.setOrigin(0.5, 0)

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
		
		this.add.existing(nameText)
		this.add.existing(startButton)
		this.add.existing(mainMenuButton)
	}
}
