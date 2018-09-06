window.addEventListener("load",() => {
    console.log("Page loaded...")
    // init text areas
    for (let element of document.querySelectorAll(".materialize-textarea")){
        M.textareaAutoResize(element);
    }

    // ingredientsList
    
    

    let addIngredientButton = document.getElementById("addIngredient");

    addIngredientButton.addEventListener("click",() => {
        addIngredientToList();
    });
});

function addIngredientToList(){
    // get elements with data
    let ingredientAmountInput = document.getElementById("ingredientAmount");
    let ingredientNameInput = document.getElementById("ingredientName");

    // get data from elements
    let ingredientName = ingredientNameInput.value;
    let ingredientAmount = ingredientAmountInput.value;

    if ((ingredientName === "") || (ingredientAmount === "")){
        alert("Input is not correct");
        return
    }

    console.log(ingredientAmountInput);

    // construct new div
    let li = document.createElement("li");
    li.className = "collection-item";

    // put data into new element
    li.innerText = `${ingredientAmount} of ${ingredientName}`;

    let liInput = document.createElement("input");
    liInput.name = "ingredients[]";
    liInput.value = JSON.stringify({
        name:ingredientName,
        amount:ingredientAmount
    });
    liInput.type = "hidden";

    li.appendChild(liInput);

    // append new element to the list
    let ingredientsList = document.getElementById("ingredientsList");
    ingredientsList.appendChild(li);

    // clear elements
    ingredientAmountInput.value = "";
    ingredientNameInput.value = "";
}
