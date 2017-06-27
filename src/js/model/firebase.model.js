export default class FirebaseModel {
  constructor(path) {
    this.path = path;
    this.database = database.ref(path);
  }

  getDatabase() {
    return this.database;
  }

  save(item) {
    this.database.push({
      name: item.name,
      url: item.url
    });
  }

  update(item, id) {
    this.database.child(id).set({
      name: item.name,
      url: item.url
    });
  }

  remove(id) {
    this.database.child(id).remove();
  }

  // getList() {
  //   return this.database.on('value', function (snapshot) {
  //     return snapshot.val();
  //   });
  // }

  childAdded() {
    this.database.on('child_added', function (data) {
      console.log('child child_added', data.val())
    });
  }

  childChanged() {
    this.database.on('child_changed', function (data) {
      console.log('child child_changed', data.val())
    });
  }

  childRemoved() {
    this.database.on('child_removed', function (data) {
      console.log('child child_removed', data.val())
    });
  }

  onValue() {
    this.database.on('value', function (data) {
      console.log('child value', data.val())
    });
  }

  toString() {
    return `this path "/${this.path}"`
  }

}