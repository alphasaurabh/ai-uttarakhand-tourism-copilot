const { GoogleGenAI, Type } = require("@google/genai");

const MIN_DAYS = 1;
const MAX_DAYS = 14;

const itineraryResponseSchema = {
  type: Type.OBJECT,
  required: ["summary", "days", "budget", "tips"],
  properties: {
    summary: {
      type: Type.STRING,
    },

    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        required: [
          "day",
          "title",
          "places",
          "activities",
          "food",
          "cost",
          "notes",
        ],
        properties: {
          day: {
            type: Type.INTEGER,
          },

          title: {
            type: Type.STRING,
          },

          places: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["name", "description"],
              properties: {
                name: {
                  type: Type.STRING,
                },
                description: {
                  type: Type.STRING,
                },
              },
            },
          },

          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },

          food: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },

          cost: {
            type: Type.NUMBER,
          },

          notes: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
      },
    },

    budget: {
      type: Type.OBJECT,
      required: ["transport", "stay", "food", "activities", "misc"],
      properties: {
        transport: {
          type: Type.NUMBER,
        },
        stay: {
          type: Type.NUMBER,
        },
        food: {
          type: Type.NUMBER,
        },
        activities: {
          type: Type.NUMBER,
        },
        misc: {
          type: Type.NUMBER,
        },
      },
    },

    tips: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },
  },
};

class TripPlannerError extends Error {
  constructor(message, statusCode, clientMessage) {
    super(message);
    this.name = "TripPlannerError";
    this.statusCode = statusCode;
    this.clientMessage = clientMessage;
  }
}

function clampText(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function compactArray(value, maxItems, maxLengthPerItem) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems)
    .map((item) => item.slice(0, maxLengthPerItem));
}

function parseNumber(value, fallback = 0) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.max(0, Math.round(number));
}

function sanitizeDestinationContext(destinationContext) {
  if (!destinationContext || typeof destinationContext !== "object") {
    return null;
  }

  return {
    name: clampText(destinationContext.name, 80),
    location: clampText(destinationContext.location, 100),
    description: clampText(destinationContext.description, 300),
  };
}

function sanitizeAiPlan(rawPlan, requestInput) {
  if (!rawPlan || typeof rawPlan !== "object") {
    throw new TripPlannerError(
      "AI output is not an object",
      502,
      "We couldn't generate your itinerary right now. Please try again."
    );
  }

  const days = Array.isArray(rawPlan.days) ? rawPlan.days : [];

  if (days.length < 1) {
    throw new TripPlannerError(
      "AI output does not contain day entries",
      502,
      "We couldn't generate your itinerary right now. Please try again."
    );
  }

  const normalizedDayItems = days.slice(0, requestInput.days);

  const sanitizedDays = normalizedDayItems.map((item, index) => {
    const places = Array.isArray(item?.places) ? item.places : [];
    const dayNumberRaw = Number(item?.day);

    return {
      day:
        Number.isInteger(dayNumberRaw) && dayNumberRaw > 0
          ? dayNumberRaw
          : index + 1,

      title: clampText(
        item?.title || `Day ${index + 1}`,
        80
      ),

      places: places
        .filter(
          (place) =>
            place &&
            typeof place === "object"
        )
        .slice(0, 4)
        .map((place) => ({
          name: clampText(place.name, 60),
          description: clampText(place.description, 140),
        }))
        .filter(
          (place) =>
            place.name &&
            place.description
        ),

      activities: compactArray(
        item?.activities,
        4,
        70
      ),

      food: compactArray(
        item?.food,
        3,
        70
      ),

      cost: parseNumber(item?.cost),

      notes: compactArray(
        item?.notes,
        2,
        100
      ),
    };
  });

  for (const day of sanitizedDays) {
    if (
      !day.title ||
      day.places.length < 1 ||
      day.activities.length < 1 ||
      day.food.length < 1
    ) {
      throw new TripPlannerError(
        "AI output missing required day detail",
        502,
        "We couldn't generate your itinerary right now. Please try again."
      );
    }
  }

  const budget =
    rawPlan.budget &&
    typeof rawPlan.budget === "object"
      ? rawPlan.budget
      : {};

  const sanitizedBudget = {
    transport: parseNumber(budget.transport),
    stay: parseNumber(budget.stay),
    food: parseNumber(budget.food),
    activities: parseNumber(budget.activities),
    misc: parseNumber(budget.misc),
  };

  const totalEstimated =
    sanitizedBudget.transport +
    sanitizedBudget.stay +
    sanitizedBudget.food +
    sanitizedBudget.activities +
    sanitizedBudget.misc;

  const summary = clampText(
    rawPlan.summary,
    220
  );

  const tips = compactArray(
    rawPlan.tips,
    4,
    120
  );

  if (!summary || tips.length < 1) {
    throw new TripPlannerError(
      "AI output missing summary or tips",
      502,
      "We couldn't generate your itinerary right now. Please try again."
    );
  }

  return {
    summary,

    days: sanitizedDays,

    budget: {
      ...sanitizedBudget,
      totalEstimated,
    },

    tips,
  };
}

