import { VueJournal } from '../../src/vues/journal.js';
import jsdom from 'jsdom-global';

describe('vue journal', function () {
  let vue;
  let journal;
  let pointInsertion;

  beforeEach(function () {
    jsdom('<div id="restitution"></div>');
    journal = {
      evenements: () => {
        return [ 'ligne1', 'ligne2' ];
      }
    };
    pointInsertion = document.getElementById('restitution');
    vue = new VueJournal('#restitution', journal);
  });

  it('initialise une zone de texte', function () {
    expect(pointInsertion.firstChild.id).to.equal('journal');
  });

  it('affiche le contenu du journal dans la zone de texte', function () {
    vue.affiche();

    expect(document.getElementById('journal').textContent).to.equal('"ligne1"\n"ligne2"');
  });

  it('affiche un bouton de remise à zero du journal', function () {
    const boutonReset = pointInsertion.querySelector('#resetjournal');
    expect(boutonReset).to.not.be(null);
    expect(boutonReset.textContent).to.equal('effacer le journal');
  });
});
