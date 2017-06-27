export default class Participant {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }

  get template() {
    return `<h1>${this.name}</h1> <img src="${this.url}" />`
  }
}