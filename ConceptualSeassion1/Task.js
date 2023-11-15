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

// 2. Calculate the average price for each product category. Display the category and average price.

// $round decimal digit -> After decimal how many digit we want to show
db.products.aggregate([
  // state -> 1
  // $group -> group by category
  {
    $group: { _id: "$category", averagePrice: { $avg: "$price" } },
  },
  // stage -> 2
  {
    $project: {
      category: "$_id",
      average: { $round: ["$averagePrice", 2] },
    },
  },
]);

// 3. Find the average order quantity and price for each product category. Display the category, average quantity, and average price.
