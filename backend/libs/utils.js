const jwt = require('jsonwebtoken'); 
const Utils = function () {};

Utils.getSqlDate = () => {
  let date = new Date();
  const dateStr =
    date.getFullYear() + "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
    ("00" + date.getDate()).slice(-2) + " " +
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);
    return dateStr;
};
// On récupère les infos du token
Utils.getReqToken = (req) => {
  const token = req.headers.authorization.split(' ')[1];                    // Extraction du token du header authorization
  const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);         // Décodage du token
  return decodedToken;
}  

module.exports = Utils;