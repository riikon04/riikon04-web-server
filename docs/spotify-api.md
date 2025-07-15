# Spotify API Documentation

The Spotify API allows you to authenticate with Spotify and interact with the Spotify service, including user data, playlists, tracks, and search functionality.

Base URL: `/api/spotify`

## Authentication Flow

### Get Login URL
Get a Spotify authentication URL to begin the OAuth flow.

**Endpoint**: `GET /login`

**Response**:
```json
{
  "authUrl": "https://accounts.spotify.com/authorize?response_type=code&client_id=xxx&scope=xxx&redirect_uri=xxx&state=xxx"
}
```

### Handle Callback
Process the OAuth callback from Spotify after user authorization.

**Endpoint**: `GET /callback`

**Query Parameters**:
- `code` (string, required): The authorization code from Spotify
- `state` (string, required): The state value to verify the request

**Response**:
```json
{
  "access_token": "string",
  "refresh_token": "string",
  "expires_in": 3600
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
  "expires_in": 3600
}
```

## User Data

### Get User Profile
Retrieve the user's Spotify profile information.

**Endpoint**: `GET /me`

**Headers**:
- `Authorization: Bearer <access_token>` (required)

**Response**:
```json
{
    "country": "VN",
    "display_name": "Thanh Triều",
    "email": "trieukon1011@gmail.com",
    "explicit_content": {
        "filter_enabled": false,
        "filter_locked": false
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/user/hgp981tupxhmm8mevobg71k53"
    },
    "followers": {
        "href": null,
        "total": 0
    },
    "href": "https://api.spotify.com/v1/users/hgp981tupxhmm8mevobg71k53",
    "id": "hgp981tupxhmm8mevobg71k53",
    "images": [],
    "product": "free",
    "type": "user",
    "uri": "spotify:user:hgp981tupxhmm8mevobg71k53"
}
```

### Get User's Playlists
Retrieve the user's Spotify playlists.

**Endpoint**: `GET /playlists`

**Headers**:
- `Authorization: Bearer <access_token>` (required)

**Query Parameters**:
- `limit` (integer, optional): Maximum number of playlists to return (default: 20)
- `offset` (integer, optional): Index of the first playlist to return (default: 0)

**Response**:
```json
{
    "href": "https://api.spotify.com/v1/users/hgp981tupxhmm8mevobg71k53/playlists?offset=0&limit=20",
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total": 3,
    "items": [
        {
            "collaborative": false,
            "description": "",
            "external_urls": {
                "spotify": "https://open.spotify.com/playlist/5WMHtxQfNI682Uh3OfsJiT"
            },
            "href": "https://api.spotify.com/v1/playlists/5WMHtxQfNI682Uh3OfsJiT",
            "id": "5WMHtxQfNI682Uh3OfsJiT",
            "images": [
                {
                    "height": 640,
                    "url": "https://mosaic.scdn.co/640/ab67616d00001e02184eaabbec799a167882e065ab67616d00001e02255ca949e450cb675edf715dab67616d00001e02557a1bfa49e5678fbdb73acdab67616d00001e02c21080fb642befe5247ac6bc",
                    "width": 640
                },
                {
                    "height": 300,
                    "url": "https://mosaic.scdn.co/300/ab67616d00001e02184eaabbec799a167882e065ab67616d00001e02255ca949e450cb675edf715dab67616d00001e02557a1bfa49e5678fbdb73acdab67616d00001e02c21080fb642befe5247ac6bc",
                    "width": 300
                },
                {
                    "height": 60,
                    "url": "https://mosaic.scdn.co/60/ab67616d00001e02184eaabbec799a167882e065ab67616d00001e02255ca949e450cb675edf715dab67616d00001e02557a1bfa49e5678fbdb73acdab67616d00001e02c21080fb642befe5247ac6bc",
                    "width": 60
                }
            ],
            "name": "Bocchi • the rock",
            "owner": {
                "display_name": "謝淯麒",
                "external_urls": {
                    "spotify": "https://open.spotify.com/user/goofy23457"
                },
                "href": "https://api.spotify.com/v1/users/goofy23457",
                "id": "goofy23457",
                "type": "user",
                "uri": "spotify:user:goofy23457"
            },
            "primary_color": null,
            "public": true,
            "snapshot_id": "AAAAEgomXwZI8Cawe3YwjHCfyD9U0wyU",
            "tracks": {
                "href": "https://api.spotify.com/v1/playlists/5WMHtxQfNI682Uh3OfsJiT/tracks",
                "total": 16
            },
            "type": "playlist",
            "uri": "spotify:playlist:5WMHtxQfNI682Uh3OfsJiT"
        },
        {
            "collaborative": false,
            "description": "",
            "external_urls": {
                "spotify": "https://open.spotify.com/playlist/2jfeIyXNNQlI5wMSJUrCoQ"
            },
            "href": "https://api.spotify.com/v1/playlists/2jfeIyXNNQlI5wMSJUrCoQ",
            "id": "2jfeIyXNNQlI5wMSJUrCoQ",
            "images": null,
            "name": "Danh sách phát của tôi #2",
            "owner": {
                "display_name": "Thanh Triều",
                "external_urls": {
                    "spotify": "https://open.spotify.com/user/hgp981tupxhmm8mevobg71k53"
                },
                "href": "https://api.spotify.com/v1/users/hgp981tupxhmm8mevobg71k53",
                "id": "hgp981tupxhmm8mevobg71k53",
                "type": "user",
                "uri": "spotify:user:hgp981tupxhmm8mevobg71k53"
            },
            "primary_color": null,
            "public": true,
            "snapshot_id": "AAAAAfX6Lf2SBJ5qUjMO/KaDO1OxYRxP",
            "tracks": {
                "href": "https://api.spotify.com/v1/playlists/2jfeIyXNNQlI5wMSJUrCoQ/tracks",
                "total": 0
            },
            "type": "playlist",
            "uri": "spotify:playlist:2jfeIyXNNQlI5wMSJUrCoQ"
        },
        {
            "collaborative": false,
            "description": "",
            "external_urls": {
                "spotify": "https://open.spotify.com/playlist/3KcQhkpHoRhqru5k8Gt7Ko"
            },
            "href": "https://api.spotify.com/v1/playlists/3KcQhkpHoRhqru5k8Gt7Ko",
            "id": "3KcQhkpHoRhqru5k8Gt7Ko",
            "images": null,
            "name": "Danh sách phát của tôi #1",
            "owner": {
                "display_name": "Thanh Triều",
                "external_urls": {
                    "spotify": "https://open.spotify.com/user/hgp981tupxhmm8mevobg71k53"
                },
                "href": "https://api.spotify.com/v1/users/hgp981tupxhmm8mevobg71k53",
                "id": "hgp981tupxhmm8mevobg71k53",
                "type": "user",
                "uri": "spotify:user:hgp981tupxhmm8mevobg71k53"
            },
            "primary_color": null,
            "public": true,
            "snapshot_id": "AAAAAdvlbyQzfH4H5fvfxaJfRwg+n8bk",
            "tracks": {
                "href": "https://api.spotify.com/v1/playlists/3KcQhkpHoRhqru5k8Gt7Ko/tracks",
                "total": 0
            },
            "type": "playlist",
            "uri": "spotify:playlist:3KcQhkpHoRhqru5k8Gt7Ko"
        }
    ]
}
```

