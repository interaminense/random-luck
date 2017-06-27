import ParticipantCtrl from './../controller/participant.ctrl'
import FirebaseModel from './../model/firebase.model'

export default class ParticipantView {
  constructor() {
    this.participantModel = new FirebaseModel('participants');
    this.database = this.participantModel.getDatabase();
    this.tbody = document.querySelector('#tableParticipant > tbody');
    this.form = document.querySelector('#formParticipant');

    this.init();
  }

  getError() {
    return `${this.participantModel} is null`;
  }

  init() {

    //Update Table
    this.updateTable('value');

    //Add Participant
    this.form.addEventListener('submit', e => {
      e.preventDefault();

      let participant = new ParticipantCtrl(this.form.name.value, this.form.url.value);
      this.participantModel.save(participant);

      this.updateTable('value');
    });

    //Remove Participant
    this.tbody.addEventListener('click', e => {
      if (e.target.tagName.toLowerCase() === 'button') {
        this.participantModel.remove(e.target.value);
        this.updateTable('value');
      }
    });
  }

  updateTable(event) {
    let tbody = this.tbody;
    let msg = this.getError();

    tbody.innerHTML = '';

    this.database.on(event, function (data) {
      if (data.val() !== null) {
        Object.keys(data.val()).forEach(function (key) {

          let tr = document.createElement('tr');
          let tdName = document.createElement('td');
          let tdUrl = document.createElement('td');
          let image = document.createElement('img');
          let tdAction = document.createElement('td');
          let btnRemove = document.createElement('button');

          tdName.textContent = data.val()[key].name;
          image.setAttribute('src', data.val()[key].url);

          btnRemove.textContent = 'remove';
          btnRemove.value = key;
          tdAction.appendChild(btnRemove);

          tr.appendChild(tdName);
          tdUrl.appendChild(image);
          tr.appendChild(tdUrl);
          tr.appendChild(tdAction);

          tbody.appendChild(tr);

        });
      } else {
        console.log(msg);
      }
    });
  }

}