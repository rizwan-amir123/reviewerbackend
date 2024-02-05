const fs = require('fs');
const zlib = require('zlib');
const gzipFilePath = '/home/absol/Downloads/amazon_fashion_data.json.gz';
const readline = require('readline');
const mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config();
const mongoURI = process.env.MONGODB_URL; // I have hidden my URI here, it will be in .env file

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const reviewSchema = new mongoose.Schema({
  image: {
    type: [String],
    default: []
  },
  overall: {
    type: Number,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  reviewTime: {
    type: String,
    required: true
  },
  reviewerID: {
    type: String,
    required: true
  },
  asin: {
    type: String,
    required: true
  },
  style: {
    Size: {
      type: String,
      default: ''
    },
    Color: {
      type: String,
      default: ''
    }
  },
  reviewerName: {
    type: String,
    default: ''
  },
  reviewText: {
    type: String,
    default: ''
  },
  summary: {
    type: String,
    default: ''
  },
  unixReviewTime: {
    type: Number,
    required: true
  }
});

const reviewModel = mongoose.model('ReviewCollection', reviewSchema);
// Function to read and decompress the gzipped file
function readAndDecompressFile(filePath, callback) {
  const readStream = fs.createReadStream(filePath);
  const gunzip = zlib.createGunzip();
  const rl = readline.createInterface({
    input: gunzip,
    crlfDelay: Infinity
  });

  const data = [];

  rl.on('line', line => {
    try {
      const jsonObject = JSON.parse(line);
      console.log(jsonObject)
      data.push(jsonObject);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });

  rl.on('close', () => {
    callback(null, data);
  });

  gunzip.on('error', err => {
    callback(err);
  });

  readStream.pipe(gunzip);
  //console.log(data)
}

// Function to insert data into MongoDB using Mongoose
async function insertDataToMongoDB(data) {
  try {
    await reviewModel.insertMany(data);
    console.log('Data inserted successfully into MongoDB using Mongoose.');
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
  }
}

// Main function
readAndDecompressFile(gzipFilePath, (err, jsonData) => {
  if (err) {
    console.error('Error reading or decompressing the file:', err);
  } else {
    insertDataToMongoDB(jsonData);
  }
});
