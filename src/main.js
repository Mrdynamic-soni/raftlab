const path  = require("path");
const csv = require('csv-parser');
const fs = require('fs');

// fs.createReadStream(path.join(__dirname,"../public/files/authers.csv"))
//   .pipe(csv())
//   .on('data', (row) => {
//     console.log(row);
//   })
//   .on('end', () => {
//     console.log('authers CSV file successfully processed');
//   });

// fs.createReadStream(path.join(__dirname,"../public/files/book.csv"))
//   .pipe(csv())
//   .on('data', (row) => {
//     console.log(row);
//   })
//   .on('end', () => {
//     console.log('book CSV file successfully processed');
//   });

fs.createReadStream(path.join(__dirname,"../public/files/magazines.csv"))
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('magazines CSV file successfully processed');
  });


 