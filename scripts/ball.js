export default class Ball {
    constructor(Game) {
        this.game = Game
        this.set = Game.set
        this.ball = Game.set.ball
        this.print = Game.print
    }  
    
    getRandom() {
        return Math.random() * (1 - 0.8) + 0.8
    }

    getRandomDirection() {
        if (Boolean(Math.round(Math.random()))) {
            return this.getRandom()
        } else { return -this.getRandom() }
    }

    dropBall(player) {
        this.ball.dx = this.getRandomDirection()
        this.ball.dy = this.getRandomDirection()
    
        switch (player) {
            case 'left':
                this.ball.dx = Math.abs(this.ball.dx)
                break
            case 'right':
                this.ball.dx = -Math.abs(this.ball.dx)
                break
        }
    }

    move() {
        this.ball.x += (this.ball.dx * this.ball.speed)
        this.ball.y += (this.ball.dy * this.ball.speed)
    }

    checkCollisionWithWalls() {
    let ballX = (this.ball.x + this.ball.dx)
    let ballY = (this.ball.y + this.ball.dy)
    const rightWall = (this.set.boxWidth - this.set.ballRadius)
    const leftWall = this.set.ballRadius
    const TopWall = this.set.ballRadius
    const BottomWall = (this.set.boxHeight - this.set.ballRadius)
        if (ballX >= rightWall) {
            this.ball.dx = this.reverseBall(this.ball.dx)
            this.goalProcess(this.set.playerL)
        }
        if (ballX <= leftWall) {
            this.ball.dx = this.reverseBall(this.ball.dx)
            this.goalProcess(this.set.playerR)
        }
        if (ballY >= BottomWall || ballY <= TopWall) {
            this.ball.dy = this.reverseBall(this.ball.dy)
        }
    }

    reverseBall(dir) {
        if (dir > 0) {
            return -this.getRandom()
        } else {
            return this.getRandom()
        }        
    }

    goalProcess(winner) {
        winner.score++
        this.print.clear('score')
        this.print.drawScore()
        this.print.clear('text')
        this.set.ballHitScore = 0
        this.print.drawGoal(winner.goalPointX, winner.color, winner.align)
        this.game.reStart(winner.align)
    } 

    speedМagnifier() {
        this.ball.speed += 0.1
        this.set.ballHitScore++
        this.print.clear('text')
        this.print.drawBallHit()
    }

    defaultSet() {
        this.ball.x = this.set.ballXDefault
        this.ball.y = this.set.ballYDefault
        this.ball.speed = this.set.ballSpeed
    }

    draw() {
        this.print.drawBall()
    }

    update() {
        this.checkCollisionWithWalls()
        this.move()
        this.draw()
    }
}