function buildPrompt(input, destinationContext) {
  const destination = sanitizeDestinationContext(
    destinationContext
  );

  const context = destination
    ? `Destination context: ${destination.name}, ${destination.location}. ${destination.description}`
    : "Destination context unavailable.";

  const optionalPreferences = [
    input.travelStyle
      ? `style=${input.travelStyle}`
      : null,

    input.accommodationPreference
      ? `stay=${input.accommodationPreference}`
      : null,

    input.transportPreference
      ? `transport=${input.transportPreference}`
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  return [
    "You are an expert Uttarakhand travel planner.",
    "Create a realistic, budget-aware and geographically sensible itinerary.",
    "Respect the user's duration, budget, travellers and interests.",
    "Do not claim live weather, availability, prices, closures or schedules.",
    "If information may change, keep it general and advise verification.",
    "Return only JSON matching the provided schema.",
    "Keep all text concise.",
    "Do not repeat the user's input.",
    "Do not include an introduction, conclusion, reasoning or markdown.",
    "",
    `destination=${input.destination}`,
    `days=${input.days}`,
    `travellers=${input.travellers}`,
    `budgetINR=${input.budget}`,
    `interests=${input.interests.join(",")}`,
    optionalPreferences
      ? optionalPreferences
      : "preferences=none",
    context,
    "",
    "Limits:",
    "2-4 places/day.",
    "2-4 activities/day.",
    "1-3 food suggestions/day.",
    "1-2 short notes/day.",
    "Use practical approximate INR costs.",
  ].join("\n");
}

function extractResponseText(response) {
  const text =
    typeof response?.text === "function"
      ? response.text()
      : response?.text;

  if (typeof text !== "string" || !text.trim()) {
    throw new TripPlannerError(
      "Gemini returned an empty response",
      502,
      "We couldn't generate your itinerary right now. Please try again."
    );
  }

  return text.trim();
}

function extractJsonPayload(text) {
  if (typeof text !== "string") {
    return null;
  }

  const trimmed = text.trim();

  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed;
  }

  const fenced = trimmed
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  if (fenced.startsWith("{") && fenced.endsWith("}")) {
    return fenced;
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return null;
}

async function generateTripPlan({
  input,
  destinationContext,
}) {
  if (!process.env.GEMINI_API_KEY) {
    throw new TripPlannerError(
      "GEMINI_API_KEY is missing",
      500,
      "AI planner is not configured on the server."
    );
  }

  if (
    !input ||
    typeof input !== "object"
  ) {
    throw new TripPlannerError(
      "Invalid trip planner input",
      400,
      "Please provide valid trip details."
    );
  }

  if (
    input.days < MIN_DAYS ||
    input.days > MAX_DAYS
  ) {
    throw new TripPlannerError(
      "Trip days out of range",
      400,
      "Days must be between 1 and 14."
    );
  }

  const model =
    process.env.GEMINI_MODEL ||
    "gemini-3.5-flash-lite";

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = buildPrompt(
    input,
    destinationContext
  );

  try {
    const response = await Promise.race([
      ai.models.generateContent({
        model,
        contents: prompt,

        config: {
          maxOutputTokens: 1800,

          responseMimeType: "application/json",

          responseSchema:
            itineraryResponseSchema,

          thinkingConfig: {
            thinkingLevel: "minimal",
          },
        },
      }),

      new Promise((_, reject) => {
        setTimeout(() => {
          reject(
            new TripPlannerError(
              "Gemini request timeout",
              504,
              "The AI planner timed out. Please try again."
            )
          );
        }, 15000);
      }),
    ]);

    if (
      process.env.NODE_ENV !== "production" &&
      response?.usageMetadata
    ) {
      console.info(
        "Gemini usage metadata",
        {
          promptTokenCount:
            response.usageMetadata
              .promptTokenCount,

          candidatesTokenCount:
            response.usageMetadata
              .candidatesTokenCount,

          totalTokenCount:
            response.usageMetadata
              .totalTokenCount,
        }
      );
    }

    let parsed;

    if (response?.parsed && typeof response.parsed === "object") {
      parsed = response.parsed;
    } else {
      const text = extractResponseText(response);
      const jsonPayload = extractJsonPayload(text);

      if (!jsonPayload) {
        throw new TripPlannerError(
          "Gemini returned unparsable JSON payload",
          502,
          "We couldn't generate your itinerary right now. Please try again."
        );
      }

      try {
        parsed = JSON.parse(jsonPayload);
      } catch {
        throw new TripPlannerError(
          "Gemini returned invalid JSON",
          502,
          "We couldn't generate your itinerary right now. Please try again."
        );
      }
    }

    return sanitizeAiPlan(
      parsed,
      input
    );
  } catch (error) {
    if (
      error instanceof TripPlannerError
    ) {
      throw error;
    }

    const status = Number(
      error?.status ||
        error?.statusCode ||
        error?.code
    );

    if (status === 429) {
      throw new TripPlannerError(
        "Gemini rate limited",
        429,
        "The AI planner is busy right now. Please try again in a moment."
      );
    }

   console.error("========== GEMINI ERROR ==========");
console.error("Message:", error?.message);
console.error("Status:", error?.status);
console.error("Status Code:", error?.statusCode);
console.error("Code:", error?.code);
console.error("Full Error:", error);
console.error("==================================");

    throw new TripPlannerError(
      "Gemini request failed",
      502,
      "We couldn't generate your itinerary right now. Please try again."
    );
  }
}

module.exports = {
  generateTripPlan,
  TripPlannerError,
};