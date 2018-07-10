class Topping {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  toString() {
    return `${this.name} (${formattedPrice(this.price)})`;
  }
}

class Pizza {
  constructor() {
    this.toppings = [];
  }

  cost() {
    let total = 1500;
    this.toppings.forEach(function(topping) {
      total += topping.price;
    });
    return total;
  }

  addTopping(topping) {
    this.toppings.push(topping);
    refreshPizzaSummary(this);
  }

  toString() {
    return `${inlineToppingList(this.toppings)} (${formattedPrice(this.cost())})`;
  }
}

class RestaurantToppingsList {
  constructor() {
    this.toppings = [
      new Topping('Pepperoni', 100),
      new Topping('Sausage', 100),
      new Topping('Onion', 50),
      new Topping('Green Pepper', 50)
    ];
  }
}

var $ = (id) => document.getElementById(id);

var pizza = new Pizza();

var pizzas = [];

var restaurantToppingsList = new RestaurantToppingsList();

function formattedPrice(price) {
  return `$${(price / 100).toFixed(2)}`;
}

function addToppingRow($toppingList, topping) {
  let $li = document.createElement('li');
  $li.innerHTML = topping;
  $toppingList.appendChild($li);
}

function inlineToppingList(toppings) {
  return toppings.map(topping => topping.name).join(', ');
}

function refreshPizzaSummary(pizza) {
  $('pizza-summary').innerHTML = '';

  let $div = document.createElement('div');
  $div.innerHTML = inlineToppingList(pizza.toppings);
  $('pizza-summary').appendChild($div);

  let $totalDiv = document.createElement('div');
  $totalDiv.innerHTML = `Total: ${formattedPrice(pizza.cost())}`;
  $('pizza-summary').appendChild($totalDiv);
}

function refreshPizzaList() {
  $('pizza-list').innerHTML = '';

  pizzas.forEach(function(pizza) {
    let $div = document.createElement('div');
    $div.innerHTML = pizza;
    $('pizza-list').appendChild($div);
  });
}

function savePizza() {
  pizzas.push(pizza);
  pizza = new Pizza();
  $('pizza-summary').innerHTML = '';
  refreshPizzaList();
}

function addPizzaToppingOptionRow($pizzaToppingOptions, topping) {
  let $li = document.createElement('li');

  let $button = document.createElement('button');
  $button.innerHTML = topping.name;

  $button.onclick = function() {
    pizza.addTopping(topping);
  }

  $li.appendChild($button);
  $pizzaToppingOptions.appendChild($li);
}

function refreshToppingList() {
  let $toppingList = $('topping-list');
  let $pizzaToppingOptions = $('pizza-topping-options');
  $toppingList.innerHTML = '';
  $pizzaToppingOptions.innerHTML = '';

  restaurantToppingsList.toppings.forEach(function(topping) {
    addToppingRow($toppingList, topping)
    addPizzaToppingOptionRow($pizzaToppingOptions, topping)
  });
}

function toppingNameIsDuplicate(newToppingName) {
  let result = false;

  restaurantToppingsList.toppings.forEach(function(topping) {
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

  restaurantToppingsList.toppings.push(new Topping(name, price * 100));
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
