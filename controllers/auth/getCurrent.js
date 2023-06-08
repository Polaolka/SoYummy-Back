const { User } = require("../../models/user");

const getCurrent = async (req, res) => {
    const { _id } = req.user;

    const {
        name,
        email,
        shoppingList,
        token,
        avatarURL,
        // daysInApp,
        // addedRecipes,
      } = await User.findById(_id);

    const data = {
        _id,
        name,
        email,
        shoppingList,
        token,
        avatarURL 
}

    res.json(data)
};

module.exports = getCurrent;