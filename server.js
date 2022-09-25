const express = require('express')
const app = express()
const port = 3000
const multer=require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

 function fileFilter (req, file, cb) {
    console.log(file.size);
    console.log(file);
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/jpg')
    {
        cb(null, true);
    }
    else{
        cb(null,false)
        cb(new Error('I don\'t have a clue!'));
    } 
  }  
const upload = multer({storage,fileFilter});

app.use(express.static('html'));

app.post('/image', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send("image has been saved sucessfully saved");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})