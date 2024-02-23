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
  <div class="result-content bg-secondary">
    <ul class="mx-auto p-2"  style="list-style:none;" >
      <li class="mb-2">
        Usuario <strong> ${name}</strong>
      </li>
      <li class="mb-2">
        con numero de documento <strong>${idNumber}</strong>
      </li>
      <li class="mb-2">
        con tipo de documento <strong>${idDocument}</strong>
      </li>
      <li class="mb-2">
        Su edad <strong>${age} años (${ageCategory})</strong>.
      </li>
      <li class="mb-2"> 
        Su metabolismo basal es de <strong>${tmb} calorías</strong>.
      </li>
      <li class="mb-2">
        Para mantener su peso usted necesita consumir esta cantidad de <strong>${maintenance} calorías</strong>.
      </li class="mb-2">
      <li class="mb-2">
        Para perder peso necesita consumir esta cantidad de  <strong>${loseWeight} calorías</strong>.
      </li>
      <liclass="mb-2">
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
  if(numberAge >= 5 && numberAge <=19){
    return "Paciente joven";
  } else if(numberAge >= 30 && numberAge <= 59){
    return "Paciente adulto";
  } else if(numberAge >= 60){
    return "Adulto mayor";
  }
}
