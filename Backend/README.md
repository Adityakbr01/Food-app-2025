# Backend


### Endpoint: `/`

**Method**: `GET`

**Description**: This is a test endpoint to check root route is working.

#### Success Response:

```json
{
    "success": true,
    "message": "Welcome to the FoodExpress API"
}
```

#### error Response:

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

&nbsp;


&nbsp;

## User Endpoints

### Endpoint: `/api/users/test`

**Method**: `GET`

**Description**: This is a test endpoint to check if the user route is working.

#### Success Response:

```json
{
  "success": true,
  "message": "User route working hai G"
}
```

#### error Response:

```json
{
  "success": false,
  "message": "Something went wrong"
}
```




&nbsp;


&nbsp;


### Endpoint: /api/users/register

Method: `POST`

**Description**: This endpoint is used to register a new user. It accepts user details and creates a new user in the database

## Request Body:
```json 
{
  "name": "Aditya",
  "email": "email@gmail.com",
  "password": "password123",
  "phoneNumber": "9304922632",
}
```

#### Validation Checks (Before creating a user):

1. **Name**: 
   - Required.
   - Must be a string.
   - Must be at least **3 characters** long.

2. **Email**: 
   - Required.
   - Must be a valid **email format** (e.g., `example@domain.com`).

3. **Password**: 
   - Required.
   - Must be at least **6 characters** long.
   - Must contain at least one **letter** and one **number**.

4. **PhoneNumber**: 
   - Optional.
   - If provided, must be a **valid mobile phone number** (e.g., `+1-123-456-7890`).




### Success Response:

```json
Success Response:{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {
            "name": "John Doe",
            "email": "john01.doe@example.com",
            "phoneNumber": "9049226420",
            "isActive": true
        }
    }
}
```

### Error Response:

**If validation fails, you might receive the following error response with appropriate messages:**

#### Example Response:

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must contain a number",
      "param": "password",
      "location": "body"
    }
  ]
}
```


**Or if the user already exists** :

```json
{
  "success": false,
  "message": "User with this email or phone number already exists."
}
```


**If there's an internal error (e.g., MongoDB connection issues)** :
```json

{
  "success": false,
  "message": "Internal Server Error. Could not register the user."
}
```

&nbsp;



&nbsp;


&nbsp;




### Endpoint: /api/users/login

Method: `POST`

**Description**: This endpoint is used to login a user. It accepts user details and checked in database

## Request Body:
```json 
{
  
  "email": "john.doe@example.com",
  "password": "password123",

}
```

#### Validation Checks (Before login a user):



1. **Email**: 
   - Required.
   - Must be a valid **email format** (e.g., `example@domain.com`).

2. **Password**: 
   - Required.
   - Must be at least **6 characters** long.
   - Must contain at least one **letter** and one **number**.

&nbsp;

### Success Response:

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Q2NzhlMGIxMWRiNWUxYjdiYjAyN2YiLCJpYXQiOjE3NDIxMTE3MDgsImV4cCI6MTc0MjcxNjUwOH0.acIQN1yIg-_qmSxKAkmp-ENwDi63IVJ8tspKAoOyXbU",
        "user": {
            "id": "67d678e0b11db5e1b7bb027f",
            "email": "john.doe@example.com"
        }
    }
}
```

### Error Response:

**If validation fails, you might receive the following error response with appropriate messages:**

#### Example Response:

```json
{
    "errors": [
        {
            "type": "field",
            "value": "example.com",
            "msg": "Please provide a valid email",
            "path": "email",
            "location": "body"
        },
        {
            "type": "field",
            "value": "password",
            "msg": "Password must contain a number",
            "path": "password",
            "location": "body"
        }
    ]
}
```


**Or if the user not found!** :

```json
{
   "success": false,
    "message": "User not found "
   
}
```

**Or if the provided password with the hashed password in the database not match** :

```json
{
   "success": false,
    "message": "Invalid credentials"
   
}
```


**If there's an internal error (e.g., MongoDB connection issues)** :
```json

{
  "success": false,
  "message": "Internal Server Error. Could not register the user."
}
```








&nbsp;



&nbsp;


&nbsp;


