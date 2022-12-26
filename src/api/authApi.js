//example api request: replace with your API request here in folder API

import axiosService from '../config/axiosService'

export const authRegister = async params => {
  try {
    return await axiosService.post('auth/register', params)
  } catch (e) {
    return Promise.reject(e)
  }
}
export const authGoogleLogin = async params => {
  try {
    return await axiosService.post('google-login', params)
  } catch (e) {
    return Promise.reject(e)
  }
}
export const authFacebookLogin = async params => {
  try {
    return await axiosService.post('facebook-login', params)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const authAppleLogin = async params => {
  try {
    return await axiosService.post('apple-login', params)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const authForgotPassword = async params => {
  try {
    return await axiosService.post('forgot-password', params)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const authResetPassword = async params => {
  try {
    return await axiosService.post('reset-password', params)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const verifyOtp = async params => {
  try {
    return await axiosService.post('verify-email-otp', params)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const authChangePassword = async params => {
  try {
    return await axiosService.put('member/change-password', params)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const ping = async params => {
  try {
    return await axiosService.get('member/ping', params)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const getProfile = async params => {
  try {
    return await axiosService.get('member/profile', params)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const deleteProfile = async () => {
  try {
    return await axiosService.post('member/delete-account')
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = {
  verifyOtp,
  authForgotPassword,
  authResetPassword,
  authChangePassword,
  authGoogleLogin,
  authFacebookLogin,
  authAppleLogin,
  getProfile,
  deleteProfile
}
