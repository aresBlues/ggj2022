const GRAVITATION = 1500
const RUNNING_SPEED = 350
const ENABLE_LONG_JUMP = true
const ENABLE_DOUBLE_JUMP = false
const JUMP_SPEED = ENABLE_LONG_JUMP ? -500 : -700
const MAXIMUM_LONG_JUMP_TIME = 250

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
		this.jumping = false
		this.doubleJumped = false
		this.longJumpTime = 0
		
		this.add(overworldCharacter)
		this.add(underworldCharacter)
	}
	
	jump () {
		if (this.isOnFloor() || (this.jumped && ENABLE_DOUBLE_JUMP && !this.doubleJumped)) {
			this.speed = JUMP_SPEED
			this.overworldCharacter.play('white_jump')
			this.underworldCharacter.play('black_jump')
			if (this.jumped && ENABLE_DOUBLE_JUMP) {
				this.doubleJumped = true
			}
			this.jumped = true
			this.jumping = ENABLE_LONG_JUMP
			this.longJumpTime = 0
		}
	}
	
	isOnFloor () {
		return this.overworldCharacter.y >= 0
	}
	
	updatePosition (deltaTime) {
		const dy = this.speed * deltaTime / 1000
		const dv = (this.jumping ? -GRAVITATION : GRAVITATION) * deltaTime / 1000
		
		this.overworldCharacter.y += dy
		this.speed += dv
		
		if (this.jumping) {
			this.longJumpTime += deltaTime
			
			if (this.longJumpTime > MAXIMUM_LONG_JUMP_TIME) {
				this.jumping = false
			}
		}
		
		if (this.overworldCharacter.y >= 0) {
			this.overworldCharacter.y = 0
			this.speed = 0
			if (this.jumped) {
				this.overworldCharacter.play('white_run')
				this.underworldCharacter.play('black_run')
				this.jumped = false
				this.doubleJumped = false
			}
		}
		
		this.underworldCharacter.y = -this.overworldCharacter.y
	}
	
	getWidth () {
		return this.overworldCharacter.width
	}

	getHeight () {
		return this.overworldCharacter.height
	}
	
	getY () {
		return this.y + this.overworldCharacter.y
	}

	getX () {
		return this.x + this.overworldCharacter.x
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

class Background extends Phaser.GameObjects.Sprite {
	constructor (scene, speed = -RUNNING_SPEED*1.2) {
		const { width, height } = scene.sys.canvas
		const index = Math.floor(Math.random() * 3) + 1
		
		if (Math.random() >= 0.5) {
			super(scene, width, height * 7/8, 'obstacle' + index)
			this.setScale(-0.1, -0.1)
		}
		else {
			super(scene, width, height / 8, 'obstacle' + index)
			this.setScale(-0.1, 0.1)
		}
		
		this.play('crow')
		scene.add.updateList.add(this)
		
		
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
		this.availableBackgrounds = [1, 2, 3, 4]
		this.usedBackgrounds = []
		
		this.bgimage = this.add.sprite(width / 2, height / 2, 'bg' + this.selectRandomBackground())
		this.bgimage2 = this.add.sprite(width / 2 + width, height / 2,'bg' + this.selectRandomBackground())
		
		const character = new Character(this)
		character.setPosition(300, height / 2)
		this.character = character
		
		this.add.existing(character)
		
		this.input.on('pointerdown', () => {
			this.character.jump()
		})

		this.input.on('pointerup', () => {
			this.character.jumping = false
		})
		
		this.obstacles = []
		this.backgroundObjects = []
		
		const BackgroundSpawn = this.time.addEvent({
			delay: 4000,
			callback: () => {
				const object = new Background(this, -this.runningSpeed * 1.2)
				this.add.existing(object)
				this.backgroundObjects.push(object)
			},
			loop: true
		})
		
		this.runningSpeed = RUNNING_SPEED
		const speedtimer = this.time.addEvent({
			delay: 1000,
			callback: () => {
				this.runningSpeed++
				this.updateSpeed()
			},
			loop: true
		})
		
		let difficulty = 0
		const obstacleSpawn = this.time.addEvent({
			delay: 4000,
			callback: () => {
				difficulty++
				this.spawnObstacle()
				if (difficulty > 10 && Math.random() > 0.5) {
					setTimeout(() => this.spawnObstacle(), 1000)
				}
			},
			loop: true
		})
		this.spawnObstacle()
	}
	
	updateSpeed () {
		for (const obstacle of this.obstacles) {
			obstacle.speed = -this.runningSpeed
		}
	}
	
	spawnObstacle () {
		const obstacle = new Obstacle(this, -this.runningSpeed)
		this.add.existing(obstacle)
		this.obstacles.push(obstacle)
	}
	
	selectRandomBackground () {
		const index = Math.floor(Math.random() * this.availableBackgrounds.length)
		const backgroundId = this.availableBackgrounds[index]
		this.availableBackgrounds.splice(index, 1)
		this.usedBackgrounds.push(backgroundId)
		return backgroundId
	}
	
	resetBackground (background) {
		const { width } = this.sys.canvas
		
		if (background.x <= -width / 2) {
			background.x += width * 2
			const nextBackground = this.selectRandomBackground()
			this.availableBackgrounds.push(this.usedBackgrounds.shift())
			background.setTexture('bg' + nextBackground)
		}
	}
	
	updateObjects (objects, deltaTime) {
		const despawnObjects = []
		
		for (const object of objects) {
			object.updatePosition(deltaTime)
			
			if (object.x < -object.width) {
				object.destroy()
				despawnObjects.push(object)
			}
		}
		
		for (const object of despawnObjects) {
			const index = objects.indexOf(object)
			
			if (index !== -1) {
				objects.splice(index, 1)
			}
		}
	}

	update (time, deltaTime) {
		this.bgimage.x += -this.runningSpeed * deltaTime / 1000;
		this.bgimage2.x += -this.runningSpeed * deltaTime / 1000;
		
		this.resetBackground(this.bgimage)
		this.resetBackground(this.bgimage2)
		
		this.character.updatePosition(deltaTime)
		
		this.updateObjects(this.obstacles, deltaTime)
		this.updateObjects(this.backgroundObjects, deltaTime)
		
		let collisionDetected = false
		
		const characterWidth = this.character.getWidth()
		const characterX = this.character.getX() + characterWidth / 2
		const characterY = this.character.getY()
		
		for (const obstacle of this.obstacles) {
			const dx = characterX - (obstacle.x + obstacle.width / 2)
			const dy = characterY - obstacle.y
			const distance = dx * dx + dy * dy
			const minimumDistance = (characterWidth / 2 + obstacle.width / 2) * 0.8
			
			if (distance < minimumDistance * minimumDistance) {
				collisionDetected = true
			}
		}
		
		if (collisionDetected) {
			this.scene.start('GameOver')
		}
	}
}
