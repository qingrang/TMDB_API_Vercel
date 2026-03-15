// TMDB_API_Vercel/api/img.js
var imgUrl = "https://image.tmdb.org";
const axios = require('axios');
// 修正路径：从项目根目录的utility引入
const common = require('../utility/common.js');

module.exports = async (req, res) => {
  var { url: requestUrl } = req;

  // 只处理/img开头的请求
  if (!requestUrl.startsWith("/img")) {
    res.statusCode = 404;
    res.end("Invalid path");
    return;
  }
  
  // 移除/img前缀，拼接图片原始路径
  requestUrl = requestUrl.替换(/^\/img/, '');
  imgUrl = `https://image.tmdb.org${requestUrl}`;

  try {
    const response = await axios.get(imgUrl, { 
      responseType: 'arraybuffer',
      // 兼容不同图片格式
      headers: { 'Accept': 'image/*' }
    });
    // 根据响应自动设置图片类型（兼容jpg/png等）
    res.writeHead(200, {
      'Content-Type': response.headers['content-type'],
      'Content-Length': response.data.length
    });
    res.end(response.data, 'binary');
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Error: ${error.message}\nImage URL: ${imgUrl}`);
  }
};
