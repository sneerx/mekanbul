var express = require('express');
var router = express.Router();
const axios = require("axios");
var apiSecenekleri= {
    sunucu:"https://mekanbul.rizaer.repl.co",
    apiYolu:"/api/mekanlar/",

};

var mesafeyiFormatla=function(mesafe) {
    var yeniMesafe,birim;
    if(mesafe>1){
        yeniMesafe=parseFloat(mesafe).toFixed(1);
        birim = " km";


    }else{
        yeniMesafe=parseInt(mesafe*1000,10);
        birim = " m";
    }

    return yeniMesafe + birim;
        

}

var anaSayfaOlustur=function(res,mekanListesi) {

    var mesaj;
    if(!(mekanListesi instanceof Array)){
        mesaj = "API HATASI: Bir şeyler ters gitti..";
        mekanListesi = {};
    }else {
        if(!mekanListesi.length){
            mesaj = "civarda herhangi bir mekan yok..";


        }
    }
    res.render("anasayfa",{
        "baslik":"anasayfa",
        "sayfaBaslik":{
            "siteAd":"mekanbul",
            "slogan":"mekanları keşfet"
        },
        "mekanlar":mekanListesi,
        "mesaj":mesaj
    });

}

var detaySayfasiOlustur = function(res, mekanDetaylari) {
    mekanDetaylari.koordinat={
        "enlem":mekanDetaylari.koordinat[0],
        "boylam":mekanDetaylari.koordinat[1]
    }
    res.render('mekanbilgisi',
    {
        mekanBaslik: mekanDetaylari.ad,
        mekanDetay:mekanDetaylari
    });
}

var hataGoster = function(res, hata) {
    var mesaj;

    if(hata.response.status==404){
        mesaj="404, sayfa bulunamadi!";
    }
    else{
        mesaj=hata.response.status+" hatası";
    }
    res.status(hata.response.status);
    res.render('error',{
        "mesaj":mesaj
    });
};


const anaSayfa = function(req, res) {
    axios.get(apiSecenekleri.sunucu+apiSecenekleri.apiYolu,{
        params:{
            enlem:req.query.enlem,
            boylam:req.query.boylam
        }
    }).then(function(response){
        var i,mekanlar;
        mekanlar=response.data;
        for (i=0;i<mekanlar.length;i++){
            mekanlar[i].mesafe=mesafeyiFormatla(mekanlar[i].mesafe);
 
        }
        anaSayfaOlustur(res,mekanlar);

    }).catch(function(hata){
        anaSayfaOlustur(res,hata);
    });

};

const mekanBilgisi = function(req, res){
    axios
        .get(apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid)
        .then(function(response){
            detaySayfasiOlustur(res, response.data);

        })
        .catch(function(hata){
            hataGoster(res,hata);
        });
};

const yorumEkle = function(req, res, next) {
    res.render('yorumekle', { title: 'Yorum ekle' });
};



module.exports={
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}