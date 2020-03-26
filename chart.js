var convert = [
    ['liaison', 'émission de CO2 en kg pour un trajet en train', 'émission de CO2 en kg pour un trajet en voiture'],  
]; // tableau qui contiendra toutes les lignes de données

// je la déclare ici pour qu'elle soit globale à tout le script


$(document).ready(function () { // quand tout est chargé...

    // exécuter tout le code suit dans la fonction...

    ////////////////////////// EXTRACTION DES DONNEES  ////////////////////////////////


    var row = []; // contiendra une ligne de donnée (liaison + émission de CO2)

    $.getJSON('emission-co2-tgv.json', function (JSONobj) { // récupérer le fichier JSON
        console.log(JSONobj); // afficher le fichier dans la console

        var co2_tgv; // contiendra la valeur d'émission de co2 du trajet TGV
        var liaison; // contiendra la chaîne de caractère décrivant le trajet effectué (ex : Paris - Bordeaux)

        var co2_voiture; // contiendra la valeur d'émission de co2 du trajet TGV
        var distance; // contiendra la distance du trajet entre les 2 villes

        
    ////////////////////////// TRAITEMENT DES DONNEES  ////////////////////////////////

    // calcul de l'émission CO2 moyenne sur la même distance TGV mais avec une voiture

    /* Pour simplifier les calculs, on se base sur un véhicle diesel qui consomme 6,01
     litres/100km. Comme démontré, on se base sur une émission de 0,158kg/km. On 
     multpilie ce chiffre par la distance entre les liaisons (disponible dans le JSON).
     Par simplicité, on utilise la distance ferrovière entre les deux villes et non la
     distance sur route. */

    // avec cette boucle for, on récupère et assemble les données dont on a besoin dans un tableau

        for (let i = 0; i < 108; i++) { // il y a 108 occurrences au total

            distance = JSONobj[i].fields.distance; // on récupère la valeur de la dsitance de chaque élément dans le JSON
            co2_voiture = parseInt(distance) * 0.159; // calcul du co2 pour la distance en voiture
            co2_tgv = JSONobj[i].fields.tgv_empreinte_co2e_kgco2e_voyageur; //idem pour le CO2
            liaison = JSONobj[i].fields.liaison; // idem pour le nom du trajet
            row = [liaison, co2_tgv, co2_voiture]; // on associe les données dans une seule ligne pour le graphique
            convert.push(row); // ajouter notre ligne à la dernière ligne du tableau convert

        } // fin for i

    }); // fin get JSON


    console.log(convert); // afficher le tableau convert dans la console



    /////////////////////// VISUALISATION AVEC GOOGLE CHARTS //////////////////////////

    // Load the Visualization API and the bar package.
    google.charts.load('current', { 'packages': ['bar'] });

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
            bars: 'horizontal', // Required for Material Bar Charts.
            title: '',
            width : 1300,
            height : 2500,
            axes: {
                x: {
                  0: { side: 'top', label: 'kgCO2/voyageur'} // Top x-axis.
                }
              },
            vAxis: {
                title: ''
            }
        }; // fin var options

        // Instantiate and draw our chart in div columnchart_material, passing in some options.
        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

        chart.draw(data, google.charts.Bar.convertOptions(options));;

    } // fin drawChart

}); // fin document ready
