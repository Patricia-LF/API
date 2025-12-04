function searchShow() {
    let searchTerm = document.getElementById("search").value;
    
    fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        let resultsDiv = document.getElementById("results");
        let html = "";
        
        data.forEach(item => {
            let show = item.show;
            let imageUrl = show.image?.medium || '';
            
            html += `
                <div class="show-card">
                    <a href="details.html?id=${show.id}">    
                        ${imageUrl ? `<img src="${imageUrl}" alt="${show.name}" class="movie-image">` : '<div class="no-image">No Image</div>'}
                        <h3>${show.name}</h3>
                    </a>
                </div>
            `;
        });

        resultsDiv.innerHTML = html; // Sätt HTML en gång
    })
    .catch(error => {
        console.error('Fetch error:', error);
        document.getElementById("results").innerHTML = '<p>Something went wrong. Please try again.</p>';
    });
}



/* function resultShow() {
    let results = document.getElementById("results").value;

    fetch()
} */

//<p>${show.summary || 'Ingen beskrivning'}</p>