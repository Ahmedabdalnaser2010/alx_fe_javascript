// Initial quotes array - now loaded from localStorage if available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" },
    { text: "Stay hungry, stay foolish.", category: "Motivation" },
    { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" }
];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

// Save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes available. Please add some quotes first.</p>';
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Store last shown quote in sessionStorage
    sessionStorage.setItem('lastShownQuote', JSON.stringify(quote));

    quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>- ${quote.category}</em></p>
  `;
}

// Function to create the add quote form
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.className = 'quote-form';

    formContainer.innerHTML = `
    <h3>Add a New Quote</h3>
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteBtn">Add Quote</button>
  `;

    document.body.appendChild(formContainer);

    // Add event listener to the new button
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}

// Function to add a new quote
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
        quotes.push({ text, category });
        saveQuotes(); // Save to localStorage
        textInput.value = '';
        categoryInput.value = '';
        showRandomQuote();
        if (typeof populateCategories === 'function') populateCategories();
        alert('Quote added successfully!');
    } else {
        alert('Please enter both quote text and category.');
    }
}

// Function to export quotes to JSON file (renamed to exportToJsonFile)
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'quotes.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Function to import quotes from JSON file (renamed to importFromJsonFile)
function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes = importedQuotes;
                saveQuotes();
                showRandomQuote();
                if (typeof populateCategories === 'function') populateCategories();
                alert('Quotes imported successfully!');
            } else {
                alert('Invalid format: Expected an array of quotes.');
            }
        } catch (error) {
            alert('Error parsing JSON file: ' + error.message);
        }
    };
    fileReader.readAsText(file);
}

// Create data management UI with required elements
function createDataManagementUI() {
    const dataContainer = document.createElement('div');
    dataContainer.className = 'data-management';

    dataContainer.innerHTML = `
    <h3>Data Management</h3>
    <button id="exportBtn">Export Quotes</button>
    <br><br>
    <input type="file" id="importFile" accept=".json" style="display: none;" />
    <button id="importBtn">Import Quotes</button>
  `;

    document.body.appendChild(dataContainer);

    // Add event listeners
    document.getElementById('exportBtn').addEventListener('click', exportToJsonFile);
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);
}

// Event listener for "Show New Quote" button
newQuoteBtn.addEventListener('click', showRandomQuote);

// Initialize
createAddQuoteForm();
createDataManagementUI();
showRandomQuote();

// Show last quote from sessionStorage if available
const lastQuote = sessionStorage.getItem('lastShownQuote');
if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>- ${quote.category}</em></p>
  `;
}