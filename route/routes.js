var express = require('express');
var config = require('../config.json');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: config.secret
  // userProperty: 'usertoken'
});

var ctrlUser = require('../controller/controller.user');
var ctrlBank = require('../controller/controller.bank');
var ctrlList = require('../controller/controller.list');
var ctrlHouse = require('../controller/controller.house');
var ctrlRoom = require('../controller/controller.room');
var ctrlLease = require('../controller/controller.lease');
var ctrlStudent = require('../controller/controller.student');
var ctrlTransaction = require('../controller/controller.transaction');
var ctrlCompuscan = require('../controller/controller.compuscan'); 

router.get('/user', auth, ctrlUser.GetUsers);
router.get('/user/user', auth, ctrlUser.GetUserByUserId);
router.get('/user/email', auth, ctrlUser.GetUserByEmail);
router.post('/user/register', ctrlUser.RegisterUser);
router.post('/user/login', ctrlUser.AuthenticateUser);
router.get('/bank', auth, ctrlBank.GetBank);
router.get('/bank/accountnumber', auth, ctrlBank.GetBankByAccountNumber);
router.put('/bank', auth, ctrlBank.UpdateBank);
router.post('/bank', auth, ctrlBank.InsertBank);
router.get('/list', auth, ctrlList.GetLists);
router.get('/house', auth, ctrlHouse.GetHouses);
router.get('/room', auth, ctrlRoom.GetRooms);
router.get('/lease', auth, ctrlLease.GetLeases);
router.get('/lease/lease', auth, ctrlLease.GetLeasesByLeaseId);
router.get('/lease/student', auth, ctrlLease.GetLeasesByStudentId);
router.get('/lease/active', auth, ctrlLease.GetLeasesActive);
router.put('/lease', auth, ctrlLease.UpdateLease);
router.post('/lease', auth, ctrlLease.InsertLease);
router.get('/transaction', auth, ctrlTransaction.GetTransactions);
router.get('/transaction/lease', auth, ctrlTransaction.GetTransactionsByLeaseId);
router.post('/transaction/transaction', auth, ctrlTransaction.InsertTransaction);
router.delete('/transaction/transaction', auth, ctrlTransaction.DeleteTransaction);
router.get('/student', auth, ctrlStudent.GetStudents);
router.get('/student/student', auth, ctrlStudent.GetStudentByStudentId);
router.put('/student', auth, ctrlStudent.UpdateStudent);
router.post('/student', auth, ctrlStudent.CreateStudent);
router.post('/compuscansenquiry', auth, ctrlCompuscan.Enquiry)

module.exports = router;

console.log('Loaded routes.js');