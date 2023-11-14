// find************************
db.test
  .find({ age: { $gt: 30 } })
  .project({ age: 1 })
  .sort({ age: 1 });
// aggregation******************
// aggregation -> $match(find) , $project(project) , $sort(sort)
db.test.aggregate([
  // stage 1
  { $match: { age: { $gt: 20 } } },
  // stage 2
  { $project: { age: 1, _id: 0 } },
  // state 3
  { $sort: { age: 1 } },
]);

// $addFields
// we can add some property but it will not update old
db.test.aggregate([
  { $match: { age: { $gt: 20 } } },
  { $project: { age: 1, courst: 1, monerMoto: 1 } },
  { $addFields: { course: "Next Level", monerMoto: "Ja issa tai" } }, // we can add some property but it will not update old document
  { $out: "mail-student" }, // we can create a new collection with this data. "mail-student" -> new collection name
]);

// $merge
db.test.aggregate([
  // { $match: { age: { $gt: 20 } } },
  // { $project: { age: 1,courst:1,monerMoto:1 } },
  { $addFields: { course: "Next Level", monerMoto: "Ja issa tai" } }, // we can add some property but it will not update old document
  { $merge: "test" }, // we can modify out existing collection -> "test" collection name
]);

// group
// $group
// must use **_id**
db.test.aggregate([
  // $address.country -> By which field we want to group
  // $sum -> how many data available inside group
  { $group: { _id: "$address.country", count: { $sum: 1 } } }, // **_id** and **$** required
]);
// $push
db.test.aggregate([
  // $push what we want to see
  {
    $group: {
      _id: "$address.country",
      count: { $sum: 1 },
      personName: { $push: "$name" },
    },
  },
]);
// if we want to all field
db.test.aggregate([
  {
    $group: {
      _id: "$address.country",
      count: { $sum: 1 },
      fullDoc: { $push: "$$ROOT" }, // get all value
    },
  },
]);

// if we want to send specific multiple field
db.test.aggregate([
  {
    $group: {
      _id: "$address.country",
      count: { $sum: 1 },
      fullDoc: { $push: "$$ROOT" },
    },
  },
  // state -2
  {
    $project: {
      "fullDoc.name": 1,
      "fullDoc.email": 1,
      "fullDoc.phone": 1,
    },
  },
]);

// all doc in a single group
db.test.aggregate([
  {
    $group: {
      _id: null, // null mean all doc in a single group
      totalSalary: { $sum: "$salary" },
      maxSalary: { $max: "$salary" },
      minSalary: { $min: "$salary" },
      avgSalary: { $avg: "$salary" },
    },
  },
]);

// rename and calculate inside project
db.test.aggregate([
  {
    $group: {
      _id: null,
      totalSalary: { $sum: "$salary" },
      maxSalary: { $max: "$salary" },
      minSalary: { $min: "$salary" },
      avgSalary: { $avg: "$salary" },
    },
  },
  // stage - 2
  {
    $project: {
      totalSalary: 1,
      maxSalary: 1,
      minSalary: 1,
      averageSalary: "$avgSalary",
      rangeBtwnMaxAndMin: { $subtract: ["$maxSalary", "$minSalary"] },
    },
  },
]);

// aggregation for array $unwind

db.test.aggregate([
  { $unwind: "$friends" }, // we can break it depend on array value
  { $group: { _id: "$friends", total: { $sum: 1 } } },
]);

// we can break particular array and grouped by another field
db.test.aggregate([
  { $unwind: "$interests" },
  { $group: { _id: "$age", ageWiseInterest: { $push: "$interests" } } },
]);

// $bucket
db.test.aggregate([
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [20, 40, 60],
      default: "bakiGula",
      output: {
        count: { $sum: 1 },
        user: { $push: "$$ROOT" },
      },
    },
  },
  { $sort: { count: 1 } },
  { $limit: 2 },
  { $project: { count: 1 } },
]);

// multiple pipeline $facet
db.test.aggregate([
  {
    $facet: {
      // pipeline -> 1
      friendsCount: [
        //state -> 1
        { $unwind: "$friends" },
        // state -> 2
        { $group: { _id: "$friends", count: { $sum: 1 } } },
      ],
      // pipeline -> 2
      interestCount: [
        // state -> 1
        { $unwind: "$education" },
        // state -> 2
        { $group: { _id: "$education", count: { $sum: 1 } } },
      ],
    },
  },
]);

//
