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

var pizzaForm = {
  toppings: []
};

function formattedPrice(price) {
  return `$${(price / 100).toFixed(2)}`;
}

function addToppingRow($content, topping) {
  let $li = document.createElement('li');
  $li.innerHTML = `${topping.name} (${formattedPrice(topping.price)})`;
  $content.appendChild($li);
}

function addPizzaToppingOptionRow($content, topping) {
  let $li = document.createElement('li');

  $li.innerHTML = `
    <button class="add-topping-button" data-name="${topping.name}" data-price="${topping.price}">
      ${topping.name} (${formattedPrice(topping.price)})
    </button>
  `;

  $content.appendChild($li);
}

function refreshToppingList() {
  let $content = $('content');
  let $pizzaToppingOptions = $('pizza-topping-options');
  $content.innerHTML = '';
  $pizzaToppingOptions.innerHTML = '';

  toppings.forEach(function(topping) {
    addToppingRow($content, topping)
    addPizzaToppingOptionRow($pizzaToppingOptions, topping)
  });

  let buttons = document.getElementsByClassName('add-topping-button');
  Array.prototype.forEach.call(buttons, function($button) {
    $button.onclick = function() {
      pizzaForm.toppings.push({
        name: $button.dataset.name,
        price: $button.dataset.price
      });
    };
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

  toppings.push({ name: name, price: price * 100 });
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
