import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@fujeffrey1/common";
import mongoose from "mongoose";

const router = express.Router();

router.post(
    "/api/orders",
    requireAuth,
    [
        body("ticketId")
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage("Ticket ID is required"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        res.send({});
    }
);

export { router as newOrderRouter };
