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
