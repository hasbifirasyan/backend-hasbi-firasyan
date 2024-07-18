# backend-hasbi-firasyan
Test backend Dev for PT Aman Tekno

npm i
npx sequelize-cli init //to create an empty project you will need to execute init command
//atur username, password, namadatabase, dan host pada config/config.json sesuai pengaturan mysql Anda

sequelize model:create --name Merchant --attributes name:string,email:string,password:string 
sequelize model:create --name Customer --attributes name:string,email:string,password:string 
sequelize model:create --name Product --attributes name:string,price:integer,MerchantId:integer 
sequelize model:create --name CustomerProduct --attributes CustomerId:integer,ProductId:integer,quantity:integer 

sequelize seed:create --name add-merchants
sequelize seed:create --name add-customers
sequelize seed:create --name add-products
sequelize seed:create --name add-customerproducts

npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all