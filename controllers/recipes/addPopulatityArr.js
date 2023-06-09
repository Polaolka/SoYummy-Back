const { Recipe } = require("../../models/recipe");

const addPopulatityArr = async (req, res) => {
  try {
    // Отримати всі об'єкти, де властивість popularity відсутня
    const objectsWithoutPopularity = await Recipe.find({ popularity: { $exists: false } });

    // Пройтися по кожному об'єкту і додати властивість popularity з пустим масивом
    const updatedObjects = await Promise.all(
      objectsWithoutPopularity.map(async (object) => {
        object.popularity = [];
        return object.save();
      })
    );

    return res.status(200).json(updatedObjects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Помилка сервера' });
  }
};

module.exports = addPopulatityArr;