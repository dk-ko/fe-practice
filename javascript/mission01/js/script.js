const buttons = document.querySelectorAll(".food-button");
const menuItems = document.querySelectorAll(".menu-item");
buttons.forEach(button => {
    button.addEventListener("click", function() {
        const category = this.dataset.category;
        menuItems.forEach(item => {
            if (category === "all") {
                item.style.display = "flex";
            } else {
                if (item.dataset.category === category) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            }
        });
    });
});