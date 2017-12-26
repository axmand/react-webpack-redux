import appConfig from "../redux/Config";
import projectData from "../redux/RootData";

class macinfo {
  static macInfo = () => {
    fetch(appConfig.fileServiceRootPath+'//device/getmac')
    .then(response => response.json())
    .then( json => {
              projectData.MacInfo = json.data
              console.log(json)
            })
    .catch(err => {console.log(err)})
    console.log(projectData.MacInfo)
  }
}

export default macinfo