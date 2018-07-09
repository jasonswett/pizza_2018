var toppings = [
  'Pepperoni',
  'Ham',
  'Sausage',
  'Onion',
  'Green Pepper'
];

var $submitButton = document.getElementById('submit');
var $toppingName = document.getElementById('topping-name');

function refreshToppingList() {
  let $content = document.getElementById('content');
  $content.innerHTML = '';

  toppings.forEach(function(row) {
    let $li = document.createElement('li');
    $li.innerHTML = row;
    $content.appendChild($li);
  });
}

function addTopping(toppingName) {
  if (toppingName === '') {
    return;
  }

  toppings.push(toppingName);
  refreshToppingList();
  $toppingName.value = '';
}

$submitButton.onclick = function() {
  addTopping($toppingName.value);
};

$toppingName.onkeypress = function(e) {
  if (e.key === 'Enter') {
    addTopping($toppingName.value);
  }
};

refreshToppingList();
