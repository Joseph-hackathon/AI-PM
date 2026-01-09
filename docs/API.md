# API Documentation

## Basic Information

- Base URL: `http://localhost:3000/api` (or your deployed domain)
- Content-Type: `application/json`

## Endpoints

### Trends API

#### GET /trends
Get list of trends

**Query Parameters:**
- `category` (optional): Category filter (e.g., "DeFi", "AI")
- `impact` (optional): Impact filter ("high", "medium", "low")
- `limit` (optional): Number of results (default: 50)

**Response:**
```json
{
  "trends": [
    {
      "id": 1,
      "title": "Stablecoins as Settlement Rails",
      "category": "DeFi",
      "impact": "high",
      "description": "...",
      "opportunities": ["..."],
      "sources": ["..."],
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ],
  "total": 4
}
```

#### GET /trends/search?q={query}
Search trends

**Query Parameters:**
- `q` (required): Search query

**Response:**
```json
{
  "trends": [...],
  "query": "privacy"
}
```

#### GET /trends/:id
Get specific trend

**Response:**
```json
{
  "id": 1,
  "title": "...",
  ...
}
```

### Ideas API

#### POST /ideas/generate
Generate ideas

**Request Body:**
```json
{
  "trends": ["AI Agents", "Onchain Credit"],
  "count": 10,
  "context": "Additional context (optional)"
}
```

**Response:**
```json
{
  "ideas": [
    {
      "id": 1,
      "title": "Agent-Driven Onchain Credit Platform",
      "description": "...",
      "trends": ["AI Agents", "Onchain Credit"],
      "painPoints": ["..."],
      "features": ["..."],
      "revenueModel": "...",
      "competitiveAlternatives": ["..."]
    }
  ],
  "count": 10
}
```

#### GET /ideas
Get list of ideas

#### GET /ideas/:id
Get specific idea

#### POST /ideas/:id/score
Score an idea

**Request Body:**
```json
{
  "idea": {
    "title": "...",
    "description": "...",
    "trends": ["..."]
  }
}
```

**Response:**
```json
{
  "id": 1,
  "score": 8.5,
  "evaluatedAt": "2024-01-15T00:00:00.000Z"
}
```

### Documents API

#### POST /docs/prd
Generate PRD

**Request Body:**
```json
{
  "productConcept": "Agent-Driven Credit Platform",
  "context": "Additional context (optional)",
  "requirements": ["Requirement 1", "Requirement 2"] // optional
}
```

**Response:**
```json
{
  "prd": {
    "title": "Agent-Driven Credit Platform - PRD",
    "content": "PRD content in markdown format..."
  },
  "generatedAt": "2024-01-15T00:00:00.000Z"
}
```

#### POST /docs/gtm
Generate GTM plan

**Request Body:**
```json
{
  "productConcept": "Agent-Driven Credit Platform",
  "targetMarket": "DeFi users",
  "context": "Additional context (optional)"
}
```

#### POST /docs/roadmap
Generate roadmap

**Request Body:**
```json
{
  "productConcept": "Agent-Driven Credit Platform",
  "timeline": "Q1-Q4 2024",
  "milestones": ["Milestone 1", "Milestone 2"],
  "context": "Additional context (optional)"
}
```

#### GET /docs
Get list of documents

#### GET /docs/:id
Get specific document

### Chat API

#### POST /chat
Chat with AI assistant

**Request Body:**
```json
{
  "message": "What do you think about this product idea?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant",
      "content": "Previous response"
    }
  ],
  "context": {
    "currentIdea": "...",
    "trends": ["..."]
  }
}
```

**Response:**
```json
{
  "response": "AI response content...",
  "timestamp": "2024-01-15T00:00:00.000Z"
}
```

## Error Responses

All APIs can return errors in the following format:

```json
{
  "error": "Error message"
}
```

**HTTP Status Codes:**
- `200`: Success
- `400`: Bad Request
- `404`: Resource Not Found
- `500`: Server Error
