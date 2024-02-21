const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

// unspalsh api
const count=20;
const apiKey='KNuW7PviH_2ygVBD40ZiI8VDXsonXrbAWWzbLs1SObI'
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


let photoArray=[];
let imagesLoaded=0;
let ready=false;
let totalimages=0;

//helper function to setAttributes
function setAtributes(element, attribute){
    for (const key in attribute) {
        element.setAttribute(key, attribute[key]);
        
    }
}

// imagesLoaded function
function imageLoaded(){
    // console.log("images Loaded");
    imagesLoaded++;
    console.log(imagesLoaded)
    if(imagesLoaded === totalimages){
        ready=true;
        console.log('reaady',ready);
    }
    
}
    

// creating a display function
function displayphotos() {
    imagesLoaded=0;
    totalimages=photoArray.length;
    console.log('total images',totalimages);

    photoArray.forEach((photo) => {

        //creating anchor link to unsplash
        const item=document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAtributes(item,{
            href:photo.links.html,
            target: '_blank'
        });

        //creating an image element for photo
        const image = document.createElement('img');
        // image.setAttribute('src',photo.urls.regular);
        // image.setAttribute('alt',photo.alt_description);
        // image.setAttribute('title',photo.alt_description);

        setAtributes(image,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });

       
            image.addEventListener('load', imageLoaded)
        


        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}



// Get photos from unsplash API
async function getPhotos(){
    try {
        const response= await fetch(apiUrl);
        photoArray= await response.json();
        displayphotos();
    } catch (error) {
        
    }
}

// creating the infinite scroll
window.addEventListener('scroll', () =>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
    console.log('load more');
    getPhotos();
    }
});

// running the function
getPhotos();
