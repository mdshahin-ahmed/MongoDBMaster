// 1.  Identify users who have not made any purchases. Display their names and email addresses.
db.users.aggregate([
  // state - 1
  // $lookup state -> connect with another collection
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "user_id",
      as: "userOrders",
    },
  },
  // state -> 2
  // $match state
  {
    $match: {
      userOrders: { $size: 0 },
    },
  },
  // stage -> 3
  // $project stage
  {
    $project: {
      name: 1,
      email: 1,
      _id: 0,
    },
  },
]);
