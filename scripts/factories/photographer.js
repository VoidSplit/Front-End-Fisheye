function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/photographers ID Photos/${portrait}`;
    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const photographername = document.createElement('p')
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
        
        article.appendChild(img)
        article.appendChild(photographername)
        article.appendChild(location)
        article.appendChild(photographertagline)
        article.appendChild(tarif)
        
        return (article);
    }
    
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
function getGalleryDOM(data, list) {
    //console.log(data)
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

        likes.addEventListener('click', function(e) {
            e.preventDefault(e);
            if(localStorage.getItem(data.id)) {
                count.textContent = data.likes;
                localStorage.removeItem(data.id)
                icon.classList.remove('liked')
            } else {
                localStorage.setItem(data.id, data.likes+1)
                count.textContent = localStorage.getItem(data.id);
                icon.classList.add('liked')
            }
        })
    
        title.textContent = data.title
        if(localStorage.getItem(data.id)) {
            count.textContent = localStorage.getItem(data.id)
            icon.classList.add('liked')
        } else {
            count.textContent = data.likes;
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
        src.addEventListener('click', function(e) {
            e.preventDefault;
            loadPost(data.id, list)
        })

        likes.addEventListener('click', function(e) {
            e.preventDefault(e);
            if(localStorage.getItem(data.id)) {
                count.textContent = data.likes;
                localStorage.removeItem(data.id)
                icon.classList.remove('liked')
            } else {
                localStorage.setItem(data.id, data.likes+1)
                count.textContent = localStorage.getItem(data.id);
                icon.classList.add('liked')
            }
        })
    
        title.textContent = data.title
        if(localStorage.getItem(data.id)) {
            count.textContent = localStorage.getItem(data.id)
            icon.classList.add('liked')
        } else {
            count.textContent = data.likes;
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