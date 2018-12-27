import { Observable } from '../modeles/observable.js';

const CLE_JOURNAL = 'journal';

export class DepotJournal extends Observable {
  constructor () {
    super();
    this.lignes = this.litLocalStorage();
    if (!this.lignes) {
      this.initialise();
    }
    window.addEventListener('storage', () => {
      this.lignes = this.litLocalStorage();
      this.notifieObservateurs();
    });
  }

  initialise () {
    this.lignes = [];
    this.enregistreLocalStorage();
  }

  litLocalStorage () {
    return JSON.parse(window.localStorage.getItem(CLE_JOURNAL));
  }

  enregistreLocalStorage () {
    window.localStorage.setItem(CLE_JOURNAL, JSON.stringify(this.lignes));
  }

  enregistre (ligne) {
    this.lignes.push(ligne);
    this.enregistreLocalStorage();
  }

  evenements () {
    return this.lignes;
  }
}
