const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/coffe_shop',
      { useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false ,
        useCreateIndex: true
      });
    console.log('Database conectada');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnection;