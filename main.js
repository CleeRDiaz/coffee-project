"use strict"

function renderCoffee(coffee) {
    let html = '<tr class="coffee">';
    html += `<td>${coffee.id}</td>`;
    html += `<td>${coffee.name}</td>`;
    html += `<td>${coffee.roast}</td>`;
    html += '</tr>';

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    const selectedRoast = roastSelection.value;
    const filteredCoffees = [];
    coffees.forEach( coffee => {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
const coffees = [
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
// Select the relevant elements
const addCoffeeButton = document.querySelector("#button-addon2");
const roastSelectionNew = document.querySelector("#roast-selection-new");
const addCoffeeInput = document.querySelector("#addCoffee");

// Event listener for the "ADD!" button
addCoffeeButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default submission

    // Get the selected roast and coffee name from the form
    const selectedRoast = roastSelectionNew.value;
    const coffeeName = addCoffeeInput.value;

    // Validate the input
    if (!selectedRoast || selectedRoast === "all") {
        alert("Please select a valid roast.");
        return;
    }

    if (!coffeeName.trim()) {
        alert("Please enter a non-empty coffee name.");
        return;
    }

    // If the coffee name already exists
    if (coffees.some(coffee => coffee.name.trim().toLowerCase() === coffeeName.trim().toLowerCase())) {
        alert("This coffee already exists. Please enter a unique name.");
        return;
    }

    // Create a new coffee
    const newCoffee = {
        id: coffees.length + 1,
        name: coffeeName,
        roast: selectedRoast,
    };

    // Add the new coffee to the array
    coffees.push(newCoffee);

    // Update the displayed coffees
    tbody.innerHTML = renderCoffees(coffees);

    // Clear the form inputs
    addCoffeeInput.value = "";

    //test success message
    alert("Coffee added successfully!");
});

const tbody = document.querySelector('#coffees');
const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);

