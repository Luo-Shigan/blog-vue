import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api',  // 保持与 vite 代理配置一致
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    console.log('Request:', config.method, config.url, config.data)
    
    // 如果有token，添加到请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    
    return config
  },
  error => {
    // 对请求错误做些什么
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const res = response.data
    console.log('Response:', res)

    // 这里可以根据后端的数据结构进行统一处理
    if (res.code === 200) {
      return res
    } else {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  error => {
    // 对响应错误做点什么
    console.error('Response Error:', error.response || error)
    
    // 处理常见的HTTP错误
    const message = error.response?.status === 401 ? '未授权，请重新登录'
      : error.response?.status === 403 ? '拒绝访问'
      : error.response?.status === 404 ? '请求错误，未找到该资源'
      : error.response?.status === 500 ? '服务器错误'
      : error.message || '网络错误'
    
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default service 