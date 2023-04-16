const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  await Thought.deleteMany({});

  const users = [
    {
      username: "Tigran",
      email: "tk2167@gmail.com",
    },
    {
      username: "Yeager",
      email: "mattyeager@gmail.com",
    },
  ];

  const thoughts = [
    {
      thoughtText: "Awwww dude",
      username: "Tigran",
    },
    {
      thoughtText: "Lookin big son",
      username: "Yeager",
    },
  ];

  console.log(thoughts);

  await User.collection.insertMany(users);

  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});