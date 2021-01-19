'use strict';
console.log('app js is connected!');


/** ------------ TODO ------------------
1. I would like a visual representation of how many times a product was clicked so that I can visually analyze the results.

2. Using ChartJS (imported from CDN),
3. display the vote totals and the number of times a product was viewed in a bar chart format. (hint: don’t forget about the <canvas> tags)
4. Place the bar chart in the section located beneath your three product images
5. The bar charts should only appear after all voting data has been collected.

*/










//These are in an html collection(array) use ref to image index instead of id's for tracking images shown we are still going to count total clicks and each image's click amount.

var imageElements = document.getElementsByTagName('img');
console.log('image Elements source', imageElements);


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
  // console.log('this is our image objects being created: ', this);
}


// Add a function for our chart to render pizza data from our objects
function getImageArray(nameOfThePropertyIWant){
  var answer = [];

  for(var i = 0; i < allImages.length; i++){
    answer[i] = allImages[i][nameOfThePropertyIWant];
  }
  console.log('name of the property i want ', answer);
  return answer;
}



// actually create our Images (20 images)
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
  //console.log(totalClicks);
  // ------- TODO add an else if condition for image 3 Class11 XXX DONE XXX ---------
  if(event.srcElement.id === '1'){
    allImages[imageIndex1].timesClicked++;
  } else if (event.srcElement.id === '2'){
    allImages[imageIndex2].timesClicked++;
  } else if (event.srcElement.id === '3'){
    allImages[imageIndex3].timesClicked++;
  }


  //logic so that we dont see the same images from click to click
  var nextImageIndex1 = Math.floor(Math.random() * allImages.length);
  // console.log('next pizza one from our random(): ', nextPizzaIndex1);
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
  // ------ image 3 Class11 XXX DONE XXX-------
  imageIndex1 = nextImageIndex1;
  imageIndex2 = nextImageIndex2;
  imageIndex3 = nextImageIndex3;

  // ------- TODO increment times shown make them like the one that shows the timesShown Class11 XXX DONE XXX  --------
  imageElements[0].src = allImages[imageIndex1].imageUrl;
  allImages[imageIndex1].timesShown++;
  console.log(allImages[imageIndex1].timesShown);
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



    // --------------------Add ul list items ----------------
    // --------- percentage of voteResults -------------
    var asideUl = document.getElementById('voteResults');

    for(var i = 0; i < allImages.length; i++){
      var voteResultsListItem = document.createElement('li');
      voteResultsListItem.textContent = `${allImages[i].name} was clicked on ${allImages[i].timesClicked} times. And was shown ${allImages[i].timesShown} times.`;
      asideUl.appendChild(voteResultsListItem);


      var percentageListItem = document.createElement('li');
      if(allImages[i].timesShown === 0){
        var math = `ZERO clicks and shown ${allImages[i].timesShown} times.`;
      } else {
        math = Math.round(((allImages[i]['timesClicked'] / allImages[i]['timesShown']).toFixed(2) * 100)) + '%';
      }
      percentageListItem.textContent = `${allImages[i].name} percentage of clicked on vs times shown is ` + math;

      asideUl.appendChild(percentageListItem);

    }
  }
}


// ------------------------ TODO add ul list items -----------------
// ---------- vote cooldown ----------
if(totalClicks >= rounds){
  var timeLeft = 10;
  alert('You have ' + timeLeft + 'remaining until you are able to vote again.');

  for(var i = 0; i < imageElements.length; i++){
    console.log('this is the even listener for the click on image event.');
    imageElements[i].removeEventListener('click', imageWasClicked);
  }
}


for(var i = 0; i < imageElements.length; i++){
  console.log('this is the even listener for the click on image event.');
  imageElements[i].addEventListener('click', imageWasClicked);
}

