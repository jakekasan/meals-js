new Vue({
  el:"#vue-app",
  data:{
    name:'jake',
    meals:[
      {
        name: 'Sushi',
        picture: '01',
        ingredients:[ 'rice', 'seaweed', 'salmon', 'avocado' ]
      },
      {
        name: 'Steak and Peppercorn Sauce',
        picture: '01',
        ingredients:[ 'beef steak', 'beef stock', 'quark', 'rice']
      },
      {
        name: 'Proscuitto e Funghi Pizza',
        picture: '03',
        ingredients: ['pizza dough', 'tomato sauce', 'ham','mushrooms']
      },
      {
        name: 'Svickova',
        picture: '04',
        ingredients: ['beef sirloin','dumplings','cream and vegetable sauce']
      },
      {
        name: 'Spagetti Bolognese',
        picture: '05',
        ingredients: ['beef mince', 'tomato sauce','pasta']
      },
      {
        name: 'Egg pancake',
        picture: '06',
        ingredients: ['eggs','mushrooms','cheddar']
      },
      {
        name: 'Roast chicken',
        pictures: '07',
        ingredients: ['chicken whole','onion','carrot','celery','garlic']
      }
    ]
  }
});
