async function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
function getPhotographers() {
    // Récupere la liste des photographes récuperée dans le fichier json de l'api 
    return new Promise((resolve, reject) => loadJSON('data/photographers.json', function (data) {
        photographers = data.photographers;
        resolve(photographers);
    }, function (xhr) {
        reject(xhr);
    })
    );
}
async function displayData(data) {
    // on récupère le parentNode pour y ajouter le dom 
    let section = document.getElementById('photographerList');
    data.forEach(photographer => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        section.appendChild(userCardDOM);
    });
}
async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    // Affiche les données récupérées plus tôt
    displayData(photographers);
}

init();