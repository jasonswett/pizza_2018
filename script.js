var toppings = [
  'Pepperoni',
  'Ham',
  'Sausage',
  'Onion',
  'Green Pepper'
];

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
  toppings.push(toppingName);
  refreshToppingList();
}

var $submitButton = document.getElementById('submit');
var $toppingName = document.getElementById('topping-name');

$submitButton.onclick = function() {
  addTopping($toppingName.value);
};

$toppingName.onkeypress = function(e) {
  if (e.key === 'Enter') {
    addTopping($toppingName.value);
  }
};

refreshToppingList();
