const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");

const subscribe = async (req, res) => {

  const { _id: userId, name, isSubscribe } = req.user;

  if (isSubscribe) {
    throw RequestError(409, `User ${name} was alreaady Subscribe`);
  }
  const { email } = req.body;

  const subscrEmail = {
    to: email,
    subject: "SoYummy subscribe",
    html: `<h2>Dear connoisseur of delicious food ${name}</h2>
    <br />
    <p>
    You have <strong>successfully subscribed</strong> to our newsletter!
    </p>
    <br />
    <a href="https://anastasiiahm.github.io/soyummy-project/">Visit the SoYummy page</a>
    `,
  };

  await sendEmail(subscrEmail);


  const response = await User.findByIdAndUpdate(
    userId,
    { isSubscribe: true },
    { new: true }
  );
  
  res.status(201).json({ message: `User ${name} was Subscribe`, isSubscribe: response.isSubscribe });
};

module.exports = subscribe;
