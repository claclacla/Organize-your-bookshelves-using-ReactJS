class AppLocalStorageRepository {
  add(data) {
    var appData = JSON.parse(localStorage.getItem("AppData")) || {};

    var id = Object.keys(data)[0];
    var value = data[id];

    appData[id] = value;
    localStorage.setItem("AppData", JSON.stringify(appData));
  }

  getById(id) {
    var appData = JSON.parse(localStorage.getItem("AppData"));
    var value = null;
    
    if(appData !== null && appData[id] !== undefined) {
      value = appData[id];
    }

    return value;
  }
}

export default AppLocalStorageRepository