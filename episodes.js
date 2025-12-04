

const urlParams = new URLSearchParams(window.location.search);
const episodesId = urlParams.get('id');

fetch(`https://api.tvmaze.com/shows/${episodesId}`)
.then(response => response.json())
.then(episodes => {
    document.getElementById("show-episodes").innerHTML = `
        <img src="${episodes.image?.original || ''}" alt="${episodes.name}">
        <div class "episodes-info">
            <h1>${episodes.name}</h1>
            <p>${episodes.summary}</p>
        </div>
        <a href="details.html">Back</a>
    `;
});