import { Scene } from 'phaser'
import Ai from './prefabs/Ai'
import Consts from './../../core/utils/Consts'
import AiServiceInstance from './AiService'

const { width, height, centerX, centerY, fontSize, fontWhite, fontYellow, size } = Consts

export default class AiScene extends Scene {
  constructor() {
    super('aiScene')
    this.userInput = 'Im just the best human on earth'
  }

  create() {
    this._buildBackground()
    this._buildList()
    this._fetchChat()
    this.ai = new Ai(this)
  }

  preload() {
    // TODO install via npm
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI',
    })
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_transparent').setOrigin(0, 0)
  }

  async _fetchChat() {
    const messages = await AiServiceInstance.chat(this.userInput)
    // TODO handle this case
    if (!messages) return
    const filteredMessages = messages.filter(({ role }) => role !== 'system')
    const uiMessages = [{ role: 'assistant', content: 'You have three tries to convince me.' }, ...filteredMessages]

    this.list.setItems(uiMessages)
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
          top: 110,
          bottom: 20,
        },
        mouseWheelScroller: true,
        createCellContainerCallback: function (cell, cellContainer) {
          const { width, item } = cell
          const direction = item.role === 'user' ? 'right' : 'left'
          if (cellContainer === null) {
            cellContainer = this._buildEmptyCellContainer(direction).setOrigin(0)
          }
          cellContainer.setMinWidth(width)
          cellContainer.getElement('content').setText(item.content)
          // FIX scope isn't working
          //   cellContainer.getElement('bubble').setUpdateShapesCallback(this._buildBubble(item.direction))
          cellContainer.setDirty(true).layout().setDirty(false)
          cell.height = cellContainer.height + 10
          return cellContainer
        }.bind(this),
        items: [],
      })
      .layout()
  }

  _buildEmptyCellContainer(direction) {
    return this.rexUI.add
      .sizer({
        orientation: 'x',
        space: { left: 25, right: 25, top: 10, bottom: 10, item: 10 },
      })
      .addBackground(this._buildSpeechBubbleShape(), 'bubble')
      .setAlpha(0.2)
      .add(
        this._buildEmptyText(direction), // child
        1, // proportion
        direction, // align vertically
        0, // padding
        false, // expand vertically
        'content', // map-key
      )
  }

  _buildBubble(direction) {
    // TODO consts
    const radius = 20
    const indent = 15
    const strokeColor = 0x00ffff
    const fillColor = 0x00ffff

    const left = 0 + indent
    const right = this.width - indent
    const top = 0
    const bottom = this.height

    if (direction === 'left') {
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

  _buildSpeechBubbleShape() {
    // TODO Figure out if this is still needed
    return this.rexUI.add.customShapes({
      create: { lines: 1 },
    })
  }

  _buildEmptyText(direction) {
    // TODO bitmap text - or as contrast a modern font
    const alignment = direction === 'left' ? 0 : 2
    const fontColor = direction === 'left' ? fontWhite : fontYellow
    return this.rexUI.wrapExpandText(this.add.bitmapText(0, 0, fontColor, '', fontSize.body, alignment))
  }
}
