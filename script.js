var toppings = [
  { name: 'Pepperoni' },
  { name: 'Ham' },
  { name: 'Sausage' },
  { name: 'Onion' },
  { name: 'Green Pepper' }
];

var $submitButton = document.getElementById('submit');
var $toppingName = document.getElementById('topping-name');

function addToppingRow($content, topping) {
  let $li = document.createElement('li');
  $li.innerHTML = topping.name;
  $content.appendChild($li);
}

function refreshToppingList() {
  let $content = document.getElementById('content');
  $content.innerHTML = '';

  toppings.forEach(function(topping) {
    addToppingRow($content, topping)
  });
}

function toppingNameIsDuplicate(newToppingName) {
  let result = false;

  toppings.forEach(function(topping) {
    if (topping.name === newToppingName) {
      result = true;
    }
  });

  return result;
}

function addTopping(toppingName) {
  toppingName = toppingName.trim();

  if (toppingName === '') {
    setErrorMessage("Topping name can't be blank");
    return;
  }

  if (toppingNameIsDuplicate(toppingName)) {
    setErrorMessage('Topping already exists');
    return;
  }

  toppings.push({ name: toppingName });
  refreshToppingList();
  $toppingName.value = '';
}

function setErrorMessage(errorMessage) {
  document.getElementById('error').innerHTML = errorMessage;
}

$submitButton.onclick = function() {
  addTopping($toppingName.value);
};

$toppingName.onkeydown = function(e) {
  setErrorMessage('');

  if (e.key === 'Enter') {
    addTopping($toppingName.value);
  }
};

refreshToppingList();
