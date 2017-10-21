const express = require('express');
const router = express.Router();
const notes = require('../models/notes-memory')

/* GET home page. */
router.get('/', function (req, res, next) {
  notes.keylist()
    .then(keylist => {
      let keyPromises = [];
      for (let key of keylist) {
        keyPromises.push(
          notes.read(key)
            .then(note => {
              return { key: note.key, title: note.title }
            })
        );
      }
      return Promise.all(keyPromises);
    })
    .then(notelist => {
      res.render('index', { title: 'Notes', notelist: notelist });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
