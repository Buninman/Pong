export default class Canvas {
    constructor(setting) {
        this.set = setting
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d') 
        this.canvas.width = this.set.boxWidth
        this.canvas.height = this.set.boxHeight
        document.querySelector('#game').appendChild(this.canvas)
    }

    drawText(text, x, y, fontSize, color = this.set.textColor, align = "center", baseline = 'middle') {
        this.ctx.fillStyle = color
        this.ctx.font = `bold ${fontSize} 'Fira Mono', monospace`
        this.ctx.textAlign = align
        this.ctx.textBaseline = baseline
        this.ctx.fillText(text, x, y)
    }

    drawLine(xS, yS, xF, yF, lineWidth, color) {
        this.ctx.lineCap = 'round'
        this.ctx.beginPath()
        this.ctx.moveTo(xS, yS)
        this.ctx.lineTo(xF, yF)
        this.ctx.lineWidth = lineWidth 
        this.ctx.strokeStyle = color
        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawRectangleRound(x, y, width, height, radius, color) {
        this.ctx.beginPath()
        this.ctx.moveTo(x + radius, y)
        this.ctx.lineTo(x + width - radius, y)
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius)       
        this.ctx.lineTo(x + width, y + height - radius)
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)        
        this.ctx.lineTo(x + radius, y + height)
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius)        
        this.ctx.lineTo(x, y + radius)
        this.ctx.quadraticCurveTo(x, y, x + radius, y)        
        this.ctx.closePath()
        this.ctx.fillStyle = color
        this.ctx.fill()
    }

    drawCircle(x, y, radius, fillColor, stroke = true) {
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, 0, Math.PI * 2) 
        this.ctx.fillStyle = fillColor
        this.ctx.fill()
        if (stroke) {
            this.ctx.lineWidth = 6
            this.ctx.strokeStyle = this.set.lineColor
            this.ctx.stroke()
        }
        this.ctx.closePath()
    }

    drawArc(radius, sAngle, eAngle, color = this.set.textColor) {
        const centerW = (this.set.boxWidth / 2)
        const centerH = (this.set.boxHeight / 2)

        this.ctx.lineCap = 'round'
        this.ctx.beginPath()
        this.ctx.arc(centerW, centerH, radius, sAngle, eAngle)
        this.ctx.lineWidth = 6
        this.ctx.strokeStyle = color
        this.ctx.stroke()
        this.ctx.closePath()
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}