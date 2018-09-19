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
        })
    });

});



// search

// set