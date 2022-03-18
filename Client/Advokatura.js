import { Slucaj } from "./Slucaj.js";
import { Sudija } from "./Sudija.js";

export class Advokatura{
    constructor(listaSudija, ime, mail){
        this.listaSudija=listaSudija;
        this.kont=null;
        this.ime=ime;
        this.mail=mail;
    }

    crtaj(host){
        this.kont=document.createElement("div");
        this.kont.className="GlavniKontejner";
        host.appendChild(this.kont);
        
        let kontForma = document.createElement("div");
        kontForma.className="Forma";
        this.kont.appendChild(kontForma);

        let kontPrikaz = document.createElement("div");
        kontPrikaz.className="Prikaz";
        this.kont.appendChild(kontPrikaz);
        this.crtajFormu(kontForma);
        this.crtajPrikaz(kontPrikaz);
    }

    crtajPrikaz(host){
        var tabela = document.createElement("table");
        tabela.className="tabela";
        host.appendChild(tabela);

        var tabelahead = document.createElement("thead");
        tabela.appendChild(tabelahead);
        var tr=document.createElement("tr");
        tabelahead.appendChild(tr);
        var tabelaBody = document.createElement("tbody");
        tabelaBody.className="TabelaPodaci";
        tabela.appendChild(tabelaBody);

        let th;
        var zag=["Naziv slucaja", "Organizacija", "Sudija"]
        zag.forEach(el=>{
            th = document.createElement("th");
            th.innerHTML=el;
            tr.appendChild(th);
        })
    }

    crtajRed(host){
        let red = document.createElement("div");
        red.className="red";
        host.appendChild(red);
        return red;
    }

