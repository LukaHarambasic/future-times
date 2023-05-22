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
import { Consts } from './utils/Consts'

const canvasElement = document.getElementById('game')

const CONFIG = {
  type: WEBGL,
  mode: Scale.FIT,
  width: Consts.width,
  height: Consts.height,
  canvas: canvasElement,
  scene: [],
}

new Game(CONFIG)
