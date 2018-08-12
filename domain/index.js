const People = require('./people');

class Domain {
  constructor() {
    this.people = new People();
  }

  async load() {
    this.people = await People.load();
  }
}

module.exports = new Domain();
