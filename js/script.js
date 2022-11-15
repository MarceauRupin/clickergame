// Variable

let click = document.getElementById("click");
let score = 0;
let click_increment = 1;
let click_increment_auto = 1;
let view = document.getElementById("view");
let multiplier = document.getElementById("button_x2");
let nombre_click = document.getElementById("nombre_click");
let price_click = document.getElementById("price_click");
let price = 20;
let price_auto = 100;
let autoclick = document.getElementById("autoclick");
let button_x2 = document.getElementById("button_x2");
let auto_x2 = document.getElementById("autoclick");
let bonus = document.getElementById("bonus");
let bubble = document.getElementById("bubbles");

// click button
let add_score = function () {
  score = score + click_increment;
  view.innerHTML = score;
};

click.addEventListener("click", add_score);

// multiply

let multiple = function () {
  if (score >= price) {
    click_increment = click_increment * 2;
    score = score - price;
    price = price * 3;
    nombre_click.value = "X" + click_increment * 2;
    price_click.value = price;
  } else {
    message_error.innerHTML = "Vous n'avez pas assez de crédit :(";
    function masquer() {
      document.getElementById("message_error").innerHTML = "";
    }
    window.setTimeout(masquer, 3000);
  }
};

multiplier.addEventListener("click", multiple);

//click auto

let auto = function () {
  if (score >= price_auto) {
    let add_score_auto = function () {
      score = score + click_increment_auto;
      view.innerHTML = score;
    };
    score = score - price_auto;
    price_auto = price_auto * 2;
    setInterval(add_score_auto, 200);
    click.addEventListener("click", add_score_auto);
    price_autoclick.value = price_auto;
  } else {
    message_error.innerHTML = "crédit insuffisant !";
    function masquer() {
      document.getElementById("message_error").innerHTML = "";
    }
    window.setTimeout(masquer, 3000);
  }
};

autoclick.addEventListener("click", auto);

// animation click

let btn = document.querySelector("button");
btn.addEventListener("click", createRipple);

function createRipple(e) {
  let btn = e.target;
  let boundingBox = btn.getBoundingClientRect();
  let x = e.clientX - boundingBox.left;
  let y = e.clientY - boundingBox.top;

  let ripple = document.createElement("span");
  ripple.classList.add("ripple");
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  btn.appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
}

if (score >= price) {
  button_x2.style.opacity = "1";
  button_x2.style.filter = "grayscale(0)";
} else {
  button_x2.style.opacity = "0.5";
  button_x2.style.filter = "grayscale(0.3)";
}

function tafonction() {
  if (score >= price) {
    button_x2.style.opacity = "1";
    button_x2.style.filter = "grayscale(0)";
  }
  if (score < price) {
    button_x2.style.opacity = "0.5";
    button_x2.style.filter = "grayscale(0.3)";
  }
  if (score >= price_auto) {
    auto_x2.style.opacity = "1";
    auto_x2.style.filter = "grayscale(0)";
  }
  if (score < price_auto) {
    auto_x2.style.opacity = "0.5";
    auto_x2.style.filter = "grayscale(0.3)";
  }
  setTimeout(tafonction, 100);
}
tafonction();

setInterval(function affiche() {
  bonus.style.display = "block";
  // recuperation de la resolution de l'ecran chez l'utilisateur
  largeur = screen.width;
  hauteur = screen.height;
  // positionnement aleatoire
  posx = Math.round(Math.random() * largeur);
  posy = Math.round(Math.random() * hauteur);

  // recuperation de l'element div servant a afficher l'image
  elementDivImage = document.getElementById("bonus");
  // ajustement de l'attribute style, notament left et top
  elementDivImage.setAttribute(
    "style",
    "position:absolute; left:" +
      posx +
      "px; top:" +
      posy +
      "px; width:160; height:120; z-index:1"
  );

  let clear = function () {
    bonus.style.display = "none";
  };

  setTimeout(clear, 3000);
  affiche();
}, 60000);

let click_credit = function () {
  bubble.style.display = "block";
  message_bonus.innerHTML = "FRÉNÉSIE !!!";
  bonus.style.opacity = "0";
  bonus.style.left = "0";
  bonus.style.transform = "translateX(120%)";

  let add_score_auto = function () {
    score = score + click_increment_auto;
    view.innerHTML = score;
  };
  let time = setInterval(add_score_auto, 0);
  click_increment = click_increment * 8;

  setTimeout(function () {
    clearInterval(time)
    document.getElementById("message_bonus").innerHTML = "";
    bubble.style.opacity = "0";
    click_increment = click_increment / 8;
  }, 10000);
};

bonus.addEventListener("click", click_credit);
