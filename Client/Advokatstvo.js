import { Slucaj } from "./Slucaj.js";
import { Advokat } from "./Advokat.js";

export class Advokatstvo{
    constructor(listaAdvokata){
        this.listaAdvokata=listaAdvokata;
        this.kont=null;
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
        tabela.className="tabelaa";
        host.appendChild(tabela);

        var tabelahead = document.createElement("thead");
        tabela.appendChild(tabelahead);
        var tr=document.createElement("tr");
        tabelahead.appendChild(tr);
        var tabelaBody = document.createElement("tbody");
        tabelaBody.className="TabelaPodacii";
        tabela.appendChild(tabelaBody);

        let th;
        var zag=["Naziv slucaja", "Sudija", "Javni Tuzitelj", "Advokat"]
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
        l.innerHTML="Advokat: ";
        red.appendChild(l);

        let se = document.createElement("select");
        se.className="selectorr";
        red.appendChild(se);

        let op;
        this.listaAdvokata.forEach(p=>{
            op=document.createElement("option");
            op.innerHTML=p.ime + " " + p.prezime;
            op.value=p.id;
            se.appendChild(op);
        })
        let btnNadjii = document.createElement("button");
        btnNadjii.onclick=(ev)=>this.nadjii();
        btnNadjii.innerHTML= "Nadji";
        red.appendChild(btnNadjii);

        l = document.createElement("label");
        l.innerHTML="Ime advokata: ";
        host.appendChild(l);
        var tb= document.createElement("input");
        tb.className = "ImeAd";
        host.appendChild(tb);
        
        l = document.createElement("label");
        l.innerHTML="Prezime advokata: ";
        host.appendChild(l);
        var tb= document.createElement("input");
        tb.className = "PrezimeAd";
        host.appendChild(tb);

        l = document.createElement("label");
        l.innerHTML="Broj komore advokata: ";
        host.appendChild(l);
        var tb= document.createElement("input");
        tb.className = "BrKomAd";
        host.appendChild(tb);

        l = document.createElement("label");
        l.innerHTML="Adresa kancelarije ili stanovanja advokata: ";
        host.appendChild(l);
        var tb= document.createElement("input");
        tb.className = "AdKancAd";
        host.appendChild(tb);

        l = document.createElement("label");
        l.innerHTML="Zvanje advokata: ";
        host.appendChild(l);
        var tb= document.createElement("input");
        tb.className = "ZvanjeAd";
        host.appendChild(tb);

        let btnUpisii = document.createElement("button");
        btnUpisii.onclick=(ev)=>this.upisii();
        btnUpisii.innerHTML= "Upisi advokata";
        host.appendChild(btnUpisii);
        
        let btnPromenii = document.createElement("button");
        btnPromenii.onclick=(ev)=>this.promenii();
        btnPromenii.innerHTML= "Promeni Zvanje advokata";
        host.appendChild(btnPromenii);
        
        let btnObrisii = document.createElement("button");
        btnObrisii.onclick=(ev)=>this.obrisii();
        btnObrisii.innerHTML= "Obrisi advokata";
        host.appendChild(btnObrisii);
    }
    upisii(){
        let imeAd=this.kont.querySelector(".ImeAd").value;
        let prezimeAd=this.kont.querySelector(".PrezimeAd").value;
        let brojKomoreAd=this.kont.querySelector(".BrKomAd").value;
        let adKancAd=this.kont.querySelector(".AdKancAd").value;
        let zvanjeAd=this.kont.querySelector(".ZvanjeAd").value;


        if(imeAd==null || imeAd==undefined || imeAd=="")
        {
            alert ("Unesite ime advokata.");
            return;
        }
        if(prezimeAd===null || prezimeAd===undefined || prezimeAd==="")
        {
            alert ("Unesite prezime advokata.");
            return;
        }
        if(brojKomoreAd==null || brojKomoreAd==undefined || brojKomoreAd=="")
        {
            alert ("Unesite broj komore advokata.");
            return;
        }
        if(adKancAd==null || adKancAd==undefined || adKancAd=="")
        {
            alert ("Unesite adresu kancelarije ili stanovanja advokata.");
            return;
        }
        if(prezimeAd===null || prezimeAd===undefined || prezimeAd==="")
        {
            alert ("Unesite prezime advokata");
            return;
        }
        if(zvanjeAd===null || zvanjeAd===undefined || zvanjeAd==="")
        {
            alert ("Unesite zvanje advokata.");
            return;
        }
        fetch("https://localhost:5001/Advokati/DodajAdvokata/"+imeAd+"/"+prezimeAd+"/"+brojKomoreAd+"/"+adKancAd+"/"+zvanjeAd,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "ime":imeAd,
                "prezime": prezimeAd,
                "brojKomore": brojKomoreAd,
                "adresaKancelarije": adKancAd,
                "zvanje": zvanjeAd
            })
        }).then(s=>{
            if(s.ok){
                var teloTabele = this.obrisiPrethodni();
                var p = new Advokat(s,imeAd, prezimeAd, brojKomoreAd, adKancAd,zvanjeAd);
                this.listaAdvokata.push(p);
                alert("Advokat "+ prezimeAd + " je dodat.");
                let op=document.createElement("option");
                    op.innerHTML=p.ime + " " + p.prezime;
                    op.value=p.id;
                    let se=this.kont.querySelector(".selectorr");
                    se.appendChild(op);
                

            }
        })
    }
    promenii(){
        let imeAd=this.kont.querySelector(".ImeAd").value;
        let prezimeAd=this.kont.querySelector(".PrezimeAd").value;
        let zvanjeAd=this.kont.querySelector(".ZvanjeAd").value;
        if(imeAd==null || imeAd==undefined || imeAd=="")
        {
            alert ("Unesite ime");
            return;
        }
        if(prezimeAd===null || prezimeAd===undefined || prezimeAd==="")
        {
            alert ("Unesite prezime");
            return;
        }
        if(zvanjeAd===null || zvanjeAd===undefined || zvanjeAd==="")
        {
            alert ("Unesite zvanje");
            return;
        }
        fetch("https://localhost:5001/Advokati/PromeniZvanjeAdvokata/"+imeAd+"/"+prezimeAd+"/"+zvanjeAd,
        {
        method: "PUT"
        })
        .then(response => {
            if (response.status === 200) { alert ("Advokat "+prezimeAd + " sada ima novo zvanje."); }
            if (response.status === 400) { alert ("Advokat "+prezimeAd + " nije pronadjen."); }
            if (response.status === 404) { alert ("Advokat "+prezimeAd + " vec ima ovo zvanje."); }
            })
        }
    obrisii(){
        let imeAd=this.kont.querySelector(".ImeAd").value;
        let prezimeAd=this.kont.querySelector(".PrezimeAd").value;
        if(imeAd===null || imeAd===undefined || imeAd==="")
        {
            alert ("Unesite ime");
            return;
        }
        if(prezimeAd===null || prezimeAd===undefined || prezimeAd==="")
        {
            alert ("Unesite prezime");
            return;
        }
        fetch("https://localhost:5001/Advokati/IzbrisiAdvokata/"+imeAd+"/"+prezimeAd,
        {
            method: "DELETE"
        })
        .then(response => {
            if (response.status === 200) { alert ("Advokat "+prezimeAd + " uspesno obrisan."); }
            if (response.status === 400) { alert ("Advokat "+prezimeAd + " nije pronadjen."); }
            })
        let op=document.createElement("option");
        this.listaSudija.forEach(p=>{
                    op.innerHTML=p.ime + " " + p.prezime;
                    op.value=p.id;
                    let se=this.kont.querySelector(".selectorr");
                    se.appendChild(op);
        })
    }
    obrisiPrethodni(){
        var teloTabele = document.querySelector(".TabelaPodacii");
        var roditelj = teloTabele.parentNode;
        roditelj.removeChild(teloTabele);
        
        teloTabele = document.createElement("tbody");
        teloTabele.className="TabelaPodacii";
        roditelj.appendChild(teloTabele);
        return teloTabele;
    }
    nadjii(){
        let optionel = this.kont.querySelector("select");
        var id=optionel.options[optionel.selectedIndex].value;
        console.log(id);
        this.ucitajSlucajevee(id)
    }
    ucitajSlucajevee(id){
        fetch("https://localhost:5001/Advokati/Advokati/"+id,
        {
            method:"GET"
        }).then(s=>{
            if(s.ok){
                var teloTabele = this.obrisiPrethodni();
                console.log(s)
                s.json().then(data=>{
                    data.forEach(s=>{
                        let su = new Slucaj(s.naziv, s.sudija, s.javniTuzitelj, s.advokat);
                        su.crtajnovo(teloTabele);
                        console.log(su);
                    })
                    
                })
            }
        });
        
    }
}