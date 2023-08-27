"use strict";
/* Mon algorithme marche comme suit:
  1. je stock les adresses dans un tableau ou chaque ligne est un objet avec les propriétés des adresses.
  2. je trie mon tableau par ordre decroissant de deadline de tâche à chaque adresse (merge sort)
  3. je parcours mon tableau triée et definie chaque itération comme point de depart pour un trajet.
  4. Pour chaque trajet, j'ajoute les adresses possibles selon le temps
  5. je retourne les trajets.
*/

var adrs = [
  { adr: "17 Rue Gracieuse, 75005 Paris", debut: "09:00", fin: "11:00" },
  { adr: "22 Rue soufflot, 75005 Paris", debut: "13:00", fin: "15:00" },
  { adr: "5  Rue soufflot, 75018 Paris", debut: "08:15", fin: "10:15" },
  { adr: "5 Pav. Alan Turing, 75013 Paris", debut: "14:30", fin: "16:30" },
  { adr: "2PI. Joffre, 75007 Paris", debut: "15:10", fin: "17:10" },
  { adr: "62 Rue Maurice Ripoche, 75014 Paris", debut: "12:30", fin: "14:30" },
  { adr: "42 Rue de l'eglise, 75015 Paris", debut: "13:40", fin: "15:40" },
  { adr: "10 Rue de PenthiÃ¨vre, 7508 Paris", debut: "17:00", fin: "19:00" },
  { adr: "117 Quai de valmy, 75010 Paris", debut: "20:15", fin: "22:15" },
  {
    adr: "Rue croix des Petits Champs, 75001 Paris",
    debut: "18:15",
    fin: "20:15",
  },
];

var trajects = new Array(adrs.length);

function dateToMinuts(date) {
  const [hour, min] = date.split(":");
  return parseInt(hour) * 60 + parseInt(min);
}

function merge(adrs, left, right) {
  var i = 0;
  var j = 0;
  var k = 0;

  while (i < left.length && j < right.length) {
    if (dateToMinuts(left[i].debut) <= dateToMinuts(right[j].debut)) {
      adrs[k] = left[i];
      i++;
    } else {
      adrs[k] = right[j];
      j++;
    }
    k++;
  }
  while (i < left.length) {
    adrs[k] = left[i];
    i++;
    k++;
  }
  while (j < right.length) {
    adrs[k] = right[j];
    j++;
    k++;
  }
}

function mergeSort(adrs) {
  if (adrs.length < 2) {
    return;
  }

  let middle = Math.floor(adrs.length / 2);
  const leftArray = new Array(middle);
  const rightArray = new Array(adrs.length - middle);

  for (let i = 0; i < middle; i++) {
    leftArray[i] = adrs[i];
  }

  for (let j = middle; j < adrs.length; j++) {
    rightArray[j - middle] = adrs[j];
  }
  mergeSort(leftArray);
  mergeSort(rightArray);
  merge(adrs, leftArray, rightArray);
}

function findAllOptimizedPaths(adrs) {
  mergeSort(adrs);
  for (let i = 0; i < adrs.length; i++) {
    const traject = [adrs[i]];
    let depart = i;
    if (depart != adrs.length - 1) {
      while (depart + 1 < adrs.length) {
        if (
          dateToMinuts(adrs[depart].debut) + 30 <
          dateToMinuts(adrs[depart + 1].fin)
        ) {
          traject.push(adrs[depart + 1]);
        }
        depart++;
      }
    } else {
      while (
        dateToMinuts(adrs[depart].debut) + 30 <
        dateToMinuts(adrs[depart - 1].fin)
      ) {
        traject.push(adrs[depart - 1]);
        depart--;
      }
    }
    trajects[i] = traject;
  }
}

findAllOptimizedPaths(adrs);
console.log(adrs);
