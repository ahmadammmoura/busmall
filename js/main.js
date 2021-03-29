'use strict';
let namespic = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];
let uniqueIndexArray = [];
let allProducts = [];
let parentElement = document.getElementById('product');
let numberOfRounds = 25;
let names = [];
let votes = [];
let views = [];

function ProductImage(name){
  this.filepath = `img/${name}`;
  this.alt = name;
  this.title = name;
  this.votes = 0;
  this.views = 0;
  allProducts.push(this);
}

ProductImage.prototype.render = function(){

  let imageElement = document.createElement('img');

  imageElement.setAttribute('src', this.filepath);

  imageElement.setAttribute('alt', this.alt);

  imageElement.setAttribute('title', this.title);

  parentElement.appendChild(imageElement);
};

for(let i = 0 ; i < namespic.length ; i++){
  new ProductImage(namespic[i]);
  console.log('ddd');
}

function getRandomIndex(){
  let index = getRandomNumber(allProducts.length);
  while(uniqueIndexArray.includes(index)){
    index = getRandomNumber(allProducts.length);
  }

  uniqueIndexArray.push(index);

  if(uniqueIndexArray.length > 6){
    uniqueIndexArray.shift();
  }

  return index;
}

function getRandomNumber(max){
  return Math.floor(Math.random() * max);
}


function displayImage(){
  let index = getRandomIndex();
  allProducts[index].render();
  allProducts[index].views++;
}

// Event handler
function clickHandler(event){
  // Empty everything out first
  parentElement.textContent = '';

  let titleOfProductThatWasClickedOn = event.target.title;

  for(let i=0; i<allProducts.length; i++){
    if(titleOfProductThatWasClickedOn === allProducts[i].title){

      allProducts[i].votes++;
      numberOfRounds--;

      if (numberOfRounds===0) {
        // Turn off event listener
        parentElement.removeEventListener('click', clickHandler);
        makeNamesArray();
      }
    }
  }

  displayImage();
  displayImage();
  displayImage();

}

displayImage();
displayImage();
displayImage();

parentElement.addEventListener('click', clickHandler);

function makeNamesArray(){
  for(let i=0; i<allProducts.length; i++){
    names.push(allProducts[i].title);
    votes.push(allProducts[i].votes);
    views.push(allProducts[i].views);
  }

  generateChart();
}

function generateChart(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          '#f45121',
          '#f45121',
          '#f45121',
          '#f45121',
          '#f45121',
          '#f45121',
          '#f45121',
          '#f45121',
          '#f45121',
          '#f45121',
          '#f45121',
          '#f45121',

        ],
        borderColor: [

        ],
        borderWidth: 2
      },
      {
        label: '# of Views',
        data: views,
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2
      }

      ],
    },

    options: {
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    } //options ends here*/
  });

}
