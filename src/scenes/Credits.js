import config from '../config'
import Button from '../objects/Button'
import SoundControls from '../objects/SoundControls'

export default class Credits extends Phaser.Scene {
	constructor () {
		super({ key: 'Credits' })
	}
	
	create () {
		const { width } = this.sys.canvas
		
		const creditsText = new Phaser.GameObjects.Text(
			this,
			width / 2,
			300,
			'Credits',
			config.menuFontStyle
		)
		creditsText.setOrigin(0.5, 0)

		const artText = new Phaser.GameObjects.Text(
			this,
			width / 3.5,
			400,
			'Game Art',
			config.menuFontStyle
		)
		artText.setOrigin(0.5, 0)

		const artist1Text = new Phaser.GameObjects.Text(
			this,
			width / 3.5,
			500,
			'Sandra Hillebrand',
			{
				...config.menuFontStyle,
				fontStyle: '400'
			}
		)
		artist1Text.setOrigin(0.5, 0)
	
		const artist2Text = new Phaser.GameObjects.Text(
			this,
			width / 3.5,
			600,
			'Ivan Pavlov',
			{
				...config.menuFontStyle,
				fontStyle: '400'
			}
		)
		artist2Text.setOrigin(0.5, 0)

		const programmerText = new Phaser.GameObjects.Text(
			this,
			width * 3 / 4,
			400,
			'Programming',
			config.menuFontStyle
		)
		programmerText.setOrigin(0.5, 0)

		const programmer1Text = new Phaser.GameObjects.Text(
			this,
			width * 3 / 4,
			500,
			'Akshay Ganesh',
			{
				...config.menuFontStyle,
				fontStyle: '400'
			}
		)
		programmer1Text.setOrigin(0.5, 0)
	
		const programmer2Text = new Phaser.GameObjects.Text(
			this,
			width * 3 / 4,
			600,
			'Christian Dittrich',
			{
				...config.menuFontStyle,
				fontStyle: '400'
			}
		)
		programmer2Text.setOrigin(0.5, 0)

		const continueButton = new Button(
			this,
			735,
			'Continue to Main Menu',
			() => {
				this.scene.start('Menu')
			}
		)
		continueButton.setPosition(width / 2, 850)

		this.add.image(width / 2, 540, 'backgroundCredits');
		this.add.existing(creditsText)
		this.add.existing(artText)
		this.add.existing(artist1Text)
		this.add.existing(artist2Text)
		this.add.existing(programmerText)
		this.add.existing(programmer1Text)
		this.add.existing(programmer2Text)
		this.add.existing(continueButton)

		const soundControls = new SoundControls(this)
		soundControls.setPosition(width - 450, 50)
		this.add.existing(soundControls)
	}
}
