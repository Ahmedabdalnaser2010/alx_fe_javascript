// Add this near the top with other DOM elements
const categoryFilter = document.getElementById('categoryFilter');

// Function to populate categories dropdown
function populateCategories() {
    // Clear existing options except "All Categories"
    while (categoryFilter.options.length > 1) {
        categoryFilter.remove(1);
    }

    // Get unique categories
    const categories = [...new Set(quotes.map(quote => quote.category))];

    // Add categories to dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected filter if available
    const lastFilter = localStorage.getItem('lastCategoryFilter');
    if (lastFilter) {
        categoryFilter.value = lastFilter;
    }
}

// Function to filter quotes by category
function filterQuotes() {
    const selectedCategory = categoryFilter.value;

    // Save selected filter to localStorage
    localStorage.setItem('lastCategoryFilter', selectedCategory);

    if (selectedCategory === 'all') {
        showRandomQuote();
    } else {
        const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
        if (filteredQuotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
            const quote = filteredQuotes[randomIndex];

            quoteDisplay.innerHTML = `
                <blockquote>"${quote.text}"</blockquote>
                <p><em>- ${quote.category}</em></p>
            `;
        } else {
            quoteDisplay.innerHTML = `<p>No quotes found in category: ${selectedCategory}</p>`;
        }
    }
}

// Update addQuote function to handle new categories
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
        quotes.push({ text, category });
        saveQuotes();
        textInput.value = '';
        categoryInput.value = '';

        // Update categories dropdown
        populateCategories();

        // Show the newly added quote
        categoryFilter.value = category;
        filterQuotes();

        alert('Quote added successfully!');
    } else {
        alert('Please enter both quote text and category.');
    }
}

// Add event listener for category filter
categoryFilter.addEventListener('change', filterQuotes);

// Initialize categories dropdown when page loads
populateCategories();