import '../styles/journal.scss';

export class VueJournal {
  constructor (pointInsertion, journal) {
    this.journal = journal;

    const elementInsertion = document.querySelector(pointInsertion);

    this.reset = document.createElement('button');
    this.reset.id = 'resetjournal';
    this.reset.classList.add('resetjournal');
    this.reset.textContent = 'effacer le journal';
    this.reset.addEventListener('click', () => {
      this.journal.initialise();
    });
    elementInsertion.appendChild(this.reset);

    this.element = document.createElement('pre');
    this.element.id = 'journal';
    elementInsertion.appendChild(this.element);
  }

  affiche () {
    this.element.textContent = this.journal.evenements().map((ligne) => {
      return JSON.stringify(ligne);
    }).join('\n');
  }
}
