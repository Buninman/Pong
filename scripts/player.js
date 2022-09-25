export default class Player {
    constructor(Game, playerSet) {
        this.set = Game.set
        this.classBall = Game.ball
        this.ball = Game.set.ball
        this.print = Game.print
        this.player = playerSet
        this.keyMap = new Map(playerSet.keys)
        document.addEventListener('keydown', (e) => this.keyController(e, true))
        document.addEventListener('keyup', (e) => this.keyController(e, false))

        this.shadowUp = 0
        this.shadowDown = 0

        this.yellowZone = true
        this.ballReversStatus = true
    }

    keyController(e, state) {
        if(this.keyMap.has(e.keyCode)) {
            this[this.keyMap.get(e.keyCode)] = state
        }
    }

    move() {
        const plHeight = this.set.playerHeight
        const plSpeed = this.set.playerSpeed
        const plBorder = this.set.playerBorder
        const boxHeight = this.set.boxHeight

        if (this.up) {
            if (this.player.y > plBorder) {
                this.player.y -= (1 * plSpeed)
            } else { 
                this.player.y = (0 + plBorder) }
            this.shadowUp = (plSpeed * 2)
        }
        else if (this.down) {
            if ((this.player.y + plHeight + plBorder) < boxHeight) {
                this.player.y += (1 * plSpeed)
            } else { 
                this.player.y = (boxHeight - plHeight - plBorder) }
            this.shadowDown = (plSpeed * 2)
        } else {
            this.shadowUp = 0
            this.shadowDown = 0
        }
    }

    checkYellowZone() {
        const plHeight = this.set.playerHeight

        if(this.ball.y > (this.player.y - this.shadowUp)
        && this.ball.y < (this.player.y + plHeight + this.shadowDown)) {
            this.yellowZone = true
        } else {
            this.yellowZone = false
        }
    }

    checkCollisionWithBall() {
        const plHeight = this.set.playerHeight

        let dx = this.ball.x - this.player.x
        let dy = this.ball.y - (this.player.y - this.shadowUp)
        let dyF = this.ball.y - (this.player.y + plHeight + this.shadowDown)
        let dX = Math.sqrt(Math.pow(dx, 2))
        let dY = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
        let dYF = Math.sqrt(Math.pow(dx, 2) + Math.pow(dyF, 2))
        
        if (dX <= this.set.ballRadius + this.set.playerRadius) {
            if (this.yellowZone && this.ballReversStatus) {
                this.ball.dx = this.classBall.reverseBall(this.ball.dx)
                this.classBall.speedМagnifier()
                this.ballReversStatus = false
                setTimeout(() => {
                    this.ballReversStatus = true
                }, '500')
            }
        }
        if (this.ball.dy > 0) {
            if (dY <= this.set.ballRadius + this.set.playerRadius) {
                if (!this.yellowZone) {
                    this.ball.dy = this.classBall.reverseBall(this.ball.dy)
                    this.ball.dx = this.classBall.reverseBall(this.ball.dx)
                    this.classBall.speedМagnifier()
                    this.ballReversStatus = false
                    setTimeout(() => {
                        this.ballReversStatus = true
                    }, '500')
                }
            }
        }
        if (this.ball.dy < 0) {  
            if (dYF <= this.set.ballRadius + this.set.playerRadius) {
                if (!this.yellowZone) {
                    this.ball.dy = this.classBall.reverseBall(this.ball.dy)
                    this.ball.dx = this.classBall.reverseBall(this.ball.dx)
                    this.classBall.speedМagnifier()
                    this.ballReversStatus = false
                    setTimeout(() => {
                        this.ballReversStatus = true
                    }, '500')
                }
            }
        }
    }

    defaultSet() {
        this.player.y = this.set.playerYDefault
    }

    draw() {
        let x = this.player.x
        let yStart = this.player.y
        let yFinish = (this.player.y + this.set.playerHeight)
        const plColor = this.player.color
        const plWidth = (this.set.playerRadius * 2)
        
        this.print.drawPlayer(x, yStart, yFinish, plWidth, plColor)
    }

    update() {
        this.checkYellowZone()
        this.checkCollisionWithBall()
        this.move()
        this.draw()
    }

    support() {
        const plHeight = this.set.playerHeight
        let x = this.player.x
        let yS = (this.player.y - this.shadowUp)
        let yF = (this.player.y + plHeight + this.shadowDown)
        
        this.print.drawShadowPlayer(x, yS, yF)
        this.print.drawYellowZone(x, yS, yF)
    }
}