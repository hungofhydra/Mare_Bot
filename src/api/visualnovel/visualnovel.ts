import axios from 'axios';

export const queryVisualNovelByName = async (visualNovelName: string) => {
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

export const queryVisualNovelById = async (visualNovelId: string) => {
  let response = await axios({
    url: `${process.env.VNDB_URL}/vn`,
    method: 'post',
    data: {
      filters: ['id', '=', visualNovelId],
      fields:
        'title, alttitle ,image.url, length_minutes, description, rating, image.url, screenshots.url, tags.name, released, screenshots.sexual, length, tags.spoiler, tags.rating',
    },
  });
  return response.data.results;
};
