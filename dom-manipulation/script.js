// Initial quotes array
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" },
    { text: "Stay hungry, stay foolish.", category: "Motivation" },
    { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" }
];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

// Display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes available. Please add some quotes first.</p>';
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>- ${quote.category}</em></p>
  `;
}

// Add a new quote
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
        quotes.push({ text, category });
        textInput.value = '';
        categoryInput.value = '';
        showRandomQuote();
        alert('Quote added successfully!');
    } else {
        alert('Please enter both quote text and category.');
    }
}

// Event listeners
newQuoteBtn.addEventListener('click', showRandomQuote);

// Initialize with a random quote
showRandomQuote();