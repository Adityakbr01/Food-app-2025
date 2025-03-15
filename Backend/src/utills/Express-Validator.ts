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
