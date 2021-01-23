const passwordValidator = require('password-validator');                      // Importation du package password-validator

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(6)                                                                  // La longueur minimale du mdp est de 6 caractères
.is().max(32)                                                                 // La longueur maximale du mdp est de 32 caractères
.has().uppercase()                                                            // Le mdp doit contenir au moins une majuscule
.has().lowercase()                                                            // Le mdp doit contenir au moins une minuscule
.has().digits()                                                               // Le mdp doit contenir au moins un chiffre
.has().not().spaces()                                                         // Le mdp ne doit pas contenir d'espace
.is().not().oneOf(['Groupomania2021', 'Motdepasse2021', 'Password123']);      // Exclusion de mdp trop simples

module.exports = passwordSchema;