import axios from 'axios';

export const loadPhotos = async (query, page) => {
  const unsplashApi = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
      Authorization: 'Client-ID rBgjzJV3DI27o7fQeuje4bJ8XdoOFJicnKchhQLK6rg',
    },
    params: {
      orientation: 'landscape',
      per_page: 12,
      query,
      page,
    },
  });
  const { data } = await unsplashApi.get(`/search/photos?`);
  console.log(data);
  return data;
};
