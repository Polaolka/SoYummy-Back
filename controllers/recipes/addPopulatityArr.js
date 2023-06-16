const { Recipe } = require("../../models/recipe");

const addPopulatityArr = async (req, res) => {
  try {
    // Take away all objects, de power popularity in the day
    const objectsWithoutPopularity = await Recipe.find({
      popularity: { $exists: false },
    });

    // Permeability on the skin object and increase the power of popularity with an empty array
    const updatedObjects = await Promise.all(
      objectsWithoutPopularity.map(async (object) => {
        object.popularity = [];
        return object.save();
      })
    );

    return res.status(200).json(updatedObjects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Помилка сервера" });
  }
};

module.exports = addPopulatityArr;
