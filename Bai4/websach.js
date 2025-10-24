document.addEventListener('DOMContentLoaded', function() {
    // =======================================================
    // 1. Khai báo các phần tử DOM cần thiết 
    // =======================================================
    
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-bar button');
    let productCards = document.querySelectorAll('.product-card'); 
    const productGrid = document.querySelector('.product-grid'); 
    const addProductFormSection = document.getElementById('add-product');
    const addProductForm = document.getElementById('add-product-form');
    const addProductBtn = document.querySelector('.add-product-btn');
    const formSubmitBtn = document.querySelector('.contact-form .form-submit-btn');
    const cancelButton = document.getElementById('cancel-add-product');
    const errorMessageDiv = document.getElementById('error-message');

    
    // =======================================================
    // 2. Chức năng Tìm kiếm/Lọc sản phẩm (Cập nhật để hoạt động với sản phẩm mới)
    // =======================================================

    function filterProducts() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        productCards.forEach(card => {
            const titleElement = card.querySelector('.product-title');
            if (!titleElement) return; 
            
            const productTitle = titleElement.textContent.toLowerCase();
            const isMatch = productTitle.includes(searchTerm);
            
            card.style.display = isMatch ? 'block' : 'none';
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', filterProducts);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', filterProducts);
    }

    // =======================================================
    // 3. Chức năng Ẩn/Hiện Form Thêm Sản Phẩm & Nút Hủy
    // =======================================================

    function toggleAddProductForm() {
        addProductFormSection.classList.toggle('hidden');
        errorMessageDiv.classList.add('hidden'); 
        if (!addProductFormSection.classList.contains('hidden')) {
            addProductFormSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'      
            });
            addProductBtn.textContent = 'Ẩn Form Thêm Sản Phẩm';
        } else {
             addProductBtn.textContent = '+ Thêm Sản Phẩm Mới';
        }
    }

    if (addProductBtn) {
        addProductBtn.addEventListener('click', function(event) {
            event.preventDefault(); 
            toggleAddProductForm();
        });
    }
    
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            addProductForm.reset();
            toggleAddProductForm();
        });
    }

    // =======================================================
    // 4. Xử lý SUBMIT, VALIDATION và TẠO SẢN PHẨM MỚI
    // =======================================================

    function createProductCard(data) {
        const priceFormatted = new Intl.NumberFormat('vi-VN').format(data.price);
        const newCardHTML = `
            <article class="product-card">
                <img src="${data.imageUrl || 'https://placehold.co/400x250/ccc/fff?text=No+Image'}" 
                    alt="Bìa sách ${data.title}" 
                    class="product-image"
                >
                <h3 class="product-title">${data.title}</h3>
                <p class="product-description">${data.description}</p>
                <p class="product-price">${priceFormatted} <span class="price-unit">VNĐ</span></p>
                <p style="font-size:0.8em; color:#777;">Tác giả: ${data.author}</p>
            </article>
        `;
        return newCardHTML;
    }

    if (addProductForm) {
        addProductForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const title = document.getElementById('book-title').value.trim();
            const author = document.getElementById('author').value.trim();
            const price = parseFloat(document.getElementById('price').value.trim());
            const imageUrl = document.getElementById('image-url').value.trim();
            const description = document.getElementById('book-description').value.trim();

            // --- VALIDATION ---
            let errorMessage = '';
            if (title === '' || author === '' || description === '') {
                errorMessage = 'Vui lòng điền đầy đủ Tên Sách, Tác Giả và Mô tả.';
            } else if (isNaN(price) || price <= 0) {
                errorMessage = 'Giá bán phải là một số dương hợp lệ.';
            }

            if (errorMessage) {
                errorMessageDiv.textContent = errorMessage;
                errorMessageDiv.classList.remove('hidden');
                return; 
            }
            
            errorMessageDiv.classList.add('hidden');

            const newProductData = {
                title: title,
                author: author,
                price: price,
                imageUrl: imageUrl,
                description: description
            };

            const newCardHTML = createProductCard(newProductData);
            productGrid.insertAdjacentHTML('afterbegin', newCardHTML); 
            productCards = document.querySelectorAll('.product-card'); 
            alert(`Đã thêm thành công sản phẩm: "${title}"!`);
            addProductForm.reset();
            toggleAddProductForm(); 
        });
    }
});