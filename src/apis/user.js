// requests related to users
import { request } from "@/utils"

// login request
export function loginAPI (formData) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: formData
  })
}

// get user information
export function getProfileAPI () {
  return request({
    url: '/user/profile',
    method: 'GET'
  })
}