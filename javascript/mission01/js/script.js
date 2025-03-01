const buttons = document.querySelectorAll(".food-button");
const menuItems = document.querySelectorAll(".menu-item");
buttons.forEach(button => {
    button.addEventListener("click", function () {
        const buttonCategory = this.dataset.category;
        menuItems.forEach(item => {
            const itemCategory = item.dataset.category;
            item.style.display = ["all", itemCategory].includes(buttonCategory) ? "flex" : "none"
        });
    });
});