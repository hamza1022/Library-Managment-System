let router = require("express").Router();



router.use("/user", require("./user"));

router.use('/author',require('./author'))

router.use('/book',require('./book'))

router.use('/order',require('./order'))



module.exports = router;
