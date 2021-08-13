const express = require('express');
const connectDB = require('./config/db');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
// app.use(
//   multer({
//     dest: './uploads/',
//     rename: function (fieldname, filename) {
//       return filename;
//     },
//   })
// );

// Define Routes
app.use('/api/users', require('./api/users'));
app.use('/api/pages', require('./api/pages'));
app.use('/api/posts', require('./api/posts'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
