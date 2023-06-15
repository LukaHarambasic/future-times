// Author: Luka Harambasic
// Movie adaption: Modern Times (1936)
// Phaser components:
// - Tweens
// - Timer
// - Atlas
// - Bitmaptext
// - Input
// - Animations
// Tilt:
// - Adapting an movie from 1930s to the current discussion around AI
// - Serverless function communicating with OpenAI (netlify/functions/ai.js)
// - Integrating the scroll plugin (src/features/game/ChatScene.js)
// - Highscore via Supabase (src/survivor/DbService.js) Survivor = Highscore -> didn't had the time to refactor it
// - Mobile first, everything adapts to every screen size
// - Using services incl. Singletons to decouple logic from the scenes
// - Text input that works on mobile and desktop
// - Not to forget the multiple sence stacked over each other... even worth than making this responsive :D

import { Game, CANVAS, Scale } from 'phaser'
import './style.css'
import Consts from './core/utils/Consts'
import LoadingScene from './features/loading/LoadingScene'
import NameScene from './features/name/NameScene'
import MenuScene from './features/menu/MenuScene'
import GameOverScene from './features/game/GameOverScene'
import SurvivorScene from './features/survivor/SurvivorScene'
import CreditsScene from './features/credits/CreditsScene'
import LocalStorageServiceInstance from './core/LocalStorageService'

const { width, height } = Consts

const canvasElement = document.getElementById('game')

const CONFIG = {
  type: CANVAS,
  mode: Scale.FIT,
  width: width,
  height: height,
  canvas: canvasElement,
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
  scene: [LoadingScene, NameScene, MenuScene, GameOverScene, SurvivorScene, CreditsScene],
}

new Game(CONFIG)

// Inspired by: https://browsergameshub.com/check-player-is-on-mobile-or-desktop
window.addEventListener('touchstart', () => (LocalStorageServiceInstance.isMobile = true))
