'use strict';

// Use fs-extra which adds additional methods to fs (like ensureDir)
const fs = require('fs-extra');
const path = require('path');
const util = require('util');

const log = require('debug')('notes:fs-model');
const error = require('debug')('notes:error');

const Note = require('./Note');

function notesDir() {
  const dir = process.env.NOTES_FS_DIR || 'notes-fs-data';
  return new Promise((resolve, reject) => {
    fs.ensureDir(dir, err => {
      if (err) reject(err);
      else resolve(dir);
    });
  });
}

function filePath(notesdir, key) {
  // One file per note
  return path.join(notesdir, key + '.json');
}

function readJSON(notesdir, key) {
  const readFrom = filePath(notesdir, key);
  return new Promise((resolve, reject) => {
    fs.readFile(readFrom, 'utf8', (err, data) => {
      if (err) return reject(err);
      log('readJSON ' + data);
      resolve(Note.fromJSON(data));
    })
  });
}

exports.update = exports.create = function (key, title, body) {
  return notesDir().then(notesdir => {
    if (key.indexOf('/') >= 0) throw new Error(`key ${key} cannot contain '\'`);
    let note = new Note(key, title, body);
    const writeTo = filePath(notesdir, key);
    const writeJSON = note.JSON;
    log('WRITE ' + writeTo + ' ' + writeJSON);
    return new Promise((resolve, reject) => {
      fs.writeFile(writeTo, writeJSON, 'utf8', err => {
        if(err) reject(err);
        else resolve(note);
      });
    });
  });
}

exports.read = function (key) {
  return notesDir().then(notesdir => {
    return readJSON(notesdir, key).then(note => {
      log('READ ' + notesdir + '/' + key + ' ' + util.inspect(note));
      return note;
    });
  })
}