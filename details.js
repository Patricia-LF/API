// Hämta show ID från URL
const urlParams = new URLSearchParams(window.location.search);
const showId = urlParams.get('id');

let allEpisodes = [];

// Hämta information om serien
fetch(`https://api.tvmaze.com/shows/${showId}`)
.then(response => response.json())
.then(show => {
    const summary = show.summary ? show.summary : 'No summary available.';
    
    document.getElementById("show-details").innerHTML = `
        <header>
            <h1>${show.name}</h1>
            <a href="index.html" class="back-btn">← Back to Search</a>
        </header>    
        <div class="show-container">
            <img src="${show.image?.original || show.image?.medium || ''}" alt="${show.name}">
            <div class="summary-container">
                <div class="summary-info">
                    <p class="summary">${summary}</p>
                </div>
                <div class="details-info">
                    <p><strong>Premiered:</strong> ${show.premiered || 'N/A'}</p>
                    <p><strong>Genre:</strong> ${show.genres.join(", ") || 'N/A'}</p>
                    <p><strong>Status:</strong> ${show.status || 'N/A'}</p>
                    <p><strong>Rating:</strong> ${show.rating?.average || 'N/A'}</p>
                    <p><strong>Network:</strong> ${show.network?.name || show.webChannel?.name || 'N/A'}</p>
                </div>
            </div>
        </div>
    `;
})
.catch(error => {
    console.error('Error loading show:', error);
    document.getElementById("show-details").innerHTML = '<p>Could not load show details.</p>';
});

// Hämta alla avsnitt
fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
.then(response => response.json())
.then(episodes => {
    allEpisodes = episodes;
    populateSeasonSelector();
})
.catch(error => {
    console.error('Error loading episodes:', error);
    document.getElementById('episodes-list').innerHTML = '<p>Could not load episodes.</p>';
});

// Fyll i säsongsväljaren
function populateSeasonSelector() {
    const seasonSelect = document.getElementById('season-select');
    const seasons = [...new Set(allEpisodes.map(ep => ep.season))].sort((a, b) => a - b);
    
    seasonSelect.innerHTML = '<option value="">Select a season...</option>';
    
    seasons.forEach(season => {
        const option = document.createElement('option');
        option.value = season;
        option.textContent = `Season ${season}`;
        seasonSelect.appendChild(option);
    });
}

// Ladda avsnitt för vald säsong
function loadEpisodes() {
    const seasonSelect = document.getElementById('season-select');
    const selectedSeason = parseInt(seasonSelect.value);
    const episodesListDiv = document.getElementById('episodes-list');
    
    if (!selectedSeason) {
        episodesListDiv.innerHTML = '';
        return;
    }
    
    const seasonEpisodes = allEpisodes.filter(ep => ep.season === selectedSeason);
    
    let html = '';
    seasonEpisodes.forEach(episode => {
        const imageUrl = episode.image?.medium || '';
        const summary = episode.summary ? episode.summary.replace(/<[^>]*>/g, '') : 'No summary available.';
        
        html += `
            <div class="episode-card">
                ${imageUrl ? `<img src="${imageUrl}" alt="${episode.name}" class="episode-image">` : '<div class="no-image">No Image</div>'}
                <div class="episode-info">
                    <h3>Episode ${episode.number}: ${episode.name}</h3>
                    <p class="episode-meta">Season ${episode.season} • Episode ${episode.number}</p>
                    ${episode.airdate ? `<p class="episode-meta">Aired: ${episode.airdate}</p>` : ''}
                    ${episode.runtime ? `<p class="episode-meta">Runtime: ${episode.runtime} min</p>` : ''}
                    <p class="episode-summary">${summary}</p>
                </div>
            </div>
        `;
    });
    
    episodesListDiv.innerHTML = html;
}