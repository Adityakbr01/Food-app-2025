import { body, validationResult } from "express-validator";
import type { NextFunction, Response, Request } from "express";


export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};

// Validation for the user registration
export const registerValidator = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a string")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

    body("email")
        .isEmail().withMessage("Please provide a valid email")
        .normalizeEmail()
    ,

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
        .matches(/\d/).withMessage("Password must contain a number")
        .matches(/[a-zA-Z]/).withMessage("Password must contain a letter"),

    body("phoneNumber")
        .notEmpty().withMessage("Phone number is required")
        .isMobilePhone("en-IN").withMessage("Please provide a valid phone number"),
    
];

export const loginValidator = [
    body("email")
        .isEmail().withMessage("Please provide a valid email")
        .normalizeEmail()
        .notEmpty().withMessage("Email is required"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
        .matches(/\d/).withMessage("Password must contain a number")
        .matches(/[a-zA-Z]/).withMessage("Password must contain a letter"),
];

export const updateUserValidator = [
    body("name")
        .optional()
        .isString().withMessage("Name must be a string")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

    body("bio")
        .optional()
        .isString().withMessage("Bio must be a string")
        .isLength({ min: 12 }).withMessage("Bio must be at least 12 characters"),

    body("phone")
        .optional()
        .isMobilePhone("en-IN").withMessage("Please provide a valid phone number"),

    body("address")
        .optional()
        .isObject().withMessage("Address must be an object"),

    body("address.street")
        .optional()
        .isString().withMessage("Street must be a string")
        .isLength({ min: 5 }).withMessage("Street must be at least 5 characters"),

    body("address.city")
        .optional()
        .isString().withMessage("City must be a string")
        .isLength({ min: 2 }).withMessage("City must be at least 2 characters"),

    body("address.state")
        .optional()
        .isString().withMessage("State must be a string")
        .isLength({ min: 2 }).withMessage("State must be at least 2 characters"),

    body("address.zipCode")
    .optional()
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage("Please provide a valid Indian ZIP code"),


        body("deliveryAddresses")
        .optional()
        .isObject().withMessage("Address must be an object"),

    body("deliveryAddresses.street")
        .optional()
        .isString().withMessage("Street must be a string")
        .isLength({ min: 5 }).withMessage("Street must be at least 5 characters"),

    body("deliveryAddresses.city")
        .optional()
        .isString().withMessage("City must be a string")
        .isLength({ min: 2 }).withMessage("City must be at least 2 characters"),

    body("deliveryAddresses.state")
        .optional()
        .isString().withMessage("State must be a string")
        .isLength({ min: 2 }).withMessage("State must be at least 2 characters"),

        body("deliveryAddresses.zipCode")
        .optional()
        .matches(/^[1-9][0-9]{5}$/)
        .withMessage("Please provide a valid Indian ZIP code"),
      
];


export const createRestaurantValidator = [
    body("name")
        .isString().withMessage("Name must be a string")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    body("address")
        .isString().withMessage("Address must be a string")
        .isLength({ min: 5 }).withMessage("Address must be at least 5 characters"),
    body("city")
        .isString().withMessage("City must be a string")
        .isLength({ min: 4 }).withMessage("City must be at least 2 characters"),
    body("state")
        .isString().withMessage("State must be a string")
        .isLength({ min: 4 }).withMessage("State must be at least 2 characters"),
    body("zipCode")
        .matches(/^[1-9][0-9]{5}$/)
        .withMessage("Please provide a valid Indian ZIP code"),
    body("phoneNumber")
        .matches(/^[0-9]{10}$/)
        .withMessage("Please provide a valid 10-digit phone number"),
    body("description").isString().isLength({ min: 10 }).withMessage("Description is required"),    
];