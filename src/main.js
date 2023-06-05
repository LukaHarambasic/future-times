// Title: Future Times
// Author: Luka Harambasic
// Hours:

import { Game, CANVAS, Scale } from 'phaser'
import './style.css'
import Consts from './core/utils/Consts'
import LoadingScene from './features/loading/LoadingScene'
import NameScene from './features/name/NameScene'
import MenuScene from './features/menu/MenuScene'
import GameScene from './features/game/GameScene'
import AiScene from './features/game/AiScene'
import SurvivorScene from './features/survivor/SurvivorScene'
import CreditsScene from './features/credits/CreditsScene'
import LocalStorageServiceInstance from './core/LocalStorageService'

const { width, height } = Consts

const canvasElement = document.getElementById('game')

// TODO handle size for desktops, e.g. use iphone size and center it

const CONFIG = {
  type: CANVAS,
  mode: Scale.FIT,
  width: width,
  height: height,
  canvas: canvasElement,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  scene: [LoadingScene, NameScene, MenuScene, GameScene, AiScene, SurvivorScene, CreditsScene],
}

new Game(CONFIG)

// Inspired by: https://browsergameshub.com/check-player-is-on-mobile-or-desktop
window.addEventListener('touchstart', () => (LocalStorageServiceInstance.isMobile = true))
