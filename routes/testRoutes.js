const express = require('express');
const testController = require('../controllers/TestController');

const router = express.Router();

// routes GET |POST| PUT|DELETE

router.get('/test-user',testController)




// export 
module.exports = router;