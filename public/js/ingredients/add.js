document.addEventListener("DOMContentLoaded",() => {
    console.log("Document loaded");

    // Autocomplete setup
    var elems = document.querySelectorAll(".autocomplete");
    var instances = M.Autocomplete.init(elems,{
        data:{
            "one":null,
            "two":null,
            "three":null
        }
    });


    // hack for getting autocomplete to open
    elems.forEach(item => {
        item.addEventListener("keyup",() => {
            if (item.value != ""){
                (M.Autocomplete.getInstance(item)).open();
            } else {
                (M.Autocomplete.getInstance(item)).close();
            }
            let url = new URL("http://localhost:8000/api/usda/search");
            url.search = new URLSearchParams({
                q:item.value
            });
            fetch(url)
                .then(data => data.json())
                .then(data => {
                    console.log(data);
                    var collection = document.querySelector(".collection");
                    collection.innerHTML = "";

                    for (let ingredient of data){
                        // add to collection
                        console.log(ingredient);
                        let collectionItem = document.createElement("div");
                        collectionItem.className = "collection-item";
                        collectionItem.innerText = ingredient.name;
                        collectionItem.setAttribute("data-ndbno",ingredient.ndbno);
                        collectionItem.addEventListener("click",() => {
                            let url = new URL("http://localhost:8000/api/usda/nutrition");
                            url.search = new URLSearchParams({
                                ndbno:ingredient.ndbno
                            });
                            fetch(url)
                                .then(data => {
                                    console.log(data);
                                    try {
                                        return data.json();
                                    } catch(e) {
                                        return data
                                    }
                                })
                                .then(data => {
                                    location.reload();
                                    // console.log(data);
                                    // setTimeout(() => {
                                    //     location.reload();
                                    // },10000);
                                })
                                .catch(e => console.log(e));
                        });
                        
                        collection.appendChild(collectionItem);
                    }
                })
        })
    });

});



// search

// set