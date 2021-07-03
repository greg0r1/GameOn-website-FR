// Edit nav responsive
const responsiveNavMenu = document.getElementById('responsiveNavMenu');
responsiveNavMenu.addEventListener('click', editNav);

function editNav(e) {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
    e.preventDefault();
  } else {
    x.className = "topnav";
    e.preventDefault();
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



// Validation form elements
const inputFirstNameElt = document.getElementById("first");
const inputLastNameElt = document.getElementById("last");
const inputEmailElt = document.getElementById("email");
const inputBirthdateElt = document.getElementById("birthdate");
const inputQuantityElt = document.getElementById("quantity");
const formSubmitElt = document.querySelector("input[type='submit']");


// Validation des champs sur event

// Message erreur activation class
function errorMessage(stringMessage, strinColor) {
  const newDiv = document.querySelector('.content').appendChild(document.createElement('div'));
  newDiv.classList.add('errorMessage');
  newDiv.style.display = 'flex';
  newDiv.style.background = strinColor;
  newDiv.innerHTML = '<p>' + stringMessage + '</p>';
  setTimeout(() => newDiv.style.display = 'none', 3000);

}

// check prénom 
inputFirstNameElt.addEventListener('change', verifFirst);

function verifFirst(e) {
  let rgexName = /[a-zA-Z]{3,}$/;
  let valueFirst = inputFirstNameElt.value;
  let checkRgexName = rgexName.test(valueFirst);

  if (!checkRgexName) {
    e.preventDefault();
    errorMessage('Veuillez saisir un prénom valide', 'red')
  } else {
    return true
  }
}

// check nom 
inputLastNameElt.addEventListener('change', verifLast);

function verifLast(e) {
  let rgexName = /[a-zA-Z]{3,}$/;
  let valueLast = inputLastNameElt.value;
  let checkRgexName = rgexName.test(valueLast);

  if (!checkRgexName) {
    e.preventDefault();
    errorMessage('Veuillez saisir un nom valide', 'red')
  } else {
    return true
  }
}

// check email
inputEmailElt.addEventListener('change', verifEmail)

function verifEmail(e) {
  let valueEmail = inputEmailElt.value;
  let rgexMail = /[a-z0-9\-_]+[a-z0-9\.\-_]*@[a-z0-9\-_]{2,}\.[a-z\.\-_]+[a-z\-_]+/gmi;
  let checkRgexEmail = rgexMail.test(valueEmail);

  if (!checkRgexEmail) {
    e.preventDefault();
    errorMessage('Veuillez saisir un email valide', 'red')
  } else {
    return true
  }
}

// check birthdate
inputBirthdateElt.addEventListener('focusout', verifBirthdate);

function verifBirthdate(e) {
  let valueBirthdate = inputBirthdateElt.value;
  let validDateMin = Date.parse(valueBirthdate);
  let validDateMax = Date.parse('2022-01-01');


  if (validDateMin < 0 || validDateMin > validDateMax) {
    e.preventDefault();
    errorMessage('Veuillez saisir une date d\'anniversaire valide', 'red')
  } else {
    return true
  }
}

// check nombre de concours
inputQuantityElt.addEventListener('focusout', verifQuantity)

function verifQuantity(e) {
  let valueQuantity = inputQuantityElt.value;

  if (valueQuantity == '' || valueQuantity < 0 || valueQuantity > 50) {
    e.preventDefault();
    errorMessage('Veuillez saisir un nombre de tournois valide', 'red')
  } else {
    return true
  }
}

// Validation all form
formSubmitElt.addEventListener('click', submitValidation);

function checkFields(e) {
  verifFirst(e);
  verifLast(e);
  verifEmail(e);
  verifBirthdate(e);
  verifQuantity(e);
}

function submitValidation(e) {
  let form = document.getElementById('validate');
  var inputsOk = 0;
  for (let i = 0; i < form.elements.length; i++) {
    let input = form[i];

    switch (input.type) {
      case "text":
        if (input.value == "") inputsOk++;
        break;

      case "email":
        if (input.value == "") inputsOk++;
        break;

      case "date":
        if (input.value == "") inputsOk++;
        break;

      case "number":
        if (input.value == "") inputsOk++;
        break;

      case "radio":
        let inputsRadio = document.querySelectorAll('input[type=radio]')
        let count = 0;

        for (let index = 0; index < inputsRadio.length; index++) {
          const element = inputsRadio[index];
          if (element.checked) {
            count++
          };
        }

        if (count == 0) {
          inputsOk++
        }
        break;

      default:
        break;
    }
  }
  checkFields(e);
  let validationInputs = checkFields(e) || true;

  // Check conditions d'utilisation avant envoi du formulaire
  let required = document.getElementById('checkbox1');
  if (!required.checked) {
    e.preventDefault();
    errorMessage('Veuillez accepter les conditions d\'utilisation', 'red')
  } else if (inputsOk > 0) {
    e.preventDefault();
    errorMessage('Veuillez remplir tous les champs du formulaire', 'red')
  } else if (inputsOk === 0 && validationInputs) {
    errorMessage('Formulaire envoyé', 'green');
    setTimeout(e.preventDefault(), 3000);
  }
}