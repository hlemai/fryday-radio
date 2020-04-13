const express = require('express');
const router = express.Router();
const songrequest = require("../controler/songrequest");

/*
GET home page.
*/
router.get(
  '/',
  songrequest.getIndexPage
);

/*
Route to Add New User.
*/
router.post(
  '/songrequest/new',
  //songrequest.validateInput,
  songrequest.addRequest
);


router.get(
  '/songrequests',
  songrequest.getListRequestIds
);

router.get(
  '/songrequest/:id',
  songrequest.getRequest
);
/*
router.delete(
  '/user/:userId',
  appController.checkUserExists,
  appController.deleteUser,
);

router.put(
  '/user/:userId',
  appController.validateInput,
  appController.checkUserExists,
  appController.updateUser,
);


router.get(
  '/users',
  appController.getUsers,
);
*/

module.exports = router;