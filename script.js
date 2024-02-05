async function getPhrases() {
    const res = await fetch("./assets/json/data.json");
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

const searchInput = document.querySelector("#search");
const searchResult = document.querySelector(".phrase-results");

let dataArray;

searchInput.addEventListener("input", filterData);
getPhrases();
