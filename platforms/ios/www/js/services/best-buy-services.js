angular.module('finali0S')

.factory('BestBuyService', function($http) {
    var bestBuyAPIendPoint = 'http://api.bestbuy.com/v1';
    var key = '2zjjvg2ezm9hf839uh2xjp78';
    
    return {
        search : function(term){
            return $http.get(bestBuyAPIendPoint + '/products((search='+ term +'))?show=name,sku,salePrice,image&format=json&apiKey='+key);
        }
//        ,
//        getStores : function(){
//            return
//        }
        
    };
});
