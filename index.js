const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const timestamp = new Date().toISOString().replace(/[:]/g,"");
const fileStorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'images')
   },
   filename: (req, file, cb) => {
      cb(null, timestamp + '-' + file.originalname);
   }
});

const fileFilter = (req, file, cb) => {
   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
   } else {
      cb(null, false);
   }  
};

const routes = require('./routes');

const PORT = process.env.PORT || 5000

const app = express();

// Route setup. You can implement more in the future!
// const ta01Routes = require('./routes/ta01');
// const ta02Routes = require('./routes/ta02');
// const ta03Routes = require('./routes/ta03'); 
// const ta04Routes = require('./routes/ta04'); 

app.use(express.static(path.join(__dirname, 'public')))
   .use('/images', express.static(path.join(__dirname, 'images')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   
   .use(bodyParser.urlencoded({extended: true}))
   .use(bodyParser.json())
   .use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
   // ~~~~~~~~ NEW ~~~~~~~~~
   .use('/', routes)
  //  .use('/ta01', ta01Routes)
  //  .use('/ta02', ta02Routes) 
  //  .use('/ta03', ta03Routes) 
  //  .use('/ta04', ta04Routes)
  //  .get('/', (req, res, next) => {
  //    // This is the primary index, always handled last. 
  //    res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
  //   })
  //  .use((req, res, next) => {
  //    // 404 page
  //    res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
  //  })

 .listen(PORT, () => console.log(`Listening on ${ PORT }`));
