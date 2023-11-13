// insert one "test" database name

db.test.insertOne({ name: "shahin" });

// insert many
db.test.insertMany([
  { name: "Shahin", age: 15 },
  { ahmed: "Ahmed", age: 20 },
]);

// find one
db.test.findOne({ name: "Shahin" });

// find many
db.test.find({ gender: "Male" });

// find all
db.test.find({});

// field filtering -> for get specific field value. It should bd 1 or 0
db.test.find({ gender: "Male" }, { gender: 1 });

// field filtering with project -> for get specific field value. It should bd 1 or 0
// Note: you can't use project for "findOne"
db.test.find({ gender: "Male" }).project({ name: 1 });

// sort -> ascending or descending -> value should be 1 or -1
db.test.find({ age: 15 }).sort({ age: 1 });

// ===========================================
// Comparison Query Operators

// $eq
// Matches values that are equal to a specified value.
// $gt
// Matches values that are greater than a specified value.
// $gte
// Matches values that are greater than or equal to a specified value.
// $in
// Matches any of the values specified in an array.
// $lt
// Matches values that are less than a specified value.
// $lte
// Matches values that are less than or equal to a specified value.
// $ne
// Matches all values that are not equal to a specified value.
// $nin
// Matches none of the values specified in an array.

// $eq for equal
db.test.find({ gender: { $eq: "Male" } });

//$ne for not equal
db.test.find({ gender: { $ne: "Female" } });

// $gt grater then
db.test.find({ age: { $gt: 18 } });

// $gte grater then equal
db.test.find({ age: { $gte: 18 } });

// implicit and using "," we can contact to comparison operator

db.test.find({ age: { $gt: 18, $lt: 30 } });
db.test.find({ age: { $gt: 18, $lt: 30 }, gender: "Female" });

// $in

db.test.find({ age: { $in: [18, 20, 22, 24, 26] } });
// $nin

db.test2
  .find({
    age: { $gte: 18, $lte: 30 },
    gender: "Female",
    interests: { $in: ["Gaming", "Cooking"] },
  })
  .project({ age: 1, gender: 1, interests: 1 })
  .sort({ age: 1 });

// element query
// $exists -> boolean -> field exist or not
// Note. it will not given us field value null,[]
db.test2.find({ phone: { $exists: true } });

// find []
// Note size only available for array
db.test2.find({ friends: { $size: 0 } });

// find undefined, null,
db.test2.find({ friends: { $type: "null" } });

// Array query -> normal
db.test2.find({ friends: "Gaming" });
// Array default query match **exact***
db.test2.find({ friends: ["Gaming", "Cooking"] });
// $all -> If try to check position dos't matter if all available then show
db.test2.find({ friends: { $all: ["Gaming", "Cooking"] } });

// array of object query
db.test2.find({ "skills.name": "JAVASCRIPT" });
// object default query -> normal match **exact***
db.test2.find({
  skills: {
    name: "JAVASCRIPT",
    level: "Intermidiate",
  },
});
// $elemMatch -> If try to check position dos't matter if all available then show
db.test2.find({
  skills: {
    $elemMatch: {
      name: "JAVASCRIPT",
      level: "Intermidiate",
    },
  },
});
// ====================================================================
// update document
db.test2
  .updateOne
  // {kake update korbo take khuje ber korte hobe }
  // {ki update korbo }
  ();

//  "$set" previous value k replace kore dive aita shudo single vale/premetive vale er jonno valo. Array and object hole replace hoye jabe notun value diye

db.test2.updateOne(
  { _id: ObjectId("454d4f64e64fd4645") },
  {
    $set: {
      age: 25, // replace ['gaming','reading]
    },
  }
);

// "$addToSet" it's push end of the array. If already available same value It's not sate duplicate value
db.test2.updateOne(
  { _id: ObjectId("454d4f64e64fd4645") },
  {
    $addToSet: {
      interests: "Cooking", // Add but did not duplicate
    },
  }
);

// $addToSet + $each You can add multiple value inside array
db.test2.updateOne(
  { _id: ObjectId("454d4f64e64fd4645") },
  {
    $addToSet: {
      interests: { $each: ["Cooking", "Writing"] }, // add multiple value But don't duplicate
    },
  }
);

// $push it will duplicate
db.test2.updateOne(
  { _id: ObjectId("454d4f64e64fd4645") },
  {
    $push: {
      interests: { $each: ["Cooking", "Writing"] }, // add multiple value But it will duplicate
    },
  }
);

// delete
// $unset remove field

db.test.updateOne(
  { _id: ObjectId("454d4f64e64fd4645") },
  { $unset: { birthday: 1 } } // value should "" or 1
);

// $pop delete last element
db.test.updateOne(
  { _id: ObjectId("454d4f64e64fd4645") },
  { $pop: { friends: 1 } } // delete last element
);
db.test.updateOne(
  { _id: ObjectId("454d4f64e64fd4645") },
  { $pop: { friends: -1 } } // delete first element
);

// $pull
db.test.updateOne(
  { _id: ObjectId("454d4f64e64fd4645") },
  { $pull: { friends: "Friend Name" } } // delete specific element
);
// $pullAll  delete many from array
db.test.updateOne(
  { _id: ObjectId("454d4f64e64fd4645") },
  { $pullAll: { friends: ["Friend Name", "Another Friend"] } } // delete many from array
);

// $set =====================
db.test.updateOne(
  { _id: ObjectId("454d4f64e64fd4645"), "education.major": "Biology" },
  { $set: { "education.$.major": "Cse" } } // $ positional operator
);

// increment operator

db.test.updateOne(
  { _id: ObjectId("454d4f64e64fd4645") },
  { $inc: { age: 1 } } // $ positional operator
);

// deleteOne

db.test.deleteOne({ _id: ObjectId("454d4f64e64fd4645") });
