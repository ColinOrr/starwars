class Repository extends Array {
  constructor(items) {
    super();
    if (items && items.forEach) {
      items.forEach(x => this.push(x));
    }
  }

  find(id) {
    return this.filter(x => x.id == id)[0];
  }

  summarize(extras = () => {}) {
    return this.map(x => x.summarize(extras(x)));
  }
}

module.exports = Repository;
