# Lyrics API Documentation

The Lyrics API allows you to search for and retrieve song lyrics using the lrclib.net service. This API supports both plain text and synced (timestamped) lyrics.

Base URL: `/api/lyrics`

## Endpoints

### Search for Lyrics
Search for lyrics by artist and track name.

**Endpoint**: `GET /search`

**Query Parameters**:
- `artist_name` (string, required): The name of the artist/performer
- `track_name` (string, required): The title of the song/track

**Response**:
```json
{
  "results": [
    {
      "id": "string",
      "artistName": "string",
      "trackName": "string",
      "albumName": "string",
      "language": "string",
      "serviceId": "string",
      "serviceName": "string",
      "syncType": "string"
    }
  ]
}
```

### Get Lyrics by Artist and Track Name
Retrieve complete lyrics for a specific song by artist and track name.

**Endpoint**: `GET /get`

**Query Parameters**:
- `artist_name` (string, required): The name of the artist/performer
- `track_name` (string, required): The title of the song/track

**Response**:
```json
{
  "id": "string",
  "artistName": "string",
  "trackName": "string",
  "albumName": "string",
  "language": "string",
  "serviceId": "string",
  "serviceName": "string",
  "syncType": "string",
  "plainLyrics": "string",
  "syncedLyrics": "string",
  "parsedLyrics": [
    {
      "time": 1000,
      "text": "Lyrics line at 1 second"
    },
    {
      "time": 5000,
      "text": "Lyrics line at 5 seconds"
    }
  ]
}
```

### Get Lyrics by ID
Retrieve complete lyrics for a specific song by its ID.

**Endpoint**: `GET /:id`

**Path Parameters**:
- `id` (string, required): The unique identifier of the lyrics

**Response**:
```json
{
  "id": "string",
  "artistName": "string",
  "trackName": "string",
  "albumName": "string",
  "language": "string",
  "serviceId": "string",
  "serviceName": "string",
  "syncType": "string",
  "plainLyrics": "string",
  "syncedLyrics": "string",
  "parsedLyrics": [
    {
      "time": 1000,
      "text": "Lyrics line at 1 second"
    },
    {
      "time": 5000,
      "text": "Lyrics line at 5 seconds"
    }
  ]
}
```

Note about `parsedLyrics`:
- This field is generated server-side from the `syncedLyrics` field
- It contains an array of objects with `time` (in milliseconds) and `text` (the lyric at that timestamp)
- This format makes it easier to display synchronized lyrics in applications

## Error Responses

### 400 Bad Request
Returned when required parameters are missing.

```json
{
  "error": "Both artist_name and track_name parameters are required"
}
```
or
```json
{
  "error": "Lyrics ID is required"
}
```

### 404 Not Found
Returned when lyrics are not found.

```json
{
  "error": "Failed to get lyrics"
}
```

### 500 Internal Server Error
Returned when an error occurs on the server.

```json
{
  "error": "Failed to search lyrics"
}
```
or
```json
{
  "error": "Failed to get lyrics"
}
```

## Examples

### Example 1: Searching for lyrics

**Request**:
```
GET /api/lyrics/search?artist_name=The%20Beatles&track_name=Yesterday
```

**Response**:
```json
{
  "results": [
    {
      "id": "abc123",
      "artistName": "The Beatles",
      "trackName": "Yesterday",
      "albumName": "Help!",
      "language": "en",
      "serviceId": "spotify:123456",
      "serviceName": "Spotify",
      "syncType": "LINE_SYNCED"
    }
  ]
}
```

### Example 2: Retrieving lyrics by artist and track name

**Request**:
```
GET /api/lyrics/get?artist_name=The%20Beatles&track_name=Yesterday
```

**Response**:
```json
{
  "id": "abc123",
  "artistName": "The Beatles",
  "trackName": "Yesterday",
  "albumName": "Help!",
  "language": "en",
  "serviceId": "spotify:123456",
  "serviceName": "Spotify",
  "syncType": "LINE_SYNCED",
  "plainLyrics": "Yesterday, all my troubles seemed so far away\nNow it looks as though they're here to stay\nOh, I believe in yesterday",
  "syncedLyrics": "[00:00.00]Yesterday, all my troubles seemed so far away\n[00:05.12]Now it looks as though they're here to stay\n[00:10.44]Oh, I believe in yesterday",
  "parsedLyrics": [
    {
      "time": 0,
      "text": "Yesterday, all my troubles seemed so far away"
    },
    {
      "time": 5120,
      "text": "Now it looks as though they're here to stay"
    },
    {
      "time": 10440,
      "text": "Oh, I believe in yesterday"
    }
  ]
}
```

### Example 3: Retrieving lyrics by ID

**Request**:
```
GET /api/lyrics/abc123
```

**Response**:
```json
{
  "id": "abc123",
  "artistName": "The Beatles",
  "trackName": "Yesterday",
  "albumName": "Help!",
  "language": "en",
  "serviceId": "spotify:123456",
  "serviceName": "Spotify",
  "syncType": "LINE_SYNCED",
  "plainLyrics": "Yesterday, all my troubles seemed so far away\nNow it looks as though they're here to stay\nOh, I believe in yesterday",
  "syncedLyrics": "[00:00.00]Yesterday, all my troubles seemed so far away\n[00:05.12]Now it looks as though they're here to stay\n[00:10.44]Oh, I believe in yesterday",
  "parsedLyrics": [
    {
      "time": 0,
      "text": "Yesterday, all my troubles seemed so far away"
    },
    {
      "time": 5120,
      "text": "Now it looks as though they're here to stay"
    },
    {
      "time": 10440,
      "text": "Oh, I believe in yesterday"
    }
  ]
}
```
