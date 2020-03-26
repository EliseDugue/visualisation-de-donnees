var convert = [
    ['liaison', 'co2'],  
]; // tableau qui contiendra toutes les lignes de données

//je la déclare ici pour qu'elle soit globale à tout le script


$(document).ready(function () { // quand tout est chargé...

    //exécuter tout le code qui est après dans la fonction

    ////////////////////////////// EXTRACTION DES DONNEES  ////////////////////////////////


    var showData = $('#show-data'); // accéder à la balise div show-data

    var row = []; // contiendra une ligne de donnée (liaison + émission de CO2)

    $.getJSON('emission-co2-tgv.json', function (JSONobj) { // récupérer le fichier JSON
        console.log(JSONobj); // afficher le fichier dans la console

        var co2; // contiendra la valeur d'émission de co2 du trajet TGV
        var liaison; // contiendra la chaîne de caractère décrivant le trajet effectué (ex : Paris - Bordeaux)

        // avec ces boucles for, on récupère et assemble les données dont on a besoin dans un tableau

        for (let i = 0; i < 108; i++) { // il y a 108 occurrences au total

            co2 = JSONobj[i].fields.tgv_empreinte_co2e_kgco2e_voyageur; // on récupère la valeur du co2 de chaque élément dans le JSON
            liaison = JSONobj[i].fields.liaison; // idem pour le nom du trajet
            row = [liaison, co2]; // on associe les données dans une seule ligne pour le graphique
            convert.push(row);

        } // fin for i

    }); // fin get JSON

    showData.text('Loading the JSON file...'); // afficher le texte dans la balise show-data

    
    console.log(convert);


    /////////////////////////// VISUALISATION AVEC GOOGLE CHARTS //////////////////////////

    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the column chart, passes in the data and
    // draws it.
    function drawChart() {

        // Create the data table.
        var data = google.visualization.arrayToDataTable(convert);

        // Set chart options
        var options = {
            title: 'Émissions de CO2 par voyageur sur les principales liaisons TGV.',
            hAxis: {
                title: 'Liaisons',
            },
            vAxis: {
                title: 'kgCO2/voyageur'
            }
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);

    } // fin drawChart

}); // fin document ready
