import { keyTMDB } from "./keyTMDB";
// La rentrer avec ${keyTMDB} lors des récupération : fetch



async function filmLeMieuxNote() {
    try {
        // Fetch API pour récupérer les données des derniers films
        const upcomingMovie = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${keyTMDB}&language=fr-FR`);
        const upcomingMovieJson = await upcomingMovie.json();
        // console.log(upcomingMovieJson.results[0].id);
        
        // Recupération du premier élément de la liste des mieux notés.
        const FirstCount = await fetch(`https://api.themoviedb.org/3/movie/${upcomingMovieJson.results[0].id}?api_key=${keyTMDB}&language=fr-FR`);
        const firstCountJson = await FirstCount.json();
        console.log(firstCountJson);



        //// MODIFIER IMAGE DE FOND ////
        const hero: HTMLElement | null = document.querySelector('#hero');
        // hero?.classList.add('hero--background');

        const heroImplementation = document.createElement('img');
        // heroImplementation.style.backgroundImage = `url('https://image.tmdb.org/t/p/w780${firstCountJson.backdrop_path}')`;
        // hero?.appendChild(heroImplementation);

        heroImplementation.setAttribute('src', 'https://image.tmdb.org/t/p/w780' + firstCountJson.backdrop_path);
        hero?.appendChild(heroImplementation);
        // console.log(firstCountJson.poster_path);
        // POSTER : poster_path
        // AFFICHE : backdrop_path



const aVenir: HTMLElement | null = document.querySelector('#aVenir');
const headTitle: HTMLElement | null = document.querySelector('#headTitle');

const year: HTMLElement | null = document.querySelector('year');
const voteAverage: HTMLElement | null = document.querySelector('#voteAverage');
const movieDuration: HTMLElement | null = document.querySelector('#movieDuration');
const genre: HTMLElement | null = document.querySelector('#genre');

const synopsis = document.querySelector('#synopsis');


headTitle?.innerHTML = firstCountJson.title;
year?.innerHTML = firstCountJson.release_date; // A CORRIGER



    } catch (error) {
        console.log(error)
    }
}

// Execute la fonction pour fetch les départements
filmLeMieuxNote()










/////////////////////////////////////////
// async function filmLeMieuxNote() {
//     try {
//       // Fetch API pour récupérer les données des mieux notés
//       const voteCount = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${keyTMDB}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
//       const voteCountJson = await voteCount.json();
  
//       // Recupération du premier élément de la liste des mieux notés.
//       const FirstCount = await fetch(`https://api.themoviedb.org/3/movie/${voteCountJson.results[0].id}?api_key=${keyTMDB}&language=fr-FR`)
//       const firstCountJson = await FirstCount.json();
  
//       const hero: HTMLElement | null = document.querySelector('#hero');
//       hero?.classList.add('hero');
  
//       const heroImplementation = document.createElement('img');
//       heroImplementation.setAttribute('src', 'https://image.tmdb.org/t/p/w780' + firstCountJson.backdrop_path);
//       hero?.appendChild(heroImplementation);
  




//       // Move the following code to after the above code
//       const headTitle = document.querySelector('#headTitle');
//       const year = document.querySelector('#year');
//       const voteAverage = document.querySelector('#voteAverage');
//       const movieDuration = document.querySelector('#movieDuration');
//       const genre = document.querySelector('#genre');
//       const synopsis = document.querySelector('#synopsis');
//       const play = document.querySelector('#play');
//       const trailer = document.querySelector('#trailer');
  
//       headTitle!.innerHTML = firstCountJson.title;
//       year!.innerHTML = firstCountJson.release_date.slice(0, 4);
//       voteAverage!.innerHTML = firstCountJson.vote_average * 10 + "%";
//       movieDuration!.innerHTML = firstCountJson.runtime + "min";
//       genre!.innerHTML = firstCountJson.genres[0].name;
//       synopsis!.innerHTML = firstCountJson.overview;



//       play!.addEventListener('click', () => {
//         alert('Lecture en cours');
//       });
//       trailer!.addEventListener('click', () => {
//         alert('Bande annonce');
//       });
  
//     } catch (error) {
//       console.log(error)
//     }
//   }