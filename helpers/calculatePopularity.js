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
  return pipeline;
};
module.exports = calculatePopularity;
