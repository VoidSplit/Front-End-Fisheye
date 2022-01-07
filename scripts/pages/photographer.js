//Mettre le code JavaScript lié à la page photographer.html
//DOM
var nameDOM = document.querySelectorAll('#name');
var locationDOM = document.querySelectorAll('#location');
var taglineDOM = document.querySelectorAll('#tagline');
var profilePictureDOM = document.querySelectorAll('#profile_picture');

let params = (new URL(document.location.href)).searchParams;
let name = params.get('name'); 

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

function getProfileInformation(name) {
    return new Promise((resolve, reject) => loadJSON('data/photographers.json', function (data) {
        photographers = data.photographers.find(user => user.name == name);
        resolve(photographers);
    }, function (xhr) {
        reject(xhr);
    })
    );
}
function getGalleryInformation(id) {
    return new Promise((resolve, reject) => loadJSON('data/photographers.json', function (data) {
        photographers = data.media.filter(photo => photo.photographerId == id);
        resolve(photographers);
    }, function (xhr) {
        reject(xhr);
    })
    );
}
async function setDOM() {
    // Profile
    const infos = await getProfileInformation(name);
    const picture = `assets/photographers/photographers ID Photos/${infos.portrait}`;
    nameDOM[0].innerHTML = infos.name;
    locationDOM[0].innerHTML = `${infos.city}, ${infos.country}`;
    taglineDOM[0].innerHTML = infos.tagline;
    profilePictureDOM[0].src = picture;
    profilePictureDOM[0].srcset = picture;
    profilePictureDOM[0].alt = `Photo de profil de ${infos.name}`;
    // Gallery
    displayGallery(infos.id)
}
async function displayGallery(id) {
    const galleryInfos = await getGalleryInformation(id);
    const gallerySection = document.querySelector("#gallery");
    galleryInfos.forEach((post) => {
        const galleryModel = galleryFactory(post, name.split(' ')[0]);
        const getGalleryDOM = galleryModel.getGalleryDOM();
        gallery.appendChild(getGalleryDOM);
        getGalleryDOM.addEventListener('click', function(e) {
            e.preventDefault()
            console.log("click")
        });
    });
}
function homePage() {
    var url = new URL(document.location + "index.html");
    location.assign(url.origin)
}
setDOM()