import '../styles/journal.scss';

export class VueJournal {
  constructor (pointInsertion, journal) {
    this.journal = journal;
    this.journal.ajouteObservateur(() => {
      this.affiche();
    });

    const elementPointInsertion = document.querySelector(pointInsertion);

    this.reset = document.createElement('button');
    this.reset.id = 'resetjournal';
    this.reset.classList.add('resetjournal');
    this.reset.textContent = 'effacer le journal';
    this.reset.addEventListener('click', () => {
      this.journal.initialise();
    });
    elementPointInsertion.appendChild(this.reset);

    this.element = document.createElement('pre');
    this.element.id = 'journal';
    this.element.classList.add('journal');
    elementPointInsertion.appendChild(this.element);
  }

  affiche () {
    this.element.textContent = this.journal.evenements().map((ligne) => {
      return JSON.stringify(ligne);
    }).join('\n');
  }
}
