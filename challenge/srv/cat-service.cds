using my.catalog as my from '../db/data-model';

service CatalogService {
    
    @requires: 'authenticated-user'
    @restrict: [
        { grant: ['CREATE', 'UPDATE', 'DELETE'], to: ['Admin'] },
        { grant: ['READ'], to: ['Admin','User'] }
    ]
    entity Products as projection on my.Products;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: ['CREATE', 'UPDATE', 'DELETE','READ'], to: ['Admin','User'] },
    ]
    entity Orders as projection on my.Orders;

}