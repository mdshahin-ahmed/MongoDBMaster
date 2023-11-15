// 1. Retrieve the count of individuals who are active (isActive: true) for each gender.
db.test.aggregate([
  { $match: { age: { $gt: 20 } } },
  { $group: { _id: "$gender", count: { $sum: 1 } } },
]);

// 2. Retrieve the names and email addresses of individuals who are active (`isActive: true`) and have a favorite fruit of "banana."
