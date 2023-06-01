// Title: Future Times
// Author: Luka Harambasic
// Hours:

import { Game, WEBGL, Scale } from 'phaser'
import './style.css'
import Consts from './core/utils/Consts'
import LoadingScene from './features/loading/LoadingScene'
import NameScene from './features/name/NameScene'
import MenuScene from './features/menu/MenuScene'

const { width, height } = Consts

const canvasElement = document.getElementById('game')

const CONFIG = {
  type: WEBGL,
  mode: Scale.FIT,
  width: width,
  height: height,
  canvas: canvasElement,
  scene: [LoadingScene, NameScene, MenuScene],
}

new Game(CONFIG)
