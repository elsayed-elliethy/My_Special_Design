/////change background
let landing = document.querySelector(".landing");
let backgroundArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function changeBackground() {
  let index = Math.floor(Math.random() * backgroundArray.length);
  landing.style.backgroundImage = `url("imgs/${backgroundArray[index]}")`;
}
let backgroundOpt = true;
let counter;
////////////background-option/////////
let backgroundSpan = document.querySelectorAll(".random-background span");
let rand = window.localStorage.getItem("Random-background");
if (rand !== null) {
  if (rand === "true") {
    backgroundOpt = true;
  } else if (rand === "false") {
    backgroundOpt = false;
  }

  backgroundSpan.forEach(function (el) {
    el.classList.remove("active");
  });
  if (rand === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}

backgroundSpan.forEach(function (span) {
  span.addEventListener("click", function (e) {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOpt = true;
      counter = setInterval(changeBackground, 10000);
      window.localStorage.setItem("Random-background", true);
    } else {
      backgroundOpt = false;
      clearInterval(counter);
      window.localStorage.setItem("Random-background", false);
    }
  });
});
if (backgroundOpt === true) {
  counter = setInterval(changeBackground, 10000);
}
//////////////////////////////////////
//////////background-images/////////
let imgsDiv = document.querySelector(".background-images");
let backgroundImg = localStorage.getItem("background-img");
if (backgroundImg !== null) {
  landing.style.backgroundImage = `url("${backgroundImg}")`;
}
backgroundArray.forEach(function (imag) {
  let imgs8 = document.createElement("img");
  imgs8.src = `imgs/${imag}`;
  imgsDiv.append(imgs8);
  imgs8.addEventListener("click", function (e) {
    landing.style.backgroundImage = `url("${e.target.src}")`;
    localStorage.setItem("background-img", e.target.src);
  });
});

////////////////////////////////////
////////show and hide settings///////
let settingsBox = document.querySelector(".settings");
let settingsDivIcon = document.querySelector(".toggle-settings");
let settingsIcon = document.querySelector(".settings-gear");

settingsDivIcon.addEventListener("click", function () {
  settingsBox.classList.toggle("show-settings");
  settingsIcon.classList.toggle("fa-spin");
});
///////////////////////////////////////

//////////color option///////////
let colors = document.querySelectorAll(".ul-colors li");

if (window.localStorage.getItem("color")) {
  let finalColor = window.localStorage.getItem("color");
  document.documentElement.style.setProperty("--main-color", finalColor);
  colors.forEach(function (el) {
    el.classList.remove("active");
    if (el.dataset.color === finalColor) {
      el.classList.add("active");
    }
  });
}
colors.forEach(function (color) {
  color.addEventListener("click", function (e) {
    handleActive(e);
    changeColor(e.target);
  });
});

function changeColor(param2) {
  document.documentElement.style.setProperty(
    "--main-color",
    param2.dataset.color
  );
  window.localStorage.setItem("color", param2.dataset.color);
}

////////////////////////////////
//root =documentElement
//////////skills/////////
let skills = document.querySelectorAll(".skills .skill-progress span");
let skillsSection = document.querySelector(".skills");
window.addEventListener("scroll", function () {
  if (window.scrollY >= skillsSection.offsetTop) {
    skills.forEach(function (skill) {
      skill.style.width = skill.dataset.progress;
    });
  }
  // console.log(skillsSection.offsetTop);
  // console.log(skillsSection.offsetHeight);
  // console.log(window.innerHeight);
  //console.log(window.pageYOffset); //widnowScrollTop = window.scrollY
});

