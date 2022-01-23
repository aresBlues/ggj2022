import config from '../config'

export default class Button extends Phaser.GameObjects.Container {
	constructor (scene, size, text, onClick, style = config.menuFontStyle) {
		super(scene)
		this.background = new Phaser.GameObjects.Image(scene, 0, 0, 'buttonBackground' + size)
		this.background.setOrigin(0.5, 0.5)
		this.clickedBackground = new Phaser.GameObjects.Image(scene, 0, 0, 'buttonBackgroundClicked' + size)
		this.clickedBackground.setOrigin(0.5, 0.5)
		this.clickedBackground.visible = false
		this.hoverBackground = new Phaser.GameObjects.Image(scene, 0, 0, 'buttonBackgroundHover' + size)
		this.hoverBackground.setOrigin(0.5, 0.5)
		this.hoverBackground.visible = false
		
		this.buttonText = new Phaser.GameObjects.Text(
			scene,
			0,
			0,
			text,
			style
		)
		this.buttonText.setOrigin(0.5, 0.5)

		this.clickArea = new Phaser.GameObjects.Zone(scene, 0, 0, size, 100)
		this.clickArea.setOrigin(0.5, 0.5)
		this.clickArea.setInteractive()
		this.clickArea.on('pointerdown', () => {
			this.background.visible = false
			this.hoverBackground.visible = false
			this.clickedBackground.visible = true
			
			setTimeout(() => onClick(), 150)
		})
		this.clickArea.on('pointerin', () => {
			this.background.visible = false
			this.hoverBackground.visible = true
			this.clickedBackground.visible = false
		})
		this.clickArea.on('pointerover', () => {
			this.background.visible = false
			this.hoverBackground.visible = true
			this.clickedBackground.visible = false
		})
		this.clickArea.on('pointerout', () => {
			this.background.visible = true
			this.hoverBackground.visible = false
			this.clickedBackground.visible = false
		})
		
		this.add(this.background)
		this.add(this.clickedBackground)
		this.add(this.hoverBackground)
		this.add(this.buttonText)
		this.add(this.clickArea)
	}
}