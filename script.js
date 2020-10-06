const accessKey = 'YKMk6TmV8LUddoLgQr9_nnBysFa1fnXaXZYc1GVWHPc';
const secretKey = 'gXEQLeSlc3YBkGG5RA4qhXrZizfGKtVg3Djfm0FGyaw';
const count = 5;
const query = 'tattoos';
const url = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;
const imgContainer = document.getElementById("img-container")
let ready = false;
let loader = document.getElementById('loader')
let loadedImages = 0;
let totalImages = 0;
let photosArray = [];


// Get photos from unsplash api

function imageLoader()
{
    loadedImages++;
    if(loadedImages === totalImages)
    {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

function displayPhotos()
{
    loadedImages = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo=>
        {
            // a tag for photo link
            const item = document.createElement('a');
            item.setAttribute("href",photo.links.html);
            item.setAttribute("target","_blank");
            // img tag for photos
            const img = document.createElement('img');
            img.setAttribute('src',photo.urls.regular);
            img.setAttribute('alt',photo.alt_description);
            img.setAttribute('title',photo.alt_description);
            // put image in a tag
            img.addEventListener('load',imageLoader);
            item.appendChild(img);
            imgContainer.appendChild(item);
    });
}

async function getPhotos()
{
    try
    {
        let response = await fetch(url);
        photosArray = await response.json();
        displayPhotos();
    } catch(error)
    {
        console.log(error);
    }
}

// Check to see if scrolling is near the bottom of the page
window.addEventListener("scroll",()=>
{
   console.log("height" + window.innerHeight);
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
   {
       ready = false;
       getPhotos();
   }
   console.log(window.scrollY);
});

getPhotos()