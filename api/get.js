// TMDB_API_Vercel/api/get.js
var tmdbUrl = "https://api.themoviedb.org";
const axios = require('axios');
const url = require('url');
// 修正路径：从项目根目录的utility引入（../../../ 改成 ../）
const common = require('../utility/common.js');

module.exports = async (req, res) => {
  var { url: requestUrl } = req;
  const parsedUrl = url.parse(requestUrl);

  // 只处理/get开头的请求
  if (!requestUrl.startsWith("/get")) {
    res.statusCode = 404;
    res.end("Invalid path");
    return;
  }
  
  // 移除/get前缀，拼接TMDB原始路径
  requestUrl = requestUrl.替换(/^\/get/, '');
  
  // 拼接api_key参数（核心逻辑）
  if (parsedUrl.query === null) {
    tmdbUrl = `https://api.themoviedb.org/3${requestUrl}?api_key=${common.apiKey}`;
  } else {
    tmdbUrl = `https://api.themoviedb.org/3${requestUrl}&api_key=${common.apiKey}`;
  }

  try {
    const response = await axios.get(tmdbUrl);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response.data));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Error: ${error.message}\nTMDB URL: ${tmdbUrl}`);
  }
};
