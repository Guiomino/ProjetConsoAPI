import { keyTMDB } from "./keyTMDB";
// La rentrer avec ${keyTMDB} lors des récupération : fetch





// RECUPERATION DES DONNÉES DU PREMIER FILM DU TABLEAU UPCOMING DU HERO
export async function popupMovie () {
    try {
        // Fetch API pour récupérer les données des derniers films
        const upcomingMovie = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${keyTMDB}&language=fr-FR`);
        const upcomingMovieJson = await upcomingMovie.json();
        // console.log(upcomingMovieJson.results[0].id);

        // Recupération les donnnées du premier élément de la liste des mieux notés avec son id.
        const FirstCount = await fetch(`https://api.themoviedb.org/3/movie/${upcomingMovieJson.results[0].id}?api_key=${keyTMDB}&language=fr-FR`);
        const firstCountJson = await FirstCount.json();
        // console.log(firstCountJson);


        //// MODIFIER IMAGE DE FOND ////
        const popupMovie: HTMLElement | null = document.querySelector('#popupMovieInformation');
        const popupMovieImplementation = document.createElement('img');

        popupMovieImplementation.setAttribute('src', 'https://image.tmdb.org/t/p/w780' + firstCountJson.backdrop_path);
        popupMovie?.appendChild(popupMovieImplementation);
        // console.log(firstCountJson.poster_path);
        // POSTER : poster_path
        // AFFICHE : backdrop_path


        const popHeadTitle: HTMLElement | null = document.querySelector('#popHeadTitle');

        const popYear: HTMLElement | null = document.querySelector('#popYear');
        const popVoteAverage: HTMLElement | null = document.querySelector('#popVoteAverage');
        const popMovieDuration: HTMLElement | null = document.querySelector('#popMovieDuration');
        const popGenre: HTMLElement | null = document.querySelector('#popGenre');

        const synopsis = document.querySelector('#synopsis');


        if (popHeadTitle && popYear && popVoteAverage && popMovieDuration && popGenre && synopsis) {
            popHeadTitle.innerHTML = firstCountJson.title;
            popYear.innerHTML = firstCountJson.release_date.slice(0, 6);
            popVoteAverage.innerHTML = firstCountJson.vote_average.toFixed(1);
            popMovieDuration.innerHTML = firstCountJson.runtime;
            popGenre.innerHTML = firstCountJson.genres[0].name;
            synopsis.innerHTML = firstCountJson.overview;
        }

    } catch (error) {
        console.log(error)
    }
}
// popupMovie()
