import config from '../config'
import Button from '../objects/Button'

export default class Menu extends Phaser.Scene {
	constructor () {
		super({ key: 'Menu' })
	}
	
	create () {
		const { width } = this.sys.canvas
		
		const nameText = new Phaser.GameObjects.Text(
			this,
			width / 2,
			200,
			'Awesome Jumping Game',
			config.menuFontStyle
		)
		nameText.setOrigin(0.5, 0)

		const startButton = new Button(
			this,
			450,
			'Start Game',
			() => {
				this.scene.start('Main')
				this.track.pause()
			}
		)
		startButton.setPosition(width / 2, 500)
		
		const creditsButton = new Button(
			this,
			450,
			'Credits',
			() => {
				this.scene.start('Credits')
				this.track.pause()
			}
		)
		creditsButton.setPosition(width / 2, 700)
		
		this.add.existing(nameText)
		this.add.existing(startButton)
		this.add.existing(creditsButton)
		
		this.track = this.sound.add('track1');
		this.track.play({
				loop: true
			});
	}
}
