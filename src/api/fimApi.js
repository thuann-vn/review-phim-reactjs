//example api request: replace with your API request here in folder API

import axiosService from '../axiosInstance'

export const getGenres = async () => {
  try {
    const result = await axiosService.get('genres')
    return result.data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const getFilms = async (params = {}) => {
  try {
    var queryString = Object.keys(params)
      .map(key => key + '=' + params[key])
      .join('&')
      console.log(queryString)
    return await axiosService.get(`films?${queryString}`)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const getFilmDetail = async (id, lang) => {
  try {
    return await axiosService.get(`films/${id}?lang=${lang}`)
  } catch (e) {
    return Promise.reject(e)
  }
}
export const getFilmDetailBySLug = async (slug, lang) => {
  try {
    return await axiosService.get(`films/${slug}?slug=${slug}&lang=${lang}`)
  } catch (e) {
    return Promise.reject(e)
  }
}
export default {
  getGenres,
  getFilms,
  getFilmDetail,
  getFilmDetailBySLug
};