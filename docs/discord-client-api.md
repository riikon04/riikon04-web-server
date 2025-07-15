# Discord Client API Documentation

The Discord Client API allows applications to authenticate with Discord and control a user's Discord presence/activity through the OAuth2 flow.

Base URL: `/discord-client`

## Authentication Flow

### Get Login URL
Get a Discord authentication URL to begin the OAuth flow with presence permissions.

**Endpoint**: `GET /login`

**Response**:
```json
{
  "authUrl": "https://discord.com/api/oauth2/authorize?client_id=xxx&redirect_uri=xxx&response_type=code&scope=xxx&state=xxx"
}
```

### Handle Callback
Process the OAuth callback from Discord after user authorization.

**Endpoint**: `GET /callback`

**Query Parameters**:
- `code` (string, required): The authorization code from Discord
- `state` (string, required): The state value to verify the request

**Response**:
```json
{
  "access_token": "string",
  "refresh_token": "string",
  "expires_in": 604800
}
```

### Refresh Token
Refresh an expired access token.

**Endpoint**: `POST /refresh`

**Request Body**:
```json
{
  "refresh_token": "string"
}
```

**Response**:
```json
{
  "access_token": "string",
  "refresh_token": "string",
  "expires_in": 604800
}
```

## User Data

### Get User Profile
Retrieve the user's Discord profile information.

**Endpoint**: `GET /me`

**Headers**:
- `Authorization: Bearer <access_token>` (required)

**Response**:
```json
{
  "id": "string",
  "username": "string",
  "discriminator": "string",
  "global_name": "string",
  "avatar": "string",
  "banner": "string",
  "locale": "string",
  "email": "string",
  "verified": true,
  "mfa_enabled": false,
  "premium_type": 0
}
```

## Rich Presence

### Set User Activity/Presence
Update the user's Discord activity status.

**Endpoint**: `POST /activity`

**Headers**:
- `Authorization: Bearer <access_token>` (required)

**Request Body**:
```json
{
  "name": "Riikon Music Player",
  "type": 2,
  "state": "Song Title",
  "details": "Artist Name",
  "isPlaying": true,
  "currentPosition": 60,
  "duration": 240,
  "thumbnail": "https://example.com/image.jpg",
  "custom_status": "string",
  "emoji": {
    "name": "string",
    "id": "string",
    "animated": false
  },
  "clear": false,
  "assets": {
    "large_image": "string",
    "large_text": "string",
    "small_image": "string",
    "small_text": "string"
  }
}
```

Key parameters:
- `type`: Activity type (0: Playing, 1: Streaming, 2: Listening, 3: Watching, 5: Competing)
- `name`: Name of the application (defaults to "Riikon Music Player")
- `state`: Usually the song title 
- `details`: Usually the artist name
- `isPlaying`, `currentPosition`, `duration`: Used to calculate timestamps
- `thumbnail`: The image URL (can be base64 encoded)

**Response**:
```json
{
  "success": true,
  "message": "Activity updated",
  "result": {}
}
```

### Get Rich Presence Applications
Retrieve the list of applications that can be used for Rich Presence.

**Endpoint**: `GET /applications`

**Headers**:
- `Authorization: Bearer <access_token>` (required)

**Response**:
```json
[
  {
    "id": "string",
    "name": "string",
    "icon": "string",
    "description": "string",
    "summary": "string",
    "bot_public": true,
    "bot_require_code_grant": false,
    "terms_of_service_url": "string",
    "privacy_policy_url": "string"
  }
]
```

## Error Responses

### 400 Bad Request
Returned when a required parameter is missing.

```json
{
  "error": "State mismatch"
}
```
or
```json
{
  "error": "Refresh token is required"
}
```

### 401 Unauthorized
Returned when authentication is required.

```json
{
  "error": "Authorization token required"
}
```

### 500 Internal Server Error
Returned when an error occurs on the server.

```json
{
  "error": "Failed to get access token"
}
```
or
```json
{
  "error": "Failed to set activity",
  "details": {}
}
```
