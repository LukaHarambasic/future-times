// Title: Future Times
// Author: Luka Harambasic
// Hours:

import { Game, WEBGL, Scale } from 'phaser'
// import { LoadingScene } from './scenes/LoadingScene'
// import { MenuScene } from './scenes/MenuScene'
// import { GameScene } from './scenes/GameScene'
// import { HighscoreScene } from './scenes/HighscoreScene'
// import { CreditScene } from './scenes/CreditScene'
// import { StoryScene } from './scenes/StoryScene'
// import { Style } from './utils/Style'
import './style.css'
import Consts from './core/utils/Consts'
// TODO why the hell are named imports not working for objects?
const { width, height } = Consts

const canvasElement = document.getElementById('game')

console.log(width, height)

const CONFIG = {
  type: WEBGL,
  mode: Scale.FIT,
  width: width,
  height: height,
  canvas: canvasElement,
  scene: [],
}

new Game(CONFIG)

