# Backend

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


&nbsp;


### Endpoint: /api/users/register

Method: `POST`

**Description**: This endpoint is used to register a new user. It accepts user details and creates a new user in the database

## Request Body:
```json 
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phoneNumber": "1234567890",
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




```json
Success Response:{
    "success": true,
    "message": "User registered successfully",
    "user": {
        "name": "Aditya",
        "email": "email@gmail.com",
        "phoneNumber": "9304922632",
        "isActive": true
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
  "message": "User with this email already exists."
}
```


**If there's an internal error (e.g., MongoDB connection issues)** :
```json

{
  "success": false,
  "message": "Internal Server Error. Could not register the user."
}
```





