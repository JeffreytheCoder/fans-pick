const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connect = async () => {
  await mongoose.connect(db, {
    auto_reconnect: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
}

const connectDB = () => {
  const db = mongoose.connection;
  connect();

  db.on('connecting', function() {
    console.log('connecting to MongoDB...');
  });
  db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
  });
  db.on('connected', function() {
    console.log('MongoDB connected!');
  });
  db.once('open', function() {
    console.log('MongoDB connection opened!');
  });
  db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
  });
  db.on('disconnected', async function() {
    console.log('MongoDB disconnected!');
    connect();
  });
  // try {
  //   await mongoose.connect(db, {
	// 		useNewUrlParser: true,
	// 		useCreateIndex: true,
	// 		useFindAndModify: false,
	// 		useUnifiedTopology: true
	// 	});
  //   console.log('MongoDB connected');
  // } catch (err) {
  //   console.error(err.message);
  //   process.exit(1);
  // }
}

module.exports = connectDB;