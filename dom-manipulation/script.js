// المهمة 0: بناء مولد محتوى ديناميكي مع استخدام DOM manipulation الصحيح
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "Stay hungry, stay foolish.", category: "Inspiration" }
];

// عرض اقتباس عشوائي باستخدام DOM manipulation
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // مسح المحتوى الحالي
    while (quoteDisplay.firstChild) {
        quoteDisplay.removeChild(quoteDisplay.firstChild);
    }

    // إنشاء العناصر الجديدة
    const quoteText = document.createElement('p');
    quoteText.textContent = `"${quote.text}"`;

    const quoteCategory = document.createElement('small');
    quoteCategory.textContent = `— ${quote.category}`;

    // إضافة العناصر إلى DOM
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// إنشاء نموذج إضافة اقتباس باستخدام DOM manipulation
function setupAddQuoteForm() {
    const addQuoteBtn = document.getElementById('addQuoteBtn');

    addQuoteBtn.addEventListener('click', function () {
        const textInput = document.getElementById('newQuoteText');
        const categoryInput = document.getElementById('newQuoteCategory');

        if (textInput.value.trim() && categoryInput.value.trim()) {
            const newQuote = {
                text: textInput.value.trim(),
                category: categoryInput.value.trim()
            };

            // إضافة الاقتباس الجديد إلى المصفوفة
            quotes.push(newQuote);

            // مسح حقول الإدخال
            textInput.value = '';
            categoryInput.value = '';

            // عرض اقتباس عشوائي جديد
            showRandomQuote();

            // في المهام اللاحقة سنضيف هنا حفظ البيانات وتحديث الفئات
        } else {
            alert('Please enter both quote text and category');
        }
    });
}

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function () {
    // إعداد زر عرض اقتباس جديد
    const newQuoteBtn = document.getElementById('newQuote');
    newQuoteBtn.addEventListener('click', showRandomQuote);

    // إعداد نموذج إضافة اقتباس
    setupAddQuoteForm();

    // عرض اقتباس عند التحميل
    showRandomQuote();
});