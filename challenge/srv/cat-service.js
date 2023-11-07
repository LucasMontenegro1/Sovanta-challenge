const cds = require('@sap/cds');
const { v4: uuidv4 } = require('uuid');

module.exports = async (srv) => {
    const { Products } = srv.entities('my.catalog');

    srv.on('CREATE', 'Products', async (req) => {
        const { name, price } = req.data;
        console.log('Received CREATE request with data:', req.data);

        const newProduct = {
            ID: uuidv4(),
            name: name,
            praice: price
        };

        console.log('Creating new product:', newProduct);
        await cds.transaction(req).run(INSERT.into(Products).entries(newProduct));
        return newProduct
    });

    srv.on('DELETE', 'Products', async (req) => {
        const { ID } = req.data;
        data = await cds.transaction(req).run(DELETE.from(Products).where({ ID: ID }));
        return ID;
    });

    srv.on('UPDATE', 'Products', async (req) => {
        const { ID, name, price } = req.data;
        console.log(ID,name, price)
        const updatedProduct = {
            name: name,
            price: price
        };

        await cds.transaction(req).run(UPDATE(Products).set(updatedProduct).where({ ID: ID }));

    });
    

    srv.on('READ', 'Products', async (req) => {
        let data;
        if (req._queryOptions !== null){
            const {name, ID} = req._queryOptions;
            if(name && ID ) {
                data = await cds.transaction(req).run(SELECT.from(Products).where({name:name, ID : ID}));
            }else if(name){
                data = await cds.transaction(req).run(SELECT.from(Products).where({name:name}));
            }else if (ID){
                data = await cds.transaction(req).run(SELECT.from(Products).where({ID : ID}));
            }
        }else{
            data = await cds.transaction(req).run(SELECT.from(Products));
        }
        return data;
    });


}

