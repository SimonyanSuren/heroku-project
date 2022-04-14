const multer  = require('multer');
const path = require('path')
const uuid = require('uuid').v4;
const storage = multer.diskStorage({

  
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,  '..','..','..','..','public','images'))
    },
    filename: function (req, file, cb) {
        const {originalname} = file
        cb(null, `${uuid()}${originalname.substring(originalname.lastIndexOf('.'))}`)
    }

});

const upload = multer({ storage: storage });
const multerUpload = upload.single('my-file');

module.exports = multerUpload