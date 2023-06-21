const multer = require('multer');
const { deviceAllDetails, deviceAllDetailsPost, deviceCommand, getCommand, vUpload } = require('../controller/sendDeviceDetails');
const upload = multer({ dest: 'uploads/' });

const router =require('express').Router();
// post
router.post('/deviceDetails',deviceAllDetailsPost);
router.get('/deviceDetails/:id',deviceAllDetails);

router.post('/command',deviceCommand);
router.get('/command/:cmdId',getCommand);

router.post('/vUpload', upload.single('video'),vUpload);






module.exports = router;