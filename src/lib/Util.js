class Util {
  static getQueryParams(queryString) {
    var queryParams = {};

    if(typeof queryString !== "string" || queryString.length === 0) {
      return queryParams;
    }
    
    queryString = queryString.substr(1);
    var queryParamsStr = queryString.split("&");
    var key, value;

    queryParamsStr.forEach(queryParamStr => {
      [ key, value ] = queryParamStr.split("=");
      queryParams[key] = value;
    });

    return queryParams;
  }
}

export default Util