function galleryFactory(data, name) {
    const Username = name;
    const { date, id, likes, photographerId, price, title, video, image } = data;

    let picture = `assets/photographers/${Username}/${image}`;
    function getGalleryDOM() {
        let img;
        if(video) {
            let picture = `assets/photographers/${Username}/${video}`;
            console.log("video");
            img = document.createElement( 'video' );
            img.setAttribute("src", picture);
            console.log(img)
        } else if (image) {
            console.log('photo');
            img = document.createElement( 'img' );
            img.setAttribute("src", picture);
        }

        const post = document.createElement( 'div' );
        post.classList.add('comp', 'post');
        
        const photoWrapper = document.createElement( 'div' )
        photoWrapper.classList.add('photo');


        const container = document.createElement( 'div' );
        container.classList.add('container');

        const titleDOM = document.createElement( 'div' );
        titleDOM.classList.add('title');
        titleDOM.innerHTML = title
        
        const counter = document.createElement( 'div' );
        counter.classList.add('comp', 'counter');

        const counterSpan = document.createElement( 'span' );
        counterSpan.innerHTML = likes

        const counterIcon = document.createElement( 'div' );
        counterIcon.classList.add('icon');

        
        const counterIconInner = document.createElement( 'i' );
        counterIconInner.classList.add('fas', 'fa-heart');

        /*
        - Post                  1
            - Photo             2
                • Img           3
            - Container         4
                - Title         5
                - Counter       6
                    - Span      7
                    - Icon      8
                        • I     9
         */

        post.appendChild(photoWrapper);             // 2
        photoWrapper.appendChild(img);              // 3
        post.appendChild(container);                // 4
        container.appendChild(titleDOM);            // 5
        container.appendChild(counter);             // 6
        counter.appendChild(counterSpan);           // 7
        counter.appendChild(counterIcon);           // 8
        counterIcon.appendChild(counterIconInner);  // 9

        return (post);                              // 1
    }
    return { date, id, likes, photographerId, price, title, video, image, getGalleryDOM }
}
