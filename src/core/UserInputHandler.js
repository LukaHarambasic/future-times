import LocalStorageServiceInstance from './LocalStorageService'

let instance

// TODO check this experimental feature
// https://developer.mozilla.org/en-US/docs/Web/API/VirtualKeyboard_API#control_the_virtual_keyboard_on_contenteditable_elements
class UserInputFieldHandler {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }
    instance = this

    this.inputElement = document.getElementById('input')
  }

  enable() {
    console.log('enable')
    // if (!LocalStorageServiceInstance.isMobile) return
    this.inputElement.style.display = 'block'
    this.inputElement.focus()
  }

  disable() {
    console.log('disable')
    // if (!LocalStorageServiceInstance.isMobile) return
    this.inputElement.style.display = 'none'
  }
}

const UserInputFieldHandlerInstance = Object.freeze(new UserInputFieldHandler())

export default UserInputFieldHandlerInstance
