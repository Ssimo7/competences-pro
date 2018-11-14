import '../styles/app.scss';
import stock from '../model/stock.json';
import { fournitMagasin } from './fournitMagasin.js'

document.addEventListener('DOMContentLoaded', function() {

  function refresh () {
    fournitMagasin('etageres', stock);
  }
  window.addEventListener('resize', refresh);
  document.getElementById('etageres').addEventListener('load', refresh);

}, false);
