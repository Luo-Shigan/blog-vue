import request from '@/utils/request'

/**
 * 用户登录
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise} 登录结果
 */
export const login = async (username, password) => {
  try {
    const response = await request.post('/admin/users/login', {
      username,
      password
    })
    return response
  } catch (error) {
    console.error('Login Error:', error)
    throw error
  }
}

/**
 * 用户注册
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise} 注册结果
 */
export const register = async (username, password) => {
  try {
    const response = await request.post('/admin/users/register', {
      username,
      password
    })
    return response
  } catch (error) {
    console.error('Register Error:', error)
    throw error
  }
} 