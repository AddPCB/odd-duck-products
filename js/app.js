function getRandomProductIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

let totalClicks = 0;
const maxClicks = 10;
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];

const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];

for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i], `assets/${productNames[i]}.jpeg`);
}

// render our products onto the page
function renderProducts() {
  // get three random product indexes
  let product1 = getRandomProductIndex();
  let product2 = getRandomProductIndex();
  let product3 = getRandomProductIndex();

  // check none of them match
  while (product1 === product2 || product1 === product3 || product2 === product3) {
    product2 = getRandomProductIndex();
    product3 = getRandomProductIndex();
  }

  // put those images onto the page
  const img1Container = document.getElementById("productImage1");
  img1Container.innerHTML = ""
  const img1 = document.createElement("img");
  img1Container.appendChild(img1);
  const img2Container = document.getElementById("productImage2");
  img2Container.innerHTML = ""
  const img2 = document.createElement("img");
  img2Container.appendChild(img2);
  const img3Container = document.getElementById("productImage3");
  img3Container.innerHTML = ""
  const img3 = document.createElement("img");
  img3Container.appendChild(img3);

  img1.src = Product.allProducts[product1].src;
  img1.alt = Product.allProducts[product1].name;
  img1.id = "img1"
  img2.src = Product.allProducts[product2].src;
  img2.alt = Product.allProducts[product2].name;
  img1.id = "img2"
  img3.src = Product.allProducts[product3].src;
  img3.alt = Product.allProducts[product3].name;
  img1.id = "img3"
  // increase views for displayed images
  Product.allProducts[product1].views++;
  Product.allProducts[product2].views++;
  Product.allProducts[product3].views++;
}

// listen for clicks on the images
function handleClick(event) {
  // make sure they are clicking on an image and not the container itself
  if (event.target === imgContainer) {
    alert("You've got to click on the image!");
  } else {
    totalClicks++;
  }

  // increase clicks
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (Product.allProducts[i].name === event.target.alt) {
      Product.allProducts[i].clicks++;
      break; // ends the for loop
    }
  }

  // check max clicks
  if (totalClicks === maxClicks) {
    // remove the event listener so the game ends
    imgContainer.removeEventListener("click", handleClick);
    // maybe rnder results?
    renderResults();
  } else {
    renderProducts();
  }
}

// function renderResults() {
//   const resultsList = document.getElementById("resultsText");
//   let ul = document.createElement("ul");
//   ul.setAttribute("id", "listStart");
//   resultsList.appendChild(ul);
//   const listStart = document.getElementById("listStart");
//   for (let i = 0; i < Product.allProducts.length; i++) {
//     let theProduct = Product.allProducts[i];
//     let li = document.createElement("li");

//     li.textContent = `${theProduct.name}: ${theProduct.clicks} clicks ${theProduct.views} views`;
//     listStart.appendChild(li);
//   }
// }

function renderResults() {
  const resultsText = document.getElementById("resultsText");
  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", "resultsChart");
  resultsText.appendChild(canvas);
  const resultsChart = document.getElementById("resultsChart");
  for (let i = 0; i < Product.allProducts.length; i++) {
    let theProduct = Product.allProducts[i];
    new Chart(resultsChart, {
      type: "bar",
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      title :{
        text: "Results Chart"
    },
    axisY:[
        {
            title: "Times Clicked"
        },
        {
            title: "Times viewed"
        }
    ],
      axisX:[
      {
        title: "Product Name"
      }
    ],
    data: [{
        type: "line",
        axisYIndex: 0, //defaults to 0
        dataPoints : [
            { label: `${theProduct.name}`,  y: `${theProduct.clicks}` }
        ]
        },
        {
        type: "column",
        axisYIndex: 1,
        dataPoints : [
          { label: `${theProduct.name}`,  y: `${theProduct.views}` }
        ]
        }
    ]
});
  }
}

const imgContainer = document.getElementById("productImages");
imgContainer.addEventListener("click", handleClick);

renderProducts();
