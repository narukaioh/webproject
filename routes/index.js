var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next){
	var arbitraryUrls = ['partials'];
	console.log(req.url);
	if (arbitraryUrls.indexOf(req.url.split('/')[1]) > -1) {
		next();
	} else {
		res.render('./narukaioh-theme/index');
	}
});

router.get('/partials/*', function(req, res, next) {
	console.log(req.path);
  	res.render('./narukaioh-theme/'+req.path);
});

module.exports = router;
