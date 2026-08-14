# Week 7 Gemini Prompt Testing

This document compares three prompt styles for the AI Uttarakhand Trip Planner.

## Shared Test Input

Input used for comparison:

- destination: Auli
- days: 4
- travellers: 2
- budget: 15000
- interests: Adventure, Nature
- travelStyle: Balanced

---

## Prompt 1: Simple Itinerary Generation

### Prompt

Create a 4-day Uttarakhand itinerary for Auli for 2 travellers with a budget of INR 15000 and interests in Adventure and Nature. Return JSON with summary, day-by-day plan, budget split, and tips.

### Example Output (shortened)

{
  "summary": "Balanced 4-day Auli trip with scenic exploration and moderate adventure.",
  "days": [
    {
      "day": 1,
      "title": "Arrival and Orientation",
      "places": [
        { "name": "Auli Ropeway Base", "description": "Start with views and acclimatization." },
        { "name": "Local Market", "description": "Short evening walk and local snacks." }
      ],
      "activities": ["Check-in", "Sunset viewpoint"],
      "food": ["Garhwali thali"],
      "cost": 2800,
      "notes": ["Keep first day light."]
    }
  ],
  "budget": { "transport": 3800, "stay": 5200, "food": 2600, "activities": 2200, "misc": 1200 },
  "tips": ["Carry layers.", "Confirm local transfer timings."]
}

### Strengths

- Very short prompt.
- Lowest prompt tokens.

### Weaknesses

- Less consistent with strict field limits.
- Occasionally less realistic daily routing.

---

## Prompt 2: Role-Based Planner With Constraints

### Prompt

You are a local Uttarakhand trip planner.
Create a realistic and budget-aware itinerary for:
- destination: Auli
- days: 4
- travellers: 2
- budget: INR 15000
- interests: Adventure, Nature
Constraints:
- 2 to 4 places/day
- 2 to 4 activities/day
- 1 to 3 food suggestions/day
- short practical notes
- no assumptions about live weather or availability
Return only JSON with summary, days, budget, and tips.

### Example Output (shortened)

{
  "summary": "4-day Auli route focused on accessible viewpoints, short treks, and local food within a moderate budget.",
  "days": [
    {
      "day": 1,
      "title": "Arrival and Ropeway Circuit",
      "places": [
        { "name": "Joshimath", "description": "Transit and base setup." },
        { "name": "Auli Ropeway", "description": "Scenic ascent and alpine views." },
        { "name": "Viewpoint Ridge", "description": "Short sunset walk." }
      ],
      "activities": ["Check-in", "Ropeway ride", "Evening walk"],
      "food": ["Garhwali dal-rice", "Seasonal soup"],
      "cost": 3300,
      "notes": ["Prebook ropeway slots.", "Verify road condition locally."]
    }
  ],
  "budget": { "transport": 4200, "stay": 5000, "food": 2500, "activities": 2200, "misc": 1000 },
  "tips": ["Keep buffer for weather disruptions.", "Carry cash in small towns."]
}

### Strengths

- Better realism than Prompt 1.
- Better compliance with structure and constraints.

### Weaknesses

- Slightly higher prompt token use than Prompt 1.

---

## Prompt 3: Compact Production Prompt (Chosen)

### Prompt

You are an expert Uttarakhand travel planner.
Create a realistic, budget-aware and geographically sensible itinerary.
Respect the user's duration, budget, travellers and interests.
Do not claim live weather, availability, prices, closures or schedules.
If information may change, keep it general and advise verification.
Return only JSON matching the provided schema.
Keep all text concise.
Do not repeat the user's input.
Do not include an introduction, conclusion, reasoning or markdown.

destination={destination}
days={days}
travellers={travellers}
budgetINR={budget}
interests={interests}
preferences={travelStyle, accommodationPreference, transportPreference}
destinationContext={name, location, description if available}

Limits:
- 2-4 places/day
- 2-4 activities/day
- 1-3 food suggestions/day
- 1-2 short notes/day
- practical approximate INR costs

### Strengths

- Best balance between output quality and token usage.
- Compact enough to keep input tokens low.
- Explicit constraints improve itinerary consistency.
- Structured JSON makes the output predictable for the frontend.
- Destination context can be reused from the database instead of asking Gemini to regenerate basic information.
- Concise output limits keep generation costs controlled.

### Weaknesses

- Slightly more input tokens than the simplest prompt.
- Requires server-side validation of the structured AI response.

### Actual Test Result

For the 4-day Auli test:

- Input tokens: approximately 193
- Output tokens: approximately 909
- Total tokens: approximately 1,102

The generated itinerary successfully returned HTTP 200 and included a day-by-day itinerary, budget breakdown and travel tips.