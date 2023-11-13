// 1. Find all documents in the collection where the age is greater than 30, and only return the name and email fields.
db.test2.find({ age: { $gt: 30 } }).project({ name: 1, email: 1 });

// 2. Find documents where the favorite color is either "Maroon" or "Blue."
db.test2
  .find({ favoutiteColor: { $in: ["Maroon", "Blue"] } })
  .project({ favoutiteColor: 1 });

// 3. Find all documents where the skills is an empty array.

db.test2.find({ skills: { $size: 0 } }).project({ skills: 1 });

// 4. Find documents where the person has skills in both "JavaScript" and "Java."
db.test2
  .find({ "skills.name": { $in: ["JAVA", "JAVASCRIPT"] } })
  .project({ skills: 1 });

// 5. Add a new skill to the skills array for the document with the email "aminextleveldeveloper@gmail.com" The skill is {"name": "Python", "level": "Beginner", "isLearning": true}.

db.test2.updateOne(
  { email: "omirfin2@i2i.jp" },
  {
    $addToSet: {
      skills: { name: "Python", level: "Beginner", isLearning: true },
    },
  }
);

// 6. Add a new language "Spanish" to the list of languages spoken by the person.
db.test2.updateMany(
  {},
  {
    $addToSet: {
      languages: "Spanish",
    },
  }
);

// 7. Remove the skill with the name "Kotlin" from the skills array.
db.test2.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000066") },
  {
    $pull: {
      skills: { name: "KOTLIN" },
    },
  }
);
