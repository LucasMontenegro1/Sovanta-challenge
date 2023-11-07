// test/cat-service.test.js

const assert = require('assert');
const cds = require('@sap/cds');
const { expect } = require('chai');
const { GET, POST, DELETE} = cds.test();
const username = 'user1';
const password = 'password1';
const basicAuth = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
let id;
let orderId;
  
describe('Catalog Service', () => {
  it('It should let admins create products', async () => {
    const postData = {
        name: 'Producto',
        price: 100,
      };

    const response = await POST(`/odata/v4/catalog/Products`, postData, {
        headers: {
          Authorization: basicAuth,
        },
      });
    id = response.data.ID;
  });

  it('It should let users get products', async () => {
    const response = await GET(`/odata/v4/catalog/Products`, {
        headers: {
          Authorization: basicAuth,
        },
      });
    });

    it('It should let users to create orders', async () => {
        const postData = {
            product: {
                ID: "73109b3d-f5d7-497a-877d-240f372521b6"
            },
            amount: 100,
          };
        const response = await POST(`/odata/v4/catalog/Orders`,postData,{
            headers: {
                Authorization: basicAuth,
            },
            });
        orderId = response.data.ID;
    });

    it('It should let users delete orders', async () =>{
        const response = await DELETE(`/odata/v4/catalog/Orders(${orderId})`,{
            headers: {
              Authorization: basicAuth,
            },
          });
    });

    it('It should let admins to delete products', async () => {
        const response = await DELETE(`/odata/v4/catalog/Products(${id})`,{
            headers: {
              Authorization: basicAuth,
            },
          });
        });
    

});
