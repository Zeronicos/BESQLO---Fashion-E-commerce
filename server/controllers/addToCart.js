document.addEventListener('DOMContentLoaded', function () {
    const addToCartBtn = document.getElementById('addToCartBtn');

    addToCartBtn.addEventListener('click', function () {
        const productImage = document.querySelector('.product-image').src;
        const productName = document.querySelector('.product-name').textContent;
        const selectedSize = document.querySelector('.custom-select').value;

        const productData = {
            image: productImage,
            name: productName,
            size: selectedSize
        };

        // Send product data to the server
        fetch('/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Product added to cart!');
                }
            })
            .catch(error => console.error('Error adding product to cart:', error));
    });
});