import config from '../config'
import Button from '../objects/Button'

export default class Menu extends Phaser.Scene {
	constructor () {
		super({ key: 'Menu' })
	}
	
	create () {
		const { width } = this.sys.canvas
		

		const startButton = new Button(
			this,
			450,
			'Start Game',
			() => {
				this.scene.start('Main')
			}
		)
		startButton.setPosition(width / 2, 700)
		
		const creditsButton = new Button(
			this,
			450,
			'Credits',
			() => {
				this.scene.start('Credits')
			}
		)
		creditsButton.setPosition(width / 2, 900)

		this.add.image(width / 2, 540, 'backgroundMenu');
		this.add.existing(startButton)
		this.add.existing(creditsButton)
	}
}
