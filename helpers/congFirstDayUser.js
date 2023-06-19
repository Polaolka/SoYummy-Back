const congFirstDayUser = (user) => {
  if (!user.firstDayFlag) {
    console.log("Congrats first day!");
    user.firstDayFlag = true;
    user.save(); // Saving changes to the database
    return "Congratulations, you have just successfully registered on SoYummy!";
  }
};

module.exports = congFirstDayUser;
