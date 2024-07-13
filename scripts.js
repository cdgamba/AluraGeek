document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('add-product-form');
    const productsContainer = document.getElementById('products');

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/products');
            const products = await response.json();
            productsContainer.innerHTML = '';
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price}</p>
                    <img src="images/recicle.png" alt="Recicle" class="recycle-icon">
                `;
                productsContainer.appendChild(productElement);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const image = document.getElementById('product-image').value;

        const newProduct = { name, price, image };

        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            if (response.ok) {
                fetchProducts();
                productForm.reset();
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });

    fetchProducts();
});
