const { Recipe } = require("../../models/recipe");

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Recipe.findById(id);

  const areEqual = owner.equals(result.owner);

  if (!areEqual) {
    res
      .status(406)
      .json({ message: "It is possible to delete only own recipes" });
    return;
  }

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  await Recipe.findByIdAndDelete(id);

  res.status(200).json({ message: `contact id:${id} deleted` });
};

module.exports = deleteOne;
