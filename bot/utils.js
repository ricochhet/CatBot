module.exports = {
  getDataAsMap: function(data) {
    const map = new Map();
    for (const key of Object.keys(data)) {
      map.set(key, data[key]);
    }
    return map;
  }
};
