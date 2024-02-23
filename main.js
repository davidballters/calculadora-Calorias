const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event){
  event.preventDefault();

  const name = document.getElementById("name").value;
  const idNumber = document.getElementById("id-number").value;
  const idDocument = getSelectedValue('type-document');
  const gender = getSelectedValue("gender");
  const age = document.getElementById("age").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const activityLevel = getSelectedValue("activity_level");

  /*Cálculo de la tasa metabólica basal*/
  const tmb = Math.round (
    gender === "female" ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)): (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
  );

  const maintenance = Math.round(tmb * Number(activityLevel));
  const loseWeight = maintenance - 450;
  const gainWeight = maintenance + 450;

  const ageCategory = dateAge(age);

  const layout = `
  <h2>Aqui está su resultado:</h2>
  <div class="result-content">
    <ul style= "list-style:none;">
      <li>
        Usuario ${name}
      </li>
      <li>
        con numero de documento <strong>${idNumber}</strong>
      </li>
      <li>
        con tipo de documento <strong>${idDocument}</strong>
      </li>
      <li>
        Su edad <strong>${age} años ${ageCategory}</strong>.
      </li>
      <li>
        Su metabolismo basal es de <strong>${tmb} calorías</strong>.
      </li>
      <li>
        Para mantener su peso usted necesita consumir esta cantidad de <strong>${maintenance} calorías</strong>.
      </li>
      <li>
        Para perder peso necesita consumir esta cantidad de  <strong>${loseWeight} calorías</strong>.
      </li>
      <li>
        Para ganar peso necesita consumir esta cantidad de  <strong>${gainWeight} calorías</strong>.
      </li>
    </ul>
  </div>
  `;
  
  const result = document.getElementById("result");
  result.innerHTML = layout;
}

function getSelectedValue(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
}

function dateAge(numberAge){
  if(numberAge >= 15 && numberAge <=19){
    return "Paciente joven";
  } else if(numberAge >= 30 && numberAge <= 59){
    return "Paciente adulto";
  } else if(numberAge >= 60){
    return "Adulto mayor";
  }
}


/////

function mostrarMensajeDeError(msg) {
  const calculo = document.querySelector('#calculo');
  if (calculo) {
    calculo.remove();
  }

  const divError = document.createElement('div');
  divError.className = 'd-flex justify-content-center align-items-center h-100';
  divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

  resultado.appendChild(divError);

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 5000);
}


// Animaciones
function aparecerResultado() {
  resultado.style.top = '100vh';
  resultado.style.display = 'block';
  
  let distancia = 100;
  let resta = 0.3;
  let id = setInterval(() => {
    resta *= 1.1;
    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(id);
    }
  }, 10)
}

function desvanecerResultado() {
  let distancia = 1;

  let id = setInterval(() => {
    distancia *= 2;
    resultado.style.top = `${distancia}vh`;
    if (distancia > 100) {
      clearInterval(id);
      resultado.style.display = 'none';
      resultado.style.top = 0;
    }
  }, 10)
}