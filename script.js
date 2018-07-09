var toppings = [
  {
    name: 'Pepperoni',
    price: 100,
  },
  {
    name: 'Ham',
    price: 100,
  },
  {
    name: 'Sausage',
    price: 100,
  },
  {
    name: 'Onion',
    price: 50,
  },
  {
    name: 'Green Pepper',
    price: 50,
  }
];

var $submitButton = document.getElementById('submit');
var $toppingName = document.getElementById('topping-name');
var $price = document.getElementById('price');

function formattedPrice(price) {
  return `$${(price / 100).toFixed(2)}`;
}

function addToppingRow($content, topping) {
  let $li = document.createElement('li');
  $li.innerHTML = `${topping.name} (${formattedPrice(topping.price)})`;
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

function addTopping(toppingName, price) {
  toppingName = toppingName.trim();

  if (toppingName === '') {
    setErrorMessage("Topping name can't be blank");
    return;
  }

  if (toppingNameIsDuplicate(toppingName)) {
    setErrorMessage('Topping already exists');
    return;
  }

  toppings.push({
    name: toppingName,
    price: price
  });

  refreshToppingList();
  $toppingName.value = '';
  $price.value = '';
}

function setErrorMessage(errorMessage) {
  document.getElementById('error').innerHTML = errorMessage;
}

$submitButton.onclick = function() {
  addTopping($toppingName.value, $price.value);
};

$toppingName.onkeydown = function(e) {
  setErrorMessage('');

  if (e.key === 'Enter') {
    addTopping($toppingName.value, $price.value);
  }
};

$price.onkeydown = $toppingName.onkeydown;

refreshToppingList();
