const buttons = document.querySelectorAll(".food-button");
buttons.forEach(button => {
    button.addEventListener("click", function() {
        console.log(button);
    })
});