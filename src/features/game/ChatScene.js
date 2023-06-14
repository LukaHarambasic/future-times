import { Scene } from 'phaser'
import Ai from './prefabs/Ai'
import Consts from '../../core/utils/Consts'
import AiService from './AiService'
import LocalStorageServiceInstance from '../../core/LocalStorageService'

const { width, height, centerX, centerY, fontSize, fontWhite, fontYellow } = Consts

export default class ChatScene extends Scene {
  constructor() {
    super('chatScene')
  }

  preload() {
    // TODO install via npm
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI',
    })
  }

  init(aiService) {
    console.log('chat scene init')
    console.log('input', aiService.id)
    const isInitiated = !aiService
    console.log('isInitiated', isInitiated)
    this.aiService = isInitiated ? new AiService() : aiService
    console.log('local', this.aiService.id)
    console.log('----------------------------------')
  }

  create() {
    console.log('chat scene create')
    this.sound.removeByKey('game')
    this.sound.add('background', { volume: 0.2, loop: true }).play()
    this._buildBackground()
    this._buildList()
    this._fetchChatAndRefreshList()
    this.ai = new Ai(this)
    this._buildChatButton()
    this._handleChatNavigation()
  }

  update() {
    this._handleAttemptsExceeded()
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_transparent').setOrigin(0, 0)
  }

  _buildChatButton() {
    // TODO button class/component or an image?
    this.chatButton = this.add
      .bitmapText(width / 2, height - 100, fontWhite, 'Chat', fontSize.title)
      .setOrigin(0.5, 0)
      .setInteractive()
  }

  _handleChatNavigation() {
    this.chatButton.on('pointerover', () => {
      // this.scene.pause()
      console.log('chat')
      console.log(this.aiService)
      this.scene.launch('inputScene', this.aiService)
    })
  }

  async _fetchChatAndRefreshList() {
    console.log('fetching chat')
    const messages = this.aiService.allMessages
    // TODO handle this case
    if (!messages) return
    const filteredMessages = messages.filter(({ role }) => role !== 'system')
    // TODO filter out CONVINCED
    const userName = LocalStorageServiceInstance.userName
    const uiMessages = [
      { role: 'assistant', content: `${userName} convince me that you are worth working in the factory.` },
      ...filteredMessages,
    ]
    this.list.setItems(uiMessages)
    this.list.refresh()
    this.list.scrollToBottom()
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
          top: 120,
          bottom: 200,
        },
        mouseWheelScroller: true,
        createCellContainerCallback: function (cell, cellContainer) {
          const { width, item } = cell
          if (cellContainer === null) {
            cellContainer = this._buildEmptyCellContainer(item.role).setOrigin(0)
          }
          cellContainer.setMinWidth(width)
          cellContainer.getElement('content').setText(item.content)
          // FIX assumption: scope isn't working
          // cellContainer.getElement('bubble').setUpdateShapesCallback(this._buildBubble(item.direction))
          cellContainer.setDirty(true).layout().setDirty(false)
          cell.height = cellContainer.height + 10
          return cellContainer
        }.bind(this),
        items: [],
      })
      .layout()
  }

  _buildEmptyCellContainer(role) {
    const direction = role === 'user' ? 'right' : 'left'
    return this.rexUI.add
      .sizer({
        orientation: 'x',
        space: { left: 25, right: 25, top: 10, bottom: 10, item: 10 },
      })
      .addBackground(this._buildSpeechBubbleShape(), 'bubble')
      .setAlpha(0.2)
      .add(this._buildEmptyText(role), 1, direction, 0, false, 'content')
  }

  _buildBubble(role) {
    // TODO consts
    const radius = 20
    const indent = 15
    const strokeColor = 0x00ffff
    const fillColor = 0x00ffff

    const left = 0 + indent
    const right = this.width - indent
    const top = 0
    const bottom = this.height

    if (role === 'user') {
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
    } else {
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
    }
  }

  _buildSpeechBubbleShape() {
    return this.rexUI.add.customShapes({
      create: { lines: 1 },
    })
  }

  _buildEmptyText(role) {
    const alignment = role === 'user' ? 2 : 0
    const fontColor = role === 'user' ? fontWhite : fontYellow
    return this.rexUI.wrapExpandText(this.add.bitmapText(0, 0, fontColor, '', fontSize.body, alignment))
  }

  _handleAttemptsExceeded() {
    if (this.aiService.isConvinced) {
      console.log('convinced')
      this.scene.resume('gameScene')
    }
    if (this.aiService.areAttempsExceeded) {
      console.log('attempts exceeded, game over')
      this.scene.start('gameOverScene')
    } else {
      // TODO do nothing
      console.log('attempts left', this.aiService.attemptsLeft)
    }
  }
}
