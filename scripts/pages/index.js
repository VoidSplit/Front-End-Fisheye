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
}/*
async function getPhotographers() {
    loadJSON('data/photographers.json', function(data) {
        //console.log(data.photographers);
        photographers = data.photographers;
        return data.photographers;
    }, function(xhr) {
        console.error(xhr);
    });
    console.log(photographers)
    return photographers;
    /*return ({
        photographers: [...photographers, ...photographers, ...photographers]
    })
}*/
/*function getPhotographers() {
    try {
        const data = loadJSON('data/photographers.json');
        return data.photographers;
    } catch (e) {
        console.error(e);
        return null;
    }
}*/
function getPhotographers() {
    return new Promise((resolve, reject) => loadJSON('data/photographers.json', function (data) {
        //console.log(data.photographers);
        photographers = data.photographers;
        resolve(photographers);
    }, function (xhr) {
        reject(xhr);
    })
    );
}
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};
async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    console.log(photographers)
    displayData(photographers);
};

init();
