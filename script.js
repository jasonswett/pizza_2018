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

var $ = (id) => document.getElementById(id);

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

function addTopping(name, price) {
  name = name.trim();
  price = price * 100;

  if (name === '') {
    setErrorMessage("Topping name can't be blank");
    return;
  }

  if (price === '') {
    setErrorMessage("Topping price can't be blank");
    return;
  }

  if (toppingNameIsDuplicate(name)) {
    setErrorMessage('Topping already exists');
    return;
  }

  if (!Number.isInteger(price)) {
    setErrorMessage('Topping price must be a number');
    return;
  }

  toppings.push({ name: name, price: price });
  refreshToppingList();
  $('topping-name').value = '';
  $('topping-price').value = '';
}

function setErrorMessage(errorMessage) {
  document.getElementById('error').innerHTML = errorMessage;
}

$('submit').onclick = function() {
  addTopping($('topping-name').value, $('topping-price').value);
};

var submitOnKeydown = function(e) {
  setErrorMessage('');

  if (e.key === 'Enter') {
    addTopping($('topping-name').value, $('topping-price').value);
  }
};

$('topping-name').onkeydown = submitOnKeydown;
$('topping-price').onkeydown = submitOnKeydown;

refreshToppingList();
