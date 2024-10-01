const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://truong:truong@swp391.mvqya.mongodb.net/?retryWrites=true&w=majority&appName=SWP391', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const conn = mongoose.connection;

conn.on('connected', function () {
  console.log('MongoDB connected');
});

conn.on('disconnected', function () {
  console.log('MongoDB disconnected');
});

conn.on('error', function (error) {
  console.error(`MongoDB error: ${error}`);
});

// Đóng kết nối khi ứng dụng bị tắt
process.on('SIGINT', async () => {
  await conn.close();
  process.exit(0);
});

module.exports = conn;
