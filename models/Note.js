'use strict';

module.exports = class Note {
  constructor(key, title, body) {
    this.key = key;
    this.title = title;
    this.body = body;
  }

  /**
   * Returns stringified JSON representation of Note instance
   */
  get JSON() {
    return JSON.stringify({
      key: this.key,
      title: this.title,
      body: this.body
    })
  }

  /**
   * Creates Note instance from JSON string
   * @param {String} json JSON string to be parsed into data object to create Note instance
   */
  static fromJSON(json) {
    let data = JSON.parse(json);
    let note = new Note(data.key, data.title, data.body);
    return note;
  }
}