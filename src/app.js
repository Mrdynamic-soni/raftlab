const express = require("express");
const path  = require("path");
const csv = require('csv-parser');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const hbs = require("hbs");


const app = express();
const port = process.env.PORT||3000;


const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");

hbs.registerPartials(partialpath);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));

app.set("view engine","hbs");
app.set("views",templatepath);

const autherdata = ()=>{fs.createReadStream(path.join(__dirname,"../public/files/authers.csv")).pipe(csv()).on('data', (row) => {
  console.log(row);
}).on('end', () => {
  console.log('authers CSV file successfully processed');
});
}

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/addfile", async (req,res)=>{
  try{
     console.log(req.body);
     if(req.body.book == "on"){
      const writer = csvWriter();
      writer.pipe(fs.createWriteStream(path.join(__dirname,"../public/files/book.csv")), {flags: 'a'});
      writer.write(req.body);
      writer.end();
      res.status(200).render("index");
     }else{
      const writer = csvWriter();
      writer.pipe(fs.createWriteStream(path.join(__dirname,"../public/files/authers.csv")),{flags: 'a'});
      writer.write(req.body);
      writer.end();
      
      fs.appendFile(path.join(__dirname,"../public/files/magazines.csv"), req.body, (err) => {
        if (err) throw err;
           console.log('The "data to append" was appended to file!');
        });
      res.status(200).render("index");
     }
    }catch(err){
        res.status(500).send(err);
    }

})


app.listen(port,()=>{
    console.log(`server is up and runnig at localhost:${port}`);
})
