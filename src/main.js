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
import AiService from './features/game/AiService'
const { width, height } = Consts

const canvasElement = document.getElementById('game')

const CONFIG = {
  type: WEBGL,
  mode: Scale.FIT,
  width: width,
  height: height,
  canvas: canvasElement,
  scene: [],
}

new Game(CONFIG)


(async () => {
  try {
    const ai = new AiService()
    console.log(await ai.chat("I'm the best worker in this factory."))
  } catch (e) {
      // Deal with the fact the chain failed
  }
})();