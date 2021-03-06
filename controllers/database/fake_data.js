/*

    fake_data.js

    - All the fake data to work with while app gets developed

*/




recipes = [
    {
        name:"Scrambled Eggs",
        ingredients:[
            {
                name:"Egg",
                quantity:200
            },
            {
                name:"Butter",
                quantity:50
            },
            {
                name:"Cheese",
                quantity:50
            }
        ]
    },
    {
        name:"Bolognese",
        ingredients:[
            {
                name:"Beef Mince",
                quantity:500
            },
            {
                name:"Chopped Tomatoes",
                quantity:400
            },
            {
                name:"Onion",
                quantity:100
            },
            {
                name:"Mushroom",
                quantity:100
            },
            {
                name:"Garlic",
                quantity:50
            },
            {
                name:"Pasta",
                quantity:200
            }
        ]
    },
    {
        name:"Chili",
        ingredients:[
            {
                name:"Beef Mince",
                quantity:500
            },
            {
                name:"Chopped Tomatoes",
                quantity:400
            },
            {
                name:"Peppers",
                quantity:100
            },
            {
                name:"Onion",
                quantity:100
            },
            {
                name:"Chili",
                quantity:50
            }
        ]
    },
    {
        name:"Chicken Fajitas",
        ingredients:[
            {
                name:"Chicken Breast",
                quantity:500
            },
            {
                name:"Peppers",
                quantity:100
            },
            {
                name:"Onion",
                quantity:200
            },
            {
                name:"Cheese",
                quantity:100
            },
            {
                name:"Wrap",
                quantity:100
            }
        ]
    },
    {
        name:"Chicken Carbonara",
        ingredients:[
            {
                name:"Chicken Breast",
                quantity:500
            },
            {
                name:"Onion",
                quantity:100
            },
            {
                name:"Cheese",
                quantity:100
            },
            {
                name:"Mushroom",
                quantity:100
            },
            {
                name:"Pasta",
                quantity:200
            }
        ]
    },
    {
        name:"Roast Chicken and Potatoes",
        ingredients:[
            {
                name:"Chicken Breast",
                quantity:300
            },
            {
                name:"Onion",
                quantity:100
            },
            {
                name:"Potato",
                quantity:500
            }
        ]
    },
    {
        name:"Cottage Pie",
        ingredients:[
            {
                name:"Beef Mince",
                quantity:500
            },
            {
                name:"Potato",
                quantity:500
            },
            {
                name:"Carrot",
                quantity:100
            },
            {
                name:"Onion",
                quantity:100
            }
        ]
    },
    {
        name:"Mac N' Cheese",
        ingredients:[
            {
                name:"Cheese",
                quantity:200
            },
            {
                name:"Butter",
                quantity:100
            },
            {
                name:"Pasta",
                quantity:200
            }
        ]
    },
    {
        name:"Mince and Potatoes",
        ingredients:[
            {
                name:"Beef Mince",
                quantity:250
            },
            {
                name:"Potato",
                quantity:500
            },
            {
                name:"Onion",
                quantity:100
            }
        ]
    },
    {
        name:"Chicken Quasedia (prolly misspelled)",
        ingredients:[
            {
                name:"Chicken Breast",
                quantity:300
            },
            {
                name:"Wrap",
                quantity:200
            },
            {
                name:"Cheese",
                quantity:300
            }
        ]
    },
    {
        name:"Buttery Chicken",
        ingredients:[
            {
                name:"Chicken Breast",
                quantity:300
            },
            {
                name:"Butter",
                quantity:100
            }
        ]
    }
]

foodProducts = [
    {
        name:"Garlic",
        quantity:50,
        vendor:"Tesco",
        cost:50
    },
    {
        name:"Butter",
        quantity:400,
        vendor:"Tesco",
        cost:150
    },
    {
        name:"Beef Mince",
        quantity:750,
        vendor:"Tesco",
        cost:400
    },
    {
        name:"Chicken Breast",
        quantity:600,
        vendor:"Tesco",
        cost:350
    },
    {
        name:"Egg",
        quantity:400,
        vendor:"Tesco",
        cost:180
    },
    {
        name:"Onion",
        quantity:80,
        vendor:"Tesco",
        cost:50
    },
    {
        name:"Carrot",
        quantity:60,
        vendor:"Tesco",
        cost:50
    },
    {
        name:"Potato",
        quantity:1000,
        vendor:"Tesco",
        cost:80
    },
    {
        name:"Pasta",
        quantity:500,
        vendor:"Tesco",
        cost:150
    },
    {
        name:"Mushroom",
        quantity:220,
        vendor:"Tesco",
        cost:60
    },
    {
        name:"Cheese",
        quantity:300,
        vendor:"Tesco",
        cost:230
    },
    {
        name:"Wrap",
        quantity:400,
        vendor:"Tesco",
        cost:110
    },
    {
        name:"Chili",
        quantity:80,
        vendor:"Tesco",
        cost:50
    },
    {
        name:"Chopped Tomatoes",
        quantity:440,
        vendor:"Tesco",
        cost:65
    },
    {
        name:"Peppers",
        quantity:350,
        vendor:"Tesco",
        cost:150
    }
]

module.exports = {
    recipes,
    foodProducts
}