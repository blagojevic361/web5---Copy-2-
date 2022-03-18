import { Advokatura } from "./Advokatura.js";
import { Advokatstvo } from "./Advokatstvo.js";
import { Sudija } from "./Sudija.js";
import { Slucaj } from "./Slucaj.js";
import { Advokat } from "./Advokat.js";

var listaSudija =[];

fetch("https://localhost:5001/Sudija/PreuzmiSudije")
.then(p=>{
    p.json().then(sudije=>{
        sudije.forEach(sudija => {
            console.log(sudija);
            var p = new Sudija(sudija.id, sudija.ime, sudija.prezime, sudija.iskustvo)
        listaSudija.push(p);
        });
        var f = new Advokatura(listaSudija);
        f.crtaj(document.body);
    })
})
console.log(listaSudija);

var listaAdvokata = [];
fetch("https://localhost:5001/Advokati/PreuzmiAdvokate")
.then(p=>{
    p.json().then(advokati=>{
        advokati.forEach(advokat => {
            console.log(advokat);
            var p = new Advokat(advokat.id, advokat.ime, advokat.prezime, advokat.brojKomore, advokat.adresaKancelarije, advokat.zvanje)
        listaAdvokata.push(p);
        });
        var f = new Advokatstvo(listaAdvokata);
        f.crtaj(document.body);
    })
})
console.log(listaSudija);

var listaSlucajeva =[];
fetch("https://localhost:5001/Slucaj/PreuzmiSlucaj")
.then(p=>{
    p.json().then(slucajevi=>{
        slucajevi.forEach(slucaj => {
            console.log(slucaj);
            var p = new Slucaj(slucaj.id, slucaj.naziv, slucaj.organizacija, slucaj.javnituzitelj, slucaj.prvaSednica, slucaj.klasaVaznosti);
        listaSlucajeva.push(p);
        });
    })
})
