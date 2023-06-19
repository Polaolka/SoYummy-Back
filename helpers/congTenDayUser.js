const congTenDayUser = (user) => {
  if (!user.tenDayFlag) {
    const registrationDate = user.createdAt; // This assumes you have a createdAt field that stores the user's registration date
    console.log(registrationDate);
    const currentDate = new Date();
    const TEN_DAYS_IN_MS = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
    if (currentDate - registrationDate >= TEN_DAYS_IN_MS) {
      console.log(
        "Congrats 10 days!"
      );
      user.tenDayFlag = true;
      user.save(); // Saving changes to the database
      return 'Wow! You have been using the application for 10 days!'
    }
  }
  
}

module.exports = congTenDayUser;
