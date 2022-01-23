/* global Phaser */
import Bowser from 'bowser'

import BootScene from './scenes/Boot'
import MainScene from './scenes/Main'
import SplashScene from './scenes/Splash'
import MenuScene from './scenes/Menu'
import GameOverScene from './scenes/GameOver'
import CreditsScene from './scenes/Credits'

const DEFAULT_WIDTH = 1920
const DEFAULT_HEIGHT = 1080

export default {
	type: Phaser.CANVAS, // Bowser.getParser(window.navigator.userAgent).getOSName() === 'iOS' ? Phaser.CANVAS : Phaser.AUTO,
	backgroundColor: '#ffffff',
	scale: {
		parent: 'phaser-game',
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: DEFAULT_WIDTH,
		height: DEFAULT_HEIGHT
	},
	scene: [BootScene, SplashScene, MainScene, MenuScene, GameOverScene, CreditsScene],
	webfonts: [],
	menuFontStyle: {
		fontSize: '50px',
		fontFamily: '"Amatic SC"',
		fontStyle: '700',
		color: '#000'
	}
}
