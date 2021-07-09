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



// Patterns des champs
const regExName = "[a-zA-Z]{3,}$";
inputFirstNameElt.pattern = regExName;
inputLastNameElt.pattern = regExName;
inputEmailElt.pattern = "[a-z0-9\-_]+[a-z0-9\.\-_]*@[a-z0-9\-_]{2,}\.[a-z\.\-_]+[a-z\-_]+";
inputBirthdateElt.min = "1900-01-01"
inputBirthdateElt.max = "2015-01-01"
var inputCheckedElement = 0;

// Fonction qui vérifie si un input radio est checked, 
// si oui: inputCheckedElement passe à 1
function verifyInputCheckedElement() {
    for (let element of inputsTypeRadio) {
        if (element.checked) {
            inputCheckedElement++
        }
    }
}

// Fonction qui vérifie la validité du champ
function checkField(inputElement, errorSelectElement) {
    let errorElt = document.querySelector(errorSelectElement);
    if (inputElement.validity.valid) {
        errorElt.innerHTML = "";
        inputElement.classList.remove('error-input');
    } else {
        inputElement.classList.add('error-input');
    }
}

// Checks des inputs sur event
inputFirstNameElt.addEventListener("input", () => checkField(inputFirstNameElt, '#first ~ .error'));

inputLastNameElt.addEventListener("input", () => checkField(inputLastNameElt, '#last ~ .error'));

inputEmailElt.addEventListener("input", () => checkField(inputEmailElt, '#email ~ .error'));

inputBirthdateElt.addEventListener("input", () => checkField(inputBirthdateElt, '#birthdate ~ .error'));

inputQuantityElt.addEventListener("input", () => checkField(inputQuantityElt, '#quantity ~ .error'));

// Fonction qui vérifie les champs avant l'envoie du formulaire
function verifyFieldsBeforeSubmit(event) {
    // Chaque fois que l'utilisateur tente d'envoyer les données
    // on vérifie que les champs soient valides.
    verifyInputCheckedElement();
    if (!inputFirstNameElt.validity.valid || inputFirstNameElt.value == "") {

        // S'il est invalide, on affiche un message d'erreur personnalisé
        document.querySelector('#first ~ .error').innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";

        // Et on empêche l'envoi des données du formulaire
        event.preventDefault();
    } else if (!inputLastNameElt.validity.valid || inputLastNameElt.value == "") {

        // S'il est invalide, on affiche un message d'erreur personnalisé
        document.querySelector('#last ~ .error').innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        // Et on empêche l'envoi des données du formulaire
        event.preventDefault();
    } else if (!inputEmailElt.validity.valid || inputEmailElt.value == "") {

        document.querySelector('#email ~ .error').innerHTML = "Vous devez entrer un email valide.";
        event.preventDefault();

    } else if (!inputBirthdateElt.validity.valid || inputBirthdateElt.value == "") {

        document.querySelector('#birthdate ~ .error').innerHTML = "Vous devez entrer votre date de naissance";
        event.preventDefault();

    } else if (!inputQuantityElt.validity.valid || inputQuantityElt == "") {

        document.querySelector('#quantity ~ .error').innerHTML = "Vous devez entrer nombre de tournois valide";
        event.preventDefault();

    } else if (inputCheckedElement === 0) {

        document.querySelector('#location6 ~ .error').innerHTML = "Vous devez choisir une option";
        event.preventDefault();

    } else if (!inputTypeCheckbox.checked) {

        document.querySelector('#checkbox1 ~ .error').innerHTML = "Vous devez vérifier que vous acceptez les termes et conditions.";
        event.preventDefault();


    } else {
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
// Passagde de la fonction dans l'event submit button
inputSubmitElt.addEventListener("click", (event) => verifyFieldsBeforeSubmit(event), false);