// var ulElement = document.getElementById('voteResults');
// ---------- TODO create function that shows results to show the image name - text.content. make an li, append the ul-----------
// Photo.prototype.render = function(){
//   var ulEle = document.createElement('ul');
//   var liEle = document.createElement('li');
//   for (var i = 0; i < allImages.length; i++){
//     var allImages = document.createElement('td');
//     allImages.textContent = this.name;
//     ulEle.appendChild(allImages);
//     liEle.appendChild(allImages);
//   }
//   ulEle.appendChild(allImages);
//   liEle.appendChild(allImages);



// As a marketeer, I want to prevent users from seeing the same image in two subsequent iterations, so that they are not biased.
// Update your algorithm to randomly generate three unique product images from the images directory.
//Update your algorithm so that new products are generated, confirm that these products are not duplicates from the immediate previous set.
//As a marketing manager, I would like a visual representation of how many times a product was clicked so that I can visually analyze the results.


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog Duck', 'Dragon', 'Pen', 'Pet Sweep', 'Scissors', 'Shark', 'Sweep','Tauntaun', 'Unicorn', 'USB', 'Water Can', 'Wine Glass'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
      backgroundColor: [
        'rgba(255, 0, 0, 0.2)', // bag | red
        'rgba(158, 0, 0, 0.2)', // banana | dark red
        'rgba(255, 149, 0, 0.2)', // bathroom | orange
        'rgba(255, 242, 0, 0.2)', // boots | yellow
        'rgba(149, 255, 0, 0.2)', // breakfast | light green
        'rgba(0, 255, 162, 0.2)', // bubblegum | blue green
        'rgba(0, 255, 251, 0.2)', // chair | light blue
        'rgba(0, 170, 255, 0.2)', // cthulhu | darker blue
        'rgba(0, 42, 255, 0.2)', // dog-duck | purple
        'rgba(106, 0, 255, 0.2)', // dragon | violet
        'rgba(162, 0, 255, 0.2)', // pen | pink
        'rgba(230, 0, 255, 0.2)', // pet sweep | brighter pink
        'rgba(255, 0, 111, 0.2)', // scissors | hot pink
        'rgba(155, 121, 181, 0.2)', // shark | feint darker purple
        'rgba(115, 156, 95, 0.2)', // sweep | camo green
        'rgba(117, 86, 0, 0.2)', // tauntaun | dark yellow brown
        'rgba(117, 67, 67, 0.2)', // unicorn | darker feint red
        'rgba(101, 148, 0, 0.2)', // usb | lighter camo green
        'rgba(130, 130, 130, 0.2)', // watercan | gray
        'rgba(0, 0, 0, 0.2)', // wine glass | black

      ],
      borderColor: [
        'rgba(255, 0, 0, 1)', // bag | red
        'rgba(158, 0, 0, 1)', // banana | dark red
        'rgba(255, 149, 0, 1)', // bathroom | orange
        'rgba(255, 242, 0, 1)', // boots | yellow
        'rgba(149, 255, 0, 1)', // breakfast | light green
        'rgba(0, 255, 162, 1)', // bubblegum | blue green
        'rgba(0, 255, 251, 0.2)', // chair | light blue
        'rgba(0, 170, 255, 0.2)', // cthulhu | darker blue
        'rgba(0, 42, 255, 0.2)', // dog-duck | purple
        'rgba(106, 0, 255, 0.2)', // dragon | violet
        'rgba(162, 0, 255, 0.2)', // pen | pink
        'rgba(230, 0, 255, 0.2)', // pet sweep | brighter pink
        'rgba(255, 0, 111, 0.2)', // scissors | hot pink
        'rgba(155, 121, 181, 0.2)', // shark | feint darker purple
        'rgba(115, 156, 95, 0.2)', // sweep | camo green
        'rgba(117, 86, 0, 0.2)', // tauntaun | dark yellow brown
        'rgba(117, 67, 67, 0.2)', // unicorn | darker feint red
        'rgba(101, 148, 0, 0.2)', // usb | lighter camo green
        'rgba(130, 130, 130, 0.2)', // water can |
        'rgba(0, 0, 0, 0.2)', // wine glass | black

      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

