document.addEventListener('DOMContentLoaded', function() {
    const dogList = document.getElementById('dogList');
    const guessImage = document.getElementById('guessImage');
    let currentBreed = '';

    async function fetchDogs() {
        const response = await fetch('https://dog.ceo/api/breeds/image/random/12');
        const data = await response.json();
        displayDogs(data.message);
    }

    function displayDogs(dogImages) {
        dogList.innerHTML = '';
        dogImages.forEach(image => {
            const breedPath = image.split('/')[4];
            const breed = formatBreedName(breedPath);
            const dogItem = document.createElement('div');
            dogItem.className = 'dog-item';
            dogItem.innerHTML = `
                <h3>${breed}</h3>
                <img src="${image}" alt="${breed}" style="width: 150px; height: 150px;">
                <p>${breed}</p>
            `;
            dogList.appendChild(dogItem);
        });
    }

    async function setupGame() {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        guessImage.src = data.message;
        const breedPath = data.message.split('/')[4]; 
        currentBreed = formatBreedName(breedPath);
    }

    function checkAnswer() {
        const userGuess = document.getElementById('guessInput').value.toLowerCase().trim();
        const resultText = document.getElementById('result');
        if (userGuess === currentBreed.toLowerCase()) {
            resultText.textContent = 'Правильный ответ!';
        } else {
            resultText.textContent = `К сожалению, это ${currentBreed}. Попробуйте еще раз!`;
        }
        setupGame();  
    }

    function formatBreedName(breedPath) {
        return breedPath.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    window.searchDogs = function() {
        const input = document.getElementById('searchInput').value.toLowerCase();
        const dogItems = document.querySelectorAll('.dog-item');
        dogItems.forEach(item => {
            const breed = item.querySelector('h3').textContent.toLowerCase();
            if (breed.includes(input)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };

    document.getElementById('guessInput').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    fetchDogs();
    setupGame();
});
