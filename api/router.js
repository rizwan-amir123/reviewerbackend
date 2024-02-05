const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { getUser } = require('../controllers/userController');
const { getReviews, getReviewsByReviewerId, getReviewsByProductId, getReviewsByRating,
getReviewsByReviewerName, getReviewsGeneral, countReviews, modeForField, 
countIndividualReviews, addReview, patchReview, deleteReview } = require("../controllers/review");

router.get("/reviews/search", getReviewsGeneral);
router.get("/reviews/all", getReviews);
router.get("/reviews/reviewer", getReviewsByReviewerId);
router.get("/reviews/product", getReviewsByProductId);
router.get("/reviews/rating", getReviewsByRating);
router.get("/reviews/name", getReviewsByReviewerName);
router.get("/reviews/count", countReviews);
router.get("/reviews/mode", modeForField);
router.get("/reviews/count/individual", countIndividualReviews);
router.post("/reviews/add", addReview)
router.delete("/reviews/delete", deleteReview)
router.patch("/reviews/patch", patchReview)

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/user/get', getUser);


/*
router.patch("/task/:taskID", patchTask);
router.delete("/task", deleteAllTasks);
router.delete("/task/:taskID", deleteTask);
router.put("/task/:taskID", updateTask);
router.post("/task", createTask);

router.get("/assignees", getAssignees);
router.get("/assignee/:assignee/tasks", getAssigneeTasks);
router.get("/task/:taskID", getSingleTask);
router.get("/task", getTasks);
router.get("/task/status/done", findDoneTasks);
router.get("/task/status/pending", findPendingTasks);
router.get("/task/status/late", findLateTasks);
router.get("/task/status/processing", findProcessingTasks);
router.get("/task/status/unassigned", findNotAssignedTasks);

router.get("/task/tag/frontend", findFrontendTasks);
router.get("/task/tag/backend", findBackendTasks);
router.get("/task/tag/devops", findDevopsTasks);

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});
*/
module.exports = router;