## Endpoint: /api/users/profile

Method: `GET`

**Description**: This endpoint is used to featch a user. in database


## Request Body:
```json 
{
    "req.body?.token" || "Authorization bearer token"
   
}
```
koi bhi ek hona chahiye Request Body || Request cookie

## Request cookie:
```json 
{
    "cookies?.token"
   
}
```

### Success Response:

```json
{
    "success": true,
    "message": "User profile fetched successfully",
    "data": {
        "user": {
            "_id": "67d678e0b11db5e1b7bb027f",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phoneNumber": "9049226320",
            "emailVerified": false,
            "orders": [],
            "favourites": [],
            "paymentMethods": [],
            "deliveryAddresses": [],
            "role": "customer",
            "isActive": true,
            "ratings": [],
            "createdAt": "2025-03-16T07:08:16.755Z",
            "updatedAt": "2025-03-16T07:08:16.755Z",
            "__v": 0,
            "bio":"Passionate about food and adventure, always exploring new flavors and culinary experiences."
            
        }
    }
}
```

### Error Response:

**If validation fails, you might receive the following error response with appropriate messages:**

#### Example Response:

```json
{
    
    "success": false,
    "message": "Access denied. No token provided",
     "code" : 401
}
```


**Or if the user not found!** :

```json
{
   "success": false,
    "message": "User not found ",
    "code" : 404
   
}
```



**If there's an internal error (e.g., MongoDB connection issues)** :
```json
{
  "success": false,
  "message": "Internal Server Error. Could not register the user.",
  "code" : 500
}
```





&nbsp;



&nbsp;


&nbsp;


## Endpoint: /api/users/profile

Method: `PUT`

**Description**: This endpoint is used to update a user data. in database


## Auth Request Body:
```json 
{
    "req.body?.token" || "Authorization bearer token"
   
}
```
koi bhi ek hona chahiye Request Body || Request cookie

## Auth Request cookie:
```json 
{
    "cookies?.token"
   
}
```

## Request Body:
```json 
{
    {
  "name": "Aman Bhai",
  "bio": "Passionate about food and adventure, always exploring new flavors and culinary experiences.",
  "phoneNumber": "9049226340",
  "address": {
    "street": "45B, MG Road",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  }
    }
}

"profileImage" : "File (Image)"	
"profileImageType" : "✅ Must be an image file (JPG, PNG, or JPEG)"

```

### Success Response:

```json
{
    "success": true,
    "message": "User profile updated successfully",
    "data": {
        "user": {
            "address": {
                "street": "45B, MG Road",
                "city": "Mumbai",
                "state": "Maharashtra",
                "zipCode": "400001"
            },
            "profileImage": {
                "url": "https://res.cloudinary.com/dxsbdrwew/image/upload/v1742397016/user_profiles/lbq6evuw46jrrhvmj9hc.jpg",
                "publicId": "user_profiles/lbq6evuw46jrrhvmj9hc"
            },
            "_id": "67d678e0b11db5e1b7bb027f",
            "name": "Aman bhai",
            "email": "john.doe@example.com",
            "phoneNumber": "9049226340",
            "emailVerified": false,
            "orders": [],
            "favourites": [],
            "paymentMethods": [],
            "deliveryAddresses": [],
            "role": "customer",
            "isActive": true,
            "ratings": [],
            "createdAt": "2025-03-16T07:08:16.755Z",
            "updatedAt": "2025-03-16T07:08:16.755Z",
            "__v": 0,
            "bio": "Passionate about food and adventure, always exploring new flavors and culinary experiences"
        }
    }
}
```

### Error Response:

**If validation fails, you might receive the following error response with appropriate messages:**

#### Example Response:

```json
{
    
    "success": false,
    "message": "Access denied. No token provided",
     "code" : 401
}
```

**Or if the user input wrong** :

## Response Body :
```json 
{
    "errors": [
        {
            "type": "field",
            "value": "Am",
            "msg": "Name must be at least 3 characters",
            "path": "name",
            "location": "body"
        },
        {
            "type": "field",
            "value": "Pas",
            "msg": "Bio must be at least 12 characters",
            "path": "bio",
            "location": "body"
        },
        {
            "type": "field",
            "value": "90492263407",
            "msg": "Please provide a valid phone number",
            "path": "phoneNumber",
            "location": "body"
        },
        {
            "type": "field",
            "value": "40000000",
            "msg": "Please provide a valid zip code",
            "path": "address.zipCode",
            "location": "body"
        }
    ]
}
```
**Or if the user not found!** :

