function searchWord() {
  let searchInput = document.getElementById("searchInput").value;
  let outputCard = document.getElementById("outputCard");

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        "wordSearched"
      ).innerHTML = `Showing Results of : ${searchInput}`;
      let output =
        data[0].meanings &&
        data[0].meanings.map(
          (item) => `
  <div class="card-body">
    <h2 class="card-title">${item.partOfSpeech}</h2>
    <ul>
      ${item.definitions
        .map(
          (definition) => `
        <li>${definition.definition}</li>
      `
        )
        .join("")}
    </ul>
  </div>
`
        );

      const cardsHtml = `<div id="Cards">
  ${output.join("")}
</div>`;

      outputCard.innerHTML = cardsHtml;
    })

    .catch((error) => {
      console.log(error, "ree");
      outputCard.innerHTML = `<div class="card-body">
                <h2 class="card-title">No Definitions Found</h2>
                <p class="card-description">Sorry pal, we couldn't find definitions for the word you were looking for.</p>
            </div>`;
    });
}
