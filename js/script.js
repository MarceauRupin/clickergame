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
    price_auto = price_auto * 3;
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



let click_credit = function () {
  bubble.style.display = "block";
  message_bonus.innerHTML = "FRÉNÉSIE !!!!";
  bonus.style.opacity = "0";
  bonus.style.left = "0";
  bonus.style.transform = "translateX(120%)";

  let add_score_auto = function () {
    score = score + click_increment_auto;
    view.innerHTML = score;
  };
  let time = setInterval(add_score_auto, 0);

  setInterval(function () {
    clearInterval(time);
    document.getElementById("message_bonus").innerHTML = "";
    bubble.style.display = "none";
  }, 10000);
  
  setInterval(function () {
    bonus.style.opacity = "1";
    bonus.style.left = "120%";
    bonus.style.transform = "translateX(0%)";
  
  }, 20000);
  
  setInterval(function masquer_frenesie() {
    document.getElementById("message_bonus").innerHTML = "";
    bubble.style.display = "none";
    bonus.style.opacity = "0";
    bonus.style.left = "0";
    bonus.style.transform = "translateX(120%)";
  }, 28000);

  
};

bonus.addEventListener("click", click_credit);