    crtajFormu(host){
        let red = this.crtajRed(host);
        let l = document.createElement("label");
        l.innerHTML="Sudija: ";
        red.appendChild(l);

        let se = document.createElement("select");
        red.appendChild(se);

        let op;
        this.listaSudija.forEach(p=>{
            op=document.createElement("option");
            op.innerHTML=p.ime + " " + p.prezime;
            op.value=p.id;
            se.appendChild(op);
            se.className="selector";

        })
        
        let btnNadji = document.createElement("button");
        btnNadji.onclick=(ev)=>this.nadji();
        btnNadji.innerHTML= "Nadji";
        red.appendChild(btnNadji);

        l = document.createElement("label");
        l.innerHTML="Ime sudije: ";
        host.appendChild(l);
        var tb= document.createElement("input");
        tb.className = "ImeSud";
        host.appendChild(tb);
        
        l = document.createElement("label");
        l.innerHTML="Prezime sudije: ";
        host.appendChild(l);
        var tb= document.createElement("input");
        tb.className = "PrezimeSud";
        host.appendChild(tb);

        l = document.createElement("label");
        l.innerHTML="Iskustvo sudije: ";
        host.appendChild(l);
        var tb= document.createElement("input");
        tb.className = "IskustvoSud";
        host.appendChild(tb);

        let btnUpisi = document.createElement("button");
        btnUpisi.onclick=(ev)=>this.upisi();
        btnUpisi.innerHTML= "Upisi sudiju";
        host.appendChild(btnUpisi);
        
        let btnPromeni = document.createElement("button");
        btnPromeni.onclick=(ev)=>this.promeni();
        btnPromeni.innerHTML= "Promeni Iskustvo sudije";
        host.appendChild(btnPromeni);
        
        let btnObrisi = document.createElement("button");
        btnObrisi.onclick=(ev)=>this.obrisi();
        btnObrisi.innerHTML= "Obrisi sudiju";
        host.appendChild(btnObrisi);
    }
    upisi(){
        let imeSud=this.kont.querySelector(".ImeSud").value;
        let prezimeSud=this.kont.querySelector(".PrezimeSud").value;
        let iskustvoSud=this.kont.querySelector(".IskustvoSud").value;
        if(imeSud===null || imeSud===undefined || imeSud==="")
        {
            alert ("Unesite ime");
            return;
        }
        if(prezimeSud===null || prezimeSud===undefined || prezimeSud==="")
        {
            alert ("Unesite prezime");
            return;
        }
        if(iskustvoSud===null || iskustvoSud===undefined || iskustvoSud==="")
        {
            alert ("Unesite iskustvo ili stavite da nema.");
            return;
        }
        fetch("https://localhost:5001/Sudija/DodajSudiju/"+imeSud+"/"+prezimeSud+"/"+iskustvoSud,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "ime":imeSud,
                "prezime": prezimeSud,
                "iskustvo": iskustvoSud
            })
        }).then(s=>{
            if(s.ok){
                var teloTabele = this.obrisiPrethodni();
                var p = new Sudija(s,imeSud, prezimeSud, iskustvoSud);
                this.listaSudija.push(p);
                alert("Sudija "+ prezimeSud + " je dodat.");
                this.listaSudija.forEach(p=>{
                    let op=document.createElement("option");
                    op.innerHTML=p.ime + " " + p.prezime;
                    op.value=p.id;
                    let se=this.kont.querySelector(".selector");
                    se.appendChild(op);})
            }
        })
    }
    obrisi(){
        let imeSud=this.kont.querySelector(".ImeSud").value;
        let prezimeSud=this.kont.querySelector(".PrezimeSud").value;
        if(imeSud===null || imeSud===undefined || imeSud==="")
        {
            alert ("Unesite ime");
            return;
        }
        if(prezimeSud===null || prezimeSud===undefined || prezimeSud==="")
        {
            alert ("Unesite prezime");
            return;
        }
        fetch("https://localhost:5001/Sudija/IzbrisiSudiju/"+imeSud+"/"+prezimeSud,
        {
            method: "DELETE"
        })
        .then(response => {
            if (response.status === 200) { alert ("Sudija "+prezimeSud + " uspesno obrisan."); }
            if (response.status === 400) { alert ("Sudija "+prezimeSud + " nije pronadjen."); }
            })
        
    
            let se=this.kont.querySelector(".selector");
            for ( let i=0; i<se.options.length; i++){
                if (se.options[i].value== imeSud + " " + prezimeSud){
                    se.remove(i);
                
            }
        }
            
    }
    promeni(){
        let imeSud=this.kont.querySelector(".ImeSud").value;
        let prezimeSud=this.kont.querySelector(".PrezimeSud").value;
        let iskustvoSud=this.kont.querySelector(".IskustvoSud").value;
        if(imeSud===null || imeSud===undefined || imeSud==="")
        {
            alert ("Unesite ime");
            return;
        }
        if(prezimeSud===null || prezimeSud===undefined || prezimeSud==="")
        {
            alert ("Unesite prezime");
            return;
        }
        if(iskustvoSud===null || iskustvoSud===undefined || iskustvoSud==="")
        {
            alert ("Unesite iskustvo za promenu");
            return;
        }

        fetch("https://localhost:5001/Sudija/PromeniIskustvoSudije/"+imeSud+"/"+prezimeSud+"/"+iskustvoSud,
        { 
            method: "PUT"
        })
        .then(response => {
            if (response.status === 200) { alert ("Sudija "+prezimeSud + " sada ima novo iskustvo."); }
            if (response.status === 400) { alert ("Sudija "+prezimeSud + " nije pronadjen."); }
            if (response.status === 404) { alert ("Sudija "+prezimeSud + " vec ima ovo iskustvo."); }
            })
    }
    nadji(){
        let optionel = this.kont.querySelector("select");
        var id=optionel.options[optionel.selectedIndex].value;
        console.log(id);
        this.ucitajSlucajeve(id)
    }
    ucitajSlucajeve(id){
        fetch("https://localhost:5001/Slucaj/Slucajevi/"+id,
        {
            method:"GET"
        }).then(s=>{
            if(s.ok){
                var teloTabele = this.obrisiPrethodni();
                s.json().then(data=>{
                    data.forEach(s=>{
                        let su = new Slucaj(s.naziv, s.organizacija, s.sudija);
                        su.crtaj(teloTabele);
                        console.log(su);
                    })
                    
                })
            }
        });
    }
    obrisiPrethodni(){
        var teloTabele = document.querySelector(".TabelaPodaci");
        var roditelj = teloTabele.parentNode;
        roditelj.removeChild(teloTabele);
        
        teloTabele = document.createElement("tbody");
        teloTabele.className="TabelaPodaci";
        roditelj.appendChild(teloTabele);
        return teloTabele;
    }
}