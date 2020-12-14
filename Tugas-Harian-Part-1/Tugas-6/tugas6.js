// soal & jawaban 1

// let
// luas lingkaran
var v = 22 / 7

let luasLingkaran = (r = 15) => {
    return parseFloat(v * (r ** 2)).toFixed(2)
}

// keliling lingkaran
const kelilingLingkaran = (r = 15) => {
    return parseFloat(2 * (v * r)).toFixed(2)
}

console.log(luasLingkaran())
console.log(kelilingLingkaran())



// soal & jawaban 2
let kalimat = ""

const addKalimat = (kal) => kal

kalimat = `${addKalimat("saya")} ${addKalimat("adalah")} ${addKalimat("seorang")} ${addKalimat("frontend")} ${addKalimat("developer")}`
console.log(kalimat)



// soal & jawaban 3
const newFunction = (firstName, lastName) => {
    return {
        firstName,
        lastName,
        fullName() {
            return `${firstName} ${lastName}`;
        }
    }
}

console.log(newFunction("William", "Imoh").fullName())



// soal & jawaban 4
const newObject = {
    firstName: "Harry",
    lastName: "Potter Holt",
    destination: "Hogwarts React Conf",
    occupation: "Deve-wizard Avocado",
    spell: "Vimulus Renderus!!!"
}

const { firstName, lastName, destination, occupation, spell } = newObject
console.log(firstName, lastName, destination, occupation, spell)



// soal & jawaban 5
const west = ["Will", "Chris", "Sam", "Holly"]
const east = ["Gill", "Brian", "Noel", "Maggie"]
const combined = [...west, ...east]

console.log(combined)