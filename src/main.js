// Title: Future Times
// Author: Luka Harambasic
// Hours: 

import { Game, WEBGL } from 'phaser'
import { LoadingScene } from './scenes/LoadingScene'
import { MenuScene } from './scenes/MenuScene'
import { GameScene } from './scenes/GameScene'
import { HighscoreScene } from './scenes/HighscoreScene'
import { CreditScene } from './scenes/CreditScene'
import { StoryScene } from './scenes/StoryScene'
import { Style } from './utils/Style'
import './style.css'

const canvasElement = document.getElementById('game')

export const CONFIG = {
  type: WEBGL,
  width: 640,
  height: 720,
  canal: 64,
  playableArea: 640 - 64 * 2,
  shipWidth: 24,
  canvas: canvasElement,
  backgroundColor: Style.dark,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  scene: [LoadingScene, MenuScene, GameScene, HighscoreScene, CreditScene, StoryScene],
}

new Game(CONFIG)
