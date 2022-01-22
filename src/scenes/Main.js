const GRAVITATION = 1500
const RUNNING_SPEED = 350

class Character extends Phaser.GameObjects.Container {
	constructor (scene) {
		super(scene)
		
		const overworldCharacter = new Phaser.GameObjects.Sprite(scene, 0, 0, 'white_run1')
		overworldCharacter.setOrigin(0, 1)
		overworldCharacter.play('white_run')
		scene.add.updateList.add(overworldCharacter)
		this.overworldCharacter = overworldCharacter

		const underworldCharacter = new Phaser.GameObjects.Sprite(scene, 0, 0, 'black_run1')
		underworldCharacter.setOrigin(0, 1)
		underworldCharacter.setScale(1, -1)
		underworldCharacter.play('black_run')
		scene.add.updateList.add(underworldCharacter)
		this.underworldCharacter = underworldCharacter
		
		this.speed = 0
		this.jumped = false
		
		this.add(overworldCharacter)
		this.add(underworldCharacter)
	}
	
	jump () {
		if (this.isOnFloor()) {
			this.speed = -700
			this.overworldCharacter.play('white_jump')
			this.underworldCharacter.play('black_jump')
			this.jumped = true
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
			if (this.jumped) {
				this.overworldCharacter.play('white_run')
				this.underworldCharacter.play('black_run')
				this.jumped = false
			}
		}
		
		this.underworldCharacter.y = -this.overworldCharacter.y
	}
}

class Obstacle extends Phaser.GameObjects.Sprite {
	constructor (scene, speed = -RUNNING_SPEED) {
		const { width, height } = scene.sys.canvas
		const index = Math.floor(Math.random() * 3) + 1
		super(scene, width, height / 2, 'obstacle' + index)
		if (Math.random() >= 0.5) {
			this.setScale(1, -1)
		}
		
		if (index === 2) {
			this.play('fire')
			scene.add.updateList.add(this)
		}
		
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

		this.bgimage=this.add.sprite(width / 2, height / 2,'bg')
		this.bgimage2=this.add.sprite(width / 2 + width, height / 2,'bg2')
		
		const character = new Character(this)
		character.setPosition(300, height / 2)
		this.character = character
		
		this.add.existing(character)
		
		this.input.on('pointerdown', () => {
			this.character.jump()
		})
		
		this.obstacles = []
		
		const obstacleSpawn = this.time.addEvent({
			delay: 4000,
			callback: () => {
				const obstacle = new Obstacle(this)
				this.add.existing(obstacle)
				this.obstacles.push(obstacle)
			},
			loop: true
		})
	}

	update (time, deltaTime) {
		const { width, height } = this.sys.canvas	
		this.bgimage.x += -RUNNING_SPEED * deltaTime / 1000;
		this.bgimage2.x += -RUNNING_SPEED * deltaTime / 1000;
		if (this.bgimage.x <= -width / 2) {
			this.bgimage.x += width * 2
		}
		if (this.bgimage2.x <= -width / 2) {
			this.bgimage2.x += width * 2
		}
		
		this.character.updatePosition(deltaTime)
		
		const despawnObstacles = []
		
		for (const obstacle of this.obstacles) {
			obstacle.updatePosition(deltaTime)
			
			if (obstacle.x < -obstacle.width) {
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
