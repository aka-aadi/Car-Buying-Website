document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const carsPerPage = 6;
    const carsContainer = document.getElementById('cars');
    const carDetailsModal = document.getElementById('car-details-modal');
    const closeModalButton = document.querySelector('.close-modal');
    const cartContainer = document.getElementById('cart-container');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartNotification = document.getElementById('cart-notification');
    const paginationButtons = document.querySelectorAll('.pagination-button');
    const checkoutButton = document.getElementById('checkout-button');

    // Cart data
    let cart = [];
    let totalPrice = 0;

    function updateCartNotification() {
        cartNotification.textContent = cart.length;
        cartNotification.style.display = cart.length ? 'block' : 'none';
    }

    function updateCart() {
        cartItemsList.innerHTML = '';
        totalPrice = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} - $${item.price}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });
            cartItem.appendChild(removeButton);
            cartItemsList.appendChild(cartItem);
            totalPrice += item.price;
        });
        totalPriceElement.textContent = `Total: $${totalPrice}`;
        updateCartNotification();
    }

    function showCarDetails(car) {
        document.getElementById('car-details-image').src = car.dataset.image;
        document.getElementById('car-details-name').textContent = car.dataset.name;
        document.getElementById('car-details-price').textContent = `Price: $${car.dataset.price}`;
        document.getElementById('car-details-description').textContent = car.dataset.details;
        carDetailsModal.classList.remove('hidden');
    }

    function closeCarDetails() {
        carDetailsModal.classList.add('hidden');
    }

    function renderCars() {
        const carItems = Array.from(carsContainer.querySelectorAll('.car-item'));
        const start = (currentPage - 1) * carsPerPage;
        const end = start + carsPerPage;
        carItems.forEach((car, index) => {
            car.style.display = index >= start && index < end ? 'block' : 'none';
        });
    }

    function setupEventListeners() {
        carsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-details')) {
                showCarDetails(e.target.closest('.car-item'));
            } else if (e.target.classList.contains('add-to-cart')) {
                const car = e.target.closest('.car-item');
                cart.push({
                    name: car.dataset.name,
                    price: parseFloat(e.target.dataset.price)
                });
                updateCart();
            }
        });

        closeModalButton.addEventListener('click', closeCarDetails);

        document.getElementById('cart-icon').addEventListener('click', () => {
            cartContainer.classList.toggle('hidden');
        });

        checkoutButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Proceeding to checkout');
            // Implement checkout logic
        });

        document.getElementById('logout-button').addEventListener('click', () => {
            window.location.href = 'login.html';
        });

        document.getElementById('prev-page').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderCars();
            }
        });

        document.getElementById('next-page').addEventListener('click', () => {
            if (currentPage < Math.ceil(carsContainer.querySelectorAll('.car-item').length / carsPerPage)) {
                currentPage++;
                renderCars();
            }
        });
    }

    renderCars();
    setupEventListeners();
});
