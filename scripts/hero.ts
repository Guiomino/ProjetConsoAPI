import { keyTMDB } from "./keyTMDB";
// La rentrer avec ${keyTMDB} lors des récupération : fetch





// RECUPERATION DES DONNÉES DU PREMIER FILM DU TABLEAU UPCOMING DU HERO
export async function filmLeMieuxNote() {
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
        const hero: HTMLElement | null = document.querySelector('#hero');
        const heroImplementation = document.createElement('img');

        heroImplementation.setAttribute('src', 'https://image.tmdb.org/t/p/w780' + firstCountJson.backdrop_path);
        hero?.appendChild(heroImplementation);
        // console.log(firstCountJson.poster_path);
        // POSTER : poster_path
        // AFFICHE : backdrop_path


        const aVenir: HTMLElement | null = document.querySelector('#aVenir');
        const headTitle: HTMLElement | null = document.querySelector('#headTitle');

        const year: HTMLElement | null = document.querySelector('#year');
        const voteAverage: HTMLElement | null = document.querySelector('#voteAverage');
        const movieDuration: HTMLElement | null = document.querySelector('#movieDuration');
        const genre: HTMLElement | null = document.querySelector('#genre');

        const synopsis = document.querySelector('#synopsis');


        if (headTitle && year && voteAverage && movieDuration && genre && synopsis) {
            headTitle.innerHTML = firstCountJson.title;
            year.innerHTML = firstCountJson.release_date.slice(0, 4);
            voteAverage.innerHTML = firstCountJson.vote_average.toFixed(1);
            movieDuration.innerHTML = firstCountJson.runtime;
            genre.innerHTML = firstCountJson.genres[0].name;
            synopsis.innerHTML = firstCountJson.overview;
        }

    } catch (error) {
        console.log(error)
    }
}
filmLeMieuxNote()
