const { User } = require("../../models/user");

const getCurrent = async (req, res) => {
    const { _id,
        name,
        email,
        shoppingList,
        token,
        avatarURL,
        // daysInApp,
        // addedRecipes,
     } = req.user;

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