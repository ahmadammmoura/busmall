'use strict';

let namespic = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','sweep.png','pen.jpg','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];
let uniqueIndexArray = [];
let parentElement = document.getElementById('product');
let maxRounds = 25;
let totalRounds;
let names = [];
let votes = [];
let views = [];


function ProductImage(name){
  this.filepath = `img/${name}`;
  this.alt = name;
  this.title = name;
  this.votes = 0;
  this.views = 0;
  ProductImage.allProducts.push(this);
}

ProductImage.allProducts = [];



ProductImage.prototype.render = function(){
  let imageElement = document.createElement('img');
  imageElement.setAttribute('src', this.filepath);
  imageElement.setAttribute('alt', this.alt);
  imageElement.setAttribute('title', this.title);
  parentElement.appendChild(imageElement);
};

function getRandomIndex(){
  let index = getRandomNumber(ProductImage.allProducts.length);

  while(uniqueIndexArray.includes(index)){
    index = getRandomNumber(ProductImage.allProducts.length);
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
  ProductImage.allProducts[index].render();
  ProductImage.allProducts[index].views++;
}

function clickHandler(event){
  parentElement.textContent = '';

  let titleOfProductThatWasClickedOn = event.target.title;

  for(let i=0; i<ProductImage.allProducts.length; i++){
    if(titleOfProductThatWasClickedOn === ProductImage.allProducts[i].title){
      ProductImage.allProducts[i].votes++;
      totalRounds++;
    }
  }

  if (totalRounds===maxRounds) {
    parentElement.removeEventListener('click', clickHandler);
    localStorage.removeItem('totalRounds');
    makeNamesArray();
  } else {
    localStorage.setItem('totalRounds', totalRounds);

    let stringifiedProducts = JSON.stringify(ProductImage.allProducts);
    localStorage.setItem('products', stringifiedProducts);

    displayImage();
    displayImage();
    displayImage();
  }
}

function makeNamesArray(){
  for(let i=0; i<ProductImage.allProducts.length; i++){
    names.push(ProductImage.allProducts[i].title);
    votes.push(ProductImage.allProducts[i].votes);
    views.push(ProductImage.allProducts[i].views);
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
          'rgba(255, 99, 132, 0.75)',
          'rgba(54, 162, 235, 0.75)',
          'rgba(255, 206, 86, 0.75)',
          'rgba(75, 192, 192, 0.75)',
          'rgba(153, 102, 255, 0.75)',
          'rgba(255, 99, 132, 0.75)',
          'rgba(54, 162, 235, 0.75)',
          'rgba(255, 206, 86, 0.75)',
          'rgba(75, 192, 192, 0.75)',
          'rgba(153, 102, 255, 0.75)',
          'rgba(255, 99, 132, 0.75)',
          'rgba(54, 162, 235, 0.75)',
          'rgba(255, 206, 86, 0.75)',
          'rgba(75, 192, 192, 0.75)',
          'rgba(153, 102, 255, 0.75)',
          'rgba(255, 99, 132, 0.75)',
          'rgba(54, 162, 235, 0.75)',
          'rgba(255, 206, 86, 0.75)',
          'rgba(75, 192, 192, 0.75)',
          'rgba(255, 159, 64, 0.75)'
        ],
        borderColor: [
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
          'rgba(66, 66, 66, 1)',
        ],
        borderWidth: 2
      },
      {
        label: '# of Views',
        data: views,
        backgroundColor: [

        ],
        borderColor: [

        ],
        borderWidth: 2
      }

      ],

    },

    options: {
      scales: {
        xAxes: [{
          stacked: false,
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

}

function pageStartUp(){
  let productsFromLocalStorage = localStorage.getItem('products');


  if(productsFromLocalStorage === null){
    for(let i = 0 ; i < namespic.length ; i++){
      new ProductImage(namespic[i]);
      console.log('ddd');
    }
  } else {
    let parsedProducts = JSON.parse(productsFromLocalStorage);

    for(let i=0; i<parsedProducts.length; i++){
      new ProductImage(parsedProducts[i].filepath, parsedProducts[i].title, parsedProducts[i].votes, parsedProducts[i].views);
    }
  }
  let roundsFromStorage = localStorage.getItem('totalRounds');
  if(roundsFromStorage){
    totalRounds = parseInt(roundsFromStorage);
  } else {
    totalRounds = 0;
  }

  displayImage();
  displayImage();
  displayImage();

  parentElement.addEventListener('click', clickHandler);

}

// run page start up function
pageStartUp();
