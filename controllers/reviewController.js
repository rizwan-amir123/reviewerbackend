const Review = require("../model/review");

const getReviews = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    Review
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then(data => res.json(data))
        .catch (err => {
            res.status(500).send({
                message:err.message || "An error occured"
            });
        });
};

const addReview = (req, res) => {
  console.log(req.body)
    const review = new Review ({
        image: req.body.image,
        overall: req.body.overall,
        verified: req.body.verified,
        reviewTime: "",
        reviewerID: req.body.reviewerID,
        asin: req.body.asin,
        style: {"Size": "", "Color": ""},
        reviewerName: req.body.reviewerName,
        reviewText: req.body.reviewText,
        summary: req.body.summary,
        unixReviewTime: req.body.unixReviewTime,
    });

    Review.save(review)
        .then(data => {console.log("HHHHHHHHHH");res.json(data)})
        .catch (err => {
            console.log("here")
            res.status(500).send({
                message:err.message || "An error occured"
            });
        });
};

const deleteReview = (req, res) => {
    Review.deleteOne(
        { reviewerID: req.params.reviewerID }
    )
    .then(() => res.json({ message: "Review Deleted" }))
    .catch((err) => res.send(err));
};

const patchReview = (req, res) => {
    Review.findByIdAndUpdate(req.body.reviewerID, {reviewText: req.body.reviewText})
    .then(data => {
      if (!data) {
        res.status(404).send();
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 
        err.message || "An error occured"
      });
    });
};

const getReviewsByReviewerId = (req, res) => {
    console.log(req.query.reviewerId)
    console.log(req.query)
    Review
        .find({reviewerID: req.query.reviewerId})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured"
            });
        });
};

const getReviewsGeneral = (req, res) => {
    const myKey = Object.keys(req.query)[0];
    const value = Object.values(req.query)[0].replace("_", " ");
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    //console.log(req.query.reviewerId)
    console.log("here key:", myKey)
    
    console.log("here value:", value)
    if (myKey === "reviewerName") {
    Review
        .find({reviewerName: value})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured"
            });
        });
    }
    else if (myKey === "reviewerID") {
        Review
            .find({reviewerID: value})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
            });
    }
    else if (myKey === "asin") {
        Review
            .find({asin: value})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
            });
    }
    else if (myKey === "overall") {
        Review
            .find({overall: value})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
            });
    }
    else if (myKey === "reviewTime") {
        Review
            .find({reviewTime: { $regex: `${value}$` }})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
            });
    }
    else if (myKey === "verified") {
        
        Review
            .find({verified: value})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
            });
    }
    else {
        Review
            .find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
            });
    }
};

const getReviewsByReviewerName = (req, res) => {
    console.log(req.query.name)
    console.log(req.query)
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    Review
        .find({reviewerName: req.query.name})
        .skip((page - 1) * pageSize)
        .limit(pageSize)

        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured"
            });
        });
};

const getReviewsByProductId = (req, res) => {
    //console.log(req.query.Id)
    //console.log(req.query)
    Review
        .find({asin: req.query.productId})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured"
            });
        });
};

const getReviewsByRating = (req, res) => {
    Review
        .find({overall: req.query.rating})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured"
            });
        });
};

const countReviews = (req, res) => {
    const myKey = Object.keys(req.query)[0];
    const value = Object.values(req.query)[0].replace("_", " ");
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    if (myKey === "reviewerName") {
        Review
            .countDocuments({reviewerName: value})
            .then(count => {
                res.json({ count });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
        });
    }
    else if (myKey === "reviewerID") {
        Review
            .countDocuments({reviewerID: value})
            .then(count => {
                res.json({ count });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
            });
    }
    else if (myKey === "asin") {
        Review
            .countDocuments({asin: value})
            .then(count => {
                res.json({ count });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
            });
    }
    else if (myKey === "overall") {
        Review
            .countDocuments({overall: value})
            .then(count => {
                res.json({ count });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
            });
    }
    else if (myKey === "reviewTime") {
        Review
            .countDocuments({reviewTime: { $regex: `${value}$` }})
            .then(count => {
                res.json({ count });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
            });
    }
    else if (myKey === "verified") {
        
        Review
            .countDocuments({verified: value})
            .then(count => {
                res.json({ count });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
            });
    }
    else {
        Review
            .countDocuments()
            .then(count => {
                res.json({ count });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
            });
    }
};

