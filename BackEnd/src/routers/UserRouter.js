const express = require('express');
const router = express.Router();
const { 
  viewOnlyUser, 
  viewAllUser, 
  register, 
  updateUser, 
  updateUserName, 
  updateUserPassword, 
  updateUserImageProfile, 
  deleteAccountUser, 
  updateUserForgotPassword 
} = require('../controllers/UserController');

// Middleware de logging para UserRouter
router.use((req, res, next) => {
  console.log('👤 USER ROUTER:', {
    method: req.method,
    url: req.url,
    body: req.body,
    timestamp: new Date().toISOString()
  });
  next();
});

router.get('/:idUser', viewOnlyUser);
router.get('/', viewAllUser);
router.post('/register', register);
router.put('/updateUser', updateUser);
router.put('/updateUserName', updateUserName);
router.put('/updateUserPassword', updateUserPassword);
router.put('/updateUserImageProfile', updateUserImageProfile);
router.delete('/deleteAccountUser/:idUser', deleteAccountUser);
router.put('/updateUserForgotPassword', updateUserForgotPassword);

module.exports = router;