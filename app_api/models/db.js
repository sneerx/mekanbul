var mongoose = require("mongoose");
require("./mekansema");
var dbURI ="mongodb+srv://riza:mekanbul32@mekanbul.uj7u12r.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI);

function kapat(msg,callback){
   mongoose.connection.close(function(){
      console.log(msg);
      callback();
   });
}
process.on("SIGINT",function(){
   kapat("Uygulama kapatıldı!", function () {
      process.exit(0);
   });
});
mongoose.connection.on(
   "connected",function(){
      console.log(dbURI + " adresindeki veritabanına bağlandı.");

   }

);
mongoose.connection.on(
   "disconnected",function(){
      console.log(dbURI + " adresindeki veritabanına bağlantısı koptu.");

   }

);
