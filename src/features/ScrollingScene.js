import { Scene } from 'phaser'
import Consts from './../core/utils/Consts'
import AiServiceInstance from './game/AiService'

const { width, height, centerX, centerY } = Consts

// Implementation by https://codepen.io/rexrainbow/pen/bGgKbmv
export default class ScrollingScene extends Scene {
  constructor() {
    super('scrollingScene')
    console.log('scrollingScene')
  }

  preload() {
    // TODO install via npm
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI',
    })
  }

  async create() {
    console.log('create')
    this._buildList()
    // User input
    this.list.setItems(await AiServiceInstance.chat())
    this.list.refresh()
  }

  _buildList() {
    this.list = this.rexUI.add
      .gridTable({
        x: centerX,
        y: centerY,
        width: width,
        height: height,
        scrollMode: 0,
        table: {
          columns: 1,
          mask: {
            padding: 1,
          },
          reuseCellContainer: true,
        },
        space: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        },
        mouseWheelScroller: true,
        createCellContainerCallback: function (cell, cellContainer) {
          console.log('createCellContainerCallback')
          console.log(this)
          const { scene, width, item } = cell
          console.log(item)
          if (cellContainer === null) {
            cellContainer = this._buildEmptyCellContainer(scene).setOrigin(0)
          }
          cellContainer.setMinWidth(width)
          cellContainer.getElement('content').setText(item.content)
          //   cellContainer.getElement('bubble').setUpdateShapesCallback(this._buildBubble(item.direction))
          cellContainer.setDirty(true).layout().setDirty(false)
          cell.height = cellContainer.height + 10
          return cellContainer
        }.bind(this),
        items: [],
      })
      .layout()
      .drawBounds(this.add.graphics(), 0xff0000)
  }

  _buildEmptyCellContainer(scene) {
    console.log('_buildEmptyCellContainer')
    return scene.rexUI.add
      .sizer({
        orientation: 'x',
        space: { left: 25, right: 25, top: 10, bottom: 10, item: 10 },
      })
      .addBackground(this._buildSpeechBubbleShape(scene), 'bubble')
      .setAlpha(0.2)
      .add(
        this._buildEmptyText(scene), // child
        1, // proportion
        'center', // align vertically
        0, // padding
        false, // expand vertically
        'content', // map-key
      )
  }

  _buildBubble(side) {
    console.log('_buildBubble')
    console.log(this.list)
    // TODO consts
    const radius = 20
    const indent = 15
    const strokeColor = 0x00ffff
    const fillColor = 0x00ffff

    const left = 0 + indent
    const right = this.width - indent
    const top = 0
    const bottom = this.height

    if (side === 'left') {
      this.list
        .getShapes()[0]
        .lineStyle(2, 0x00ffff, 1)
        .fillStyle(0xff0000, 1)
        .startAt(left + radius, top)
        .lineTo(right - radius, top)
        .arc(right - radius, top + radius, radius, 270, 360)
        .lineTo(right, bottom - radius)
        .arc(right - radius, bottom - radius, radius, 0, 90)
        .lineTo(0, bottom)
        .lineTo(left, bottom - radius)
        .lineTo(left, top + radius)
        .arc(left + radius, top + radius, radius, 180, 270)
        .close()
    } else {
      this.list
        .getShapes()[0]
        .lineStyle(2, strokeColor, 1)
        .fillStyle(fillColor, 1)
        .startAt(left + radius, top)
        .lineTo(right - radius, top)
        .arc(right - radius, top + radius, radius, 270, 360)
        .lineTo(right, bottom - radius)
        .lineTo(this.width, bottom)
        .lineTo(left + radius, bottom)
        .arc(left + radius, bottom - radius, radius, 90, 180)
        .lineTo(left, top + radius)
        .arc(left + radius, top + radius, radius, 180, 270)
        .close()
    }
  }

  _buildSpeechBubbleShape(scene) {
    console.log('_buildSpeechBubbleShape')
    return scene.rexUI.add.customShapes({
      create: { lines: 1 },
    })
  }

  _buildEmptyText(scene) {
    console.log('_buildEmptyText')
    return scene.rexUI.wrapExpandText(scene.add.text(0, 0, ''))
  }
}
