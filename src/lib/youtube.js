import { Innertube } from 'youtubei.js';

class YouTubeService {
    constructor() {
        this.youtube = null;
        this.init();
    }

    async init() {
        try {
            this.youtube = await Innertube.create();
        } catch (error) {
            console.error('Error initializing YouTube client:', error);
        }
    }

    async searchMusic(query, maxResults = 10) {
        try {
            if (!this.youtube) await this.init();

            const searchResults = await this.youtube.search(query, { type: 'video' });

            // Get only the first maxResults items
            const limitedResults = searchResults.videos.slice(0, maxResults);

            // Format the response data
            return limitedResults.map(item => ({
                id: item.id,
                title: item.title,
                description: item.description || '',
                channelTitle: item.author?.name || '',
                publishedAt: item.upload_date || '',
                thumbnails: {
                    default: { url: item.thumbnails[0]?.url || '' },
                    medium: { url: item.thumbnails[1]?.url || '' },
                    high: { url: item.thumbnails[2]?.url || '' }
                },
                url: `https://www.youtube.com/watch?v=${item.id}`
            }));
        } catch (error) {
            console.error('Error searching YouTube:', error);
            throw error;
        }
    }

    async getVideoDetails(videoId) {
        try {
            if (!this.youtube) await this.init();

            const video = await this.youtube.getInfo(videoId);

            if (!video) {
                throw new Error('Video not found');
            }

            return {
                id: video.basic_info.id,
                title: video.basic_info.title,
                description: video.basic_info?.short_description || '',
                channelTitle: video.basic_info.channel?.name || '',
                publishedAt: video.basic_info.publish_date || '',
                thumbnails: {
                    default: { url: video.basic_info.thumbnail?.[0].url || '' },
                    medium: { url: video.basic_info.thumbnail?.[1].url || '' },
                    high: { url: video.basic_info.thumbnail?.[2].url || '' }
                },
                duration: video.basic_info.duration || '',
                viewCount: video.basic_info.view_count?.toString() || '0',
                likeCount: video.basic_info.like_count?.toString() || '0',
                url: `https://www.youtube.com/watch?v=${video.basic_info.id}`
            };
        } catch (error) {
            console.error('Error getting video details:', error);
            throw error;
        }
    }
}

export default new YouTubeService();