```json
{
   "success": false,
    "message": "User not found ",
    "code" : 404
   
}
```

**Or if the phone allready register** :

```json
{
    "success": false,
    "message": "Phone number already exists",
    "code":400
}
```

**Image Error** :

``` json
 {
    "Missing Image (400)" : {
  "success": false,
  "message": "Missing required parameter - profileImage"
},
"Invalid File Type (400)" : {
    {
  "success": false,
  "message": "profileImage must be a valid image file (JPEG, JPG, PNG)"
}
}


"File Too Large (413)" :{
  "success": false,
  "message": "profileImage size must be less than 2MB"
}

}
```




**If there's an internal error (e.g., MongoDB connection issues)** :
```json
{
  "success": false,
  "message": "Internal Server Error",
  "code" : 500
}
```







&nbsp;



&nbsp;


&nbsp;


## Endpoint: /api/users/delivery-address/:addressId

Method: `DELETE`

**Description**: This endpoint is used to delete single deliveryAddress. in database


## Request Body:
```json 
{
    "req.body?.token" || "Authorization bearer token"
   
}
```
koi bhi ek hona chahiye Request Body || Request cookie

## Request cookie:
```json 
{
    "cookies?.token"
   
}
```

## addressId (Required):
```json 
    "67dc2be4ce6bec79f3e2a236"
```

### Success Response:

```json
{
    "success": true,
    "message": "Delivery address deleted successfully",
    "code":200
}
```

### Error Response:

**If validation fails, you might receive the following error response with appropriate messages:**

#### Example Response:

```json
{
    
    "success": false,
    "message": "Access denied. No token provided",
     "code" : 401
}
```


**Or if the user not found!** :

```json
{
   "success": false,
    "message": "User not found ",
    "code" : 404
   
}
```

**Or if the user deliveryAddress not not found!** :

```json
{
   "success": false,
    "message": "No delivery addresses found ",
    "code" : 404
   
}
```
**Or if the user deliveryAddress length = 0** :

```json
{
   "success": false,
    "message": "Address not found!",
    "code" : 404
   
}
```

**If there's an internal error (e.g., MongoDB connection issues)** :
```json
{
  "success": false,
  "message": "Internal Server Error",
  "code" : 500
}
```




&nbsp;


&nbsp;

## Restaurant Endpoints

### Endpoint: `/api/restaurants/test`

**Method**: `GET`

**Description**: This is a test endpoint to check if the restaurants route is working.

#### Success Response:

```json
{
  "success": true,
  "message": "restaurants route working hai G"
}
```

#### error Response:

```json
{
  "success": false,
  "message": "Something went wrong"
}
```



&nbsp;


&nbsp;


### Endpoint: /api/restaurants/create

Method: `POST`

**Description**: This endpoint is used to register a new restaurants. It accepts restaurants details and creates a new restaurant in the database



## Request Body:
```json 
{
    "req.body?.token" || "Authorization bearer token"
   
}
```
koi bhi ek hona chahiye Request Body || Request cookie

## Request cookie:
```json 
{
    "cookies?.token"
   
}
```


## Request Body:
```json 
{
    "name":"Bhelpuriya",
    "address":"Naya Bhojpur",
    "city":"Dumraon",
    "state":"Bihar",
    "zipCode":"802133",
    "phoneNumber":9304922632,
    "description":"This is the Best in Local Areas"

}
```

#### Validation Checks (Before creating a user):

1. **Name**: 
   - Required.
   - Must be a string.
   - Must be at least **3 characters** long.

2. **address**: 
   - Required.
   - Must be a valid **address** (e.g., `Naya Bhojpur`).
   - Must be at least **6 characters** long.

3. **city**: 
   - Required.
   - Must be at least **4 characters** long.


4. **state**: 
   - Required.
   - must be a **4 characters** (e.g., `bihar`).

