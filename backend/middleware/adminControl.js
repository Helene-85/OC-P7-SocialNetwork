// Middleware qui contrôle si le user connecté est admin
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];                    // Extraction du token du header authorization
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);         // Décodage du token
    const role = decodedToken.isAdmin;
    if (role == 1){
        next()
    } else {
        return res.status(403).json({ message: 'Eh non ! Vous n\'êtes pas autorisé à faire ça !'});
    }
};