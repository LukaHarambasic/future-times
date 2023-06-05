import LocalStorageServiceInstance from './LocalStorageService'

let instance

class UserInputFieldHandler {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }
    instance = this

    this.inputElement = document.getElementById('input')
  }

  enable() {
    if (!LocalStorageServiceInstance.isMobile) return
    this.inputElement.style.display = 'block'
    this.inputElement.focus()
  }

  disable() {
    if (!LocalStorageServiceInstance.isMobile) return
    this.inputElement.style.display = 'none'
  }
}

const UserInputFieldHandlerInstance = Object.freeze(new UserInputFieldHandler())

export default UserInputFieldHandlerInstance
