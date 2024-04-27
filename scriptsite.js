        // Fonction pour rechercher les annonces en fonction du terme saisi
        function searchAds() {
            const searchTerm = document.getElementById('search').value;
            const apiUrl = `http://localhost:4000/api/search?q=${encodeURIComponent(searchTerm)}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Effacer les annonces précédentes
                    const adsContainer = document.getElementById('ads-container');
                    adsContainer.innerHTML = '';
                    
                    // Afficher les nouvelles annonces
                    displayAds(data.ads);
                })
                .catch(error => console.error('Erreur lors de la recherche des annonces :', error));
        }

        // Fonction pour afficher les annonces dans la page
        function displayAds(ads) {
            const adsContainer = document.getElementById('ads-container');
            ads.forEach(ad => {
                const adElement = document.createElement('div');
                adElement.classList.add('ad');

                // Construction du contenu de l'annonce
                const adContent = `
                    <h2>${ad.subject}</h2>
                    <p>${ad.body}</p>
                    <p>Catégorie : ${ad.category_name}</p>
                    <p>Lieu : ${ad.location.city}, ${ad.location.department_name}</p>
                    <p><a href="${ad.url}" target="_blank">Voir l'annonce</a></p>
                `;

                adElement.innerHTML = adContent;
                adsContainer.appendChild(adElement);
            });
        }

        // Appel de la fonction pour récupérer les annonces au chargement de la page
        // getAds();

        // Vous pouvez choisir d'appeler getAds() ici si vous voulez afficher des annonces par défaut au chargement de la page.
    