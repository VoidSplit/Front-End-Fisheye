function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/photographers ID Photos/${portrait}`;
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.classList.add('comp', 'photograph-profile')

        const photoWrapper = document.createElement( 'div' )
        photoWrapper.classList.add('photo')

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        photoWrapper.appendChild(img)

        const Photographname = document.createElement( 'div' );
        Photographname.textContent = name;
        Photographname.classList.add('name')

        const location = document.createElement( 'div' );
        location.textContent = `${city}, ${country}`;
        location.classList.add('location')

        const tag = document.createElement( 'div' );
        tag.textContent = tagline;
        tag.classList.add('description')

        const tarif = document.createElement( 'div' );
        tarif.textContent = `${price}€/jour`;
        tarif.classList.add('tarif')

        article.appendChild(photoWrapper);
        article.appendChild(Photographname);
        article.appendChild(location);
        article.appendChild(tag);
        article.appendChild(tarif);

        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}