'use strict';
console.log('app js is connected!');


//These are in an html collection(array) use ref to image index instead of id's for tracking images shown we are still going to count total clicks and each image's click amount.

var imageElements = document.getElementsByTagName('img');


var imageIndex1 = 0;
var imageIndex2 = 1;
var imageIndex3 = 2;

var rounds = 25;
var allImages = [];

// Create a constructor function that creates an object associated with each product, including the name of the product, file path of image, and times the image has shown

function Photo(name, imageUrl){
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  this.timesShown = 0;
  allImages.push(this);
}


// actually create our Image's
new Photo('bag', 'images/bag.jpg');
new Photo('banana', 'images/banana.jpg');
new Photo('bathroom', 'images/bathroom.jpg');
new Photo('boots', 'images/boots.jpg');
new Photo('breakfast', 'images/breakfast.jpg');
new Photo('bubblegum', 'images/bubblegum.jpg');
new Photo('chair', 'images/chair.jpg');
new Photo('cthulhu', 'images/cthulhu.jpg');
new Photo('dog-duck', 'images/dog-duck.jpg');
new Photo('dragon', 'images/dragon.jpg');
new Photo('pen', 'images/pen.jpg');
new Photo('pet-sweep', 'images/pet-sweep.jpg');
new Photo('scissors', 'images/scissors.jpg');
new Photo('shark', 'images/shark.jpg');
new Photo('sweep', 'images/sweep.png');
new Photo('tauntaun', 'images/tauntaun.jpg');
new Photo('unicorn', 'images/unicorn.jpg');
new Photo('usb', 'images/usb.gif');
new Photo('water-can', 'images/water-can.jpg');
new Photo('wine-glass', 'images/wine-glass.jpg');


var totalClicks = 0;
function imageWasClicked(event){

  totalClicks++;
  // ------- TODO add an else if condition for image 3 XXX DONE XXX ---------
  if(event.srcElement.id === '1'){
    allImages[imageIndex1].timesClicked++;
  } else if (event.srcElement[imageIndex2] === '2'){
    allImages[imageIndex2].timesClicked++;
  } else if (event.srcElement[imageIndex3] === '3'){
    allImages[imageIndex3].timesClicked++;
  }


  //logic so that we dont see the same images from click to click
  var nextImageIndex1 = Math.floor(Math.random() * allImages.length);
  while((nextImageIndex1 === imageIndex1) || (nextImageIndex1 === imageIndex2) || (nextImageIndex1 === imageIndex3)){
    nextImageIndex1 = Math.floor(Math.random() * allImages.length);
  }

  var nextImageIndex2 = Math.floor(Math.random() * allImages.length);
  while((nextImageIndex2 === imageIndex2) || (nextImageIndex2 === imageIndex1) || (nextImageIndex2 === imageIndex3) || (nextImageIndex2 === nextImageIndex1)){
    nextImageIndex2 = Math.floor(Math.random() * allImages.length);
  }
  // ------ TODO add image 3 random generator add in another logic for the 3rd XXX DONE XXX-------
  var nextImageIndex3 = Math.floor(Math.random() * allImages.length);
  while((nextImageIndex3 === imageIndex3) || (nextImageIndex3 === imageIndex2) || (nextImageIndex3 === imageIndex1) || (nextImageIndex3 === nextImageIndex2) || (nextImageIndex3 === nextImageIndex1)){
    nextImageIndex3 = Math.floor(Math.random() * allImages.length);
  }


  //relfect the updates to the new values next images
  //set up reference to new image images.
  // ------ image 3 XXX DONE XXX-------
  imageIndex1 = nextImageIndex1;
  imageIndex2 = nextImageIndex2;
  imageIndex3 = nextImageIndex3;

  // ------- TODO increment times shown make them like the one that shows the timesShown XXX DONE XXX--------
  imageElements[0].src = allImages[imageIndex1].imageUrl;
  allImages[imageIndex1].timesShown++;
  imageElements[1].src = allImages[imageIndex2].imageUrl;
  allImages[imageIndex2].timesShown++;
  imageElements[2].src = allImages[imageIndex3].imageUrl;
  allImages[imageIndex3].timesShown++;


  if(totalClicks >= rounds){
    var footerElement = document.getElementsByTagName('footer')[0];
    if(footerElement.firstElementChild){
      footerElement.firstElementChild.remove();
    }
    footerElement.textContent = 'you voted on 5 images. you are done!';
  }

  if(totalClicks >= rounds){
    var timeLeft = 10;
    alert('You have ' + timeLeft + 'remaining until you are able to vote again.');
  }

}//closing image was clicked.


for(var i = 0; i < imageElements.length; i++){
  console.log('this is the even listener for the click on image event.');
  imageElements[i].addEventListener('click', imageWasClicked);
}

// ---------- TODO create function that shows results to show the image name - text.content -----------
Photo.prototype.render = function(){
  this.name();
  for(var i = 0; i < imageElements.length; i++){
    name.textContent = this.name[i];
  }
};
