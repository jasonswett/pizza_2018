var toppings = [
  'Pepperoni',
  'Ham',
  'Sausage',
  'Onion',
  'Green Pepper'
];

function refreshToppingList() {
  let content = document.getElementById('content');
  content.innerHTML = '';

  toppings.forEach(function(row) {
    let li = document.createElement('li');
    li.innerHTML = row;
    content.appendChild(li);
  });
}

var submitButton = document.getElementById('submit');

submitButton.onclick = function() {
  let toppingName = document.getElementById('topping-name');
  toppings.push(toppingName.value);
  refreshToppingList();
};

refreshToppingList();
