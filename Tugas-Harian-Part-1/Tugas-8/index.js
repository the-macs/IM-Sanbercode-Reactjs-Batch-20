// // soal & jawaban 1
var readBooks = require('./callback.js')

var book = [
    { name: 'LOTR', timeSpent: 3000 },
    { name: 'Fidas', timeSpent: 2000 },
    { name: 'Kalkulus', timeSpent: 4000 },
    { name: 'komik', timeSpent: 1000 }
]

// Tulis code untuk memanggil function readBooks di sini
const execute = (time, i) => {
    readBooks(time, book[i], function(check) {
        if (check !== 0) {
            i += 1
            execute(check, i)
        }
    })
}

execute(10000, 0)