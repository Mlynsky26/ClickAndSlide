export class Cell {
    constructor(i, j, type) {
        this.i = i
        this.j = j
        this.type = type
        this.cellHtml = document.createElement("div")
    }
    cleateElement(scale, currentImage) {
        const { cellHtml } = this
        cellHtml.style.width = scale + "px"
        cellHtml.style.height = scale + "px"
        cellHtml.style.backgroundImage = `url('img/${currentImage}.jpg')`
        cellHtml.id = this.j + "x" + this.i
        cellHtml.value = this.j + "x" + this.i
        cellHtml.style.backgroundPositionX = -scale * this.j + "px"
        cellHtml.style.backgroundPositionY = -scale * this.i + "px"
    }
    cleateBlancElement(scale) {
        this.cellHtml.style.width = scale + "px"
        this.cellHtml.style.height = scale + "px"
        this.cellHtml.id = this.i + "x" + this.j
        this.cellHtml.value = this.i + "x" + this.j
    }

}