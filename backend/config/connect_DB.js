const mongoose = require("mongoose");

const connect_DB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  }
  catch (err) {
    console.error(err);
  }
};

module.exports = connect_DB;
