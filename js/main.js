const form = document.getElementById("form"),
  cardNumber = document.getElementById("cardNumber"),
  cardName = document.getElementById("cardName"),
  cardMm = document.querySelector(".mm"),
  cardYy = document.querySelector(".yy"),
  cardCvc = document.querySelector(".card-back-ccv"),
  inputCvc = document.getElementById("inputCvc"),
  inputMm = document.getElementById("mm"),
  inputYy = document.getElementById("yy"),
  inputsForm = document.querySelectorAll(".input-form"),
  message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const htmlSuccess = `
  <div class="complete">
    <img src="./images/icon-complete.svg" alt="complete">
    <p class="complete-text">
      <span>Thank You!</span>
      We've added your card details
    </p>
    <button class="btn-continue btn-send" id="btnContinue">Continue</button>
  </div>
  `;
  // Verificar si las Entradas estan vacias y marcarlas con tonos rojos
  for (let i = 0; i < inputsForm.length; i++) {
    const input = inputsForm[i];
    if (input.value == "") {
      input.classList.add("input-error");
      message.classList.add("show");
      setTimeout(() => {
        input.classList.remove("input-error");
        message.classList.remove("show");
      }, 2000);
    }
    //Si todo es correcto Mostran mensaje de Success
    else  {
      form.innerHTML = htmlSuccess;
    }
  }
});

form.reset();

form.inputNumber.addEventListener("keyup", (e) => {
  let inputN = e.target.value;
  // Eliminar letras y simbolos de la entrada de Numero de tarjeta
  form.inputNumber.value = inputN
    // Reemplazar espacios en blanco
    .replace(/\s/g, "")
    //Reemplazar todas la letras
    .replace(/\D/g, "")
    // Agrupar numeros en grupos de 4 y agregar un espaciado cada un grupo
    .replace(/([0-9]{4})/g, "$1 ")
    //eliminar espacio en blanco al final del campo
    .trim();

  //Reemplazar datos de la tarjeta de por los datos de la entrada del formulario
  cardNumber.innerText = "";
  cardNumber.innerText = inputN;
  //Si el input esta vacio Reemplazar por el valor Default
  if (cardNumber.innerText == "") {
    cardNumber.innerText = "000 000 000 0000";
  }
});

form.inputName.addEventListener("keyup", (e) => {
  let inputN = e.target.value;

  form.inputName.value = inputN.replace(/[0-9]/g, "");

  cardName.innerText = "";
  cardName.innerText = inputN;
  if (cardName.innerText == "") {
    cardName.innerText = form.inputName.placeholder;
  }
});

inputCvc.addEventListener("keyup", (e) => {
  replace(e, "000", cardCvc);
});

inputMm.addEventListener("keyup", (e) => {
  replace(e, "00", cardMm);
});

inputYy.addEventListener("keyup", (e) => {
  replace(e, "00", cardYy);
});

/**
 *
 * @param {string} elementValue valor de un input
 * @param {string} textNone Texto de remplazo si el input esta vacio
 * @param {htmlElement} card elmento HTML
 */
// Reemplazar letras y simbolos de las entradas EXP MM YY
const replace = (elementValue, textNone, card) => {
  let inputValue = elementValue.target.value;
  elementValue.target.value = inputValue.replace(/\D/g, "").replace(/\W/g);

  card.innerHTML = inputValue;

  if (card.innerHTML === "") {
    card.innerHTML = textNone;
  }
};
