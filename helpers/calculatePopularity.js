const calculatePopularity = () => {
  const pipeline = 
  [
    {
      $match: {
        popularity: { $type: "array" }
      }
    },
    {
      $addFields: {
        popularitySize: { $size: "$popularity" }
      }
    },
    {
      $sort: { popularitySize: -1 }
    },
    {
      $group: {
        _id: null,
        maxPopularitySize: { $max: "$popularitySize" },
        objects: { $push: "$$ROOT" }
      }
    },
    {
      $unwind: "$objects"
    },
    {
      $replaceRoot: { newRoot: "$objects" }
    },
    {
      $limit: 4,
    },
  ]
  // [
  //   {
  //     $project: {
  //       _id: 1,
  //       title: 1,
  //       description: 1,
  //       thumb: 1,
  //       preview: 1,
  //       popularity: { $size: "$popularity" },
  //     },
  //   },
  //   {
  //     $sort: {
  //       popularity: -1,
  //     },
  //   },
  //   {
  //     $limit: 4,
  //   },
  // ];

  return pipeline;
};
module.exports = calculatePopularity;
