let movies = [
  {
    name: "Ana's Revenge",
    des: "Analia Guerrero executes and elaborate plan to mask and destroy the presidential candidate Guillermo Mejia, who took her mother from her 30 years ago.",
    image:
      "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/767/1410767-i-c49c10eea7be",
  },
  {
    name: "loki",
    des: "The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers Endgame.",
    image: "images/slider 1.PNG",
  },
  {
    name: "wanda vision",
    des: "Living idealized suburban lives, super-powered beings Wanda and Vision begin to suspect that everything is not as it seems.",
    image: "images/slider 3.PNG",
  },
  {
    name: "Secret Invasion",
    des: "In Secret Invasion, set in the present-day MCU, Fury learns of a clandestine invasion of Earth by a faction of shapeshifting Skrulls. Fury joins his allies, including Everett Ross, Maria Hill, and the Skrull Talos, who has made a life for himself on Earth. Together they race against time to thwart an imminent Skrull invasion and save humanity",
    image:
      "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/302/1540302-i-2c762a8182d3",
  },
  {
    name: "The Trial",
    des: "Noyonika Sengupta faces a trial by fire when her family gets hit by a scandal. Watch her defend them in life and in the courtroom.",
    image:
      "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/3779/1553779-i-ed41b6853d74",
  },
];

const carousel = document.querySelector(".carousel");
let sliders = [];

let slideIndex = 0;

const createSlide = () => {
  if (slideIndex >= movies.length) {
    slideIndex = 0;
  }

  //creating DOM element
  let slide = document.createElement("div");
  let imgElement = document.createElement("img");
  let content = document.createElement("div");
  let h1 = document.createElement("h1");
  let p = document.createElement("p");

  //attaching all the elements
  imgElement.appendChild(document.createTextNode(""));
  h1.appendChild(document.createTextNode(movies[slideIndex].name));
  p.appendChild(document.createTextNode(movies[slideIndex].des));
  content.appendChild(h1);
  content.appendChild(p);
  slide.appendChild(content);
  slide.appendChild(imgElement);
  carousel.appendChild(slide);

  //setting up image
  imgElement.src = movies[slideIndex].image;
  slideIndex++;

  //setting elements classname
  slide.className = "slider";
  content.className = "slide-content";
  h1.className = "movie-title";
  p.className = "movie-des";

  sliders.push(slide);

  //adding sliding effect
  if (sliders.length) {
    sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${
      30 * (sliders.length - 2)
    }px)`;
  }
};

for (let i = 0; i < 3; i++) {
  createSlide();
}

setInterval(() => {
  createSlide();
}, 3000);

//video cards

const videoCards = [...document.querySelectorAll(".video-card")];

videoCards.forEach((item) => {
  item.addEventListener("mouseover", () => {
    let video = item.children[1];
    video.play();
  });

  item.addEventListener("mouseleave", () => {
    let video = item.children[1];
    video.pause();
  });
});

//card sliders

let cardContainers = [...document.querySelectorAll(".card-container")];
let preBtns = [...document.querySelectorAll(".pre-btn")];
let nxtBtns = [...document.querySelectorAll(".nxt-btn")];

cardContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtns[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth - 200;
  });

  preBtns[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth + 200;
  });
});
