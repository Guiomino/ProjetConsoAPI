import { keyTMDB } from "./keyTMDB";
// La rentrer avec ${keyTMDB} lors des récupération : fetch



const genreId = 28;
export async function carouselGenre(genreId: number) {
    try {
        // Commenter la première const. Elle ne sert qu'à récupérer la liste des ID des genres.
        // const genreMovie = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${keyTMDB}&language=en-US`)
        // id: 28, name: 'Action'
        // id: 12, name: 'Adventure'
        // id: 16, name: 'Animation'
        // id: 35, name: 'Comedy'
        // id: 18, name: 'Drama'
        // id: 14, name: 'Fantasy'
        // id: 27, name: 'Horror'
        // id: 878, name: 'Science Fiction'

        // Recupère les films (d'ACTION id 28) par popularité descendante
        const genreMovie = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${keyTMDB}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`)
        const genreMovieJson = await genreMovie.json();
        // console.log(genreMovieJson);


        const carousel: HTMLElement | null = document.querySelector('#carousel');


        // récuperer les 20 premiers posters des films
        const allPoster: any[] = [];
        for (let i = 0; i < 20; i++) {
            const posterCarousel: string = 'https://image.tmdb.org/t/p/w300' + genreMovieJson.results[i].poster_path;
            allPoster.push(posterCarousel);
        }


        // RÉCUPÉRATION DES POSTER DES FILMS CLASSÉS PAR GENRE
        if (carousel)
            carousel.innerHTML = '';
        for (let i = 0; i < allPoster.length; i++) {
            const posterCarousel = allPoster[i];
            const carouselImplementation = document.createElement('img');
            carouselImplementation.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + posterCarousel);

            // RÉCUPÉRATION DES DONNÉES DES FILMS À PARTIR DE L'ID
            carouselImplementation.addEventListener('click', async () => {
                const movieDetails = await fetch(`https://api.themoviedb.org/3/movie/${genreMovieJson.results[i].id}?api_key=${keyTMDB}&language=fr-FR`);
                const movieDetailsJson = await movieDetails.json();
                console.log(movieDetailsJson); // Utiliser les propriétés du film ici


                // RECUPÉRATION DE L'ÉLÉMENT QUI VA AFFICHER MON IMAGE DE FILM
                const popupMovie = document.querySelector('.popupMovie') as HTMLElement;
                const popupMovieImplementation = document.createElement('img');
                popupMovie.classList.remove('hidden');
                popupMovieImplementation.classList.add('popupMovie');

                const popupMovieBackground: Element | null = document.querySelector('.popupMovieBackground');
                popupMovieBackground?.classList.remove('hidden');
                popupMovieBackground?.classList.add('popupMovieBackground');



                popupMovieImplementation.setAttribute('src', 'https://image.tmdb.org/t/p/w780' + movieDetailsJson.backdrop_path);
                popupMovie?.appendChild(popupMovieImplementation);



                const popHeadTitle: HTMLElement | null = document.querySelector('#popHeadTitle');

                const popYear: HTMLElement | null = document.querySelector('#popYear');
                const popVoteAverage: HTMLElement | null = document.querySelector('#popVoteAverage');
                const popMovieDuration: HTMLElement | null = document.querySelector('#popMovieDuration');
                const popGenre: HTMLElement | null = document.querySelector('#popGenre');

                const popSynopsis = document.querySelector('#popSynopsis');

                if (popHeadTitle && popYear && popVoteAverage && popMovieDuration && popGenre && popSynopsis) {

                    popHeadTitle.innerHTML = movieDetailsJson.title;
                    popYear.innerHTML = movieDetailsJson.release_date.slice(0, 4);
                    popVoteAverage.innerHTML = movieDetailsJson.vote_average.toFixed(1);
                    popMovieDuration.innerHTML = movieDetailsJson.runtime;
                    popGenre.innerHTML = movieDetailsJson.genres[0].name;
                    popSynopsis.innerHTML = movieDetailsJson.overview;
                }

                // CRÉATION D'UN BOUTON POUR FERMER LA VIDÉO AVC DU STYLE CSS
                const closeButton: HTMLElement | null = document.createElement('button');
                closeButton.innerHTML = "X";
                closeButton.style.fontWeight = "900";
                closeButton.style.position = "absolute";
                closeButton.style.zIndex = "999";
                closeButton.style.top = "20px";
                closeButton.style.right = "20px";
                closeButton.style.fontSize = "20px";
                closeButton.style.border = "none";
                closeButton.style.width = "30px";
                closeButton.style.height = "30px";
                closeButton.style.backgroundColor = "green";
                closeButton.style.color = "#fff";
                closeButton.style.cursor = "pointer";
                // closeButton.style.boxShadow = "0px 0px 20px black";
                popupMovie?.appendChild(closeButton);

                // Ajout d'un événement click sur le bouton "X" pour fermer la vidéo
                closeButton?.addEventListener('click', () => {
                    popupMovie?.removeChild(popupMovieImplementation);
                    popupMovie?.removeChild(closeButton);
                    if (popupMovie && popupMovieBackground) {
                        popupMovie.classList.add('hidden');
                        popupMovieBackground.classList.add('hidden');
                    }
                    // popupMovieImplementation.classList.add('popupMovie');
                });
            });

            carousel?.appendChild(carouselImplementation);
        }
    }
    catch (error) {
        console.log(error)
    }
}











//////////////////////////////////////////////////////////////////////////////////
// BOUTON DES GENRES
const actionBtn = document.querySelector('#actionBtn');
const adventureBtn = document.querySelector('#adventureBtn');
const animationBtn = document.querySelector('#animationBtn');
const comedyBtn = document.querySelector('#comedyBtn');
const dramaBtn = document.querySelector('#dramaBtn');
const fantasyBtn = document.querySelector('#fantasyBtn');
const horrorBtn = document.querySelector('#horrorBtn');
const scienceFictionBtn = document.querySelector('#scienceFiction');

let genreTitle: Element | null = document.querySelector('#carouselTitre>div>p')


actionBtn?.addEventListener('click', async (event) => {
    event.preventDefault();
    await carouselGenre(28);
    if (genreTitle)
        genreTitle.innerHTML = "Action";


    // actionBtn.classList.add('genreBtnActive');

});

adventureBtn?.addEventListener('click', async (event) => {
    event.preventDefault();
    await carouselGenre(12);
    if (genreTitle)
        genreTitle.innerHTML = "Aventure";
});

animationBtn?.addEventListener('click', async (event) => {
    event.preventDefault();
    await carouselGenre(16);
    if (genreTitle)
        genreTitle.innerHTML = "Animation";
});

comedyBtn?.addEventListener('click', async (event) => {
    event.preventDefault();
    await carouselGenre(35);
    if (genreTitle)
        genreTitle.innerHTML = "Comédie";
});

dramaBtn?.addEventListener('click', async (event) => {
    event.preventDefault();
    await carouselGenre(18);
    if (genreTitle)
        genreTitle.innerHTML = "Drama";
});

fantasyBtn?.addEventListener('click', async (event) => {
    event.preventDefault();
    await carouselGenre(14);
    if (genreTitle)
        genreTitle.innerHTML = "Fantastique";
});

horrorBtn?.addEventListener('click', async (event) => {
    event.preventDefault();
    await carouselGenre(27);
    if (genreTitle)
        genreTitle.innerHTML = "Horreur";
});

scienceFictionBtn?.addEventListener('click', async (event) => {
    event.preventDefault();
    await carouselGenre(878);
    if (genreTitle)
        genreTitle.innerHTML = "Science fiction";
});










