let 秒 = 0
let sprite: game.LedSprite = null
let 失敗 = 0
function 贏的畫面 () {
    for (let index = 0; index < 3; index++) {
        basic.showLeds(`
            # . # . #
            . # . # .
            # . # . #
            . # . # .
            # . # . #
            `)
        basic.showLeds(`
            . # . # .
            # . # . #
            . # . # .
            # . # . #
            . # . # .
            `)
    }
    basic.clearScreen()
    basic.showString("You win!")
}
input.onButtonPressed(Button.A, function () {
    秒 = 400
    if (sprite.get(LedSpriteProperty.X) == 2) {
        game.addScore(1)
    }
    if (sprite.get(LedSpriteProperty.X) != 2) {
        失敗 += -1
    }
    if (失敗 == 0) {
        sprite.delete()
        basic.clearScreen()
        basic.showString("" + (game.score()))
        basic.pause(500)
    } else {
        if (game.score() == 1) {
            秒 = 300
        }
        if (game.score() == 2) {
            秒 = 200
        }
        if (game.score() >= 3) {
            秒 = 100
        }
    }
    if (失敗 == 0) {
        if (game.score() >= 4) {
            贏的畫面()
        }
        if (game.score() < 4) {
            輸的畫面()
        }
    }
})
function 輸的畫面 () {
    for (let index = 0; index < 2; index++) {
        basic.showLeds(`
            # . . . #
            . . . . .
            . . . . .
            . . . . .
            # . . . #
            `)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # . # .
            . . . . .
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    }
    basic.clearScreen()
    basic.showString("You lose!")
}
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    失敗 = 3
    秒 = 400
    game.setScore(0)
    sprite = game.createSprite(2, 2)
    while (game.isRunning()) {
        sprite.move(1)
        basic.pause(秒)
        sprite.ifOnEdgeBounce()
    }
})
