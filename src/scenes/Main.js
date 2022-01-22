const GRAVITATION = 2000

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
		
		this.speed = 0
		
		this.add(overworldCharacter)
		this.add(underworldCharacter)
	}
	
	jump () {
		if (this.isOnFloor()) {
			this.speed = -800
		}
	}
	
	isOnFloor () {
		return this.overworldCharacter.y >= 0
	}
	
	updatePosition (deltaTime) {
		const dy = this.speed * deltaTime / 1000
		const dv = GRAVITATION * deltaTime / 1000
		
		this.overworldCharacter.y += dy
		this.speed += dv
		
		if (this.overworldCharacter.y >= 0) {
			this.overworldCharacter.y = 0
			this.speed = 0
		}
		
		this.underworldCharacter.y = -this.overworldCharacter.y
	}
}

class Obstacle extends Phaser.GameObjects.Image {
	constructor (scene, speed = -100) {
		const { width, height } = scene.sys.canvas
		super(scene, width, height / 2, 'obstacle')
		this.setOrigin(0, 1)
		this.speed = speed
	}
	
	updatePosition (deltaTime) {
		const dx = this.speed * deltaTime / 1000
		
		this.x += dx
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
		this.bgimage=this.add.sprite(width / 2, height / 2,'bg')
		this.bgimage2=this.add.sprite(width / 2 + width, height / 2,'bg')
		
		const character = new Character(this)
		character.setPosition(50, height / 2)
		this.character = character
		
		this.add.existing(character)
		
		this.input.on('pointerdown', () => {
			this.character.jump()
		})
		
		this.obstacles = []
		
		const obstacleSpawn = this.time.addEvent({
			delay: 10000,
			callback: () => {
				console.log('spawn')
				const obstacle = new Obstacle(this)
				this.add.existing(obstacle)
				this.obstacles.push(obstacle)
			},
			loop: true
		})
	}

	update (time, deltaTime) {
		const { width, height } = this.sys.canvas	
		this.bgimage.x -= 10;
		this.bgimage2.x -= 10;
		if (this.bgimage.x<= -width / 2)
			this.bgimage.x=width / 2 + width
		if (this.bgimage2.x<= -width / 2)
			this.bgimage2.x=width / 2 + width
		
		this.character.updatePosition(deltaTime)
		
		const despawnObstacles = []
		
		for (const obstacle of this.obstacles) {
			obstacle.updatePosition(deltaTime)
			
			if (obstacle.x < 0) {
				obstacle.destroy()
				despawnObstacles.push(obstacle)
			}
		}
		
		for (const obstacle of despawnObstacles) {
			const index = this.obstacles.indexOf(obstacle)
			
			if (index !== -1) {
				this.obstacles.splice(index, 1)
			}
		}
	}
}
