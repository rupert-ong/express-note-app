'use strict';

const util = require('util');
const express = require('express');
const router = express.Router();
const notes = require('../models/notes-memory');

router.get('/add', (req, res, next) => {
  res.render('noteedit', {
    title: 'Add a Note',
    docreate: true,
    notekey: '',
    note: undefined
  });
});

router.post('/save', (req, res, next) => {
  let p;
  if (req.body.docreate === 'create') {
    p = notes.create(req.body.notekey, req.body.title, req.body.body);
  } else {
    p = notes.update(req.body.notekey, req.body.title, req.body.body);
  }
  
  p.then(note => {
    res.redirect('/notes/view?key=' + req.body.notekey);
  }).catch(err => {
    next(err);
  });
});

module.exports = router;