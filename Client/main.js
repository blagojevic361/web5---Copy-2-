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
fetch("https://localhost:5001/Advokatura/Advokature").then(p => {
    if (p.ok) {
        p.json().then(
            bioskopi => {
                bioskopi.forEach(element => {
                    var divb = document.createElement("div");
                    divb.className = "izborBioskopa";
                    divb.innerHTML = element.naziv;
                    document.body.appendChild(divb);

                    divb.onclick = (ev) => {
                        let listaFilmova = [];
                        element.filmovi.forEach( obj => {
                            let f = new Film(null,obj.film.naziv,obj.film.id);
                            listaFilmova.push(f);
                        });

                        var b = new Bioskop(element.id, element.naziv, listaFilmova);
                        var pozadina = document.body.querySelector(".pozadina");
                        if (pozadina !== null){
                            var rod = pozadina.parentNode;
                            rod.removeChild(pozadina);
                        }
                        var izborBioskopa = document.body.querySelectorAll(".izborBioskopa");
                        
                        izborBioskopa.forEach(element => {
                            let rod = element.parentNode;
                            rod.removeChild(element);
                        });
                        pozadina = document.createElement("div");
                        pozadina.className="pozadina";
                        document.body.appendChild(pozadina);
                        b.crtajBioskop(pozadina);

                    };
                });
            }
        );
    }
});
