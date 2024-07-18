# MarketPlace MerahKuningHijau

Repositori ini untuk tes backend developer di PT Aman Tekno Solusi. Terdapat
market place Merah Kuning Hijau, Dimana dapat menghubungkan sebuah merchant dan
customer. Agar bisa mendapatkan lebih banyak lagi customer dan customer supaya terus
melakukan transaksi, market place merah kuning hijau menyiapkan diskon dan bebas ongkir.

## Ketentuan

1.  Merchant dapat _create_ dan _post_ products

2.  Customer dapat membeli produk dan serta mendapatkan bebas ongkir dan diskon sesuai
    dengan kriteria:

        * setiap transaksi produk diatas 15.000 akan mendapatkan bebas ongkir,
        * jika transaksi produk diatas 50.000 mendapatkan diskon sebesar 10%.

3.  Persyaratan API :
    - Menggunakan Token/JWT.
    - Setiap API diberikan validasi token/JWT
    - Merchant dapat create product
      (Bisa update dan delete menjadi nilai tambah)
    - Customer dapat melihat list produk
    - Setiap kali transaksi, customer mendapatkan bebas ongkir dan diskon sesuai dengan kriteria yang diatas
    - Merchant dapat melihat customer siapa saja yang membeli
4.  Notes:
    - Gunakan database MySQL.
    - Letakan hasil test pada gitlab atau github dengan menggunakan nama lengkap sebagai nama aplikasinya, contoh: backend-valentino-rossi
    - Buat interface sesederhana mungkin, berikan postman dan database serta cara how to use/install pada readme.

## How to use

1. Clone the repository

   ```sh
   git clone https://github.com/hasbifirasyan/backend-hasbi-firasyan.git
   cd backend-hasbi-firasyan
   ```

2. Install dependencies

   ```sh
   npm i
   ```

3. Set up environment variables in .env file

   - Anda dapat membuat sendiri file .env seperti pada .env.example atau sesimpel anda mengganti nama file `.env.example` menjadi `.env`.

4. Set up database mysql
   1. Sesuaikan username, password, database, dan host pada `config/config.json` sesuai pengaturan mysql Anda.
   2. Inisialisasi sequelize
      ```sh
      npx sequelize-cli init
      ```
   3. membuat, migrasi, dan seeding database
      ```sh
      npx sequelize db:create
      npx sequelize db:migrate
      npx sequelize db:seed:all
      ```
5. Start server
   ```sh
   npm start
   ```
&nbsp;
## API Documentation

### 1. RESTful auth endpoints

#### POST /register 
> Register a new user with the provided credentials.

_Request Body_  
```json
{
  "role": "merchant",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password"
}
``` 

    

_Response (201 - Success Register)_
```json
{
    "message": "User with role 'merchant' and email 'merchantKuning@mail.com' created"
}

```  
_Response (400 - SequelizeUniqueConstraintError or SequelizeValidationError)_

```json
{
    "message": "<error.message>"
}
```    

#### GET /login


> Authenticate a user and generate an access token.

_Request Body_  
Login sebagai customer:
```json
{
    "email": "budi@example.com",
    "password": "123456" ,
}
```
atau Login sebagai merchant:
```json
{
    "email": "merchantMerah@mail.com",
    "password": "123456" ,
}
```

_Response (200 - Success login)_
```json
{
    "access_token": "<token>"
}
```
_Response (401 - Unauthenticated or JsonWebTokenError)_

```json
{
    "message": "Invalid token"
}
```
&nbsp;
---

### 2. RESTful merchant endpoints

#### GET /merchant/buyers
> Get a list of all buyers. Merchant see customer who bought products.

_Request Headers_
```json
{
    "Authorization": "Bearer <access_token>"
}
```

