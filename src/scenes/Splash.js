export default class SplashScene extends Phaser.Scene {
	constructor () {
		super({ key: 'Splash' })
	}

	preload () {
		this.load.image('bg1', '/assets/images/FirstBackground.png');
		this.load.image('bg2', '/assets/images/SecondBackground.png');
		this.load.image('bg3', '/assets/images/TownArea.png');
		this.load.image('bg4', '/assets/images/TownArea2.png');
		this.load.image('white_run1', 'assets/images/Character_White/White_Run1.png')
		this.load.image('white_run2', 'assets/images/Character_White/White_Run2.png')
		this.load.image('white_run3', 'assets/images/Character_White/White_Run3.png')
		this.load.image('white_jump1', 'assets/images/Character_White/White_StartJump.png')
		this.load.image('white_jump2', 'assets/images/Character_White/White_Jump1.png')
		this.load.image('white_jump3', 'assets/images/Character_White/White_Jump2.png')
		this.load.image('white_jump4', 'assets/images/Character_White/White_Jump3.png')
		this.load.image('white_jump5', 'assets/images/Character_White/White_EndJump.png')
		this.load.image('black_run1', 'assets/images/Character_Black/Black_Run1.png')
		this.load.image('black_run2', 'assets/images/Character_Black/Black_Run2.png')
		this.load.image('black_run3', 'assets/images/Character_Black/Black_Run3.png')
		this.load.image('black_jump1', 'assets/images/Character_Black/Black_StartJump.png')
		this.load.image('black_jump2', 'assets/images/Character_Black/Black_Jump1.png')
		this.load.image('black_jump3', 'assets/images/Character_Black/Black_Jump2.png')
		this.load.image('black_jump4', 'assets/images/Character_Black/Black_Jump3.png')
		this.load.image('black_jump5', 'assets/images/Character_Black/Black_EndJump.png')
		this.load.image('obstacle1', 'assets/images/Obstacles/Branch.png')
		this.load.image('obstacle2', 'assets/images/Obstacles/Fire1.png')
		this.load.image('obstacle3', 'assets/images/Obstacles/RedStone.png')
		this.load.image('fire2', 'assets/images/Obstacles/Fire2.png')
		this.load.image('fire3', 'assets/images/Obstacles/Fire3.png')
		this.load.image('raven1','assets/images/Crow/raven-black0001.png')
		this.load.image('raven2','assets/images/Crow/raven-black0008.png')
		this.load.image('raven3','assets/images/Crow/raven-black0010.png')
        this.load.image('fore1','assets/images/Layers/Forest_Foreground.png')
        this.load.image('sky1','assets/images/Layers/ForestBackground.png')
        this.load.image('middleG','assets/images/Layers/MiddleGrass.png')
        this.load.image('sky2','assets/images/Layers/RockForestBackground.png')
        this.load.image('fore2','assets/images/Layers/RockForestForeground.png')
        this.load.image('sky3','assets/images/Layers/TownArea_Background.png')
        this.load.image('fore3','assets/images/Layers/TownArea_Foreground.png')
        this.load.image('fore4','assets/images/Layers/TownArea2_Foreground.png')
		this.load.image('buttonBackground450','assets/images/Buttons/ButtonDisable_450px.png')
		this.load.image('buttonBackground600','assets/images/Buttons/ButtonDisable_600px.png')
		this.load.image('buttonBackground735','assets/images/Buttons/ButtonDisable_735px.png')
		this.load.image('buttonBackgroundClicked450','assets/images/Buttons/ButtonClicked_450px.png')
		this.load.image('buttonBackgroundClicked600','assets/images/Buttons/ButtonClicked_600px.png')
		this.load.image('buttonBackgroundClicked735','assets/images/Buttons/ButtonClicked_735px.png')
		this.load.image('buttonBackgroundHover450','assets/images/Buttons/ButtonHover_450px.png')
		this.load.image('buttonBackgroundHover600','assets/images/Buttons/ButtonHover_600px.png')
		this.load.image('buttonBackgroundHover735','assets/images/Buttons/ButtonHover_735px.png')
	}

	create () {
		this.anims.create({
            key: 'white_run',
            frames: [
                { key: 'white_run1' },
                { key: 'white_run2' },
                { key: 'white_run3' }
            ],
            frameRate: 8,
            repeat: -1
        })

		this.anims.create({
            key: 'white_jump',
            frames: [
                { key: 'white_jump1' },
                { key: 'white_jump2' },
                { key: 'white_jump3' },
                { key: 'white_jump4' },
                { key: 'white_jump5' }
            ],
            frameRate: 6,
            repeat: 0
        })

		this.anims.create({
            key: 'black_run',
            frames: [
                { key: 'black_run1' },
                { key: 'black_run2' },
                { key: 'black_run3' }
            ],
            frameRate: 8,
            repeat: -1
        })

		this.anims.create({
            key: 'black_jump',
            frames: [
                { key: 'black_jump1' },
                { key: 'black_jump2' },
                { key: 'black_jump3' },
                { key: 'black_jump4' },
                { key: 'black_jump5' }
            ],
            frameRate: 6,
            repeat: 0
        })

		this.anims.create({
            key: 'fire',
            frames: [
                { key: 'obstacle2' },
                { key: 'fire2' },
                { key: 'fire3' }
            ],
            frameRate: 8,
            repeat: -1
        })

		this.anims.create({
            key: 'crow',
            frames: [
                { key: 'raven1' },
                { key: 'raven2' },
				{ key: 'raven3' }
                
            ],
            frameRate: 8,
            repeat: -1
        })
		
		this.scene.start('Menu')
	}
}
