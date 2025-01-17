function getErrorDOM() {
    
    const errorPage = document.createElement('section')
    const content = document.createElement('div')
    const span = document.createElement('span')
    const p = document.createElement('p')

    errorPage.classList.add('error-page')
    content.classList.add('error-content')

    span.textContent = "Oups,";
    p.textContent = "il semblerait que le photographe que vous cherchez ait perdu son appareil photo...";

    content.appendChild(span)
    content.appendChild(p)
    errorPage.appendChild(content)
    
    //retourne le DOM de la page d'erreur en cas d'id incorrect
    return (errorPage);
}