const modeForField = (req, res) => {
    //const myKey = Object.keys(req.query)[0];
    const value = Object.values(req.query)[0];

    if (value === "reviewerName") {
        Review.aggregate([
            {
              $group: {
                _id: '$reviewerName', // Group by the field name
                count: { $sum: 1 }, // Count the occurrences
              },
            },
            {
              $sort: {
                count: -1, // Sort in descending order of count
              },
            },
            {
              $limit: 5, // Limit the result to the first document (the most occurring value)
            },
            ])
            .then(result => {
              if (result.length > 0) {
                const count_array = [result[0].count, result[1].count, result[2].count, 
                result[3].count, result[4].count]
                const occur_array = [result[0]._id, result[1]._id, result[2]._id, result[3]._id,
                result[4]._id]
                res.json({ "occur_array": occur_array, "count_array": count_array });
              } else {
                console.log('No data found.');
              }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
        });
    }
    else if (value === "reviewerID") {
        Review.aggregate([
            {
              $group: {
                _id: '$reviewerID', // Group by the field name
                count: { $sum: 1 }, // Count the occurrences
              },
            },
            {
              $sort: {
                count: -1, // Sort in descending order of count
              },
            },
            {
              $limit: 5, // Limit the result to the first document (the most occurring value)
            },
            ])
            .then(result => {
              if (result.length > 0) {
                const count_array = [result[0].count, result[1].count, result[2].count, 
                result[3].count, result[4].count]
                const occur_array = [result[0]._id, result[1]._id, result[2]._id, result[3]._id,
                result[4]._id]
                res.json({ "occur_array": occur_array, "count_array": count_array });
              } else {
                console.log('No data found.');
              }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
        });
    }
    else if (value === "reviewTime") {
        Review.aggregate([
            {
              $group: {
                _id: '$reviewTime', // Group by the field name
                count: { $sum: 1 }, // Count the occurrences
              },
            },
            {
              $sort: {
                count: -1, // Sort in descending order of count
              },
            },
            {
              $limit: 5, // Limit the result to the first document (the most occurring value)
            },
            ])
            .then(result => {
              if (result.length > 0) {
                const count_array = [result[0].count, result[1].count, result[2].count, 
                result[3].count, result[4].count]
                const occur_array = [result[0]._id, result[1]._id, result[2]._id, result[3]._id,
                result[4]._id]
                res.json({ "occur_array": occur_array, "count_array": count_array });
              } else {
                console.log('No data found.');
              }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
        });
    }
    else if (value === "summary") {
        Review.aggregate([
            {
              $group: {
                _id: '$summary', // Group by the field name
                count: { $sum: 1 }, // Count the occurrences
              },
            },
            {
              $sort: {
                count: -1, // Sort in descending order of count
              },
            },
            {
              $limit: 5, // Limit the result to the first document (the most occurring value)
            },
            ])
            .then(result => {
              if (result.length > 0) {
                const count_array = [result[0].count, result[1].count, result[2].count, 
                result[3].count, result[4].count]
                const occur_array = [result[0]._id, result[1]._id, result[2]._id, result[3]._id,
                result[4]._id]
                res.json({ "occur_array": occur_array, "count_array": count_array });
              } else {
                console.log('No data found.');
              }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
        });
    }
    else if (value === "asin") {
        Review.aggregate([
            {
              $group: {
                _id: '$asin', // Group by the field name
                count: { $sum: 1 }, // Count the occurrences
              },
            },
            {
              $sort: {
                count: -1, // Sort in descending order of count
              },
            },
            {
              $limit: 5, // Limit the result to the first document (the most occurring value)
            },
            ])
            .then(result => {
              if (result.length > 0) {
                const count_array = [result[0].count, result[1].count, result[2].count, 
                result[3].count, result[4].count]
                const occur_array = [result[0]._id, result[1]._id, result[2]._id, result[3]._id,
                result[4]._id]
                res.json({ "occur_array": occur_array, "count_array": count_array });
              } else {
                console.log('No data found.');
              }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
        });
    }
    
};

