// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       //target: "https://ovcm-dev.neuquen.gov.ar/diversidad", // <--- config the url based on your backend server
//       target: "http://localhost:3000", // <--- config the url based on your backend server
//       changeOrigin: true,
//     })
//   );
// };


/**Configuracion para ts (puede que este codigo deba ir en otro archivo y en otra ubicación) */

// export default defineConfig({
//   server: {
//     proxy: {
//       // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
//       '/foo': 'http://localhost:4567',
//       // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
//       '/api': {
//         target: 'http://jsonplaceholder.typicode.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//       // with RegEx: http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
//       '^/fallback/.*': {
//         target: 'http://jsonplaceholder.typicode.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/fallback/, ''),
//       },
//       // Using the proxy instance
//       '/api': {
//         target: 'http://jsonplaceholder.typicode.com',
//         changeOrigin: true,
//         configure: (proxy, options) => {
//           // proxy will be an instance of 'http-proxy'
//         },
//       },
//       // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
//       '/socket.io': {
//         target: 'ws://localhost:5174',
//         ws: true,
//       },
//     },
//   },
// })