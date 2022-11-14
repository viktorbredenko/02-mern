"use strict"

let ladder = {
    step: 0,
    up() {
        this.step++;
    },
    down() {
        this.step--;
    },
    showStep: function () { // показывает текущую ступеньку
        console.log(this.step);
    }

};

ladder.up().down()
ladder.showStep()


