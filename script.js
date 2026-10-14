// Products array: 6 products minimum with id, name, category, price
const products = [
    { id: 1, name: "Perception 7mm Performance", category: "Running", price: "$95.00" },
    { id: 2, name: "Pursuit 9mm All-Terrain", category: "Trail", price: "$105.00" },
    { id: 3, name: "Alpha Daily Cruiser", category: "Daily", price: "$80.00" },
    { id: 4, name: "Enigma Rugged Mountain", category: "Trail", price: "$115.00" },
    { id: 5, name: "Intuition River Sandal", category: "Water", price: "$90.00" },
    { id: 6, name: "Alchemy Urban Minimalist", category: "Daily", price: "$85.00" }
];

// Display function: Renders products to #productGrid
function displayProducts(productsToRender) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No products found in this category.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div>
                <span class="category">${product.category}</span>
                <h3>${product.name}</h3>
            </div>
            <div class="price">${product.price}</div>
        `;
        productGrid.appendChild(card);
    });
}

// Filter function: Filters by category when buttons clicked
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Update active states
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');

            if (filterValue === 'all') {
                displayProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filterValue);
                displayProducts(filtered);
            }
        });
    });
}

// "Which Sandal Is Right For Me?" Interactive Finder Logic
function setupQuiz() {
    const quizBtn = document.getElementById('quizSubmitBtn');
    const activitySelect = document.getElementById('activitySelect');
    const quizResult = document.getElementById('quizResult');

    quizBtn.addEventListener('click', () => {
        const selectedActivity = activitySelect.value;

        if (selectedActivity === 'all') {
            quizResult.style.color = '#c0392b';
            quizResult.textContent = 'Please choose an activity to get a valid recommendation.';
            return;
        }

        let recommendation = '';
        switch(selectedActivity) {
            case 'Daily':
                recommendation = 'Recommended for you: Alpha Daily Cruiser or Alchemy Urban Minimalist.';
                break;
            case 'Trail':
                recommendation = 'Recommended for you: Pursuit 9mm All-Terrain or Enigma Rugged Mountain.';
                break;
            case 'Running':
                recommendation = 'Recommended for you: Perception 7mm Performance.';
                break;
            case 'Water':
                recommendation = 'Recommended for you: Intuition River Sandal.';
                break;
            default:
                recommendation = 'Recommended for you: Pursuit 9mm All-Terrain.';
        }

        quizResult.style.color = '#27ae60';
        quizResult.textContent = recommendation;
    });
}

// Form validation configuration
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name').value.trim();
        const emailInput = document.getElementById('email').value.trim();
        const messageInput = document.getElementById('message').value.trim();

        // Validation checks
        if (nameInput.length < 3) {
            showAlert('Error: Name must be at least 3 characters long.', 'error');
            return;
        }

        if (!emailInput.includes('@') || !emailInput.includes('.')) {
            showAlert('Error: Please enter a valid email containing "@" and ".".', 'error');
            return;
        }

        if (messageInput.length < 10) {
            showAlert('Error: Message must be at least 10 characters long.', 'error');
            return;
        }

        // Success state
        showAlert('Success! Your message has been sent successfully.', 'success');
        contactForm.reset();
    });

    function showAlert(message, type) {
        formFeedback.textContent = message;
        if (type === 'error') {
            formFeedback.style.color = '#e74c3c';
            alert(message); // Displays popup alert for error as required
        } else {
            formFeedback.style.color = '#27ae60';
            alert(message); // Displays popup alert for success as required
        }
    }
}

// Initializer execution on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupFilters();
    setupQuiz();
    setupContactForm();
});