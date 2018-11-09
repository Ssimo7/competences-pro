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

function computeRelativePosition(distance, distanceTotale) {
  return (distance * 100 / distanceTotale) + "%";
}

document.addEventListener('DOMContentLoaded', function() {
  console.log(stock.contenants);

  let zone1 = document.createElement("zone1");
  zone1.style.position = "absolute";
  let contenant = stock.contenants[0];
  zone1.style.left = computeRelativePosition(contenant.posX, stock.width);
  zone1.style.top = computeRelativePosition(contenant.posY, stock.height);
  zone1.style.width = computeRelativePosition(contenant.width, stock.width);
  zone1.style.height = computeRelativePosition(contenant.height, stock.height);
  zone1.style.backgroundColor = "red";
  let stockElement = document.getElementById("stock");
  stockElement.appendChild(zone1);
}, false);
