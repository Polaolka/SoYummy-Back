const { User } = require("../../models/user");

const getCurrent = async (req, res) => {
    const { _id,
        name,
        email,
        shoppingList,
        avatarURL,
        refreshToken
     } = req.user;

    const data = {
        _id,
        name,
        email,
        shoppingList,
        avatarURL,
        refreshToken
}

    res.json(data)
};

module.exports = getCurrent;