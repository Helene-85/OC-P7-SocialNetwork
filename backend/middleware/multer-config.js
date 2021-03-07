const multer = require('multer');                                       // Importation du package multer

const storage = multer.diskStorage({                                    // Destination du fichier sur le disque
  destination: (req, file, callback) => {
    callback(null, 'images');
  },

  filename: (req, file, callback) => {                                  // Configuration du nom du fichier (nom + extension + date)
    const fileName = file.originalname.split('.')[0]
    const extension = file.originalname.split('.')[1]
    const name = fileName.split(' ').join('_');
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('file');