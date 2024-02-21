const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Unsplah API
const count = 5;
const query = "nature";
const apiKey = "N23ww1uL_nM19fpjgVjUJ8oyBe6fZtgpJv0uAfiToAg";
const apiUrl = `https://api.unsplash.com/photos/random/?count=${count}&client_id=${apiKey}&query=${query}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Link & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((imgItem) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: imgItem.links.html,
      target: "_blank",
    });

    // Creat <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: imgItem.urls.regular,
      alt: imgItem.alt_description,
      title: imgItem.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then put both inside immageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    alert(error);
  }
}

// Check to see if scrolling near bottom of page
// Load More Images
window.addEventListener("scroll", () => {
  if (
    ready &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
