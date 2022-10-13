var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/',ctrlMain.index);
=======
var ctrlMekanlar = require('../controllers/mekanlar');
var ctrlDigerleri = require('../controllers/digerleri');


router.get('/', ctrlMekanlar.anaSayfa);
router.get('/mekan', ctrlMekanlar.mekanBilgisi);
router.get('/mekan/yorum/yeni', ctrlMekanlar.yorumEkle);
router.get('/hakkinda', ctrlMekanlar.mekanBilgisi);

>>>>>>> 5765a9d (second commit)

module.exports = router;
