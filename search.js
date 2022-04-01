// ********************************************************************************************** Requête
function ajaxRequestSearch(keyWord) {
    $.getJSON(`https://api.themoviedb.org/3/search/movie?api_key=acc7fb5c99e94de089fe3049f362676b&language=en-US&query=${keyWord}&page=1&include_adult=false`)
        .done((res) => {
            displayResult(res.results);
        })
        .fail((error) => {
            console.error(error);
        });
};


// ********************************************************************************************** Recherche film de la semaine
function searchOnStart() {
    $("#searchInput").on("keyup", function () {

        let value = $(this).val().toLowerCase();
        $("main article").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
};


// ********************************************************************************************** Recherche de film 
function searchMovies() {
    $('#searchInput').on("keyup", function () {

        // Si on efface le champs de recherche
        if (!$('#searchInput').val()) {
            $('main').empty();
            const KEY = "acc7fb5c99e94de089fe3049f362676b";
            ajaxRequest(KEY);
            return;
        };

        // Vidage du main et lancement de la recherche
        $('main').empty();
        ajaxRequestSearch($('#searchInput').val());
    });
};

