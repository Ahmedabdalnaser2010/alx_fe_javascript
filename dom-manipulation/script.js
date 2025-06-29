// Initialize quotes array with objects containing text and category properties
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "Stay hungry, stay foolish.", category: "Inspiration" }
];

// Function to display a random quote (renamed to match requirement)
function displayRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Clear previous content
    while (quoteDisplay.firstChild) {
        quoteDisplay.removeChild(quoteDisplay.firstChild);
    }

    // Create new elements without using innerHTML
    const quoteText = document.createElement('p');
    quoteText.textContent = `"${quote.text}"`;

    const quoteCategory = document.createElement('small');
    quoteCategory.textContent = `— ${quote.category}`;

    // Append elements to DOM
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Function to add a new quote
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');

    if (textInput.value.trim() && categoryInput.value.trim()) {
        const newQuote = {
            text: textInput.value.trim(),
            category: categoryInput.value.trim()
        };

        // Add new quote to array
        quotes.push(newQuote);

        // Clear input fields
        textInput.value = '';
        categoryInput.value = '';

        // Update display
        displayRandomQuote();
    } else {
        alert('Please enter both quote text and category');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    // Add event listener for "Show New Quote" button
    document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

    // Add event listener for "Add Quote" button
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);

    // Display initial random quote
    displayRandomQuote();
});