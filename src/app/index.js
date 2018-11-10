import '../styles/app.scss';
import stock from '../model/stock.json';

export default class TestClass {

  constructor(m) {
    this.message = m;
  }

  donneMessage () {
    return this.message;
  }

}

let test = new TestClass();

document.addEventListener('DOMContentLoaded', function() {
  console.log(stock.contenants);


  let etageres = document.getElementById("etageres");
  let etageresMap = document.getElementById("etageresMap");
  let computeAreas = function() {

    stock.contenants.forEach(function(contenant) {
      const left = contenant.posX / stock.width * etageres.offsetWidth;
      const top = contenant.posY / stock.height * etageres.offsetHeight;
      const width = contenant.width / stock.width * etageres.offsetWidth;
      const height = contenant.height / stock.height * etageres.offsetHeight;

      //   <area shape="rect" coords="34,44,270,350" href="…">
      let area = document.createElement("area");
      area.shape = 'rect'
      area.coords= [left, top, left+width, top+height].join(',')
      etageresMap.appendChild(area);
    });
  };

  window.addEventListener('resize', computeAreas);
  etageres.addEventListener('load', computeAreas);

}, false);
