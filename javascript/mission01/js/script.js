const buttons = document.querySelectorAll(".food-button");
const menuItems = document.querySelectorAll(".menu-item");
buttons.forEach(button => {
    button.addEventListener("click", function() {
        const category = this.dataset.category;
        menuItems.forEach(item =>
            item.style.display = ["all", item.dataset.category].includes(category) ? "flex" : "none"
        );
    });
});