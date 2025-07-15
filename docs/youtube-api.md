# YouTube API Documentation

The YouTube API allows you to search for videos and retrieve video details using the YouTubei.js library.

Base URL: `/api/youtube`

## Endpoints

### Search for Videos
Search for music videos on YouTube.

**Endpoint**: `GET /search`

**Query Parameters**:
- `q` (string, required): Search query term
- `maxResults` (integer, optional): Maximum number of results to return (default: 10)

**Response**:
```json
{
    "results": [
        {
            "id": "jPjQJYKhhk4",
            "title": {
                "runs": [
                    {
                        "text": "Phép Màu (Đàn Cá Gỗ OST) - Mounter x MAYDAYs, Minh Tốc | Official MV",
                        "bold": false,
                        "bracket": false,
                        "italics": false,
                        "strikethrough": false,
                        "error_underline": false,
                        "underline": false,
                        "deemphasize": false
                    }
                ],
                "text": "Phép Màu (Đàn Cá Gỗ OST) - Mounter x MAYDAYs, Minh Tốc | Official MV",
                "accessibility": {
                    "accessibility_data": {
                        "label": "Phép Màu (Đàn Cá Gỗ OST) - Mounter x MAYDAYs, Minh Tốc | Official MV 4 minutes, 16 seconds"
                    }
                },
                "rtl": false
            },
            "description": "Phép Màu (Đàn Cá Gỗ OST) - Mounter x MAYDAYs, Minh Tốc | Official MV Lắng nghe “Phép Màu” trên mọi nền tảng: ...",
            "channelTitle": "Mounter",
            "publishedAt": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/jPjQJYKhhk4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDwcMev8zY8k8ueyY1EUV8GPqiPjQ"
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/jPjQJYKhhk4/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC740FAQvFc080KKbwcNPAqAPBdrg"
                },
                "high": {
                    "url": ""
                }
            },
            "url": "https://www.youtube.com/watch?v=jPjQJYKhhk4"
        },
        {
            "id": "QMkvS79fxcw",
            "title": {
                "runs": [
                    {
                        "text": "5 Fingers (Wooden Fish OST) - Mounter x Nguyen Hung | Official Lyric Video",
                        "bold": false,
                        "bracket": false,
                        "italics": false,
                        "strikethrough": false,
                        "error_underline": false,
                        "underline": false,
                        "deemphasize": false
                    }
                ],
                "text": "5 Fingers (Wooden Fish OST) - Mounter x Nguyen Hung | Official Lyric Video",
                "accessibility": {
                    "accessibility_data": {
                        "label": "5 Fingers (Wooden Fish OST) - Mounter x Nguyen Hung | Official Lyric Video 3 minutes, 38 seconds"
                    }
                },
                "rtl": false
            },
            "description": "Listen to \"5 Fingers on Hand\" on all platforms: https://umvn.lnk.to/5NBT\n\n\"5 Fingers on Hand\" is the second soundtrack of the ...",
            "channelTitle": "Mounter",
            "publishedAt": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/QMkvS79fxcw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBBZDYL4dYD8Li8gCiD6cnLz3nB2w"
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/QMkvS79fxcw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCl6yx6NWEyp6rEvggkFHlR2JrBjQ"
                },
                "high": {
                    "url": ""
                }
            },
            "url": "https://www.youtube.com/watch?v=QMkvS79fxcw"
        },
        {
            "id": "pebmZ_cT0Qk",
            "title": {
                "runs": [
                    {
                        "text": "Dan Ca Go | Official Trailer | Premieres July 15, 2025",
                        "bold": false,
                        "bracket": false,
                        "italics": false,
                        "strikethrough": false,
                        "error_underline": false,
                        "underline": false,
                        "deemphasize": false
                    }
                ],
                "text": "Dan Ca Go | Official Trailer | Premieres July 15, 2025",
                "accessibility": {
                    "accessibility_data": {
                        "label": "Dan Ca Go | Official Trailer | Premieres July 15, 2025 49 seconds"
                    }
                },
                "rtl": false
            },
            "description": "\"Will you still stay here with me for a long time...\nIn these endless days and months, I fear we might not see each other ...",
            "channelTitle": "Mounter",
            "publishedAt": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/pebmZ_cT0Qk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDh6IxpO0N5C4nXjJdMuIkAINjHgQ"
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/pebmZ_cT0Qk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDbA_mu_PtqgVchvPT_Pervjmc62Q"
                },
                "high": {
                    "url": ""
                }
            },
            "url": "https://www.youtube.com/watch?v=pebmZ_cT0Qk"
        },
        {
            "id": "BCvpDgj29fU",
            "title": {
                "runs": [
                    {
                        "text": "5 Ngón Bàn Tay (Đàn Cá Gỗ Original Soundtrack)",
                        "bold": false,
                        "bracket": false,
                        "italics": false,
                        "strikethrough": false,
                        "error_underline": false,
                        "underline": false,
                        "deemphasize": false
                    }
                ],
                "text": "5 Ngón Bàn Tay (Đàn Cá Gỗ Original Soundtrack)",
                "accessibility": {
                    "accessibility_data": {
                        "label": "5 Ngón Bàn Tay (Đàn Cá Gỗ Original Soundtrack) 3 minutes, 43 seconds"
                    }
                },
                "rtl": false
            },
            "description": "Provided to YouTube by Universal Music Group 5 Ngón Bàn Tay (Đàn Cá Gỗ Original Soundtrack) · Nguyễn Hùng 5 Ngón Bàn ...",
            "channelTitle": "Nguyễn Hùng - Topic",
            "publishedAt": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/BCvpDgj29fU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBOWuMHyvX_MBzn22H4tWKEvvdJ9Q"
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/BCvpDgj29fU/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAbF2OZDY2lWqYsQ0WcA68drcyFgw"
                },
                "high": {
                    "url": ""
                }
            },
            "url": "https://www.youtube.com/watch?v=BCvpDgj29fU"
        },
        {
            "id": "j7ngzS5AIUo",
            "title": {
                "runs": [
                    {
                        "text": "ĐÀN CÁ GỖ trailer - KC: 15.07.2025",
                        "bold": false,
                        "bracket": false,
                        "italics": false,
                        "strikethrough": false,
                        "error_underline": false,
                        "underline": false,
                        "deemphasize": false
                    }
                ],
                "text": "ĐÀN CÁ GỖ trailer - KC: 15.07.2025",
                "accessibility": {
                    "accessibility_data": {
                        "label": "ĐÀN CÁ GỖ trailer - KC: 15.07.2025 49 seconds"
                    }
                },
                "rtl": false
            },
            "description": "Đăng ký kênh Youtube CGV Cinemas Vietnam để xem trailers, nhạc phim, tin tức hậu trường, tâm điểm phim mới nhất tại: ...",
            "channelTitle": "CGV Cinemas Vietnam",
            "publishedAt": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/j7ngzS5AIUo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBLKRpG20h5GRdW5MSIP4nuagRFMg"
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/j7ngzS5AIUo/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDVPgh7KT_MjLiWt9Dq8Nx-NXg9wg"
                },
                "high": {
                    "url": ""
                }
            },
            "url": "https://www.youtube.com/watch?v=j7ngzS5AIUo"
        },
        {
            "id": "HhcTaxixdSI",
            "title": {
                "runs": [
                    {
                        "text": "Phép Màu (Đàn Cá Gỗ OST) - MAYDAYs ft. Minh Tốc | Official Lyric Video",
                        "bold": false,
                        "bracket": false,
                        "italics": false,
                        "strikethrough": false,
                        "error_underline": false,
                        "underline": false,
                        "deemphasize": false
                    }
                ],
                "text": "Phép Màu (Đàn Cá Gỗ OST) - MAYDAYs ft. Minh Tốc | Official Lyric Video",
                "accessibility": {
                    "accessibility_data": {
                        "label": "Phép Màu (Đàn Cá Gỗ OST) - MAYDAYs ft. Minh Tốc | Official Lyric Video 4 minutes, 17 seconds"
                    }
                },
                "rtl": false
            },
            "description": "MAYDAYs #phepmau #dancago \"Phép màu\" là sản phẩm âm nhạc đầu tay của MAYDAYs và là nhạc phim chính thức của bộ ...",
            "channelTitle": "MAYDAYs",
            "publishedAt": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/HhcTaxixdSI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAPyvclDyklWrafSWvduX25a8i87A"
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/HhcTaxixdSI/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBcWhn0QpSomHJjAoOJ13euJHFSVw"
                },
                "high": {
                    "url": ""
                }
            },
            "url": "https://www.youtube.com/watch?v=HhcTaxixdSI"
        },
        {
            "id": "GEleN2E5yTE",
            "title": {
                "runs": [
                    {
                        "text": "Phép màu (Đàn Cá Gỗ OST) - MAYDAYs ft. Minh Tốc | Quinf cover",
                        "bold": false,
                        "bracket": false,
                        "italics": false,
                        "strikethrough": false,
                        "error_underline": false,
                        "underline": false,
                        "deemphasize": false
                    }
                ],
                "text": "Phép màu (Đàn Cá Gỗ OST) - MAYDAYs ft. Minh Tốc | Quinf cover",
                "accessibility": {
                    "accessibility_data": {
                        "label": "Phép màu (Đàn Cá Gỗ OST) - MAYDAYs ft. Minh Tốc | Quinf cover 4 minutes, 37 seconds"
                    }
                },
                "rtl": false
            },
            "description": "Lyrics: Verse 1: Ngày thay đêm Vội trôi giấc mơ êm đềm Tôi lênh đênh trên biển vắng Hoàng hôn chờ em chưa buông nắng ...",
            "channelTitle": "Quinf",
            "publishedAt": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/GEleN2E5yTE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD1IR-j3gwb-ygkKZYTUzgOVedIHQ"
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/GEleN2E5yTE/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDmCS3Rbo_9Up4utQjTbqE85JuuOA"
                },
                "high": {
                    "url": ""
                }
            },
            "url": "https://www.youtube.com/watch?v=GEleN2E5yTE"
        },
        {
            "id": "a7QQqNNaJFE",
            "title": {
                "runs": [
                    {
                        "text": "Phép Màu - MAYDAYs (1st Live at HCMC Sạp Show) | Đàn Cá Gỗ OST",
                        "bold": false,
                        "bracket": false,
                        "italics": false,
                        "strikethrough": false,
                        "error_underline": false,
                        "underline": false,
                        "deemphasize": false
                    }
                ],
                "text": "Phép Màu - MAYDAYs (1st Live at HCMC Sạp Show) | Đàn Cá Gỗ OST",
                "accessibility": {
                    "accessibility_data": {
                        "label": "Phép Màu - MAYDAYs (1st Live at HCMC Sạp Show) | Đàn Cá Gỗ OST 5 minutes, 41 seconds"
                    }
                },
                "rtl": false
            },
            "description": "Sân khấu biểu diễn trực tiếp đầu tiên của MAYDAYs tại Thành phố Hồ Chí Minh cho ca khúc hit \"Phép Màu\". #PhepMau ...",
            "channelTitle": "Universal Music Vietnam",
            "publishedAt": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/a7QQqNNaJFE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDP8rcWyZ-GvMcWUHSrn0Rb7PN6FA"
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/a7QQqNNaJFE/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAcUIFQq5WYb7qy3u5tRZ8Raocjyw"
                },
                "high": {
                    "url": ""
                }
            },
            "url": "https://www.youtube.com/watch?v=a7QQqNNaJFE"
        },
        {
            "id": "dKFEyAAXe2A",
            "title": {
                "runs": [
                    {
                        "text": "5 Ngón Bàn Tay (Đàn Cá Gỗ OST) - Mounter x Nguyễn Hùng - BẢO CV",
                        "bold": false,
                        "bracket": false,
                        "italics": false,
                        "strikethrough": false,
                        "error_underline": false,
                        "underline": false,
                        "deemphasize": false
                    }
                ],
                "text": "5 Ngón Bàn Tay (Đàn Cá Gỗ OST) - Mounter x Nguyễn Hùng - BẢO CV",
                "accessibility": {
                    "accessibility_data": {
                        "label": "5 Ngón Bàn Tay (Đàn Cá Gỗ OST) - Mounter x Nguyễn Hùng - BẢO CV 1 minute, 18 seconds"
                    }
                },
                "rtl": false
            },
            "description": "Link gốc : https://youtu.be/QMkvS79fxcw?si=XlcIKHxeribccHQX.",
            "channelTitle": "Bảo Cover",
            "publishedAt": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/dKFEyAAXe2A/hqdefault.jpg?sqp=-oaymwE2COADEI4CSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgBsASAAuADigIMCAAQARhlIGUoZTAP&rs=AOn4CLDp0DB4_RsJp6dj9U-o-V5QCq5X3w"
                },
                "medium": {
                    "url": ""
                },
                "high": {
                    "url": ""
                }
            },
            "url": "https://www.youtube.com/watch?v=dKFEyAAXe2A"
        },
        {
            "id": "4IdufsroqYw",
            "title": {
                "runs": [
                    {
                        "text": "[Cover] Phép Màu (Đàn Cá Gỗ OST) - MAYDAYs ft. Minh Tốc | Khải, JayD, Công Tuấn",
                        "bold": false,
                        "bracket": false,
                        "italics": false,
                        "strikethrough": false,
                        "error_underline": false,
                        "underline": false,
                        "deemphasize": false
                    }
                ],
                "text": "[Cover] Phép Màu (Đàn Cá Gỗ OST) - MAYDAYs ft. Minh Tốc | Khải, JayD, Công Tuấn",
                "accessibility": {
                    "accessibility_data": {
                        "label": "[Cover] Phép Màu (Đàn Cá Gỗ OST) - MAYDAYs ft. Minh Tốc | Khải, JayD, Công Tuấn 4 minutes, 37 seconds"
                    }
                },
                "rtl": false
            },
            "description": "Phép Màu (Đàn Cá Gỗ OST) - MAYDAYs Chắc cũng khá lâu rồi mình mới được hát lại một bài hát mà khiến mình có nhiều cảm ...",
            "channelTitle": "Khải Nguen",
            "publishedAt": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/4IdufsroqYw/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtIAeeN4lfuC2QyqsPJLtMMyxNKg"
                },
                "medium": {
                    "url": ""
                },
                "high": {
                    "url": ""
                }
            },
            "url": "https://www.youtube.com/watch?v=4IdufsroqYw"
        }
    ]
}
```

### Get Video Details
Retrieve detailed information about a specific YouTube video.

**Endpoint**: `GET /videos/:id`

**Path Parameters**:
- `id` (string, required): The YouTube video ID

**Response**:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "channelTitle": "string",
  "publishedAt": "string",
  "thumbnails": {
    "default": {
      "url": "string"
    },
    "medium": {
      "url": "string"
    },
    "high": {
      "url": "string"
    }
  },
  "duration": "string",
  "viewCount": "string",
  "likeCount": "string",
  "url": "https://www.youtube.com/watch?v=string"
}
```

## Error Responses

### 400 Bad Request
Returned when a required parameter is missing.

```json
{
  "error": "Search query is required"
}
```

### 404 Not Found
Returned when a video is not found.

```json
{
  "error": "Video not found"
}
```

### 500 Internal Server Error
Returned when an error occurs on the server.

```json
{
  "error": "Failed to search YouTube"
}
```
or
```json
{
  "error": "Failed to get video details"
}
```
