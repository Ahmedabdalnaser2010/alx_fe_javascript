// المهمة 0: بناء مولد محتوى ديناميكي
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "Stay hungry, stay foolish.", category: "Inspiration" }
];

// عرض اقتباس عشوائي
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `
        <p>"${quote.text}"</p>
        <small>— ${quote.category}</small>
    `;
}

// إنشاء نموذج إضافة اقتباس
function createAddQuoteForm() {
    document.getElementById('addQuoteBtn').addEventListener('click', function () {
        const textInput = document.getElementById('newQuoteText');
        const categoryInput = document.getElementById('newQuoteCategory');

        if (textInput.value.trim() && categoryInput.value.trim()) {
            const newQuote = {
                text: textInput.value.trim(),
                category: categoryInput.value.trim()
            };

            quotes.push(newQuote);
            textInput.value = '';
            categoryInput.value = '';
            showRandomQuote();
        } else {
            alert('Please enter both quote text and category');
        }
    });
}

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    createAddQuoteForm();
    showRandomQuote(); // عرض اقتباس عند التحميل
});