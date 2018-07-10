class Topping {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  toString() {
    return `${this.name} (${formattedPrice(this.price)})`;
  }
}

var toppings = [
  new Topping(
    'Pepperoni',
    100,
  ),
  new Topping(
    'Ham',
    100,
  ),
  new Topping(
    'Sausage',
    100,
  ),
  new Topping(
    'Onion',
    50,
  ),
  new Topping(
    'Green Pepper',
    50,
  )
];

var $ = (id) => document.getElementById(id);

var pizza = {
  toppings: []
};

var pizzas = [];

function formattedPrice(price) {
  return `$${(price / 100).toFixed(2)}`;
}

function addToppingRow($toppingList, topping) {
  let $li = document.createElement('li');
  $li.innerHTML = topping;
  $toppingList.appendChild($li);
}

function pizzaCost(toppings) {
  let total = 1500;

  toppings.forEach(function(topping) {
    total += topping.price;
  });

  return total;
}

function inlineToppingList(toppings) {
  return toppings.map(topping => topping.name).join(', ');
}

function refreshPizzaSummary(toppings) {
  $('pizza-summary').innerHTML = '';

  let $div = document.createElement('div');
  $div.innerHTML = inlineToppingList(toppings);
  $('pizza-summary').appendChild($div);

  let $totalDiv = document.createElement('div');
  $totalDiv.innerHTML = `Total: ${formattedPrice(pizzaCost(toppings))}`;
  $('pizza-summary').appendChild($totalDiv);
}

function addToppingToPizza(topping) {
  pizza.toppings.push(topping);
  refreshPizzaSummary(pizza.toppings)
}

function refreshPizzaList() {
  $('pizza-list').innerHTML = '';

  pizzas.forEach(function(pizza) {
    let $div = document.createElement('div');
    $div.innerHTML = `${inlineToppingList(pizza.toppings)} (${formattedPrice(pizzaCost(pizza.toppings))})`;
    $('pizza-list').appendChild($div);
  });
}

function savePizza() {
  pizzas.push(pizza);
  pizza = { toppings: [] };
  $('pizza-summary').innerHTML = '';
  refreshPizzaList();
}

function addPizzaToppingOptionRow($pizzaToppingOptions, topping) {
  let $li = document.createElement('li');

  let $button = document.createElement('button');
  $button.innerHTML = topping.name;

  $button.onclick = function() {
    addToppingToPizza(topping);
  }

  $li.appendChild($button);
  $pizzaToppingOptions.appendChild($li);
}

function refreshToppingList() {
  let $toppingList = $('topping-list');
  let $pizzaToppingOptions = $('pizza-topping-options');
  $toppingList.innerHTML = '';
  $pizzaToppingOptions.innerHTML = '';

  toppings.forEach(function(topping) {
    addToppingRow($toppingList, topping)
    addPizzaToppingOptionRow($pizzaToppingOptions, topping)
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

function getToppingErrorMessages(name, price) {
  let validators = [
    {
      passes: (name, price) => name !== '',
      errorMessage: "Topping name can't be blank"
    },
    {
      passes: (name, price) => price !== '',
      errorMessage: "Topping price can't be blank"
    },
    {
      passes: (name, price) => !toppingNameIsDuplicate(name),
      errorMessage: 'Topping already exists'
    },
    {
      passes: (name, price) => Number.isInteger(price * 100),
      errorMessage: 'Topping price must be a valid dollar amount'
    },
  ];

  let errorMessages = [];

  validators.forEach(function(validator) {
    if (!validator.passes(name, price)) {
      errorMessages.push(validator.errorMessage);
    }
  });

  return errorMessages;
}

function addTopping(name, price) {
  name = name.trim();

  let errorMessages = getToppingErrorMessages(name, price);
  if (errorMessages.length > 0) {
    setErrorMessage(errorMessages.join(', '));
    return;
  }

  toppings.push(new Topping(name, price * 100));
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

$('save-pizza').onclick = function() {
  savePizza();
}

refreshToppingList();
