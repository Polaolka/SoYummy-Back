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
    html: `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: #ffffff;
      border-radius: 5px;
      text-decoration: none;
    }

    .button:hover {
      background-color: #45a049;
    }

  </style>
</head>
<body>
  <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f0f0f0">
    <tr>
      <td align="center" valign="top" style="padding: 20px;">
        <h1>Welcome to Our Newsletter!</h1>
        <p>Dear Subscriber,</p>
        <p>We are excited to have you on board. Stay tuned for our latest new juicy recipes and updates.</p>
        <p>Thank you!</p>
        <p>Best Regards,</p>
        <p>The SoYummy Team</p>
        <p>
          <a class="button" href="https://anastasiiahm.github.io/soyummy-project/">
            Visit the SoYummy page
          </a>
      </td>
    </tr>
  </table>
</body>
</html>
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