_Response (200 - Success)_
```json
[
    {
        "id": 2,
        "name": "Toni",
        "email": "toni@example.com",
        "createdAt": "2024-07-18T14:56:36.000Z",
        "updatedAt": "2024-07-18T14:56:36.000Z",
        "Products": [
            {
                "id": 3,
                "name": "Product B1",
                "price": 30000,
                "MerchantId": 2,
                "createdAt": "2024-07-18T14:56:36.000Z",
                "updatedAt": "2024-07-18T14:56:36.000Z",
                "CustomerProducts": {
                    "quantity": 3
                }
            },
            {
                "id": 4,
                "name": "Product B2",
                "price": 40000,
                "MerchantId": 2,
                "createdAt": "2024-07-18T14:56:36.000Z",
                "updatedAt": "2024-07-18T14:56:36.000Z",
                "CustomerProducts": {
                    "quantity": 1
                }
            }
        ]
    }
]
```

_Response (401 - Unauthorized)_
```json
{
    "message": "You are not authorized"
}
```

---

#### POST /merchant/products
> Create a new product.

_Request Headers_
```json
{
    "Authorization": "Bearer <access_token>"
}
```

_Request Body_
```json
{
  "name": "Product C",
  "price": 10000
}
```

_Response (201 - Success)_
```json
{
    "id": 5,
    "name": "Product C",
    "price": 10000,
    "MerchantId": 2,
    "updatedAt": "2024-07-18T15:14:39.849Z",
    "createdAt": "2024-07-18T15:14:39.849Z"
}
```
  
_Response (401 - Unauthorized)_
```json
{
    "message": "You are not authorized"
}
```   


---

#### PUT /products/:id
> Update details (name & price) of a specific product.

_Request Headers_
```json
{
    "Authorization": "Bearer <access_token>"
}
```

_Request Body_
```json
{
  "name": "Updated Product A",
  "price": 12000
}
```
_Request Params_
```json
{
  "id": "integer (required)"
}
```

_Response (200 - Success)_
```
{
    "id": 1,
    "name": "Updated Product A",
    "price": 12000,
    "MerchantId": 1,
    "createdAt": "2024-07-18T14:56:36.000Z",
    "updatedAt": "2024-07-18T15:14:52.550Z"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Name and price are required to update the product"
}
```

_Response (401 - Unauthorized)_
```json
{
    "message": "You are not authorized"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Product not found"
}
```
&nbsp;

---
### 3. RESTful customer endpoints

#### GET /customer/products
> Get a list of all products available for purchase.

_Request Headers_
```json
{
    "Authorization": "Bearer <access_token>"
}
```

_Response (200 - Success)_
```json
[
    {
        "id": 1,
        "name": "Updated Product A",
        "price": 12000,
        "MerchantId": 1,
        "createdAt": "2024-07-18T14:56:36.000Z",
        "updatedAt": "2024-07-18T15:14:52.000Z",
        "Merchant": {
            "name": "Merchant Merah"
        }
    },
    {
        "id": 2,
        "name": "Product A2",
        "price": 20000,
        "MerchantId": 1,
        "createdAt": "2024-07-18T14:56:36.000Z",
        "updatedAt": "2024-07-18T14:56:36.000Z",
        "Merchant": {
            "name": "Merchant Merah"
        }
    },
    ...
]
```
&nbsp;


---

#### POST /customer/products/:ProductId/buy
> Create a new transaction and purchase products.

_Request Headers_
```json
{
    "Authorization": "Bearer <access_token>"
}
```
_Request Params_
```
{
  "Productd": "integer (required)"
}
```
_Request Body_
```json
{
  "quantity": 6
}
```

_Response (201 - Success)_
```json
{
    "totalPrice": 72000,
    "discount": 7200,
    "shippingCost": 0,
    "finalPrice": 64800
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "You are not authorized to buy products"
}
```
  or
```json
{
    "message": "Quantity must be at least 1"
}
```

_Response (401 - Unauthorized)_
```json
{
    "message": "You are not authorized"
}
```
  
_Response (404 - Not Found)_
```json
{
    "message": "Product not found"
}
```
&nbsp;
---

### Global Error

_Response (500 - Internal Server Error)_

```json
{
    "message": "Internal server error"
}
```
&nbsp;
---
