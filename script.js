
const url = "https://66183a619a41b1b3dfbc9189.mockapi.io/artist/Artists";
const artistContainer = document.getElementById('artist-container');


async function fetchArtistData() {
    
   await fetch(url)
        .then(response => response.json())
        .then(data => {
            const artistContainer = document.getElementById('artist-container');
            
            data.forEach(artist => {
                const card = createArtistCard(artist);
                artistContainer.appendChild(card);
                card.addEventListener('click',()=>{
                    const dataJson = JSON.stringify(artist);
                    localStorage.setItem("Artists", dataJson);
                    getItem("Artists")
                });

            });
         
        })
        .catch(error => {
            console.error('Error fetching artist data:', error);
        });
}

fetchArtistData();

function getItem(key) {
    const dataJson = localStorage.getItem(key);
    if (dataJson) {
        const data = JSON.parse(dataJson);
        
        console.log(`Artist:  `, data);
        alert(data.name + " Saved in localStorage successfully !")
        return data;
    } else {
        console.log(`No data found in localStorage for key '${key}'`);
        return null;
    }
}

function createArtistCard(artist) {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = artist.imageURL;
    img.alt = artist.name;
    const content = document.createElement('div');
    content.className = 'card-content';

    const h3 = document.createElement('h3');
    h3.textContent = artist.name;

    const p = document.createElement('p');
    p.textContent = `Born: ${artist.birthYear}`;

    content.appendChild(h3);
    content.appendChild(p);
    card.appendChild(img);
    card.appendChild(content);

    return card;
}

