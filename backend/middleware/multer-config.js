const multer = require('multer');                                       // Importation du package multer

const MIME_TYPES = {                                                    // Definition des formats d'images acceptés
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif' : 'gif',
  'image/webp' : 'webp',
};

const storage = multer.diskStorage({                                    // Destination du fichier sur le disque
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {                                  // Configuration du nom du fichier (nom + extension + date)
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');