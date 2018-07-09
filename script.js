var toppings = [
  'Pepperoni',
  'Ham',
  'Sausage',
  'Onion',
  'Green Pepper'
];

var $submitButton = document.getElementById('submit');
var $toppingName = document.getElementById('topping-name');

function addToppingRow($content, toppingName) {
  let $li = document.createElement('li');
  $li.innerHTML = toppingName;
  $content.appendChild($li);
}

function refreshToppingList() {
  let $content = document.getElementById('content');
  $content.innerHTML = '';

  toppings.forEach(function(toppingName) {
    addToppingRow($content, toppingName)
  });
}

function toppingNameIsDuplicate(newToppingName) {
  let result = false;

  toppings.forEach(function(toppingName) {
    if (toppingName === newToppingName) {
      result = true;
    }
  });

  return result;
}

function addTopping(toppingName) {
  if (toppingName === '') {
    setErrorMessage("Topping name can't be blank");
    return;
  }

  if (toppingNameIsDuplicate(toppingName)) {
    setErrorMessage('Topping already exists');
    return;
  }

  toppings.push(toppingName);
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