5. **zipCode**:
   - Required.
   - must be a valid zipCode (e.g., `802133`).

6. **phoneNumber** :
   - Required.
   - Must be a number.
   - must be a valid phoneNumber (e.g., `9304922632`).

7. **description**: 
   - Required.
   - Must be a string.
   - Must be at least **10 characters** long.


### Success Response:

```json
Success Response:{
    "success": true,
    "message": "Restaurant created successfully",
    "data": {
        "name": "Bhelpuriya",
        "address": "Naya Bhojpur",
        "city": "Dumraon",
        "state": "Bihar",
        "zipCode": "802133",
        "phoneNumber": "9304922632",
        "description": "This is the Best in Local Areas",
        "image": "https://example.com/default-restaurant.jpg",
        "rating": 0,
        "reviews": [],
        "menu": [],
        "isDeleted": false,
        "deletedAt": null,
        "isVerified": false,
        "verifiedAt": null,
        "verifiedBy": null,
        "verifiedReason": null,
        "isBlocked": false,
        "blockedAt": null,
        "blockedBy": null,
        "blockedReason": null,
        "createdBy": "67d678e0b11db5e1b7bb027f",
        "_id": "67de7f5cb22322ee01b72dbe",
        "createdAt": "2025-03-22T09:14:04.415Z",
        "updatedAt": "2025-03-22T09:14:04.419Z",
        "__v": 0
    }
}
```

### Error Response:

**If validation fails, you might receive the following error response with appropriate messages:**

#### Example Response:

```json
{
{
    "errors": [
        {
            "type": "field",
            "msg": "Please provide a valid Indian ZIP code",
            "path": "zipCode",
            "location": "body"
        },
        {
            "type": "field",
            "msg": "Please provide a valid 10-digit phone number",
            "path": "phoneNumber",
            "location": "body"
        }
    ]
}
}
```


**Or if the restaurant already exists** :

```json
{
    "success": false,
    "message": "Restaurant with this name and address already exists"
}
```

**Or if the userRole customer not match** :

```json
{
    "success": false,
    "message": "Admin or restaurant owner access required"
}
```

**Or if the restourant name allready  exists** :

```json
{
    "success": false,
    "message": "Restaurant with this name and address already exists"
}
```


**If there's an internal error (e.g., MongoDB connection issues)** :
```json

{
  "success": false,
  "message": "Internal Server"
}
```

&nbsp;

&nbsp;


### Endpoint: /api/restaurants/all

Method: `GET`

**Description**: This endpoint is used to GET a all restaurants. in the database

## Request Body:
```json 
{ 

}
```

### Success Response:

```json
Success Response:{
    "success": true,
    "message": "Restaurants fetched successfully",
    "data": [
        {
            "_id": "67de7f5cb22322ee01b72dbe",
            "name": "Bhelpuriya",
            "address": "Naya Bhojpur",
            "city": "Dumraon",
            "state": "Bihar",
            "zipCode": "802133",
            "phoneNumber": "9304922632",
            "description": "This is the Best in Local Areas",
            "image": "https://example.com/default-restaurant.jpg",
            "rating": 0,
            "isDeleted": false,
            "deletedAt": null,
            "isVerified": false,
            "verifiedAt": null,
            "verifiedBy": null,
            "verifiedReason": null,
            "isBlocked": false,
            "blockedAt": null,
            "blockedBy": null,
            "blockedReason": null,
            "createdBy": "67d678e0b11db5e1b7bb027f",
            "createdAt": "2025-03-22T09:14:04.415Z",
            "updatedAt": "2025-03-22T09:14:04.419Z",
            "__v": 0
        }
    ]
}
```

### Error Response:

**If fails, you might receive the following error response with appropriate messages:**

#### Example Response:

```json
{
{
    "success": false,
    "message": "No restaurants found"
}
}
```


**If there's an internal error (e.g., MongoDB connection issues)** :
```json

{
  "success": false,
  "message": "Internal Server Error"
}
```

&nbsp;

&nbsp;





### Endpoint: /api/restaurants/67de6f8189aa7fc08c350b7c

Method: `GET`

