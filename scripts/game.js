import Setting from './setting.js'
import Player from './player.js'
import Ball from './ball.js'
import Printer from './printer.js'

class Game {
    constructor() {
        this.set = new Setting()
        this.print = new Printer(this.set)
        this.ball = new Ball(this)
        this.playerL = new Player(this, this.set.playerL)
        this.playerR = new Player(this, this.set.playerR)
        this.reqId = true
        this.firstLaunch()
    }

    firstLaunch() {
        this.print.drawBackground()
  	    //this.support()
        this.playerL.draw()
        this.playerR.draw()
        this.print.drawScore()
        this.print.drawBriefing()
        this.ball.dropBall()
        this.print.drawBallDirection(4)
        this.print.centerText('3')
        setTimeout(() => {
            this.print.clear('text'),
            this.print.centerText('2') }, 800)
        setTimeout(() => {
            this.print.clear('text'),
            this.print.centerText('1') }, 1600)
        setTimeout(() => {
            this.print.clear('text'),
            this.print.centerText('Go')}, 2400)
        setTimeout(() => {
            this.print.clear('text'),
            this.print.clear('other')
            this.start(this.reqId) }, 3200)
    }

    start(reqId) {
        if (reqId) {
            this.reqId = requestAnimationFrame((t) => this.timeLoop(t))
        }
    }

    timeLoop(t) {
    
        this.print.clear('gamelayer')
        this.ball.update()
        this.playerL.update()
        this.playerR.update()
   		//this.support()
        this.start(this.reqId)
    }

    reStart(align) {
        this.reqId = false
        setTimeout(() => {
            this.print.clear('gamelayer')
            this.playerL.defaultSet()
            this.playerR.defaultSet()
            this.ball.defaultSet()
            this.playerL.draw()
            this.playerR.draw()
            this.ball.draw()
        	//this.support()
            this.ball.dropBall(align)
            this.print.drawBallDirection()
        }, '800')
        setTimeout(() => {
              this.print.clear('other')
            this.reqId = true
            this.start(this.reqId)
        }, '2400')
    }

    support() {
        this.print.clear('support')
        this.playerL.support()
        this.playerR.support()
        this.print.drawAngleZone()
    }
}

window.onload = () => {
    const game = new Game()
}