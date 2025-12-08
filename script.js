function searchShow() {
    let searchTerm = document.getElementById("search").value;
    let selectedGenre = document.getElementById("genre-filter").value;
    
    fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        let resultsDiv = document.getElementById("results");
        
        // Filtrera på genre och/eller land
        let filteredData = data;
        
        // Filtrera på genre om vald
        if (selectedGenre) {
            filteredData = filteredData.filter(item => {
                return item.show.genres && item.show.genres.includes(selectedGenre);
            });
        }
        
        // Om inga resultat hittades
        if (filteredData.length === 0) {
            resultsDiv.innerHTML = '<p class="no-results">No series found matching your criteria.</p>';
            return;
        }
        
        // Bygg HTML
        let html = "";
        filteredData.forEach(item => {
            let show = item.show;
            let imageUrl = show.image?.medium || '';
            let genres = show.genres.join(', ') || 'N/A';
            
            html += `
                <div class="show-card">
                    <a href="details.html?id=${show.id}">    
                        ${imageUrl ? `<img src="${imageUrl}" alt="${show.name}" class="movie-image">` : '<div class="no-image">No Image</div>'}
                        <h3>${show.name}</h3>
                        <p class="genre-tag">${genres}</p>
                        
                    </a>
                </div>
            `;
        });

        resultsDiv.innerHTML = html;
    })
    .catch(error => {
        console.error('Fetch error:', error);
        document.getElementById("results").innerHTML = '<p class="error">Something went wrong. Please try again.</p>';
    });
}

// Sök när man trycker Enter
document.getElementById("search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchShow();
    }
});
