// Edit nav resonsive
const responsiveNavMenu = document.getElementById('responsiveNavMenu');
responsiveNavMenu.addEventListener('click', editNav);

function editNav(e) {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
    e.preventDefault();
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".bground .close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
 modalbg.style.display = "block";
} 

// close modal event
modalClose.addEventListener("click", closeModal);

// Close modal form
function closeModal() {
 modalbg.style.display = "none";
} 