import axios from 'axios';
export const queryVisualNovelByName = async (visualNovelName) => {
    let response = await axios({
        url: `${process.env.VNDB_URL}/vn`,
        method: 'post',
        data: {
            filters: ['search', '=', visualNovelName],
            fields: 'title',
            results: 25,
        },
    });
    return response.data.results;
};
export const queryVisualNovelById = async (visualNovelId) => {
    let response = await axios({
        url: `${process.env.VNDB_URL}/vn`,
        method: 'post',
        data: {
            filters: ['id', '=', visualNovelId],
            fields: 'title, alttitle ,image.url, length_minutes, description, rating, image.url, screenshots.url, tags.name, released, screenshots.sexual, length, tags.spoiler, tags.rating, image.sexual',
        },
    });
    return response.data.results;
};
export const queryVisualNovelReleases = async (visualNovelId) => {
    let response = await axios({
        url: `${process.env.VNDB_URL}/release`,
        method: 'post',
        data: {
            filters: ['vn', '=', ['id', '=', visualNovelId]],
            fields: 'id, title, platforms, languages.lang, extlinks.url, patch, released',
            results: 100,
            sort: 'released',
        },
    });
    return response.data.results;
};
