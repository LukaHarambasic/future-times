export class Consts {
    constructor() {
      throw new Error('Static class cannot be instantiated.')
    }

    static width = window.innerWidth;

    static height = window.innerHeight;

    static centerX = this.width / 2;

    static centerY = this.height / 2;

    static small = 10;
    
    static medium = 20;

    static large = 30;
}