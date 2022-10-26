"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  //creating Products
  const products = [
    {
      name: "Elderwood Wand",
      type: "Wand",
      price: 50.0,
      description:
        "This wand ismade of elderwood, with its core made of thestral hair. Thestral was a winged horse, one of many magical creatures. Its length is 15 inches, with an unknown flexibility.",
      imageUrl:
        "https://fictionhorizon.com/wp-content/uploads/2022/03/Elder-wand.jpg",
      quantity: 1,
    },
    {
      name: "Dragon HeartString Core Wand",
      type: "Wand",
      price: 34.99,
      description:
        "Made of walnut, with a dragon heartstring core, it is 12 ¾ inches long.",
      imageUrl:
        "https://fictionhorizon.com/wp-content/uploads/2022/03/Bellatrix-Lestranges-wand.jpg",
      quantity: 10,
    },
    {
      name: "Blackthorn Wood Wand",
      type: "Wand",
      price: 26.4,
      description:
        "It is made of blackthorn wood, with a troll whisker’s core and 9 inches long.",
      imageUrl:
        "https://fictionhorizon.com/wp-content/uploads/2022/03/Sir-Cadogans-wand.jpg",
      quantity: 3,
    },
    {
      name: "Ashwood Wand",
      type: "Wand",
      price: 54.99,
      description: `Made of ash wood, 12 ¾’’ long, with a core made of unicorn hair, it was described as “pleasantly springy”`,
      imageUrl:
        "https://fictionhorizon.com/wp-content/uploads/2022/03/Cedric-Diggorys-wand.jpg",
      quantity: 30,
    },
    {
      name: "Phoenix Feather Core Wand",
      type: "Wand",
      price: 30.22,
      description: `It is a flexible wand, made of larch, with a phoenix feather core and 10 ½’’ long.`,
      imageUrl:
        "https://fictionhorizon.com/wp-content/uploads/2022/03/Celestina-Warbecks-wand.jpg",
      quantity: 22,
    },
  ];
  // inserts data into db
  await Promise.all(
    products.map((currentProduct) => {
      return Product.create(currentProduct);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  // o: why are you returning this object here? is this being used anywhere?
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
