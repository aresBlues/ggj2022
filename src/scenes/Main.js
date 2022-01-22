class Character extends Phaser.GameObjects.Container {
	constructor (scene) {
		super(scene)
		
		const overworldCharacter = new Phaser.GameObjects.Image(scene, 0, 0, 'character')
		overworldCharacter.setOrigin(0, 1)
		this.overworldCharacter = overworldCharacter

		const underworldCharacter = new Phaser.GameObjects.Image(scene, 0, 0, 'character')
		underworldCharacter.setOrigin(0, 1)
		underworldCharacter.setScale(1, -1)
		this.underworldCharacter = underworldCharacter
		
		this.add(overworldCharacter)
		this.add(underworldCharacter)
	}
}

export default class MainScene extends Phaser.Scene {
	constructor () {
		super({ key: 'Main' })
	}

	create () {
		const { width, height } = this.sys.canvas

		const text = new Phaser.GameObjects.Text(this, width / 2, height / 2, 'Hello World!', { fontFamily: '"Luckiest Guy"', fontSize: '40px', color: '#000' })
		text.setOrigin(0.5, 0.5)
		text.setInteractive()
		
		let score = 0
		const scoreText = new Phaser.GameObjects.Text(this, 0, 0, '0', { fontFamily: '"Luckiest Guy"', fontSize: '40px', color: '#080' })
		scoreText.setOrigin(0, 0)
		
		text.on('pointerdown', () => {
			score += 100
			scoreText.setText(score)
		})
		
		this.add.existing(text)
		this.add.existing(scoreText)
		
		const character = new Character(this)
		character.setPosition(50, height / 2)
		this.add.existing(character)
	}
}
