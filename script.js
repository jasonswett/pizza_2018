var toppings = [
  'Pepperoni',
  'Ham',
  'Sausage',
  'Onion',
  'Green Pepper'
];

content = document.getElementById('content');

toppings.forEach(function(row) {
  let li = document.createElement('li');
  li.innerHTML = row;
  content.appendChild(li);
});
