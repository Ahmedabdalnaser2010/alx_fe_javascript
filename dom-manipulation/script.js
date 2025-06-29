// Server synchronization functionality
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API endpoint
const SYNC_INTERVAL = 30000; // Sync every 30 seconds
let syncInterval;

// Function to fetch quotes from server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const serverData = await response.json();
        return serverData.slice(0, 5).map(post => ({
            text: post.body,
            category: `Server-${post.id}`
        }));
    } catch (error) {
        console.error('Failed to fetch quotes:', error);
        showNotification('Failed to fetch quotes from server', true);
        return [];
    }
}

// Function to post quotes to server
async function postQuotesToServer(quotesToPost) {
    try {
        const promises = quotesToPost.map(quote =>
            fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    title: `Quote: ${quote.category}`,
                    body: quote.text,
                    userId: 1
                }),
                headers: {
                    'Content-Type': 'application/json', // Fixed header name
                },
            })
        );
        await Promise.all(promises);
        return true;
    } catch (error) {
        console.error('Failed to post quotes:', error);
        showNotification('Failed to post quotes to server', true);
        return false;
    }
}

// Main sync function
async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

    // Conflict resolution - server data takes precedence
    const mergedQuotes = [...serverQuotes];

    // Add local quotes that don't exist in server data
    localQuotes.forEach(localQuote => {
        if (!mergedQuotes.some(serverQuote =>
            serverQuote.text === localQuote.text &&
            serverQuote.category === localQuote.category
        )) {
            mergedQuotes.push(localQuote);
        }
    });

    // Update local storage if changed
    if (JSON.stringify(mergedQuotes) !== JSON.stringify(localQuotes)) {
        localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
        quotes = mergedQuotes;
        populateCategories();
        filterQuotes();
        showNotification('Quotes synced with server');
    }

    // Post local quotes to server
    await postQuotesToServer(localQuotes.filter(localQuote =>
        !serverQuotes.some(serverQuote =>
            serverQuote.text === localQuote.text &&
            serverQuote.category === localQuote.category
        )
    ));
}

// Initialize periodic syncing
function startSync() {
    syncInterval = setInterval(syncQuotes, SYNC_INTERVAL);
    syncQuotes(); // Initial sync
}

// Notification function
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = `notification ${isError ? 'error' : 'success'}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add sync controls to HTML
function addSyncControls() {
    const syncContainer = document.createElement('div');
    syncContainer.className = 'sync-section';

    syncContainer.innerHTML = `
        <h3>Data Sync</h3>
        <button id="manualSync">Sync Now</button>
        <div id="syncStatus">Last sync: ${new Date().toLocaleTimeString()}</div>
        <div id="conflictNotification" style="display:none;color:red;">
            Conflicts detected and resolved (server data preserved)
        </div>
    `;

    document.body.appendChild(syncContainer);

    document.getElementById('manualSync').addEventListener('click', async () => {
        await syncQuotes();
        document.getElementById('syncStatus').textContent = `Last sync: ${new Date().toLocaleTimeString()}`;

        // Show conflict notification if any conflicts were resolved
        if (localStorage.getItem('conflictResolved')) {
            const conflictNote = document.getElementById('conflictNotification');
            conflictNote.style.display = 'block';
            setTimeout(() => {
                conflictNote.style.display = 'none';
            }, 5000);
            localStorage.removeItem('conflictResolved');
        }
    });
}

// Initialize when page loads
addSyncControls();
startSync();