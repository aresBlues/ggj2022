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
			'Restart Game',
			{
				fontSize: '50px',
				fontFamily: '"Lato"',
				color: '#000'
			}
		)
		startButton.setInteractive()
		startButton.on('pointerdown', () => {
			this.scene.start('Main')
		})
		startButton.setOrigin(0.5, 0.5)
		
		const mainMenuButton = new Phaser.GameObjects.Text(
			this,
			width / 2,
			700,
			'Main Menu',
			{
				fontSize: '50px',
				fontFamily: '"Lato"',
				color: '#000'
			}
		)
		mainMenuButton.setOrigin(0.5, 0.5)
		
		this.add.existing(nameText)
		this.add.existing(startButton)
		this.add.existing(mainMenuButton)
	}
}