**Description**: This endpoint is used to GET a single restaurant. in the database


## Request Body:
```json 
{ 

}
```

## Request Params 


```json
{
"restaurantId":"67de6f8189aa7fc08c350b7c"
}
```
### Success Response:

```json
Success Response:{
    "success": true,
    "message": "Restaurant fetched successfully",
    "data": {
        "_id": "67de820eb22322ee01b72dc4",
        "name": "Bhelpuriya",
        "address": "Naya Bhojpur",
        "city": "Dumraon",
        "state": "Bihar",
        "zipCode": "802133",
        "phoneNumber": "9304922632",
        "description": "This is the Best in Local Areas",
        "image": "https://example.com/default-restaurant.jpg",
        "rating": 0,
        "reviews": [],
        "menu": [],
        "isDeleted": false,
        "deletedAt": null,
        "isVerified": false,
        "verifiedAt": null,
        "verifiedBy": null,
        "verifiedReason": null,
        "isBlocked": false,
        "blockedAt": null,
        "blockedBy": null,
        "blockedReason": null,
        "createdBy": "67d678e0b11db5e1b7bb027f",
        "createdAt": "2025-03-22T09:25:34.797Z",
        "updatedAt": "2025-03-22T09:25:34.797Z",
        "__v": 0
    }
}
```


### Error Response:

**If fails, you might receive the following error response with appropriate messages:**

#### Example Response:

```json
{
    "success": false,
    "message": "Restaurant not found"
}
```


**If there's an internal error (e.g., MongoDB connection issues)** :
```json

{
  "success": false,
  "message": "Internal Server Error."
}
```





### Endpoint: /api/restaurants/67de6f8189aa7fc08c350b7c

Method: `PUT`

**Description**: This endpoint is used to Update a single restaurant. in the database


## Request Body:
```json 
{
    "req.body?.token" || "Authorization bearer token"
   
}
```
koi bhi ek hona chahiye Request Body || Request cookie

## Request cookie:
```json 
{
    "cookies?.token"
   
}
```

## Request Body:
```json 
{ 
{
    "name":"Bhelpuriya",
    "address":"Naya Bhojpur",
    "city":"Dumraon",
    "state":"Bihar",
    "zipCode":"802133",
    "phoneNumber":9304922632,
    "description":"This is the Best in Local Areas"

}
}
```

## Request Params 


```json
{
"restaurantId":"67de6f8189aa7fc08c350b7c"
}
```
### Success Response:

```json
Success Response:{
    "success": true,
    "message": "Restaurant updated successfully",
    "data": {}
}
```


### Error Response:

**If fails, you might receive the following error response with appropriate messages:**

#### Example Response:

```json
{
    "success": false,
    "message": "Restaurant not found or you are not authorized to update it"
}
```


**If there's an internal error (e.g., MongoDB connection issues)** :
```json

{
  "success": false,
  "message": "Internal Server Error."
}
```



### Endpoint: /api/restaurants/67de6f8189aa7fc08c350b7c

Method: `DELETE`

**Description**: This endpoint is used to delete a single restaurant. in the database


## Request Body:
```json 
{
    "req.body?.token" || "Authorization bearer token"
   
}
```
koi bhi ek hona chahiye Request Body || Request cookie

## Request cookie:
```json 
{
    "cookies?.token"
   
}
```

## Request Body:
```json 
{ 

}
```

## Request Params 


```json
{
"restaurantId":"67de6f8189aa7fc08c350b7c"
}
```
### Success Response:

```json
Success Response:{
    "success": true,
    "message": "Restaurant deleted successfully",
    "data": {}
}
```


### Error Response:

**If fails, you might receive the following error response with appropriate messages:**

#### Example Response:

```json
{
    "success": false,
    "message": "Restaurant not found"
}
```
**Or if the role not match** :

```json
{
    "success": false,
    "message": "Admin or restaurant owner access required"
}
```

**Or if the userId and ownerId not match** :

```json
{
    "success": false,
    "message": "You are not authorized to delete this restaurant"
}
```

**If there's an internal error (e.g., MongoDB connection issues)** :
```json

{
  "success": false,
  "message": "Internal Server. Error deleting restaurant."
}
```