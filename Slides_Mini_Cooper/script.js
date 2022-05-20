let images = [{
    url: "https://img.favcars.com/mini/hatch/mini_hatch_2010_wallpapers_14_1280x960.jpg",
    title: "Mini Cooper черный"
  }, {
    url: "https://img.favcars.com/mini/cabrio/mini_cabrio_2009_pictures_5_1280x960.jpg",
    title: "Mini Cooper красный"
  }, {
    url: "https://www.t-r-n.ru/files/modification-images/cb/a8/5c/f9/40061_tmb940.jpg",
    title: "Mini Cooper синий"
  }, {
    url: "https://i.pinimg.com/736x/c5/d9/14/c5d9142556fe74c49a2c1c2d4ea6d46a.jpg",
    title: "Mini Cooper бордовый"
  }, {
    url: "https://rago.zone/foto/mini-cooper-kabriolet-jcw-cabriolet-at-170kw-white-silver-2016-ojete-16849173.jpg",
    title: "Mini Cooper белый"  
  }, {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Mini_Cooper_GP_%28concept%29_on_MIAS_2012.JPG/500px-Mini_Cooper_GP_%28concept%29_on_MIAS_2012.jpg",
    title: "Mini Cooper 2019"
  }, {
    url: "https://bycars.ru/upload/photos/39/3917.jpg",
    title: "Mini Cooper wonder"
}];

function initSlider(images, options) {
  if (!images || !images.length) return;
  
  options = options || {
    dots: false,
    titles: false,
    autoplay: false,
    autoplayInterval: 3000
  }
  
  const sliderWrapper = document.querySelector(".slider");
  const sliderImages = sliderWrapper.querySelector(".slider__images");
  const sliderArrows = sliderWrapper.querySelector(".slider__arrows");
  
  initImages();
  initArrows();
  
  if (options.dots) {
    initDots();
  }
  
  if (options.titles) {
    initTitles();
  }
  
  if (options.autoplay) {
    initAutoplay();
  }
  
  function initImages() {
    images.forEach((image, index) => {
      let imageElement = document.createElement("div");
      imageElement.className = `image n${index} ${index? "" : "active"}`;
      imageElement.dataset.index = index;
      imageElement.style.backgroundImage = `url(${image.url})`;
      sliderImages.appendChild(imageElement);
    });
  }
  
  function initArrows() {
    let lastIndex = images.length - 1;
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? lastIndex : curNumber - 1;
        } else {
          nextNumber = curNumber === lastIndex? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(`.n${num}`).classList.add("active");
    
    if (options.titles) {
      let title = sliderImages.querySelector(".slider__images-title");
      if (images[num].title) {
        title.innerText = images[num].title;
        title.style.display = "block";
      } else {
        title.style.display = "none";
      }
    }
    
    if (options.dots) {
      let dotsWrapper = document.querySelector(".slider__dots");
      dotsWrapper.querySelector(".active").classList.remove("active");
      dotsWrapper.querySelector(`.n${num}`).classList.add("active");
    }
  }
  
  function initDots() {
    let dotsWrapper = document.createElement("div");
    dotsWrapper.className = "slider__dots";
    images.forEach((image, index) => {
      let dot = document.createElement("div");
      dot.className = `slider__dots-item n${index} ${index? "" : "active"}`;
      dot.dataset.index = index;
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      });
      dotsWrapper.appendChild(dot);
    });
    sliderWrapper.appendChild(dotsWrapper);
  }
  
  function initTitles() {
    let titleHTML = `<div class="slider__images-title">${images[0].title}</div>`;
    sliderImages.innerHTML += titleHTML;
  }
  
  function initAutoplay() {
    setInterval(() => {
      let currentNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = currentNumber === images.length - 1? 0 : currentNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let sliderOptions = {
    dots: true,
    titles: false,
    //autoplay: true,
    //autoplayInterval: 3000
  }
  initSlider(images, sliderOptions);
});