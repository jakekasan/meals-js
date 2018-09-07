window.addEventListener("load",() => {
    console.log("Page loaded...")
    // init text areas
    for (let element of document.querySelectorAll(".materialize-textarea")){
        M.textareaAutoResize(element);
    }

    const submitIngredient = document.getElementById("addIngredient");
    const submitIngredientClass = submitIngredient.className;
    submitIngredient.className = submitIngredient.className + " disabled";

    
    // ingredients

    fetch("http://localhost:8000/api/ingredients")
        .then(data => data.json())
        .then(data => {
            // initialize the materialize element
            let ingredientNameInput = document.getElementById("ingredientName");
            let instance = M.Autocomplete.init([ingredientNameInput],{
                data:data.reduce((acc,elem) => {
                    acc[elem.name] = null;
                    return acc
                },{})
            });

            

            submitIngredient.addEventListener("click",() => {
                console.log("CLICK");
                let selected = data.filter(item => (item.name == (document.getElementById("ingredientName")).value )).pop();
                addIngredientToList(selected);

            });

            ingredientNameInput.addEventListener("keyup",() => {
                // if the value is equal to any of the ingredients in the list, remove the disabled value from the form button
                let value = ingredientNameInput.value;

                if ((data.map(item => item.name)).includes(value)){
                    submitIngredient.className = submitIngredientClass;

                } else {
                    submitIngredient.className = submitIngredientClass + " disabled";
                }
            });



        })

    

    // on keyup of the name typing 

    // let ingredientNameInput = document.getElementById("ingredientName");
    // ingredientNameInput.addEventListener("keyup",() => {

    // })
    
    // let addIngredientButton = document.getElementById("addIngredient");

    // addIngredientButton.addEventListener("click",() => {
    //     addIngredientToList();
    // });
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
