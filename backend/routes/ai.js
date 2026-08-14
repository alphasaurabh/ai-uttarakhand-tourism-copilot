const express = require("express");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const prisma = require("../config/db");
const { generateTripPlan, TripPlannerError } = require("../services/geminiTripPlanner");

const router = express.Router();

const plannerLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    message: "Too many planner requests. Please try again in a minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const plannerValidation = [
  body("destination")
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 80 })
    .withMessage("Destination is required and must be between 2 and 80 characters."),
  body("days")
    .isInt({ min: 1, max: 14 })
    .withMessage("Days must be between 1 and 14."),
  body("travellers")
    .isInt({ min: 1, max: 20 })
    .withMessage("Travellers must be between 1 and 20."),
  body("budget")
    .isInt({ min: 1000, max: 1000000 })
    .withMessage("Budget must be between 1000 and 1000000 INR."),
  body("interests")
    .isArray({ min: 1, max: 8 })
    .withMessage("Interests must be an array with 1 to 8 items."),
  body("interests.*")
    .isString()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Each interest must be between 2 and 30 characters."),
  body("travelStyle")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 40 })
    .withMessage("Travel style must be between 2 and 40 characters."),
  body("accommodationPreference")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Accommodation preference must be between 2 and 50 characters."),
  body("transportPreference")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Transport preference must be between 2 and 50 characters."),
];

router.post("/trip-plan", plannerLimiter, plannerValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid planner input.",
      errors: errors.array(),
    });
  }

  const input = {
    destination: req.body.destination.trim(),
    days: Number(req.body.days),
    travellers: Number(req.body.travellers),
    budget: Number(req.body.budget),
    interests: req.body.interests
      .map((interest) => interest.trim())
      .filter(Boolean)
      .slice(0, 8),
    travelStyle: req.body.travelStyle?.trim() || undefined,
    accommodationPreference: req.body.accommodationPreference?.trim() || undefined,
    transportPreference: req.body.transportPreference?.trim() || undefined,
  };

  try {
    let destinationContext = null;
    try {
      destinationContext = await prisma.destination.findFirst({
        where: {
          name: {
            contains: input.destination,
            mode: "insensitive",
          },
        },
        select: {
          name: true,
          location: true,
          description: true,
        },
      });
    } catch {
      destinationContext = null;
    }

    const safeDestinationContext = destinationContext
      ? {
          name: destinationContext.name,
          location: destinationContext.location,
          description: destinationContext.description.slice(0, 320),
        }
      : null;

    const plan = await generateTripPlan({
      input,
      destinationContext: safeDestinationContext,
    });

    return res.status(200).json({
      destination: input.destination,
      durationDays: input.days,
      travellers: input.travellers,
      budgetInput: input.budget,
      interests: input.interests,
      travelStyle: input.travelStyle ?? null,
      accommodationPreference: input.accommodationPreference ?? null,
      transportPreference: input.transportPreference ?? null,
      summary: plan.summary,
      days: plan.days,
      budget: plan.budget,
      tips: plan.tips,
    });
  } catch (error) {
    if (error instanceof TripPlannerError) {
      return res.status(error.statusCode).json({
        message: error.clientMessage,
      });
    }

    return res.status(500).json({
      message: "We couldn't generate your itinerary right now. Please try again.",
    });
  }
});

module.exports = router;
