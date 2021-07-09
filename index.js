const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const session = require('express-session');

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
   .use(
      session({
        // Simple and not very secure session
        secret: 'random_text',
        cookie: {
          httpOnly: false, // Permit access to client session
        },
      })
    )
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

 //.listen(PORT, () => console.log(`Listening on ${ PORT }`));

 

const server = app.listen(PORT)

// const io = require('socket.io')(server)

// io.on('connection', socket => {
//     console.log('Client connected')

//     socket.on('new-name', () => {
//         socket.broadcast.emit('update-list')
//     })
// })

const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('Client connected!');

  socket
    .on('disconnect', () => {
      console.log('A client disconnected!');
    })
    .on('newUser', (username, time) => {
      // A new user logs in.
      const message = `${username} has logged on.`;
      // Tell other users someone has logged on.
      socket.broadcast.emit('newMessage', {
        message,
        time,
        from: 'admin',
      });
    })
    .on('message', (data) => {
      // Receive a new message
      console.log('Message received');
      console.log(data);
      // This one is simple. Just broadcast the data we received.
      // We can use { ...data } to copy the data object.
      socket.broadcast.emit('newMessage', {
        ...data,
      }); // Note, only emits to all OTHER clients, not sender.
    });
});