const countIndividualReviews = (req, res) => {
    const myKey = Object.keys(req.query)[0];
    const value = Object.values(req.query)[0].replace("_", " ");
    console.log("here key:", myKey)
    console.log("here value:", value)
    let count_array = {"five":0, "four":0, "three":0, "two":0, "one":0}

    const conditionOne = { "overall": 1 };
    const conditionTwo = { "overall": 2 };
    const conditionThree = { "overall": 3 };
    const conditionFour = { "overall": 4 };
    const conditionFive = { "overall": 5 };
    if (myKey === "reviewerName") {
        const conditionName = { reviewerName: value };
        Review.aggregate([
            {
              $facet: {
                countCondition1: [
                  {
                    $match: {
                      $and: [conditionName, conditionOne],
                    },
                  },
                  { $count: 'totalCondition1' },
                ],
                countCondition2: [
                    {
                      $match: {
                        $and: [conditionName, conditionTwo],
                      },
                    },
                    { $count: 'totalCondition2' },
                ],
                countCondition3: [
                    {
                      $match: {
                        $and: [conditionName, conditionThree],
                      },
                    },
                    { $count: 'totalCondition3' },
                ],
                countCondition4: [
                    {
                      $match: {
                        $and: [conditionName, conditionFour],
                      },
                    },
                    { $count: 'totalCondition4' },
                ],
                countCondition5: [
                    {
                      $match: {
                        $and: [conditionName, conditionFive],
                      },
                    },
                    { $count: 'totalCondition5' },
                ],
              },
            },
            ])
            .then(result => {
                console.log("result:", result)
              const countCondition1 = result[0].countCondition1[0]?.totalCondition1 || 0;
              const countCondition2 = result[0].countCondition2[0]?.totalCondition2 || 0;
              const countCondition3 = result[0].countCondition3[0]?.totalCondition3 || 0;
              const countCondition4 = result[0].countCondition4[0]?.totalCondition4 || 0;
              const countCondition5 = result[0].countCondition5[0]?.totalCondition5 || 0;
            
              count_array.one = countCondition1;
              count_array.two = countCondition2;
              count_array.three = countCondition3;
              count_array.four = countCondition4;
              count_array.five = countCondition5;
              
              res.json({ count_array });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
        });
        
        
    }
    else if (myKey === "reviewerID") {
        const conditionID = { reviewerID: value };
        Review.aggregate([
            {
              $facet: {
                countCondition1: [
                  {
                    $match: {
                      $and: [conditionID, conditionOne],
                    },
                  },
                  { $count: 'totalCondition1' },
                ],
                countCondition2: [
                    {
                      $match: {
                        $and: [conditionID, conditionTwo],
                      },
                    },
                    { $count: 'totalCondition2' },
                ],
                countCondition3: [
                    {
                      $match: {
                        $and: [conditionID, conditionThree],
                      },
                    },
                    { $count: 'totalCondition3' },
                ],
                countCondition4: [
                    {
                      $match: {
                        $and: [conditionID, conditionFour],
                      },
                    },
                    { $count: 'totalCondition4' },
                ],
                countCondition5: [
                    {
                      $match: {
                        $and: [conditionID, conditionFive],
                      },
                    },
                    { $count: 'totalCondition5' },
                ],
              },
            },
            ])
            .then(result => {
                console.log("result:", result)
              const countCondition1 = result[0].countCondition1[0]?.totalCondition1 || 0;
              const countCondition2 = result[0].countCondition2[0]?.totalCondition2 || 0;
              const countCondition3 = result[0].countCondition3[0]?.totalCondition3 || 0;
              const countCondition4 = result[0].countCondition4[0]?.totalCondition4 || 0;
              const countCondition5 = result[0].countCondition5[0]?.totalCondition5 || 0;

              count_array.one = countCondition1;
              count_array.two = countCondition2;
              count_array.three = countCondition3;
              count_array.four = countCondition4;
              count_array.five = countCondition5;
              res.json({ count_array });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured"
                });
        });
    }
};

module.exports = {
    getReviews,
    getReviewsByReviewerId,
    getReviewsByProductId,
    getReviewsByRating,
    getReviewsByReviewerName,
    getReviewsGeneral,
    countReviews,
    modeForField,
    countIndividualReviews,
    addReview,
    deleteReview,
    patchReview
};