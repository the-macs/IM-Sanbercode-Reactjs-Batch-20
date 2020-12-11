// soal & jawaban 1
function halo() {
    return "Halo Sanbers!";
}

console.log(halo()) // "Halo Sanbers!" 



// soal & jawaban 2
function kalikan(num1, num2) {
    return num1 * num2;
}

var num1 = 12
var num2 = 4

var hasilKali = kalikan(num1, num2)
console.log(hasilKali) // 48



// soal & jawaban 3
// Nama saya [name], umur saya [age] tahun, alamat saya di [address], dan saya punya hobby yaitu [hobby]!
function introduce(name, age, address, hobby) {
    return "Nama saya " + name + ", umur saya " + age + " tahun, alamat saya di " + address.toLowerCase() + ", dan saya punya hobby yaitu " + hobby + "!";
}


var name = "John"
var age = 30
var address = "Jalan belum jadi"
var hobby = "Gaming"

var perkenalan = introduce(name, age, address, hobby)
console.log(perkenalan) // Menampilkan "Nama saya John, umur saya 30 tahun, alamat saya di jalan belum jadi, dan saya punya hobby yaitu Gaming!"



// soal & jawaban 4
var arrayDaftarPeserta = ["Asep", "laki-laki", "baca buku", 1992]

arrayDaftarPeserta = {
    nama: arrayDaftarPeserta[0],
    jenisKelamin: arrayDaftarPeserta[1],
    hobi: arrayDaftarPeserta[2],
    tahunLahir: arrayDaftarPeserta[3]
}

console.log(arrayDaftarPeserta)



// soal & jawaban 5
var buah = [{
        nama: "strawberry",
        warna: "merah",
        adaBijinya: "tidak",
        harga: 9000
    },
    {
        nama: "jeruk",
        warna: "oranye",
        adaBijinya: "ada",
        harga: 8000
    },
    {
        nama: "Semangka",
        warna: "Hijau & Merah",
        adaBijinya: "ada",
        harga: 10000
    },
    {
        nama: "Pisang",
        warna: "Kuning",
        adaBijinya: "tidak",
        harga: 5000
    },
]

console.log(buah[0])



// soal & jawaban 6
var dataFilm = [];

function film(nama, durasi, genre, tahun) {
    var obj = {};

    obj["nama"] = nama;
    obj["durasi"] = durasi;
    obj["genre"] = genre;
    obj["tahun"] = tahun;

    return obj;
}

dataFilm.push(film('Spongebob', '120', 'Cartoon', '1994'))
dataFilm.push(film('Attack of Titans', '24', 'Anime', '1999'))

console.log(dataFilm)