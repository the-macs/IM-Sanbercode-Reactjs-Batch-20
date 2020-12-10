// soal & jawaban 1
console.log('LOOPING PERTAMA')
i = 0
while (i < 20) {
    i += 2
    console.log(i + ' - I love coding')
}

console.log('LOOPING KEDUA')
j = 20
while (j > 0) {
    console.log(j + ' - I will become a frontend developer')
    j -= 2
}

// soal & jawaban 2
for (i = 1; i < 21; i++) {
    if (i % 2 == 0)
        console.log(i + ' - Berkualitas');
    else if (i % 2 != 0)
        if (i % 3 == 0)
            console.log(i + ' - I Love Coding');
        else
            console.log(i + ' - Santai');
}

// soal & jawaban 3
var stair = '';
for (i = 0; i < 7; i++) {
    for (j = 0; j < i + 1; j++) {
        stair += '#'
    }
    stair += '\n'
}

console.log(stair)

// soal & jawaban 4
var kalimat = "saya sangat senang belajar javascript"

console.log(kalimat.split(' '))
    // ["saya", "sangat", "senang", "belajar", "javascript"]


// soal & jawaban 5
var daftarBuah = ["2. Apel", "5. Jeruk", "3. Anggur", "4. Semangka", "1. Mangga"];

for (i = 0; i < daftarBuah.length; i++) {
    console.log(daftarBuah.sort()[i])
}

// 1. Mangga
// 2. Apel
// 3. Anggur
// 4. Semangka
// 5. Jeruk