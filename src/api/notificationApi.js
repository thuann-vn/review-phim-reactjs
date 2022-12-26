//example api request: replace with your API request here in folder API

import axiosService from '../config/axiosService'

export const fetchNotifications = async params => {
  try {
    var queryString = Object.keys(params)
      .map(key => key + '=' + params[key])
      .join('&')
    return await axiosService.get(`notifications?${queryString}`)
  } catch (e) {
    return Promise.reject(e)
  }
}
export const clearUnreadNotifications = async () => {
  try {
    return await axiosService.post('notifications/read_all_notifications')
  } catch (e) {
    return Promise.reject(e)
  }
}

export const markNotificationAsRead = async (id, type) => {
  try {
    return await axiosService.post('notifications/read', { id, type })
  } catch (e) {
    return Promise.reject(e)
  }
}

export const markNotificationReadAll = async (id, type) => {
  try {
    return await axiosService.post('notifications/read-all')
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = {
  fetchNotifications,
  clearUnreadNotifications,
  markNotificationAsRead
}
