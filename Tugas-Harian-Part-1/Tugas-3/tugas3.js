// soal & jawaban 1
var kataPertama = "saya";
var kataKedua = "senang";
var kataKetiga = "belajar";
var kataKeempat = "javascript";

console.log(kataPertama + ' ' + kataKedua[0].toUpperCase() + kataKedua.slice(1) + ' ' + kataKetiga + ' ' + kataKeempat.toUpperCase())


// soal & jawaban 2
var kataPertama = "1";
var kataKedua = "2";
var kataKetiga = "4";
var kataKeempat = "5";

console.log(parseInt(kataPertama) + parseInt(kataKedua) + parseInt(kataKetiga) + parseInt(kataKeempat))


// soal & jawaban 3
var kalimat = 'wah javascript itu keren sekali';

var kataPertama = kalimat.substring(0, 3);

kalimat = kalimat.split(' ');

var kataKedua = kalimat[1]; // do your own! 
var kataKetiga = kalimat[2]; // do your own! 
var kataKeempat = kalimat[3]; // do your own! 
var kataKelima = kalimat[4]; // do your own! 

console.log('Kata Pertama: ' + kataPertama);
console.log('Kata Kedua: ' + kataKedua);
console.log('Kata Ketiga: ' + kataKetiga);
console.log('Kata Keempat: ' + kataKeempat);
console.log('Kata Kelima: ' + kataKelima);


// soal & jawaban 4
var nilai = 89;

var score = '';

if (nilai >= 80) score = 'A'
else if (nilai >= 70 && nilai < 80) score = 'B'
else if (nilai >= 60 && nilai < 70) score = 'C'
else if (nilai >= 50 && nilai < 60) score = 'D'
else if (nilai < 50) score = 'E'

console.log(score)


// soal & jawaban 5
var tanggal = 10;
var bulan = 9;
var tahun = 1994;

switch (parseInt(bulan)) {
    case 1:
        bulan = "Januari";
        break;
    case 2:
        bulan = "Februari";
        break;
    case 3:
        bulan = "Maret";
        break;
    case 4:
        bulan = "April";
        break;
    case 5:
        bulan = "Mei";
        break;
    case 6:
        bulan = "Juni";
        break;
    case 7:
        bulan = "Juli";
        break;
    case 8:
        bulan = "Agustus";
        break;
    case 9:
        bulan = "September";
        break;
    case 10:
        bulan = "Oktober";
        break;
    case 11:
        bulan = "November";
        break;
    case 12:
        bulan = "Desember";
}

console.log(tanggal + ' ' + bulan + ' ' + tahun)