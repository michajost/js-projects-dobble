"use strict";
const main = document.querySelector("main");

let jsonData, cards;

// JSON auslesen
let xhr = new XMLHttpRequest();
xhr.onload = function() {
    if (xhr.status != 200) return;       
    jsonData = xhr.response;
    cards = jsonData.cards;
    console.log(cards);
    init();
};
xhr.open("GET","./cards.json");
xhr.responseType = "json";
xhr.send()


function init() {
    for (let i = 0; i < cards.length; i++) {
        let firstCardSymbols = cards[i];

        for (let j = 0; j < cards.length; j++) {
            let secondCardSymbols = cards[j];
            let checks = true;
    
            for (let k = 0; k < firstCardSymbols.length; k++) {
                let symbol = firstCardSymbols[k];   
                if (secondCardSymbols.indexOf(symbol) != -1) {
                    checks = false;
                    break;                   
                }
            }
            if (checks) {
                console.log(i, cards[i], j, cards[j]);
            }  
        }
    }
}