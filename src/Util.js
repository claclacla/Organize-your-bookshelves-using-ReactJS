class Util {
  static getQueryParams(queryString) {
    var queryParams = [];
    
    queryString = queryString.substr(1);
    var queryParamsStr = queryString.split("&");
    var key, value;

    queryParamsStr.map(queryParamStr => {
      [ key, value ] = queryParamStr.split("=");
      queryParams[key] = value;
    });

    return queryParams;
  }
}

export default Util