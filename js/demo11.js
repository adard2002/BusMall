'use strict';
console.log('app js is connected!');

// These are in an html collection(array) use ref to image index instead of id's for tracking images shown we are still going to count total clicks and each image's click amouts.

var imageElements = document.getElementsByTagName('img');


var pizzaIndex1 = 0;
var pizzaIndex2 = 1;

var rounds = 5;
var allPizzas = [];

function Pizza(name, imageUrl){
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  allPizzas.push(this);
}

// actually create our Pizza's
new Pizza('Brick Oven Pizza', 'images/brickOverPizza.jpeg');
new Pizza('Brick Oven Pizza', 'images/brickOverPizza.jpeg');
new Pizza('Brick Oven Pizza', 'images/brickOverPizza.jpeg');
new Pizza('Brick Oven Pizza', 'images/brickOverPizza.jpeg');
new Pizza('Brick Oven Pizza', 'images/brickOverPizza.jpeg');
new Pizza('Brick Oven Pizza', 'images/brickOverPizza.jpeg');
new Pizza('Brick Oven Pizza', 'images/brickOverPizza.jpeg');
new Pizza('Brick Oven Pizza', 'images/brickOverPizza.jpeg');



var totalClicks = 0;
function imageWasClicked(event){

  totalClicks++;
  if(event.srcElement.id === '1'){
    allPizzas[pizzaIndex1].timesClicked++;
  } else if (event.srcElement[pizzaIndex2]){
    allPizzas[pizzaIndex2].timesClicked++;
  }


  // logic so that we dont see the same images from click to click
  var nextPizzaIndex1 = Math.floor(Math.random() * allPizzas.length);
  while((nextPizzaIndex1 === pizzaIndex1) || (nextPizzaIndex1 === nextPizzaIndex2)){
    nextPizzaIndex1 = Math.floor(Math.random() * allPizzas.length);
  }

  var nextPizzaIndex2 = Math.floor(Math.random() * allPizzas.length);
  while((nextPizzaIndex2 === pizzaIndex2) || (nextPizzaIndex2 === nextPizzaIndex1)){
    nextPizzaIndex2 = Math.floor(Math.random() * allPizzas.length);

  }

  // Reflect the updates to the new values next pizzas
  // Set up reference to new pizza images.

  pizzaIndex1 = nextPizzaIndex1;
  pizzaIndex2 = nextPizzaIndex2;


  imageElements[0].src = allPizzas[pizzaIndex1].imageUrl;
  imageElements[1].src = allPizzas[pizzaIndex2].imageUrl;



  if(totalClicks >= rounds){
    var footerElement = document.getElementsByTagName('footer')[0];
    if(footerElement.firstElementChild){
      footerElement.firstElementChild.remove();
    }
    footerElement.textContent = 'you voted on 5 images. You be done!';
  }

} // Closing image was clicked


for(var i = 0; i < imageElements.length; i++){
  console.log('this is the event listener for the click on pizza event');
  imageElements[i].addEventListener('click', imageWasClicked);
}
