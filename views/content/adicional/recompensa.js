var recompensa = function(){
   var random = function(){
       debugger;

      
       var itemSelected = floor(Math.random() * listaItens.count())
       let itemSorteado = listaItens[itemSelected];
        console.log(itemSorteado);
   }

   return { 
       random: random
   }
}();
