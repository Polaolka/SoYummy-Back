
const congrTenFavRecipes = (count, user) => {
  if (!user.tenFavRecipesFlag) {
    console.log(count === 10);
    if (count === 10) {

      console.log(
        "Congrats 10 fav recipes!"
      );
      user.tenFavRecipesFlag = true;
      user.save(); // Saving changes to the database
      return 'Wow! You have added 10 recipes to your favorites!'
    }
  }
  
}
  
  module.exports = congrTenFavRecipes;
  