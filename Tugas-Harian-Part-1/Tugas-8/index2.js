// // soal & jawaban 1
var readBooksPromise = require('./promise.js')

var books = [
    { name: 'LOTR', timeSpent: 3000 },
    { name: 'Fidas', timeSpent: 2000 },
    { name: 'Kalkulus', timeSpent: 4000 }
]

const checkReadTime = (time = 10000, i = 0) => {
    readBooksPromise(time, books[i])
        .then(function(fulfilled) {
            i += 1
            if (i < books.length) {
                checkReadTime(fulfilled, i)
            }
        })
        .catch(function(error) {
            console.log(error.message);
        });
}

checkReadTime()