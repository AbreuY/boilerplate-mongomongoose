require('dotenv').config();
//Setup mongoose
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// Create schema
const { Schema } = mongoose;
const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

//Create model from personSchema
let Person = mongoose.model('Person', personSchema);

//Create and save person function
const createAndSavePerson = (done) => {
  let person = new Person({ name: "Jhon", age: 30, favoriteFoods: ["Apple", "Watermelon", "Orange"] });

  person.save(function(err, data) {
    if (err) return console.log(err);
    // saved!
    done(null, data);
  });

};

const createManyPeople = (arrayOfPeople, done) => {
  // arrayOfPeople = [
  //   { name: "Jhon", age: 30, favoriteFoods: ["Apple", "Watermelon", "Orange"]},
  //   { name: "Jane", age: 25, favoriteFoods: ["Coconut", "Grapes", "Cherry"] },
  //   { name: "James", age: 20, favoriteFoods: ["Pear", "Kiwi", "Lemon"]}
  //   ];
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });

};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, function(err, data) {
    if (err) return console.log(err);
    data.favoriteFoods.push(foodToAdd);
    data.save(function(err, newPerson) {
      if (err) return console.log(err);
      done(null, newPerson);
    });
  });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true },
    function(err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId}, function(err, data){
    if(err) return console.log(err);
    done(null , data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, function(err, data){
    if(err) return console.log(err);
    done(null , data);
  });

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
  .sort({name: "asc"})
  .limit(2)
  .select({name:1,favoriteFoods: 1})
  .exec(function(err, data){
    if(err)return console.log(err);
    done(null , data);

  });


};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
