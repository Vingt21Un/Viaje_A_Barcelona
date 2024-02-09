async function getPhrases() {
    const res = await fetch("https://raw.githubusercontent.com/LelouchFR/viaje-a-barcelona/main/assets/json/data.json");
    const phrases = await res.json();

    dataArray = orderList(phrases);
    createPhraseList(dataArray);
}

function orderList(data) {
    const orderedData = data.slice().sort((a, b) => a.french.localeCompare(b.french));
    return orderedData;
}

function createPhraseList(phrasesList) {
    for (let i = 0; i < phrasesList.length; i++) {
        const phrase = phrasesList[i];

        const listItem = document.createElement("div");
        listItem.setAttribute("class", "phrase-item");

        listItem.innerHTML = `
            <p class="french">${phrase.french}</p>
            <p class="spanish">${phrase.spanish}</p>
            <p class="other-details">${phrase.otherDetails ?? "/"}</p>
        `;

        searchResult.appendChild(listItem);
    }
}

function filterData(data) {
    searchResult.innerHTML = "";

    const searchedString = data.target.value.trim().toLowerCase();

    if (!searchedString) {
        createPhraseList(dataArray);
        return;
    }

    const filteredArr = dataArray.filter(phrase =>
        phrase.french.toLowerCase().includes(searchedString) ||
        phrase.spanish.toLowerCase().includes(searchedString)
    );

    createPhraseList(filteredArr);
}

const sideNav = document.querySelector('.side-nav');
const navLogo = document.querySelector('.nav-logo');

navLogo.addEventListener('click', function() {
    if (sideNav.classList.contains('collapsed')) {
        sideNav.classList.remove('collapsed');
        document.querySelector('.main-content').style.marginLeft = "-25px"; // Largeur de la barre latérale par défaut
    } else {
        sideNav.classList.add('collapsed');
        document.querySelector('.main-content').style.marginLeft = "-200px"; // Largeur réduite de la barre latérale
    }
});

const searchInput = document.querySelector("#search");
const searchResult = document.querySelector(".phrase-results");

let dataArray;

searchInput.addEventListener("input", filterData);
getPhrases();
