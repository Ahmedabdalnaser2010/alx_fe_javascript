// Add these constants at the top of the file
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // We'll use posts as our mock quotes
const SYNC_INTERVAL = 30000; // Sync every 30 seconds
let syncInterval;

// Function to convert our quotes to API format and vice versa
function quotesToApiFormat(quotes) {
    return quotes.map((quote, index) => ({
        id: index + 1,
        title: `Quote ${index + 1}`,
        body: `${quote.text} [Category: ${quote.category}]`,
        userId: 1
    }));
}

function apiFormatToQuotes(posts) {
    return posts.map(post => {
        const categoryMatch = post.body.match(/\[Category: (.*?)\]/);
        return {
            text: post.body.replace(/ \[Category: .*?\]$/, ''),
            category: categoryMatch ? categoryMatch[1] : 'Uncategorized'
        };
    });
}

// Function to sync with server
async function syncWithServer() {
    try {
        // Get current quotes
        const currentQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

        // Simulate fetching from server
        const response = await fetch(API_URL);
        const serverData = await response.json();
        const serverQuotes = apiFormatToQuotes(serverData.slice(0, 5)); // Take first 5 as our server quotes

        // Simple conflict resolution: server data takes precedence
        const mergedQuotes = [...serverQuotes, ...currentQuotes];

        // Remove duplicates (same text and category)
        const uniqueQuotes = mergedQuotes.filter((quote, index, self) =>
            index === self.findIndex(q =>
                q.text === quote.text && q.category === quote.category
            )
        );

        // Update local storage if there are changes
        if (JSON.stringify(uniqueQuotes) !== JSON.stringify(currentQuotes)) {
            localStorage.setItem('quotes', JSON.stringify(uniqueQuotes));
            quotes = uniqueQuotes;

            // Update UI
            populateCategories();
            filterQuotes();

            // Show notification
            showNotification('Quotes updated from server');
        }
    } catch (error) {
        console.error('Sync failed:', error);
        showNotification('Sync failed. Please check your connection.', true);
    }
}

// Function to show sync notifications
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = `notification ${isError ? 'error' : 'success'}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Start periodic syncing
function startSync() {
    syncInterval = setInterval(syncWithServer, SYNC_INTERVAL);
    syncWithServer(); // Initial sync
}

// Add sync controls to HTML (add this to your HTML)
function addSyncControls() {
    const syncContainer = document.createElement('div');
    syncContainer.className = 'sync-section';

    syncContainer.innerHTML = `
        <h3>Data Sync</h3>
        <button id="manualSync">Sync Now</button>
        <div id="syncStatus">Last sync: Never</div>
    `;

    document.body.appendChild(syncContainer);

    document.getElementById('manualSync').addEventListener('click', syncWithServer);
}

// Initialize sync functionality when page loads
addSyncControls();
startSync();