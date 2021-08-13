const util = require('util');
const config = require('config');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: config.get('mongoURI'),
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  avatar: (req, avatar) => {
    const match = ['image/png', 'image/jpeg'];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: 'page-avatars',
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

var uploadFile = multer({ storage: storage }).single('file');
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;
