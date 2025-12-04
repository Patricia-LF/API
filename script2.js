function toggleMenu() {
        const menu = document.querySelector('.mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        const body = document.body;

        menu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Förhindra scrollning när menyn är öppen
        if (menu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

function getQuestion() {

const category = document.getElementById("categorySelect").value;
const url = `https://opentdb.com/api.php?amount=1`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        let resultsDiv = document.getElementById("questions");
        resultsDiv.innerHTML = `<h2>${data.results[0].question}</h2>
            <p>Category: ${data.results[0].category}</p>
            <p>Difficulty: ${data.results[0].difficulty}</p>`; 
        console.log(data);
    });
}

//https://opentdb.com/api.php?amount=1&category=${category}