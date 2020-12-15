// soal & jawaban 1
// Release 0
class Animal {
    constructor(name, legs = 4, cold_blooded = false) {
        this._name = name
        this._legs = legs
        this._cold_blooded = cold_blooded
    }

    get name() {
        return this._name
    }

    get legs() {
        return this._legs
    }

    get cold_blooded() {
        return this._cold_blooded
    }
}
var sheep = new Animal("shaun");

console.log(sheep.name) // "shaun"
console.log(sheep.legs) // 4
console.log(sheep.cold_blooded) // false

// Release 1
class Ape extends Animal {
    constructor(name, legs = 2) {
        super(name)
        this._legs = legs
    }

    yell() {
        return 'Auooo'
    }
}

class Frog extends Animal {
    constructor(name) {
        super(name)
    }

    jump() {
        return 'hop hop'
    }
}

var sungokong = new Ape("kera sakti")
console.log(sungokong.yell()) // "Auooo"

var kodok = new Frog("buduk")
console.log(kodok.jump()) // "hop hop"


// soal & jawaban 2
class Clock {
    constructor({ template }) {
        this._template = template;
    }

    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this._template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }

    stop() {
        clearInterval(this.timer);
    }
}

var clock = new Clock({ template: 'h:m:s' });
clock.start();
clock.stop();