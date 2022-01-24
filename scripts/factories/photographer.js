function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/photographers ID Photos/${portrait}`;
    function getUserCardDOM() {
        const article = document.createElement('article');
        const linkWrapper = document.createElement('a')
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const photographername = document.createElement('h2')
        photographername.classList.add('name')
        photographername.textContent = name;
        const location = document.createElement('p')
        location.classList.add('location')
        location.textContent = `${city}, ${country}`;
        const photographertagline = document.createElement('p')
        photographertagline.classList.add('tagline')
        photographertagline.textContent = tagline;
        const tarif = document.createElement('p')
        tarif.classList.add('tarif')
        tarif.textContent = `${price}€/jour`;

        const informations = document.createElement('div')
        informations.setAttribute('tabindex', '0')

        var url = new URL(document.location + 'photographer.html');
        url.searchParams.set('id', data.id);
        linkWrapper.setAttribute('href', url)


        article.appendChild(linkWrapper)
        linkWrapper.appendChild(img)
        linkWrapper.appendChild(photographername)
        article .appendChild(informations)
        informations.appendChild(location)
        informations.appendChild(photographertagline)
        informations.appendChild(tarif)
        
        return (article);
    }
    
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
function getGalleryDOM(data, list, photographer) {
    //console.log(photographer)
    if(!data.video) {
        const post = document.createElement('div')
        const img = document.createElement('img')
        const inner = document.createElement('div')
        const title = document.createElement('p')
        const likes = document.createElement('div')
        const icon = document.createElement('i')
        const count = document.createElement('span')
    
        img.setAttribute('src', `assets/photographers/${data.photographerId}/${data.image}`)
        img.setAttribute('srcset', `assets/photographers/${data.photographerId}/${data.image}`)
        img.setAttribute('alt', `${data.title}`)
        img.addEventListener('click', function(e) {
            e.preventDefault;
            loadPost(data.id, list)
        })
        img.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                loadPost(data.id, list)
                console.log('test')
            }
        });
        img.setAttribute('tabindex', '0')
        

        likes.addEventListener('click', function(e) {
            e.preventDefault(e);
            if(localStorage.getItem(data.id)) {
                count.textContent = data.likes;
                localStorage.removeItem(data.id)
                icon.classList.remove('liked')
                refreshCounter(list)
            } else {
                localStorage.setItem(data.id, data.likes+1)
                count.textContent = localStorage.getItem(data.id);
                icon.classList.add('liked')
                refreshCounter(list)
            }
        })
        likes.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                if(localStorage.getItem(data.id)) {
                    count.textContent = data.likes;
                    localStorage.removeItem(data.id)
                    icon.classList.remove('liked')
                    refreshCounter(list)
                } else {
                    localStorage.setItem(data.id, data.likes+1)
                    count.textContent = localStorage.getItem(data.id);
                    icon.classList.add('liked')
                    refreshCounter(list)
                }
            }
        });
    
        title.textContent = data.title
        title.setAttribute('tabindex', '0')
        likes.setAttribute('tabindex', '0')
        if(localStorage.getItem(data.id)) {
            count.textContent = localStorage.getItem(data.id)
            icon.classList.add('liked')
            refreshCounter(list)
        } else {
            count.textContent = data.likes;
            refreshCounter(list)
        }
        
        post.classList.add('post')
        inner.classList.add('inner')
        title.classList.add('title')
        likes.classList.add('likes')
        icon.classList.add('fas', 'fa-heart')
        count.classList.add('count')
    
        post.appendChild(img)
        post.appendChild(inner)
        inner.appendChild(title)
        inner.appendChild(likes)
        likes.appendChild(count)
        likes.appendChild(icon)
        return (post);
    } else {
        const post = document.createElement('div')
        const src = document.createElement('video')
        const inner = document.createElement('div')
        const title = document.createElement('p')
        const likes = document.createElement('div')
        const icon = document.createElement('i')
        const count = document.createElement('span')
        const play = document.createElement('i')
    
        src.setAttribute('src', `assets/photographers/${data.photographerId}/${data.video}`)
        src.setAttribute('srcset', `assets/photographers/${data.photographerId}/${data.video}`)
        src.setAttribute('alt', `${data.title}`)
        src.setAttribute('tabindex', '0')
        src.addEventListener('click', function(e) {
            e.preventDefault;
            loadPost(data.id, list)
        })
        src.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                loadPost(data.id, list)
            }
        });

        likes.addEventListener('click', function(e) {
            e.preventDefault(e);
            if(localStorage.getItem(data.id)) {
                count.textContent = data.likes;
                localStorage.removeItem(data.id)
                icon.classList.remove('liked')
                refreshCounter(list)
            } else {
                localStorage.setItem(data.id, data.likes+1)
                count.textContent = localStorage.getItem(data.id);
                icon.classList.add('liked')
                refreshCounter(list)
            }
        })
        likes.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                if(localStorage.getItem(data.id)) {
                    count.textContent = data.likes;
                    localStorage.removeItem(data.id)
                    icon.classList.remove('liked')
                    refreshCounter(list)
                } else {
                    localStorage.setItem(data.id, data.likes+1)
                    count.textContent = localStorage.getItem(data.id);
                    icon.classList.add('liked')
                    refreshCounter(list)
                }
            }
        });
    
        title.textContent = data.title
        title.setAttribute('tabindex', '0')
        likes.setAttribute('tabindex', '0')
        if(localStorage.getItem(data.id)) {
            count.textContent = localStorage.getItem(data.id)
            refreshCounter(list)
            icon.classList.add('liked')
        } else {
            count.textContent = data.likes;
            refreshCounter(list)
        }

        play.classList.add('fas', 'fa-play')
        post.classList.add('post')
        inner.classList.add('inner')
        title.classList.add('title')
        likes.classList.add('likes')
        icon.classList.add('fas', 'fa-heart')
        count.classList.add('count')
    
        post.appendChild(src)
        post.appendChild(play)
        post.appendChild(inner)
        inner.appendChild(title)
        inner.appendChild(likes)
        likes.appendChild(count)
        likes.appendChild(icon)
        return (post);
    }
}