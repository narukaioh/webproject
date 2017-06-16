var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next){
	res.render('index',{ message: 'Em construção' })
});

router.get('/partials/*', function(req, res, next) {
	console.log(req.path);
  	res.render('./narukaioh-theme/'+req.path);
});

module.exports = router;
