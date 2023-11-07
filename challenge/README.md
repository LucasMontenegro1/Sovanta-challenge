# SAP Project - Product Catalog

This project is an implementation of a product catalog using the SAP Cloud Application Programming Model (CAP) framework.

## Execution Instructions

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation Steps

1. Clone this repository to your local machine.

2. Open a terminal and navigate to the project's root directory.

3. Run the following command to install the dependencies:

   ```bash
   npm install

## Running the Project

Execute the project using the following command:

    ```bash
    cds watch

## Implementation Details

### Product Entity

- `db/data-model.cds`: Defines the data model for the `Products` entity using Core Data Services (CDS). The fields for the `Products` entity include:
  - `ID`: A UUID as the primary key.
  - `name`: A String representing the product's name.
  - `price`: A Decimal for the product's price.

- `srv/cat-service.cds`: The `Products` entity is projected in the CAP service, allowing access constraints to be defined.

- `srv/cat-service.js`: Contains the implementation of the CAP service logic for products, including creating, updating, reading, and deleting product entries.

### Orders Entity

- `db/data-model.cds`: Defines the data model for the `Orders` entity using Core Data Services (CDS). The fields for the `Orders` entity include:
  - `ID`: A UUID as the primary key.
  - `product`: An association to the `Products` entity, linking orders to products.
  - `amount`: An Integer representing the quantity of the ordered product.

- `srv/cat-service.cds`: The `Orders` entity is projected in the CAP service, enabling access constraints to be specified.

### Authorization and Authentication
### Authorization and Authentication

The project uses basic authorization and authentication, with specific access restrictions for the `Products` entity:

- `Products` Entity Authorization:
  - The `Products` entity is configured with the following authorization requirements and access restrictions in `srv/cat-service.cds`:
    - `@requires: 'authenticated-user'`: Only authenticated users are allowed to access the entity.
    - `@restrict`: Defines detailed access restrictions for different operations:
      - `{ grant: ['CREATE', 'UPDATE', 'DELETE'], to: ['Admin'] }`: Admin users can create, update, and delete products.
      - `{ grant: ['READ'], to: ['Admin', 'User'] }`: Both Admin and User roles have read access to products.

- `Orders` Entity Authorization:
  - Similarly, the `Orders` entity also has specific authorization and access restrictions defined in the project's configuration.
    - `@requires: 'authenticated-user'`: Only authenticated users can interact with the entity.
    - `@restrict`: Specifies access restrictions for various operations, such as create, update, delete, and read, for Admin and User roles.


## Running Tests

This project includes automated tests. Ensure you have completed the installation steps before running the tests.

To run the tests, use the following command:

```bash
npm test
