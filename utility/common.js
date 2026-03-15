// TMDB_API_Vercel/utility/common.js
const apiKey = process.env.TMDB_API_KEY;

// 完整的空对象判断逻辑
function isObjectEmpty(obj) {
  // 未定义/空对象/空值 都返回true
  if (typeof obj === "undefined" || obj === null) {
    return true;
  }
  // 普通对象：判断是否有自有属性
  if (typeof obj === "object" && !Array.isArray(obj)) {
    return Object.keys(obj).length === 0;
  }
  // 其他类型（字符串/数组等）：非空即false
  return obj.length === 0;
}

module.exports = { apiKey, isObjectEmpty };
