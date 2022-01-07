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
    return new Promise((resolve, reject) => loadJSON('data/photographers.json', function (data) {
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
        userCardDOM.addEventListener('click', function(e) {
            e.preventDefault()
            var url = new URL(document.location + 'photographer.html');
            url.searchParams.set('name', userCardDOM.getAttribute('name'));
            location.replace(url)
        });
    });
};
async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
};

init();
