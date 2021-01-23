const jwt = require('jsonwebtoken');            // Importation du package jsonwebtoken (authentification par token)

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];                    // Extraction du token du header authorization
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);         // Décodage du token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Erreur d\'authentification')
    });
  }
};