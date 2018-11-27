angular.module('angular-app')

.component('lcboSearch', {
  templateUrl: 'client/templates/lcboSearch.html',
  controller: ['$geolocation', '$http', function($geolocation, $http) {
    $ctrl = this;

    $ctrl.findProduct = function(productID) {
      $geolocation.getCurrentPosition().then((position) => {
           const params = {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
             product_id: productID,
           };

           $http.get('/api/stores',{ params })
           .then((res) => {
             $ctrl.storeInfo = res.data;
             if (!$ctrl.storeInfo.result.length) {
               $ctrl.storeInfo.displayTable = false;
               $ctrl.storeInfo.err = 'No store with product found';
             } else {
               $ctrl.storeInfo = res.data;
               $ctrl.storeInfo.displayTable = true;
             }
           });
         });
    }

    $ctrl.searchProduct = function(product) {
      $ctrl.storeInfo = '';

      if (!product) {
        return alert('enter a valid product');
      }

      const params = {
        q: product,
      };

      $http.get('/api/products',{ params })
      .then((res) => {
        $ctrl.productInfo = res.data;
        // In case there is no available product, show error message.
        if (!$ctrl.productInfo.result.length) {
          $ctrl.productInfo.displayTable = false;
          $ctrl.productInfo.err = 'No product found';
        } else {
          $ctrl.productInfo = res.data;
          $ctrl.productInfo.displayTable = true;
          $ctrl.productInfo.err = '';
        }
      });
    }
  }],
  bindings: {
    params: '=',
  },
});
