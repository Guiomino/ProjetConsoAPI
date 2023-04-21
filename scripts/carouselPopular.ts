import { keyTMDB } from "./keyTMDB";
// La rentrer avec ${keyTMDB} lors des récupération : fetch



export async function carouselPopular() {
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

        const genreMovie = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${keyTMDB}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
        const genreMovieJson = await genreMovie.json();
        // console.log(genreMovieJson);

        const carousel: HTMLElement | null = document.querySelector('#carouselPopular');

        // récuperer les 20 premiers posters des films
        const allPoster: any[] = [];
        for (let i = 0; i < 20; i++) {
            const posterCarousel: string = 'https://image.tmdb.org/t/p/w300' + genreMovieJson.results[i].poster_path;
            allPoster.push(posterCarousel);
        }

        for (let i = 0; i < allPoster.length; i++) {
            const posterCarousel = allPoster[i];
            const carouselImplementation = document.createElement('img');
            carouselImplementation.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + posterCarousel);
            carousel?.appendChild(carouselImplementation);
        }

    }
    catch (error) {
        console.log(error)
    }
}

