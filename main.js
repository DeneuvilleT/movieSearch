// ********************************************************************************************** Requête initial
// ********************************************************************************************** 
function ajaxRequest(key) {
    $.getJSON(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=fr_FR`)
        .done((res) => {
            displayResult(res.results);
        })
        .fail((error) => {
            console.error(error);
        });
};



// ********************************************************************************************** Fonctions
// **********************************************************************************************


// Créations des articles
function createCard(title, overview, language, poster, date, rating) {
    const result = {};

    result.original_title = title;
    result.overview = overview;
    result.original_language = language;
    result.poster_path = poster;
    result.release_date = date;
    result.vote_average = rating;

    return result;
};


// Injection de la réponse AJAX
function displayResult(items) {
    const cardOver = [];

    items.forEach(data => {

        const original_title = data.original_title;
        const overview = data.overview;
        const original_language = data.original_language;
        const poster_path = data.poster_path;
        const release_date = data.release_date;
        const vote_average = data.vote_average;

        const card = createCard(
            original_title, overview, original_language, poster_path, release_date, vote_average);
        cardOver.push(card);
    });

    displayCard(cardOver);
    return cardOver;
};


// Affichage dans le DOM
function displayCard(array) {
    $('main').empty();

    for (let i = 0; i < array.length; i++) {

        let coverDefault = `https://image.tmdb.org/t/p/w500${array[i].poster_path}`;
        if (array[i].poster_path === null) {
            coverDefault = '/img/defaultCover.png';
        };

        const title = $("<h3>")
            .text(`${array[i].original_title}`);

        const poster = $("<img>")
            .attr("src", coverDefault);

        const description = $("<details>")
            .text(`${array[i].overview}`);

        const lang = $("<p>")
            .text(`Version originale : ${array[i].original_language.toUpperCase()}`);

        const release = $("<p>")
            .text(`Sorti le : ${array[i].release_date}`);

        const rating = $("<p>")
            .text(`Note ${array[i].vote_average} / 10`);

        const article = $("<article>");

        for (let i = 0; i < array.length; i++) {
            article.append(title, poster, description, lang, release, rating);
        };

        $('main').append(article);
    };
};


// DOM LOADED ***********************************************************************************************************
// **********************************************************************************************************************

$(function () {

    const KEY = "acc7fb5c99e94de089fe3049f362676b";

    ajaxRequest(KEY);
    searchOnStart();
    searchMovies();

});
