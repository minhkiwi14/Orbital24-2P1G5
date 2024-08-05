const expressSession = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);
  let mongodbUrl = "mongodb://localhost:27017";

  if (process.env.MONGODB_URL) {
    mongodbUrl = process.env.MONGODB_URL;
  }

  const store = new MongoDBStore({
    uri: mongodbUrl,
    databaseName: "intelligame",
    collection: "sessions",
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: "do-not-touch-this!",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    },
  };
}

module.exports = createSessionConfig;
