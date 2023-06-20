
const getCurrent = async (req, res) => {
    const { _id,
        name,
        email,
        shoppingList,
        avatarURL,
        refreshToken,
        accessToken,
     } = req.user;

    const data = {
        _id,
        name,
        email,
        shoppingList,
        avatarURL,
        refreshToken,
        accessToken,
}

    res.json(data)
};

module.exports = getCurrent;