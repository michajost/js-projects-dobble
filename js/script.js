"use strict";
const SETTINGS = {
    sec: 60, // Time until game ends
    maxT() { return this.sec * 1000 },
    penalty: 12
}
const time = document.querySelector("#time");
const gameArea = document.querySelector("#game");
const divHighScore = document.querySelector("#highscore");
const btnStart = gameArea.querySelector("#start");
const anleitung = document.querySelector(".anleitung");

let jD, cnt = 0, cards, cP = [], hS, timer = 1, cInvl, pT = 0, pInvl, bT = 0, bInvl, cU = 0;

let xhr = new XMLHttpRequest();
xhr.onload = function () {
    if (xhr.status != 200) return;
    jD = (xhr.responseType == "json") ? xhr.response : JSON.parse(xhr.responseText)
    cards = jD.cards;
};
xhr.open("GET", "./cards.json");
xhr.responseType = "json";
xhr.send();

const initGame = function () {
    time.textContent = SETTINGS.sec + " Sekunden";
    readStorage();
    btnStart.onclick = startButtonClick;
};

const readStorage = function () {
    hS = getLocStore("highScore");
    divHighScore.textContent = (hS) ? `Dein Highscore ist ${hS}` : "Du hast noch nicht gespielt.";
};

const startButtonClick = function () {
    remove(document.querySelector(".gameEndMsg"));
    toggle(this, anleitung);
    gameArea.append(getProgress(0, SETTINGS.maxT()), updateCounter());
    newCards();
    countdown();
};

const getProgress = function (min, max) {
    const progressbar = document.createElement("progress");
    progressbar.value = min;
    progressbar.max = max;
    return progressbar;
};

const updateCounter = function (cnt) {
    if (!cnt) {
        const spnC = document.createElement("span");
        spnC.className = "spanCounter";
        spnC.textContent = 0;
        return spnC;
    } else {
        const spnC = document.querySelector(".spanCounter");
        spnC.classList.add("blob");
        bInvl = setInterval(blob, 100);
        spnC.textContent = cnt;
    }
};

const countdown = function () {
    cInvl = setInterval(intervalCountdown, 1000);
};

const intervalCountdown = function () {
    if (timer < (SETTINGS.maxT() / 1000)) document.querySelector("progress").value = ++timer * 1000;
    else {
        clearInterval(cInvl);
        endGame();
    }
};

const newCards = function () {
    remove(document.querySelector(".showCard"), document.querySelector(".inputCard"));
    getCard("showCard", getRandomIndex());
    getCard("inputCard", getRandomIndex());
};

const getRandomIndex = function () {
    let cardIndex;
    ++cU;
    if (cU >= cards.length) { cP = []; cU = 0; }
    do {
        cardIndex = Math.floor(Math.random() * cards.length);
    } while (cP.indexOf(cardIndex) != -1)
    cP.push(cardIndex);
    return cardIndex;
};

const getCard = function (type, index) {
    const card = cards[index];
    const cardContainer = document.createElement("div");
    cardContainer.className = type;
    for (let i = 0; i < card.length; i++) cardContainer.append(generateCard(type, card[i]));
    gameArea.append(cardContainer);
};

const generateCard = function (type, cardIndex) {
    const symbolImg = document.createElement("img");
    symbolImg.dataset.index = cardIndex;
    symbolImg.src = "./icons/symbol_" + cardIndex + ".svg";
    symbolImg.alt = "Symbol " + cardIndex;
    if (type == "inputCard") {
        symbolImg.onclick = symbolClick;
    }
    return symbolImg;
};

const symbolClick = function () {
    if ((this.parentElement.className.indexOf("wrongClick") == -1)) {
        const showCardymbols = document.querySelectorAll(".showCard img");
        for (let i = 0; i < showCardymbols.length; i++) {
            let symbolId = showCardymbols[i].dataset.index;
            if (this.dataset.index == symbolId) {
                updateCounter(++cnt);
                newCards();
                return;
            }
        }
        wrongCardPenalty();
    }
};

const wrongCardPenalty = function () {
    clearInterval(pInvl);
    document.querySelector(".inputCard").classList.add("wrongClick");
    pInvl = setInterval(penalty, 100);
};

const penalty = function () {
    if ((pT) > SETTINGS.penalty) {
        clearInterval(pInvl);
        document.querySelector(".inputCard").classList.remove("wrongClick");
        pT = 0;
        return;
    }
    ++pT;
};

const endGame = function () {
    const gameEndMsg = document.createElement("div");
    gameEndMsg.className = "gameEndMsg";
    if (cnt > hS) {
        setLocStore("highScore", cnt);
        hS = cnt;
        gameEndMsg.textContent = `Hurra! Der neue Heighscore lautet: ${hS}`;
        divHighScore.textContent = `Dein Highscore ist ${hS}`;
    } else {
        gameEndMsg.textContent = `${cnt} Richtige hast du gefunden. Den Highscore von ${hS} hast du aber leider nicht geknackt. Versuchs noch einmal`;
    }
    gameArea.before(gameEndMsg);
    clearGameArea();
}

const clearGameArea = function () {
    remove(
        gameArea.querySelector("progress"),
        gameArea.querySelector(".spanCounter"),
        gameArea.querySelector(".showCard"),
        gameArea.querySelector(".inputCard")
    );
    cnt = 0;
    timer = 1;
    cP = [];
    btnStart.textContent = "Noch eine Runde";
    toggle(btnStart, anleitung);
}

const blob = function () {
    if ((bT) > 4) {
        clearInterval(bInvl);
        let blobed = document.querySelector(".spanCounter");
        if (blobed) blobed.classList.remove("blob");
        bT = 0;
        return;
    }
    ++bT;
};

const toggle = (...els) => { els.forEach((el) => el.style.display = (el.style.display === "none") ? null : "none") };
const remove = (...els) => { els.forEach((el) => { if (el) el.remove() }) };
const setLocStore = (k, v) => { if (Storage) localStorage.setItem(k, v) };
const getLocStore = (k) => { return (Storage) ? Number(localStorage.getItem(k)) : false };
initGame();