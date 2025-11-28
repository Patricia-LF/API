function searchShow() {
    let searchTerm = document.getElementById("search").value;
    
    fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        let resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";
        
        data.forEach(item => {
            let show = item.show;
            
            resultsDiv.innerHTML += `
                <div>
                    <h3>${show.name}</h3>
                    <img src="${show.image?.medium || 'placeholder.jpg'}" alt="${show.name}">
                </div>
            `;
        });
    });
}

//<p>${show.summary || 'Ingen beskrivning'}</p>