////////////////////////
// let myPopup = document.createComment("div")
// myPopup.className = "pop-up"
/*
let myImgs = document.querySelectorAll(".gallery .imgs-box img");
myImgs.forEach(function (img) {
  img.addEventListener("click", function (e) {
    //create overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.append(overlay);
    //create popup
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    popupHeading = document.createElement("h2");
    if (e.target.hasAttribute("alt") && e.target.alt !== "") {
      popupHeading.textContent = e.target.alt;
    } else {
      popupHeading.textContent = "No Heading";
    }
    popupBox.append(popupHeading, e.target);
    document.body.append(popupBox);
    //create the img
  });
});
*/
let myImgs = document.querySelectorAll(".gallery .imgs-box img");
myImgs.forEach(function (img) {
  img.addEventListener("click", function (e) {
    //create overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.append(overlay);
    //create popup
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    popupHeading = document.createElement("h3");
    popupImg = document.createElement("img");
    popupImg.setAttribute("src", e.target.src);
    popupImg.setAttribute("alt", e.target.alt);
    if (popupImg.hasAttribute("alt") && popupImg.alt !== "") {
      popupHeading.textContent = e.target.alt;
    }
    let closeSpan = document.createElement("span");
    closeSpan.className = "popup-span";
    closeSpan.textContent = "X";
    popupBox.append(closeSpan, popupHeading, popupImg);
    document.body.append(popupBox);

    // closeSpan.addEventListener("click", function () {
    //   closeSpan.parentElement.classList.add("hide-popup");
    //   overlay.classList.add("hide-popup");
    // });

    // overlay.addEventListener("click", function () {
    //   overlay.remove();
    //   popupBox.remove();
    // });
  });
});

document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("popup-span") |
    e.target.classList.contains("popup-overlay")
  ) {
    document.querySelector(".popup-box").remove();
    document.querySelector(".popup-overlay").remove();
  }
});
////////////////bullets////////////
let myBullets = document.querySelectorAll(".bullets .bullet");

myBullets.forEach(function (bullet) {
  bullet.addEventListener("click", function (e) {
    document.querySelector(e.target.dataset.title).scrollIntoView({
      behavior: "smooth",
    });
    handleActive(e);
    // window.scrollTo({
    //   top: document.querySelector(e.target.dataset.title).offsetTop,
    //   behavior: "smooth",
    // });
  });
});

let mainSections = [
  ".about",
  ".skills",
  ".gallery",
  ".timeline",
  ".features",
  ".testimonials",
];

window.onscroll = function () {
  document.querySelector(".landing .container").style.cssText =
    "position: sticky;";
  mainSections.forEach(function (sec) {
    if (window.scrollY >= document.querySelector(sec).offsetTop - 100) {
      myBullets.forEach(function (bol) {
        if (bol.dataset.title === sec) {
          bol.parentElement.querySelectorAll(".active").forEach(function (ele) {
            ele.classList.remove("active");
          });
          bol.classList.add("active");
        }
      });
    }
  });
};

//////////////////////////////

let mainLinks = document.querySelectorAll("header .links li a");

mainLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // e.preventDefault();
    e.target.parentElement.parentElement
      .querySelectorAll(".active")
      .forEach((ele) => {
        ele.classList.remove("active");
      });
    e.target.classList.add("active");
  });
});

function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  event.target.classList.add("active");
}

//////bullets-option///////////////
let bulletSpan = document.querySelectorAll(".show-bullets span");
let bulletsDiv = document.querySelector(".bullets");
let showBullets = window.localStorage.getItem("Show-Bullets");
if (showBullets !== null) {
  bulletSpan.forEach(function (el) {
    el.classList.remove("active");
    if (showBullets === "yes") {
      bulletsDiv.style.display = "block";
      document.querySelector(".show-bullets .yes").classList.add("active");
    } else {
      bulletsDiv.style.display = "none";
      document.querySelector(".show-bullets .no").classList.add("active");
    }
  });
}
// console.log(document.querySelector(".show-bullets .no"));
bulletSpan.forEach(function (span) {
  span.addEventListener("click", function (e) {
    handleActive(e);

    if (e.target.dataset.bullets === "yes") {
      bulletsDiv.style.display = "block";
      window.localStorage.setItem("Show-Bullets", "yes");
    } else {
      bulletsDiv.style.display = "none";
      window.localStorage.setItem("Show-Bullets", "no");
    }
  });
});

//////////////////////////////////
/////////////reset-option////////
let resetBtn = document.querySelector(".settings .reset");
resetBtn.addEventListener("click", function () {
  // localStorage.clear();

  window.localStorage.removeItem("Random-background");
  window.localStorage.removeItem("Show-Bullets");
  window.localStorage.removeItem("color");

  window.location.reload();
});
////////////////////////////////
let headerIcon = document.querySelector(".toggle-menue");
let headerLinks = document.querySelector(".landing header .links");

headerIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  headerLinks.classList.toggle("open");
});
document.addEventListener("click", function (e) {
  if (e.target !== headerIcon && e.target !== headerLinks) {
    if (headerLinks.classList.contains("open")) {
      headerLinks.classList.remove("open");
    }
  }
});
headerLinks.onclick = function (e) {
  e.stopPropagation();
};
