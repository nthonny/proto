// Products array with prices converted to Philippine Peso (PHP ₱)
// Converted at ~59.50 PHP per USD rate
const products = [
    { id: 1, name: "Elite Alpha 7mm Performance", category: "Running", price: "₱5,650.00" },
    { id: 2, name: "TrailStar Ultra 12mm All-Terrain", category: "Trail", price: "₱6,250.00" },
    { id: 3, name: "Warrior Daily Cruiser", category: "Daily", price: "₱4,760.00" },
    { id: 4, name: "Mountain Mud Master", category: "Trail", price: "₱6,840.00" },
    { id: 5, name: "Ibex River Grip Sandal", category: "Water", price: "₱5,355.00" },
    { id: 6, name: "Lizard Urban Minimalist", category: "Daily", price: "₱5,050.00" }
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
                recommendation = 'Recommended for you: Warrior Daily Cruiser or Lizard Urban Minimalist.';
                break;
            case 'Trail':
                recommendation = 'Recommended for you: TrailStar Ultra 12mm or Mountain Mud Master.';
                break;
            case 'Running':
                recommendation = 'Recommended for you: Elite Alpha 7mm Performance.';
                break;
            case 'Water':
                recommendation = 'Recommended for you: Ibex River Grip Sandal.';
                break;
            default:
                recommendation = 'Recommended for you: TrailStar Ultra 12mm All-Terrain.';
        }

        quizResult.style.color = '#8c3b1e';
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
            alert(message);
        } else {
            formFeedback.style.color = '#27ae60';
            alert(message);
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