const CLE_JOURNAL = 'journal';

export class DepotJournal {
  constructor () {
    this.lignes = JSON.parse(window.localStorage.getItem(CLE_JOURNAL));
    if (!this.lignes) {
      this.initialise();
    }
  }

  initialise () {
    this.lignes = [];
    this.enregistreLocalStorage();
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
