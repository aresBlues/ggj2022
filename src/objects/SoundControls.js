import config from '../config'
import store from '../store'

export default class SoundControls extends Phaser.GameObjects.Container {
	constructor (scene) {
		super(scene)
		scene.sound.volume = store.state.player.volume
		
		const background = new Phaser.GameObjects.Rectangle(scene, 0, 0, 400, 100, 0xffffff, 0.4)
		background.setOrigin(0, 0)
		const soundText = new Phaser.GameObjects.Text(
			scene,
			250,
			50,
			'' + Math.round(store.state.player.volume * 100),
			{
				...config.menuFontStyle,
				fontSize: '80px'
			}
		)
		soundText.setOrigin(0.5, 0.5)
		
		const increaseButtonText = new Phaser.GameObjects.Text(
			scene,
			150,
			50,
			'+',
			{
				...config.menuFontStyle,
				fontSize: '80px'
			}
		)
		increaseButtonText.setOrigin(0.5, 0.5)
		
		const increaseButton = new Phaser.GameObjects.Zone(
			scene,
			100,
			0,
			100,
			100
		)
		increaseButton.setOrigin(0, 0)
		increaseButton.setInteractive()
		increaseButton.on('pointerdown', () => {
			// increase volumne
			const { muted, volume, previousVolume } = store.state.player
			const nextVolume = Math.min((muted ? previousVolume : volume) + 0.05, 1)
			store.dispatch('player/updateSound', {
				volume: muted ? volume : nextVolume,
				previousVolume: muted ? nextVolume : previousVolume,
				muted
			})
				.then(() => {
					if (!muted) {
						scene.sound.volume = nextVolume
					}
					soundText.setText('' + Math.round(nextVolume * 100))
				})
		})

		const decreaseButtonText = new Phaser.GameObjects.Text(
			scene,
			350,
			50,
			'-',
			{
				...config.menuFontStyle,
				fontSize: '80px'
			}
		)
		decreaseButtonText.setOrigin(0.5, 0.5)
		const decreaseButton = new Phaser.GameObjects.Zone(
			scene,
			300,
			0,
			100,
			100
		)
		decreaseButton.setOrigin(0, 0)
		decreaseButton.setInteractive()
		decreaseButton.on('pointerdown', () => {
			// decrease volumne
			const { muted, volume, previousVolume } = store.state.player
			const nextVolume = Math.max((muted ? previousVolume : volume) - 0.05, 0)
			store.dispatch('player/updateSound', {
				volume: muted ? volume : nextVolume,
				previousVolume: muted ? nextVolume : previousVolume,
				muted
			})
				.then(() => {
					if (!muted) {
						scene.sound.volume = nextVolume
					}
					soundText.setText('' + Math.round(nextVolume * 100))
				})
		})
		
		const muteButton = new Phaser.GameObjects.Image(
			scene,
			50,
			50,
			store.state.player.muted ? 'muted' : 'unmuted'
		)
		muteButton.setOrigin(0.5, 0.5)
		muteButton.setInteractive()
		muteButton.on('pointerdown', () => {
			if (store.state.player.muted) {
				const newVolume = store.state.player.previousVolume
				store.dispatch('player/updateSound', {
					volume: newVolume,
					previousVolume: 0,
					muted: false
				})
					.then(() => {
						scene.sound.volume = newVolume
						muteButton.setTexture('unmuted')
					})
			} else {
				store.dispatch('player/updateSound', {
					volume: 0,
					previousVolume: scene.sound.volume,
					muted: true
				})
					.then(() => {
						scene.sound.volume = 0
						muteButton.setTexture('muted')
					})
			}
		})
		
		this.add(background)
		this.add(muteButton)
		this.add(decreaseButtonText)
		this.add(decreaseButton)
		this.add(soundText)
		this.add(increaseButtonText)
		this.add(increaseButton)
	}
}
