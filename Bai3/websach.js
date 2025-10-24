document.addEventListener('DOMContentLoaded', function() {
    // =======================================================
    // 1. Khai báo các phần tử DOM cần thiết
    // =======================================================
    
    // Tìm kiếm
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-bar button');
    const productCards = document.querySelectorAll('.product-card');

    // Thêm sản phẩm (Form Quản lý)
    const addProductFormSection = document.getElementById('add-product');
    const addProductBtn = document.querySelector('.add-product-btn');
    const formSubmitBtn = document.querySelector('.contact-form .form-submit-btn');


    // =======================================================
    // 2. Chức năng Tìm kiếm/Lọc sản phẩm
    // =======================================================

    /**
     * Hàm thực hiện lọc sản phẩm dựa trên từ khóa tìm kiếm
     */
    function filterProducts() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        productCards.forEach(card => {
            const titleElement = card.querySelector('.product-title');
            if (!titleElement) return; 
            const productTitle = titleElement.textContent.toLowerCase();
            const isMatch = productTitle.includes(searchTerm);
            if (isMatch) {
                card.style.display = 'article'; 
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', filterProducts);
    }

    
    // =======================================================
    // 3. Chức năng Ẩn/Hiện Form Thêm Sản Phẩm
    // =======================================================

    if (addProductBtn && addProductFormSection) {
    addProductBtn.addEventListener('click', function(event) {
        event.preventDefault(); 
        addProductFormSection.classList.toggle('hidden');
        addProductFormSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'      
        });

        if (addProductFormSection.classList.contains('hidden')) {
            addProductBtn.textContent = '+ Thêm Sản Phẩm Mới';
        } else {
            addProductBtn.textContent = 'Ẩn Form Thêm Sản Phẩm';
        }

    });
}

    // =======================================================
    // 4. Xử lý sự kiện Submit Form Thêm Sản Phẩm
    // =======================================================

    if (formSubmitBtn) {
        const form = formSubmitBtn.closest('form');
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault(); 
                const bookTitle = document.getElementById('book-title').value;
                alert(`Đã thêm sản phẩm: "${bookTitle}" vào hệ thống.`);
                form.reset();
                addProductFormSection.classList.add('hidden');
                addProductBtn.textContent = '+ Thêm Sản Phẩm Mới';
            });
        }
    }
});