const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { getUser } = require('../controllers/userController');
const { getReviews, getReviewsGeneral, countReviews, modeForField, 
addReview, patchReview, deleteReview } = require("../controllers/reviewController");

// Searches reviews based onquery params 
router.get("/reviews/search", getReviewsGeneral);
// Returns allreviews
router.get("/reviews/all", getReviews);
// Used to count specific occurence of a field value based on query
router.get("/reviews/count", countReviews);
// Used to find most appearing filed vlaue
router.get("/reviews/mode", modeForField);
// Add reviews
router.post("/reviews/add", addReview)
//Delete reviews
router.delete("/reviews/delete", deleteReview)
//Patch reviews
router.patch("/reviews/patch", patchReview)

// Signs user up
router.post('/signup', registerUser);
// User logs in
router.post('/login', loginUser);
// Finds user 
router.get('/user/get', getUser);

module.exports = router;
