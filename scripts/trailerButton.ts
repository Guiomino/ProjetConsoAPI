import { keyTMDB } from "./keyTMDB";
// La rentrer avec ${keyTMDB} lors des récupération : fetch






// IMPLEMENTATION DE LA BANDE ANNONCE
// Définition d'une fonction asynchrone appelée bandeAnnonce
export async function bandeAnnonce() {
    try {
        // Recherche le bouton "trailer" dans le document HTML
        const trailerBtn: HTMLElement | null = document.querySelector('#trailer');

        // Ajout d'un événement click sur le bouton "trailer"
        trailerBtn!.addEventListener('click', async () => {

            // Fetch API pour récupérer les données des films à venir
            const upcomingMovie = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${keyTMDB}&language=fr-FR`);
            const upcomingMovieJson = await upcomingMovie.json();

            // Fetch API pour récupérer les détails du premier film de la liste des films à venir
            const FirstCount = await fetch(`https://api.themoviedb.org/3/movie/${upcomingMovieJson.results[0].id}?api_key=${keyTMDB}&language=fr-FR`);
            const firstCountJson = await FirstCount.json();

            // Fetch API pour récupérer la liste des bandes annonces du premier film de la liste des films à venir
            const trailerMovie = await fetch(`https://api.themoviedb.org/3/movie/${upcomingMovieJson.results[0].id}/videos?api_key=${keyTMDB}&language=fr-FR`);
            const trailerMovieJson = await trailerMovie.json();

            // Récupération de l'ID de la première bande annonce de la liste des bandes annonces du premier film de la liste des films à venir
            const firstTrailerId = trailerMovieJson.results[0].key;

            // Construction de l'URL de la première bande annonce du premier film de la liste des films à venir
            const firstTrailerUrl = `https://www.youtube.com/embed/${firstTrailerId}`;
            console.log(firstTrailerUrl);

            // Création d'un élément vidéo pour la bande annonce
            const trailerVideo: HTMLElement | null = document.querySelector('.trailerVideo');
            const trailerVideoImplementation: HTMLElement | null = document.createElement('iframe');


            // Ajout de la vidéo à la page HTML
            if (trailerVideoImplementation) {
                // trailerVideoImplementation.setAttribute('src', firstTrailerUrl);
                trailerVideoImplementation.setAttribute('src', 'https://www.youtube.com/embed/' + firstTrailerId);
                trailerVideoImplementation.setAttribute('allowfullscreen', ''); // FullScreen de la vidéo
                trailerVideoImplementation.style.width = "70vw";
                trailerVideoImplementation.style.height = "35vw";
                trailerVideo?.appendChild(trailerVideoImplementation);
            }


            // PRORPIETES CSS DU FOND DE LA VIDEO À NE PAS METTRE DANS LE SCSS AFIN QU'IL SOIT DYNAMIQUE
            if (trailerVideo) {
                trailerVideo.style.position = "fixed";
                trailerVideo.style.top = "0";
                trailerVideo.style.bottom = "0";
                trailerVideo.style.left = "0";
                trailerVideo.style.right = "0";
                trailerVideo.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                trailerVideo.style.display = "flex";
                trailerVideo.style.justifyContent = "center";
                trailerVideo.style.alignItems = "center";
                trailerVideo.style.zIndex = "9999";
                trailerVideo.style.boxShadow = "0 0 20px 10px rgba(0, 0, 0, 0.7)";
            }


            // CRÉATION D'UN BOUTON POUR FERMER LA VIDÉO
            const closeButton: HTMLElement | null = document.createElement('button');
            closeButton.innerHTML = "X";
            closeButton.style.position = "absolute";
            closeButton.style.top = "20px";
            closeButton.style.right = "20px";
            closeButton.style.fontSize = "20px";
            closeButton.style.border = "none";
            closeButton.style.backgroundColor = "transparent";
            closeButton.style.color = "#fff";
            closeButton.style.cursor = "pointer";
            trailerVideo?.appendChild(closeButton);

            // Ajout d'un événement click sur le bouton "X" pour fermer la vidéo
            closeButton?.addEventListener('click', () => {
                trailerVideo?.removeChild(trailerVideoImplementation);
                trailerVideo?.removeChild(closeButton);
                if (trailerVideo)
                    trailerVideo.style.display = "none";
            });

        });
    } catch (error) {
        console.log(error);
    }
}
bandeAnnonce();











/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// AJOUTE UNE ALERTE AVEC DU STYLE POUR LE BOUTON PLAY
export function playButton() {

    const play: HTMLElement | null = document.getElementById("play");
    const modal: HTMLElement | null = document.getElementById("modal");
    if (modal) {
        modal.style.zIndex = "100";
        modal.style.textAlign = 'center';
        const closeModal: HTMLElement | null = document.getElementById("close-modal");


        play?.addEventListener('click', () => {
            if (modal)
                modal.style.display = "block";
        });

        closeModal?.addEventListener('click', () => {
            if (modal)
                modal.style.display = "none";
        });
    }
}
playButton();

