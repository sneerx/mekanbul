var express = require('express');
var router = express.Router();

const anaSayfa = function(req, res,next) {
    res.render('anasayfa',
     { "baslik": 'Anasayfa',
    "sayfaBaslik": {
    "siteAd" :"Mekanbul",
    "slogan": "civardaki mekanlari kesfet"
},
    "mekanlar":[
        {
            "ad":"Starbucks",
            "puan":"3",
            "adres":"Fildişi Sahilleri",
            "imkanlar":["Kahve","Çay","Kek"],
            "mesafe":"10km"

        },
        {
            "ad":"Barida Kafe",
            "puan":"4",
            "adres":"Arjentina",
            "imkanlar":["pasta","süt","elma"],
            "mesafe":"500km"

        }

    ]
});
};

const mekanBilgisi = function(req, res) {
    res.render('mekanbilgisi', 
    { 
        "baslik": 'Mekan Bilgisi' ,
        "mekanBaslik":"Airport",
        "mekanDetay":{
            "ad":"Starbucks",
            "puan":"5",
            "adres":"Hawaii",
            "imkanlar":["deniz","kum","gunes"],
        "saatler":[{

            "gunler":"Pazartesi-Cuma",
            "acilis":"9:00",
            "kapanis":"01:00",
            "kapali": false

        },
        {

            "gunler":"Carsamba-cuma",
            "acilis":"00:00",
            "kapanis":"05:00",
            "kapali": true

        },

            
            

        ],
        "koordinatlar":{
            "enlem":"21.33",
            "boylam":"-157.92"

        },
        "yorumlar":[
            {
                "yorumYapan":"Rıza ER",
                "puan":"5",
                "tarih":"16 ekim 2021",
                "yorumMetni":"perfect",
            }
        ]
      }
}
);
};

const yorumEkle = function(req, res, next) {
    res.render('yorumekle', { title: 'Yorum ekle' });
};



module.exports={
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}