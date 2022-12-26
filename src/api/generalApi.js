//example api request: replace with your API request here in folder API

import axiosService from '../axiosInstance'

export const getModules = async () => {
  try {
    const result = await axiosService.get('config/modules')
    return result.data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const getPages = async (params = {}) => {
  try {
    var queryString = Object.keys(params)
      .map(key => key + '=' + params[key])
      .join('&')
    return await axiosService.get(`pages?${queryString}`)
  } catch (e) {
    return Promise.reject(e)
  }
}
export const getConfigByKey = async key => {
  try {
    const result = await axiosService.get(`config?key=${key}`)
    return result.data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const getPageDetail = async (id, lang) => {
  try {
    return await axiosService.get(`pages/${id}?lang=${lang}`)
  } catch (e) {
    return Promise.reject(e)
  }
}
module.exports = {
  getModules,
  getPages,
  getConfigByKey,
  getPageDetail
}
