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
			{
				fontSize: '50px',
				fontFamily: '"Lato"',
				color: '#000'
			}
		)
		nameText.setOrigin(0.5, 0)

		const startButton = new Phaser.GameObjects.Text(
			this,
			width / 2,
			500,
			'Start Game',
			{
				fontSize: '50px',
				fontFamily: '"Lato"',
				color: '#000'
			}
		)
		startButton.setOrigin(0.5, 0.5)
		startButton.setInteractive()
		startButton.on('pointerdown', () => {
			this.scene.start('Main')
		})
		
		const creditsButton = new Phaser.GameObjects.Text(
			this,
			width / 2,
			700,
			'Credits',
			{
				fontSize: '50px',
				fontFamily: '"Lato"',
				color: '#000'
			}
		)
		creditsButton.setOrigin(0.5, 0.5)
		creditsButton.setInteractive()
		creditsButton.on('pointerdown', () => {
			this.scene.start('Credits')
		})
		
		this.add.existing(nameText)
		this.add.existing(startButton)
		this.add.existing(creditsButton)
	}
}
