import '../styles/etageres.scss';

import donneesStock from '../data/stock.json';
import { creeMagasin } from '../modeles/magasin.js';
import { VueEtageres } from '../vues/etageres.js';
import { initialiseFormulaireSaisieInventaire } from '../vues/formulaireSaisieInventaire.js';
import { Journal } from '../modeles/journal.js';
import { DepotJournal } from '../infra/depot_journal.js';

export function afficheMagasin (pointInsertion, $) {
  new VueEtageres(pointInsertion, new Journal(Date.now, new DepotJournal()))
    .affiche(donneesStock.contenants);

  let magasin = creeMagasin(donneesStock);
  initialiseFormulaireSaisieInventaire(magasin, pointInsertion, $, function (saisieValide) {
    let message = saisieValide ? 'Bravo, vous avez réussi !' : 'Ce n\'est pas tout à fait ça… réessayez.';
    window.alert(message);
  });
}
