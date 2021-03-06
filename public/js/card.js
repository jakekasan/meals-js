function selectNewRecipe(element){
    let theDay = element.value;

    // get a list of all recipes from server and render them into modal

    fetch("http://localhost:8000/api/recipes")
        .then(data => data.json())
        .then(data => {
            let ul = document.createElement("ul");
            ul.className = "collection";
            for (let item of data){
                let li = document.createElement("li");
                li.className = "collection-item";
                li.innerText = item.name;
                
                // add event listener
                li.addEventListener("click",() => {
                    console.log(item.name);
                    console.log(document.cookie);

                    fetch("http://localhost:8000/api/users",{
                        method:"POST",
                        mode: "same-origin",
                        cache: "no-cache",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type":"application/json;charset=utf-8",
                        },
                        body:JSON.stringify({
                            day:theDay,
                            recipe:item.name
                        }),
                    })
                        .then(data => {
                        document.querySelectorAll(".modal").forEach(element => (M.Modal.getInstance(element).close()));
                        location.reload();
                        })
                        .catch(e => console.log(e));
                })

                ul.appendChild(li);
            }
            loadModal(ul);
        })


}

function loadModal(content){
    /*
        Creates a modal and puts the content passed inside it.
        On close, modal is destroyed.
    */

    // overall container

    let modal = document.createElement("div");
    modal.className = "modal";

    // modal footer

    let modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";

    // and the a tag

    let modalFooterA = document.createElement("a");
    modalFooterA.className = "modal-close waves-effect waves-green btn-flat";
    modalFooterA.innerText = "close";

    // append A tag to footer
    modalFooter.appendChild(modalFooterA);

    // select the body to append everything to
    let body = document.getElementsByTagName("body")[0];

    // append all children
    
    modal.appendChild(content)
    modal.appendChild(modalFooter);
    body.appendChild(modal);

    var elems = document.querySelectorAll(".modal");
    console.log(elems);
    var instances = M.Modal.init(elems,{
        onCloseEnd:() => {
            body.removeChild(modal);
        }
    });
    instances[0].open();  
}

function clearRecipe(element){

    let day = element.value;

    let url = new URL("http://localhost:8000/api/users");
    fetch(url,{
        method:"POST",
        mode:"cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow",
        referrer:"no-referrer",
        body:JSON.stringify({
            day:day,
            recipe:""
        })
    })
        .then(data => {
            //document.querySelectorAll(".modal").forEach(element => (M.Modal.getInstance(element).close()));
            location.reload();    
        })
        .catch(e => console.log(e))
}
