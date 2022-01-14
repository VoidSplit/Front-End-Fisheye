function homeRedirect() {
    var url = new URL(document.location + "index.html");
    location.assign(url.origin)
}
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
function getPhotographers(id) {
    return new Promise((resolve, reject) => loadJSON('data/photographers.json', function (data) {
        photographer = data.photographers.find(p => p.id == id);
        media = data.media.filter(p => p.photographerId == id);

        resolve([photographer, media]);
    }, function (xhr) {
        reject(xhr);
    })
    );
}
async function generateDOM(infos, filter) {
    // generate banner
    document.getElementById('page-content').innerHTML += `
    <div class="banner">
        <div class="informations">
            <div class="name">${infos[0].name}</div>
            <div class="location">${infos[0].city}, ${infos[0].country}</div>
            <div class="tagline">${infos[0].tagline}</div>
        </div>
        <div class="button-wrapper">
            <button>Contactez-moi</button>
        </div>
        <div class="profil">
            <div class="inner">
                <img src="assets/photographers/Photographers ID Photos/${infos[0].portrait}" alt="Photo de profil de ${infos[0].name}" srcset="assets/photographers/Photographers ID Photos/${infos[0].portrait}">
            </div>
        </div>
    </div>
    `
    // generate filters
    document.getElementById('page-content').innerHTML += `
    <div class="filter-wrapper">
            <p>Trier par</p>
            <div class="dropdown">
                <div class="view" id="popularity">
                    <p>Popularité</p>
                    <div class="icon"><i class="fas fa-angle-up"></i></div>
                </div>
                <div class="content">
                    <div class="item" id="date">Date</div>
                    <div class="item" id="name">Titre</div>
                </div>
            </div>
        </div>
    `
    // generate tarif
    let numberoflikes = 0;
    infos[1].forEach(post => {
        numberoflikes = numberoflikes + parseInt(post.likes)
    })
    document.getElementById('page-content').innerHTML += `
    <div class="tarifs">
        <div class="likes">
            <span class="count">${numberoflikes}</span>
            <i class="fas fa-heart"></i>
        </div>
        <div class="money">${infos[0].price}€/jours</div>
    </div>
    `
    // generate gallery
    document.getElementById('page-content').innerHTML += `<div id="gallery"></div>`
    refreshGallery(infos, filter)
    
}
function refreshGallery(infos, filter) {
    document.getElementById('gallery').innerHTML = '';
    function filterName(a, b) {
        return (a.title > b.title)?1:-1;
    }
    function filterPopularity(a, b) {
        return (a.likes < b.likes)?1:-+1;
    }
    function filterDate(a, b) {
        return (a.date > b.date)?1:-1;
    }
    if(filter == "date") {
        infos[1].sort(filterDate)
    } else if(filter == "name") {
        infos[1].sort(filterName)
    } else {
        infos[1].sort(filterPopularity)
    } 
    infos[1].forEach(post => {
        sessionStorage.setItem(post.id, post.likes)
        const dom = getGalleryDOM(post, infos[1])
        document.getElementById('gallery').appendChild(dom)
    })
}
function removeParams(sParam) {
    var url = window.location.href.split('?')[0]+'?';
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),sURLVariables = sPageURL.split('&'),sParameterName,i;
    for(i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] != sParam) {
            url = url + sParameterName[0] + '=' + sParameterName[1] + '&'
        }
    }
    return url.substring(0,url.length-1);
}
async function loadPost(postId, postList) {
    if(postList.filter(post => post.id == postId).length !== 0) {
        const post = postList.filter(post => post.id == postId)[0]

        let src;
        if(post.image) {
            src = document.createElement('img')
            src.setAttribute('src', `assets/photographers/${post.photographerId}/${post.image}`)
        } else if(post.video) {
            src = document.createElement('video')
            src.setAttribute('src', `assets/photographers/${post.photographerId}/${post.video}`)
            src.setAttribute('controls', '')
            src.setAttribute('autoplay', '')
        }
        const lightbox = document.createElement('div')
        const content = document.createElement('div')
        const navigationLeft = document.createElement('div')
        const angleLeft = document.createElement('i')
        const inner = document.createElement('div')
        const postTitle = document.createElement('p')
        const navigationRight = document.createElement('div')
        const angleRight = document.createElement('i')
        const close = document.createElement('i')

        angleLeft.setAttribute('id', "postLeft")
        angleRight.setAttribute('id', "postRight")

        lightbox.classList.add('lightbox')
        content.classList.add('content')
        navigationLeft.classList.add('navigation')
        angleLeft.classList.add('fas', 'fa-angle-left')
        inner.classList.add('inner')
        postTitle.classList.add('title')
        navigationRight.classList.add('navigation')
        angleRight.classList.add('fas', 'fa-angle-right')
        close.classList.add('fas', 'fa-close')

        postTitle.textContent = post.title

        close.addEventListener('click', function(e) {
            e.preventDefault;
            document.getElementById('page-content').removeChild(lightbox)
            let url = new URL(window.location);
            url.searchParams.set('post', '');
            window.history.pushState({}, '', removeParams('post'));
        })

        lightbox.appendChild(content)
        content.appendChild(navigationLeft)
        navigationLeft.appendChild(angleLeft)
        content.appendChild(inner)
        inner.appendChild(src)
        inner.appendChild(postTitle)
        content.appendChild(navigationRight)
        navigationRight.appendChild(angleRight)
        navigationRight.appendChild(close)
        
        document.getElementById('page-content').appendChild(lightbox)
        let url = new URL(window.location);
        url.searchParams.set('post', postId);
        window.history.pushState({}, '', url);
        navigate(postList.findIndex(x => x.id === post.id), postList)
    }
}
function getFilters(infos) {
    document.getElementById('name').addEventListener('click', function(e) {
        e.preventDefault(e)
        let url = new URL(window.location);
        url.searchParams.set('filter', "name");
        window.history.pushState({}, '', url);
        refreshGallery(infos, "name")
    })
    document.getElementById('popularity').addEventListener('click', function(e) {
        e.preventDefault(e)
        let url = new URL(window.location);
        url.searchParams.set('filter', "popularity");
        window.history.pushState({}, '', url);
        refreshGallery(infos, "popularity")
    })
    document.getElementById('date').addEventListener('click', function(e) {
        e.preventDefault(e)
        let url = new URL(window.location);
        url.searchParams.set('filter', "date");
        window.history.pushState({}, '', url);
        refreshGallery(infos, "date")
    })
}
async function navigate(position, infos) {
    let rightButton = document.getElementById('postRight')
    let leftButton = document.getElementById('postLeft')
    rightButton.addEventListener('click', function(e) {
        e.preventDefault(e)
        if(infos[position+1]) {
            document.getElementById('page-content').removeChild(document.querySelectorAll('.lightbox')[0])
            loadPost(infos[position+1].id, infos)
        }
    })
    leftButton.addEventListener('click', function(e) {
        e.preventDefault(e)
        if(infos[position-1]) {
            document.getElementById('page-content').removeChild(document.querySelectorAll('.lightbox')[0])
            loadPost(infos[position-1].id, infos)
        }
    })
}
async function init() {
    let params = (new URL(document.location.href)).searchParams;
    const id = params.get('id');            // id of the photograph                                 | can't be null
    const filter = params.get('filter');    // gallery filter possible: date, name, popularity      | can be null
    const post = params.get('post');        // id of a post                                         | can be null
    // console.log(id, filter, post)
    const data = getPhotographers(id);
    let infos;
    await data.then(a => infos = a)
    if(!infos[0]) {
        document.getElementById('page-content').appendChild(getErrorDOM())
    } else {
        generateDOM(infos, filter);
        getFilters(infos)
        if(post) {
            loadPost(post, infos[1])
        }
    }
}
init();