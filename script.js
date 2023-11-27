document.addEventListener("DOMContentLoaded", function() {
    console.log('DOMContentLoaded event fired');

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

const selectBox = document.querySelector('.select-box');
const selectOption = document.querySelector('.select-option');
const soValue = document.querySelector('#soValue');
const optionsList = document.querySelectorAll('.options li');
const coffeeDisplay = document.querySelector('#coffeeNames');



selectOption.addEventListener('click', function () {
    selectBox.classList.toggle('active');
});

    optionsList.forEach(function (optionsListSingle) {
        optionsListSingle.addEventListener('click', function () {
            let text = this.textContent;
            soValue.value = text; // Set the value of the input field
            selectBox.classList.remove('active');
            displayCoffees(soValue.value.toLowerCase()); // Use the value from the input field
        });
    });

    function displayCoffees(roastType) {
        console.log('Roast Type (input):', roastType); // Debugging line
        coffeeDisplay.innerHTML = '';

        // Convert all coffee roast types to lowercase for consistent comparison
        let coffeeNames = coffees.filter(coffee => coffee.roast.toLowerCase() === roastType.toLowerCase().split(' ')[0]);
        console.log('Filtered Coffee Names:', coffeeNames); // Debugging line

        if (coffeeNames.length > 0) {
            coffeeNames.forEach(function (coffee) {
                let button = document.createElement("button");
                button.textContent = coffee.name;
                coffeeDisplay.appendChild(button);

                // Handle button click
                button.addEventListener("click", function () {
                    document.getElementById("orderedCoffee").textContent =
                        "You ordered " + coffee.name + " coffee.";
                    document.getElementById("coffeeOrder").style.display = "block";
                });
            });
        } else {
            coffeeDisplay.textContent = "No coffees found for this roast type.";
        }
    }

    function processOrder() {
        var selectedCoffee = document.getElementById("soValue").value;
        var customerName = document.getElementById("customerName").value;

        if (selectedCoffee && customerName) {
            // Display coffee order details
            document.getElementById("orderedCoffee").textContent =
                "You ordered " + selectedCoffee + " coffee.";
            document.getElementById("coffeeOrder").style.display = "block";

            // Handle the submitOrder button click
            document.getElementById("submitOrder").addEventListener("click", function () {
                // Display final confirmation
                document.getElementById("coffeeOrder").style.display = "none";
                document.getElementById("finalConfirmation").style.display = "block";
            });

            // Handle the yesButton click
            document.getElementById("yesButton").addEventListener("click", function () {
                // Reset and go back to select roast type
                document.getElementById("finalConfirmation").style.display = "none";
                selectBox.classList.remove("active");
                soValue.value = "";
            });

            // Handle the noButton click
            document.getElementById("noButton").addEventListener("click", function () {
                // Display enjoy message
                document.getElementById("finalConfirmation").style.display = "none";
                document.getElementById("enjoyMessage").style.display = "block";
            });
        }
    }

    // Add an event listener for the submit button
    var submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', processOrder);
});

const submitButton = document.getElementById('submitOrder');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

submitButton.addEventListener('click', function () {
    // Display final confirmation
    document.getElementById('coffeeOrder').style.display = 'none';
    document.getElementById('finalConfirmation').style.display = 'block';
});

yesButton.addEventListener('click', function () {
    // Reset and go back to select roast type
    document.getElementById('finalConfirmation').style.display = 'none';
    selectBox.classList.remove('active');
    soValue.value = '';
});

noButton.addEventListener('click', function () {
    // Display enjoy message
    document.getElementById('finalConfirmation').style.display = 'none';
    document.getElementById('enjoyMessage').style.display = 'block';
});