### Get Playlist Tracks
Retrieve tracks from a specific playlist.

**Endpoint**: `GET /playlists/:id/tracks`

**Headers**:
- `Authorization: Bearer <access_token>` (required)

**Path Parameters**:
- `id` (string, required): The Spotify ID of the playlist

**Query Parameters**:
- `limit` (integer, optional): Maximum number of tracks to return (default: 100)
- `offset` (integer, optional): Index of the first track to return (default: 0)

**Response**:
```json
{
  "items": [
    {
      "track": {
        "id": "string",
        "name": "string",
        "album": {
          "id": "string",
          "name": "string",
          "images": [
            {
              "url": "string"
            }
          ]
        },
        "artists": [
          {
            "id": "string",
            "name": "string"
          }
        ],
        "duration_ms": 0,
        "preview_url": "string"
      },
      "added_at": "string"
    }
  ],
  "total": 0,
  "limit": 100,
  "offset": 0
}
```

### Get Recently Played Tracks
Retrieve the user's recently played tracks.

**Endpoint**: `GET /recently-played`

**Headers**:
- `Authorization: Bearer <access_token>` (required)

**Query Parameters**:
- `limit` (integer, optional): Maximum number of tracks to return (default: 20)

**Response**:
```json
{
  "items": [
    {
      "track": {
        "id": "string",
        "name": "string",
        "album": {
          "id": "string",
          "name": "string",
          "images": [
            {
              "url": "string"
            }
          ]
        },
        "artists": [
          {
            "id": "string",
            "name": "string"
          }
        ]
      },
      "played_at": "string"
    }
  ],
  "cursors": {
    "after": "string",
    "before": "string"
  },
  "limit": 20,
  "total": 0
}
```

## Search

### Search Spotify
Search for tracks, artists, and albums on Spotify.

**Endpoint**: `GET /search`

**Headers**:
- `Authorization: Bearer <access_token>` (required)

**Query Parameters**:
- `q` (string, required): Search query
- `type` (string, optional): Types to search for (comma-separated: track,artist,album) (default: "track,artist,album")
- `limit` (integer, optional): Maximum number of items to return per type (default: 20)
- `offset` (integer, optional): Index of the first item to return (default: 0)

**Response**:
```json
{
  "tracks": {
    "items": [
      {
        "id": "string",
        "name": "string",
        "album": {
          "id": "string",
          "name": "string",
          "images": [
            {
              "url": "string"
            }
          ]
        },
        "artists": [
          {
            "id": "string",
            "name": "string"
          }
        ],
        "duration_ms": 0,
        "popularity": 0
      }
    ]
  },
  "artists": {
    "items": [
      {
        "id": "string",
        "name": "string",
        "images": [
          {
            "url": "string"
          }
        ],
        "genres": [
          "string"
        ],
        "popularity": 0
      }
    ]
  },
  "albums": {
    "items": [
      {
        "id": "string",
        "name": "string",
        "images": [
          {
            "url": "string"
          }
        ],
        "artists": [
          {
            "id": "string",
            "name": "string"
          }
        ],
        "release_date": "string"
      }
    ]
  }
}
```
