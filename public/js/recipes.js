document.addEventListener("DOMContentLoaded",() => {
    console.log("Page loaded...")
    // init text areas
    for (let element of document.querySelectorAll(".materialize-textarea")){
        M.textareaAutoResize(element);
    }

    let elements = document.querySelectorAll(".autocomplete");

    M.Autocomplete.init(elements);

    elements.forEach(item => {
        item.addEventListener("keyup",() => {
            if (item.value != ""){
                M.Autocomplete.getInstance(item).open();
            } else {
                M.Autocomplete.getInstance(item).close();
            }
        })
    })

    //console.log(document.querySelectorAll(".dropdown-content"));


    const submitIngredient = document.getElementById("addIngredient");
    const submitIngredientClass = submitIngredient.className;
    //submitIngredient.className = submitIngredient.className + " disabled";

    submitIngredient.addEventListener("click",() => {
        let name = (document.getElementById("ingredientName")).value;
        
        if (name == "") return

        let selected = submitIngredient.dataset.ingredients.filter(item => (item.name == name)).pop();
        
        addIngredientToList(selected);
    });

    // ingredients

    fetch("http://localhost:8000/api/ingredients")
        .then(data => data.json())
        .then(data => {

            console.log(data);

            // autocomplete data to cycle through
            let autocomplete = data.reduce((acc,elem) => {
                acc[elem.name] = null;
                //acc[JSON.stringify(elem.name)] = null;
                return acc
            },{});

            let ingredientNameInput = document.getElementById("ingredientName");
            let autocompleteInstance = M.Autocomplete.getInstance(ingredientNameInput);
            autocompleteInstance.updateData(autocomplete);

            ingredientNameInput.addEventListener("keyup",() => {
                // if the value is equal to any of the ingredients in the list, remove the disabled value from the form button
                let value = ingredientNameInput.value;

                if (value != ""){
                    submitIngredient.className = submitIngredientClass;
                } else {
                    submitIngredient.className = submitIngredientClass + " disabled";
                }

                let url = new URL("http://localhost:8000/api/usda/search");
                url.search = new URLSearchParams({
                    q:value
                });
                fetch(url)
                    .then(data => data.json())
                    .then(data => {
                        let autoCompleteData = data.reduce((acc,elem) => {
                            if (!acc[elem.name]){
                                acc[elem.name] = null
                            }
                            return acc
                        },{});
                        M.Autocomplete.getInstance(item).updateData(autoCompleteData);

                        const submitIngredient = document.getElementById("addIngredient");

                        submitIngredient.dataset.ingredients = data;

                    })
            });
        })
});

function addIngredientToList(selected){
    console.log(selected);
    // get elements with data
    let ingredientAmountInput = document.getElementById("ingredientAmount");
    let ingredientNameInput = document.getElementById("ingredientName");

    // get data from elements
    let ingredientName = selected.name;
    let ingredientAmount = ingredientAmountInput.value;

    if ((ingredientAmount === "")){
        ingredientAmount = (selected.nutrition.grams) ? 100 : 1;
    }

    // construct new div
    let li = document.createElement("li");
    li.className = "collection-item";

    // put data into new element
    if (selected.nutrition.grams){
        li.innerText = `${ingredientAmount} grams of ${ingredientName}`;
    } else {
        li.innerText = `${ingredientAmount}x ${ingredientName}`;
    }

    let liInput = document.createElement("input");
    liInput.name = "ingredients[]";

    liInput.value = JSON.stringify(selected);

    liInput.type = "hidden";

    li.appendChild(liInput);

    // append new element to the list
    let ingredientsList = document.getElementById("ingredientsList");
    ingredientsList.appendChild(li);

    // clear elements
    ingredientAmountInput.value = "";
    ingredientNameInput.value = "";
}
