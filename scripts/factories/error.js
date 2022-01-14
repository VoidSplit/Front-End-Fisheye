function getErrorDOM() {
    
    const errorPage = document.createElement('section')
    const content = document.createElement('div')
    const span = document.createElement('span')
    const p = document.createElement('p')

    errorPage.classList.add('error-page')
    content.classList.add('error-content')

    span.textContent = "Oups,";
    p.textContent = "il semblerait que le photographe que vous cherchez ai perdu son appareil photo...";

    content.appendChild(span)
    content.appendChild(p)
    errorPage.appendChild(content)
    
    return (errorPage);
}