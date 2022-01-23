import config from '../config'

export default class Credits extends Phaser.Scene {
	constructor () {
		super({ key: 'Credits' })
	}
	
	create () {
		const { width } = this.sys.canvas
		
		const creditsText = new Phaser.GameObjects.Text(
			this,
			width / 2,
			200,
			'Credits',
			config.menuFontStyle
		)
		creditsText.setOrigin(0.5, 0)

		const artText = new Phaser.GameObjects.Text(
			this,
			width / 4,
			400,
			'Game Art',
			config.menuFontStyle
		)
		artText.setOrigin(0.5, 0)

		const artist1Text = new Phaser.GameObjects.Text(
			this,
			width / 4,
			500,
			'Sandra',
			config.menuFontStyle
		)
		artist1Text.setOrigin(0.5, 0)
	
		const artist2Text = new Phaser.GameObjects.Text(
			this,
			width / 4,
			600,
			'Ivan',
			config.menuFontStyle
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
			'Ares',
			config.menuFontStyle
		)
		programmer1Text.setOrigin(0.5, 0)
	
		const programmer2Text = new Phaser.GameObjects.Text(
			this,
			width * 3 / 4,
			600,
			'Christian',
			config.menuFontStyle
		)
		programmer2Text.setOrigin(0.5, 0)

		const continueButton = new Phaser.GameObjects.Text(
			this,
			width / 2,
			800,
			'Continue to Main Menu',
			config.menuFontStyle
		)
		continueButton.setOrigin(0.5, 0)
		continueButton.setInteractive()
		continueButton.on('pointerdown', () => {
			this.scene.start('Menu')
		})
		
		this.add.existing(creditsText)
		this.add.existing(artText)
		this.add.existing(artist1Text)
		this.add.existing(artist2Text)
		this.add.existing(programmerText)
		this.add.existing(programmer1Text)
		this.add.existing(programmer2Text)
		this.add.existing(continueButton)
	}
}
