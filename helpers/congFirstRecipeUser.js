const congFirstRecipeUser = (count, user) => {
  if (!user.firstRecipeFlag) {

    if (count === 1) {
      console.log(
        "Wow! You have added the first own recipe!"
      );
      user.firstRecipeFlag = true;
      user.save(); // Saving changes to the database
      return 'Wow! You have added the first own recipe!'
    }
  }
  
}

module.exports = congFirstRecipeUser;
