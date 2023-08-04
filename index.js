const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect("mongodb+srv://JuanDavid:@cluster0.jw345ay.mongodb.net/MyFirstDataBase")
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      title: 'Spaghetti Bolognese',
      level: 'Amateur Chef',
      ingredients: ['500g spaghetti', '400g ground beef', '1 onion', '2 cloves of garlic', '400g canned tomatoes', '1 bay leaf', '1 tsp dried oregano', 'Salt and pepper to taste'],
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 60,
      creator: 'John Doe',
      created: new Date(),
    }
    // Create a recipe
    Recipe.create(newRecipe)
      .then(() => {
        console.log(newRecipe.title, "has been added");

      })
      .catch((error) => {
        console.log(error);
      })
    // Insert multiple recipes

    Recipe.insertMany(data)
      .then(result => {
        console.log(result);
        //Update recipe
        Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
          .then(result => {
            console.log("Rigatoni updated");
          })
          .catch(err => console.log(err));
      })
      .then(result => {

        Recipe.deleteOne({ title: 'Carrot Cake' })
          .then(result => {
            console.log("Carrot cake has been deleted");
          })
          .then(() => {
            mongoose.connection.close()
              .then(result => {
                console.log("Bye, Bye");
              })
          })


      })

    // .catch(err => console.log(err));


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

