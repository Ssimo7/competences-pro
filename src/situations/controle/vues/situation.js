import { VuePiece, animationInitiale } from 'controle/vues/piece.js';

export class VueSituation {
  constructor (situation) {
    this.situation = situation;
  }

  affiche (pointInsertion, $) {
    let identifiantIntervalle = setInterval(() => {
      if (this.situation.sequenceTerminee()) {
        clearInterval(identifiantIntervalle);
        return;
      }

      let piece = this.situation.pieceSuivante();
      let vuePiece = new VuePiece(piece, 200);
      vuePiece.affiche(pointInsertion, $, animationInitiale);
    }, this.situation.cadenceArriveePieces());
  }
}
