import Canvas from './canvas.js'

export default class Printer {
    constructor(setting) {
        this.set = setting
        this.ball = setting.ball
        this.canvas = new Map([
            ['background', new Canvas(this.set)],
            ['score', new Canvas(this.set)],
            ['support', new Canvas(this.set)],
            ['other', new Canvas(this.set)],
            ['text', new Canvas(this.set)],
            ['gamelayer', new Canvas(this.set)]
            ])
        this.bgCan = this.canvas.get('background')
        this.scoreCan = this.canvas.get('score')
        this.supCan = this.canvas.get('support')
        this.othCan = this.canvas.get('other')
        this.txtCan = this.canvas.get('text')
        this.gameCan = this.canvas.get('gamelayer')
        this.ballDirectionAngle = 0
    }

    drawBackground() {
        const width = this.set.boxWidth
        const height = this.set.boxHeight
        const boxRound = this.set.boxRound
        const boxColor = this.set.boxColor
        const lineW = this.set.lineWidth
        const lineColor = this.set.lineColor
        const plSpace = this.set.playerSpace
        const plBorder = this.set.playerBorder
        
        this.bgCan.drawRectangleRound(0, 0, width, height, boxRound, boxColor)
        this.bgCan.drawLine((width / 2), 0, (width / 2), height, lineW, lineColor)
        this.bgCan.drawCircle((width / 2), (height / 2), (height / 4), boxColor)
        this.bgCan.drawLine(plSpace, plBorder, plSpace, (height - plBorder), lineW, lineColor)
        this.bgCan.drawLine((width - plSpace), plBorder, (width - plSpace), (height - plBorder), lineW, lineColor)
    }

    drawBriefing() {
        const plLColor = this.set.playerL.color
        const plRColor = this.set.playerR.color
        const controlXL = (this.set.playerSpace * 2)
        const controlXR = this.set.boxWidth - (this.set.playerSpace * 2)
        const controlY = (this.set.boxHeight / 17)
    
        this.gameCan.drawText('keys:', controlXL , (controlY * 8), '15px', plLColor, 'left')
        this.gameCan.drawText('W and S', controlXL, (controlY * 9), '20px', plLColor, 'left')
        this.gameCan.drawText('keys:', controlXR, (controlY * 8), '15px', plRColor, 'right')
        this.gameCan.drawText('Arrows', controlXR, (controlY * 9), '20px', plRColor, 'right')
    }

    drawScore() {
        const plLColor = this.set.playerL.color
        const plRColor = this.set.playerR.color
        const plLScore = this.set.playerL.score
        const plRScore = this.set.playerR.score
        const scoreXL = (this.set.boxWidth / 9 * 4)
        const scoreXR = (this.set.boxWidth / 9 * 5)
        const scoreY = (this.set.boxHeight / 20)

        this.scoreCan.drawText(plLScore, scoreXL, scoreY, '40px', plLColor, 'right', 'top')
        this.scoreCan.drawText(plRScore, scoreXR, scoreY, '40px', plRColor, 'left', 'top')
    }

    drawBallDirection(int = 2) {
        if (this.ball.dx > 0 && this.ball.dy > 0) {
            this.ballDirectionAngle = 6.3
        } 
        if (this.ball.dx < 0 && this.ball.dy > 0) {
            this.ballDirectionAngle = 6.8
        }
        if (this.ball.dx < 0 && this.ball.dy < 0) {
            this.ballDirectionAngle = 7.3
        }  
        if (this.ball.dx > 0 && this.ball.dy < 0) {
            this.ballDirectionAngle = 7.8
        }
        this.loopBallDirection(this.ballDirectionAngle - int)
    }
    
    loopBallDirection(someAngle) {
        const rad = (this.set.boxHeight / 4)
        let angle = someAngle

        this.othCan.drawArc(rad, Math.PI * angle - 0.3, Math.PI * angle)
        setTimeout(() => {
            angle += 0.1
            if(angle <= this.ballDirectionAngle) {
                this.clear('other')
                this.loopBallDirection(angle)
            }
        }, '60') 
    }

    centerText(text, fontSize = '90px', color = this.set.textColor) {
        const centerW = (this.set.boxWidth / 2)
        const centerH = (this.set.boxHeight / 2)

        this.txtCan.drawText(text, centerW, centerH, fontSize, color)
    }

    drawBallHit() {
        this.centerText(this.set.ballHitScore, '70px', this.set.lineColor)
    }

    drawGoal(x, color, align) {
        this.txtCan.drawText('+1', x, this.ball.y, '20px', color, align)
        this.centerText('Goal!', '50px', color)
        setTimeout(() => {
            this.clear('text') }, '800')
    }

    drawBall() {
        let ballX = this.ball.x
        let ballY = this.ball.y
        let radius = this.set.ballRadius
        let color = this.set.ballColor
        
        this.gameCan.drawCircle(ballX, ballY, radius, color, false)
    }

    drawPlayer(xS, yS, yF, lineWidth, color) {
        this.gameCan.drawLine(xS, yS, xS, yF, lineWidth, color)
    }

    clear(canvas) {
        this.canvas.get(canvas).clear()
    }

    drawShadowPlayer(xS, yS, yF) {
        const color = this.set.supportColorYellow
        const plWidth = (this.set.playerRadius * 2)

        this.supCan.drawLine(xS, yS, xS, yF, plWidth, color)
    }

    drawYellowZone(x, yS, yF) {
        const color = this.set.supportColorYellow
        const center = (this.set.boxWidth / 2)

        this.supCan.drawLine(x, yS, center, yS, 1, color)
        this.supCan.drawLine(x, yF, center, yF, 1, color)
    }

    drawAngleZone() {
        const color = this.set.supportColorRed
        const radius = (this.set.boxHeight / 4)

        this.supCan.drawArc(radius, Math.PI * 0.2, Math.PI * 0.3, color)
        this.supCan.drawArc(radius, Math.PI * 0.7, Math.PI * 0.8, color)
        this.supCan.drawArc(radius, Math.PI * 1.2, Math.PI * 1.3, color)
        this.supCan.drawArc(radius, Math.PI * 1.7, Math.PI * 1.8, color)
    }
}