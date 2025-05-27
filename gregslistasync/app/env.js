// export const dev = window.location.origin.includes('localhost')
// export const baseURL = dev ? 'http://localhost:3000' : ''
// export const domain = ''
// export const audience = ''
// export const clientId = ''


// _env.js_
export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'https://sandbox.codeworksacademy.com' : ''
export const useSockets = false
export const domain = 'codeworksclassroom.auth0.com'
export const clientId = 'pOXw2OGv1LsYi7LEBmDF04RLkXQvldml'
export const audience = 'https://codeworksclassroom.com'