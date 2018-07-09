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

function addTopping(toppingName) {
  if (toppingName === '') {
    setErrorMessage("Topping name can't be blank");
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

$toppingName.onkeypress = function(e) {
  setErrorMessage('');

  if (e.key === 'Enter') {
    addTopping($toppingName.value);
  }
};

refreshToppingList();
