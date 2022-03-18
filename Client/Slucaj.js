export class Slucaj{
   constructor(naziv, organizacija, sudija, nmp){
      this.naziv=naziv;
      this.organizacija=organizacija;
      this.sudija=sudija;
      this.nmp=nmp;
   }
   crtaj(host){
      var tr = document.createElement("tr");
      host.appendChild(tr);

      var el = document.createElement("td");
      el.innerHTML=this.naziv;
      tr.appendChild(el);

      var el = document.createElement("td");
      el.innerHTML=this.organizacija;
      tr.appendChild(el);

      var el = document.createElement("td");
      el.innerHTML=this.sudija;
      tr.appendChild(el);
   }
   crtajnovo(host){
      var tr = document.createElement("tr");
      host.appendChild(tr);

      var el = document.createElement("td");
      el.innerHTML=this.naziv;
      tr.appendChild(el);

      var el = document.createElement("td");
      el.innerHTML=this.organizacija;
      tr.appendChild(el);

      var el = document.createElement("td");
      el.innerHTML=this.sudija;
      tr.appendChild(el);
      var el = document.createElement("td");
      el.innerHTML=this.nmp;
      tr.appendChild(el);
   }
}