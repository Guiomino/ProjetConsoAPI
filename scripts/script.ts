import { keyTMDB } from "./keyTMDB";
// La rentrer avec ${keyTMDB} lors des récupération : fetch

import { filmLeMieuxNote } from "./hero";
filmLeMieuxNote()

import { bandeAnnonce } from "./trailerButton";
bandeAnnonce()

import { playButton } from "./trailerButton";
playButton()











/////////////////////////////////////////////////////////////////////////////////////////////////////////
// RECHERCHER UN FILM AVEC LA BARRE DE RECHERCHE
async function searchMovie() {
    try {
        const searchBar: HTMLElement | null = document.getElementById("searchBar");
        const searchInput: HTMLInputElement | null | undefined = searchBar?.querySelector(".searchBar");

        if (searchBar)
            searchBar.addEventListener("submit", async (event) => {
                event.preventDefault();

                const searchQuery = encodeURIComponent(searchInput?.value ?? "");
                const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${keyTMDB}&language=fr-FR&query=${searchQuery}&page=1&include_adult=false`;
                const searchResponse = await fetch(searchUrl);
                const searchResults = await searchResponse.json();

                console.log(searchResults);
            });

    } catch (error) {
        console.log(error);
    }
}

searchMovie();
