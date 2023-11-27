"use strict";
(function() {
function renderCoffee(coffee) {
    let coffeeDiv = document.createElement('div');
    coffeeDiv.classList.add('coffee');
    let nameDiv = document.createElement('div');
    nameDiv.textContent = coffee.name;
    nameDiv.classList.add('coffee-name'); // Add a class for the coffee name for styling purposes
    coffeeDiv.appendChild(nameDiv);
    let roastDiv = document.createElement('div');
    roastDiv.textContent = coffee.roast;
    roastDiv.classList.add('coffee-roast'); // Add a class for the coffee roast for styling purposes
    coffeeDiv.appendChild(roastDiv);
    return coffeeDiv;
}

function renderCoffees(coffees) {
    // Sort the coffees array by id in ascending order
    coffees.sort((a, b) => a.id - b.id);
    let coffeeContainer = document.getElementById('coffees');
    coffeeContainer.innerHTML = '';
    for (let i = 0; i < coffees.length; i++) {
        coffeeContainer.appendChild(renderCoffee(coffees[i]));
    }
    // Update the datalist with coffee names
    updateCoffeeList(coffees);
}

function updateCoffeeList(coffees) {
    let coffeeList = document.getElementById('coffee-list');
    coffeeList.innerHTML = '';
    coffees.forEach(coffee => {
        let option = document.createElement('option');
        option.value = coffee.name;
        coffeeList.appendChild(option);
    });
}

function updateAndRenderCoffees(selectedRoast, searchQuery) {
    let filteredCoffees = coffees.filter(coffee =>
        (selectedRoast === 'all' || coffee.roast === selectedRoast) &&
        (searchQuery === '' || coffee.name.toLowerCase().includes(searchQuery))
    );
    renderCoffees(filteredCoffees);
}

// Function to handle button clicks
function handleButtonClick(e) {
    // Check if the clicked element is a button or an image button
    if (e.target.tagName === 'BUTTON' || (e.target.tagName === 'IMG' && e.target.parentElement.tagName === 'BUTTON')) {
        e.preventDefault(); // Prevent the default form submission behavior
        // Get the selected roast from the clicked button's id or image button's parent button's id
        let selectedRoast = e.target.id || e.target.parentElement.id;
        let searchQuery = coffeeSearch.value.toLowerCase();

        updateAndRenderCoffees(selectedRoast, searchQuery);
    }
}

// Function to handle adding a new coffee
function addNewCoffee(e) {
    e.preventDefault();
    // Get values from the form
    const newCoffeeName = document.getElementById('newCoffeeName').value.trim();
    const newCoffeeRoast = document.getElementById('newCoffeeRoast').value;
    // Validate that the name is not empty
    if (!newCoffeeName) {
        alert('Please enter a valid coffee name.');
        return;
    }
    // Add the new coffee to the array
    const newCoffee = {id: coffees.length + 1, name: newCoffeeName, roast: newCoffeeRoast};
    coffees.push(newCoffee);
    // Render the updated list of coffees
    renderCoffees(coffees);
    // Clear the form
    document.getElementById('addCoffeeForm').reset();
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

// Your existing event listeners and initial rendering
const roastButtons = document.getElementById('roast-buttons');
const coffeeSearch = document.querySelector('#coffee-search');
const submitButton = document.getElementById('submit');
const addCoffeeForm = document.getElementById('addCoffeeForm');

addCoffeeForm.addEventListener('submit', addNewCoffee);
roastButtons.addEventListener('click', handleButtonClick);
submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    let searchQuery = coffeeSearch.value.toLowerCase();
    updateAndRenderCoffees('all', searchQuery);
    // Reset the coffee search input
    coffeeSearch.value = '';
});

// Initial rendering of coffees
renderCoffees(coffees);
})();