namespace my.catalog;


entity Products{

    key ID : UUID;
    name : String;
    price : Decimal;
}

entity Orders{
    key ID : UUID;
    product : Association to Products;
    amount : Integer;
}