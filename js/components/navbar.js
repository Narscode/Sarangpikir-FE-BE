/**
 * Bottom Navigation Component
 * (Already inline in HTML, but this is for dynamic updates)
 */
const Navbar = {
    setActive(page) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === page);
        });
    }
};