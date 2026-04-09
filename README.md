# What is This?
This is an API bank with some functions that a bank may use, like get balance or transfer money.
# .env File
First of all, you need to create a `.env` file in your project, theres a example in `.env.example`.
# MongoDB URL
I will explain to you how to get the **MongoDB URL** that you will need to put in `.env`.
- Go to [MongoDB](https://mongodb.com/atlas) website.
- Before anything, put the website in `Site to computer` mode ( if you are in a mobile device ), the website does not work's well normally.
- Click in **Get Started**.
- Create your account.
- Create a cluster ( website redirects you auto )
  - Select the option **Free**.
  - In **Quick setup** tab, unmark the two options.
  - Your cluster was created.
- Click in **Add Your Current IP Address** in **1** tab.
- Confirm in **Add IP Address**.
- Create a user, putting name and password. ( it's important to you copy the password ).
- Confirm in **Create Database User**.
- Click in **Choose a connection method**.
- Click the option **Drivers**.
- Ignore all and go to **3** tab.
- Copy the URL that is in.
  - You will have something like that: `mongodb+srv://teste:<db_password>@cluster0.dbz0gws.mongodb.net/?appName=Cluster0`.
- Before adding this URL in `.env` we need to guarante that any IP can access your database. 👇
  - In MongoDB menu, go to **SECURITY** tab.
  - Click in the option **Database & Network Access**.
  - Click in the option **IP Access List**.
  - Delete your actual IP clicking **DELETE**.
  - Add a new IP.
  - In the new IP put it like `0.0.0.0/0`, this guarante access to any IP.
  - Done.
- Add the copied URL into `.env` in `MONGODB`.
- Replace `<db_password>` by the password copied previously.
- All done.
# Routes
### /balance [POST]
This one gets your current balance in bank.<br>
In all routes you need to pass a body in `POST` method.

**Body to pass**:
```js
{
  email: "example@gmail.com",
  password "EXample$1234"
}
```
**Returns**:
```js
{ balance: 0 } // or you balance
```
**Possibly responses status**:
- **200**: the request was a success.
- **401**: when the password is wrong.
- **404**: when the email passed in body is not registered.
### /register [POST]
Register an email into the database.

**Body to pass**:
```js
{
  username: "Kauã Eduardo",
  email: "example@gmail.com",
  password "EXample$1234"
}
```
**Returns**:
```js
{ message: "User created successfully" }
```
**Possibly responses status**:
- **201**: the request was a success and user was registered.
- **409**: when the email is already registered.
### /transfer [POST]
Transfer an amount money to given email.

**Body to pass**:
```js
{
  email: "example@gmail.com",
  password "EXample$1234",
  userEmailToTransfer: "anotherExample@gmail.com",
  amount: 100
}
```
**Returns**:
```js
{ message: "You transferred 100 successfully" }
```
**Possibly responses status**:
- **200**: the request was a success and you transferred money.
- **400**: when you don't have enough money.
- **401**: when the password is wrong.
- **404**: when your email is not registered or the user to transfer email is not registered.
