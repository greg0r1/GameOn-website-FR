// Edit nav responsive
const responsiveNavMenu = document.getElementById('responsiveNavMenu');
responsiveNavMenu.addEventListener('click', editNav);

/**
 * Edit navigation
 *
 * @param {*} e
 */
function editNav(e) {
    var x = document.getElementById("myTopnav");
    var y = document.getElementById("overlay");
    if (x.className === "topnav") {
        x.className += " responsive";
        y.style.display = "block";
        e.preventDefault();
    } else {
        x.className = "topnav";
        y.style.display = "none";
        e.preventDefault();
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".bground .close");

const inputFirstNameElt = document.getElementById("first");
const inputLastNameElt = document.getElementById("last");
const inputEmailElt = document.getElementById("email");
const inputBirthdateElt = document.getElementById("birthdate");
const inputQuantityElt = document.getElementById("quantity");
const inputsTypeRadio = document.querySelectorAll("input[type='radio']");
const inputTypeCheckbox = document.getElementById('checkbox1');
const inputSubmitElt = document.querySelector(".btn-submit");
const formElt = document.getElementsByTagName('form')[0];
const error = document.querySelector('.error');
const formDataList = document.getElementsByClassName('formData');
const bodyElt = document.querySelector('body');

/**
 * Launch modal form
 *
 */
function launchModal() {
    modalbg.style.display = "block";
    window.scrollTo(0, 0);
    // bodyElt.style.position = "fixed";
}

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 * Closing the modal window
 * 
 */
function closeModal() {
    modalbg.style.display = "none";
    bodyElt.style.position = "unset";
}

// The event added to the cross to close the modal window
modalClose.addEventListener("click", closeModal);

// Definition of the rules of the patterns of the inputs
const regExName = "[a-zA-Z]{3,}$"; // Regex who checks if the field has more than 3 characters
inputFirstNameElt.pattern = regExName;
inputLastNameElt.pattern = regExName;
inputEmailElt.pattern = "[a-z0-9\-_]+[a-z0-9\.\-_]*@[a-z0-9\-_]{2,}\.[a-z\.\-_]+[a-z\-_]+"; // Regex who checks if the field has a valid email
inputBirthdateElt.min = "1900-01-01" // Minimum date for the anniversary date
inputBirthdateElt.max = "2015-01-01" // Maximum date for the anniversary date
var inputCheckedElement = 0; // Value to 0 if no input radio is checked

/**
 * We check the validity of a field
 *
 * @param {*} inputElement An element of the DOM
 * @param {*} errorSelectElement A selector with the error class of the input concerned
 */
function checkField(inputElement, errorSelectElement) {
    let errorElt = document.querySelector(errorSelectElement);
    if (inputElement.validity.valid) {
        errorElt.innerHTML = "";
        inputElement.classList.remove('error-input');
    } else {
        inputElement.classList.add('error-input');
    }
}

// The validity of each element is checked
inputFirstNameElt.addEventListener("input", () => checkField(inputFirstNameElt, '#first ~ .error'));
inputLastNameElt.addEventListener("input", () => checkField(inputLastNameElt, '#last ~ .error'));
inputEmailElt.addEventListener("input", () => checkField(inputEmailElt, '#email ~ .error'));
inputBirthdateElt.addEventListener("input", () => checkField(inputBirthdateElt, '#birthdate ~ .error'));
inputQuantityElt.addEventListener("input", () => checkField(inputQuantityElt, '#quantity ~ .error'));

/**
 * We pass the error's message in the element that has the .error class of the input concerned
 * And we prevent the sending of the data from the form
 * @param {*} event Initial event
 * @param {*} selectorError Element sellector with the .error class | String value
 * @param {*} stringErrorMessage Message to be inserted in the element | String value
 */
function insertErrorMessage(event, selectorError, stringErrorMessage) {
    document.querySelector(selectorError).innerHTML = stringErrorMessage;
    event.preventDefault();
}

/**
 * We check if an input radio is checked
 * If inputCheckeElement goes to 1 -> 1 Input Radio Checked
 */
function verifyInputCheckedElement() {
    for (let element of inputsTypeRadio) {
        if (element.checked) {
            inputCheckedElement++
        }
    }
}

/**
 * The validity of the input fields are checked before sending the form
 * If it is invalid, we display a custom error message
 * @param {*} event Initial event
 */
function verifyFieldsBeforeSubmit(event) {

    verifyInputCheckedElement();

    var inputsValidArray = [];

    if (!inputFirstNameElt.validity.valid || inputFirstNameElt.value == "") {

        inputsValidArray.push(false);

        insertErrorMessage(event, '#first ~ .error', "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");

    } else {

        inputsValidArray.push(true);
    }

    if (!inputLastNameElt.validity.valid || inputLastNameElt.value == "") {

        inputsValidArray.push(false);
        insertErrorMessage(event, '#last ~ .error', "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");

    } else {

        inputsValidArray.push(true);
    }

    if (!inputEmailElt.validity.valid || inputEmailElt.value == "") {
        inputsValidArray.push(false);
        insertErrorMessage(event, '#email ~ .error', "Vous devez entrer un email valide.");

    } else {

        inputsValidArray.push(true);

    }

    if (!inputBirthdateElt.validity.valid || inputBirthdateElt.value == "") {
        inputsValidArray.push(false);
        insertErrorMessage(event, '#birthdate ~ .error', "Vous devez entrer votre date de naissance");

    } else {

        inputsValidArray.push(true);

    }

    if (!inputQuantityElt.validity.valid || inputQuantityElt.value == "") {
        inputsValidArray.push(false);
        insertErrorMessage(event, '#quantity ~ .error', "Vous devez entrer nombre de tournois valide");

    } else {

        inputsValidArray.push(true);

    }

    if (inputCheckedElement === 0) {
        inputsValidArray.push(false);
        insertErrorMessage(event, '#location6 ~ .error', "Vous devez choisir une option");

    } else {

        inputsValidArray.push(true);

    }

    if (!inputTypeCheckbox.checked) {
        inputsValidArray.push(false);
        insertErrorMessage(event, '#checkbox1 ~ .error', "Vous devez vérifier que vous acceptez les termes et conditions.");
        allIsValid = false

    } else {

        inputsValidArray.push(true);

    }


    if (inputsValidArray.filter(element => element == false) == 0) {

        event.preventDefault();
        let div = document.createElement('div');
        div.classList.add('submittedMessage');
        formElt.insertBefore(div, document.querySelector('.formData'));
        div.innerHTML = "Merci d\'avoir soumis vos informations d\'inscription";
        inputSubmitElt.value = "Fermer";
        inputSubmitElt.classList.add('closeBtnSubmit');
        inputSubmitElt.addEventListener('click', () => {
            formElt.submit();
        });

    }
}

// We check the fields before sending the form
inputSubmitElt.addEventListener("click", (event) => verifyFieldsBeforeSubmit(event), false);