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
      }
    ]
  }
});
