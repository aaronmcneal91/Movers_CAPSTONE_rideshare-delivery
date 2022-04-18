import axios from "axios";

const GEO_API_URL = "http://api.geonames.org/";

/* args represents an the value of the passed in form as an object */
export const searchAddress = async (args) => {
  let url = GEO_API_URL + "geoCodeAddressJSON?username=almcaffee&q=";
  Object.keys(args).forEach((key, i) => {
    if (key !== "lat" && key !== "lng") {
      url += args[key].toString().split(" ").join("+");
      if (1 < Object.keys(args).length - 1 && args[key]) url += "+";
    }
  });
  return await axios.get(url).catch((err) => err);
};

//   searchLocation(args: any): Observable<any> {
//     let url = this.GEO_API_URL+'searchJSON?username=almcaffee&q=';
//     Object.keys(args).forEach((k, i)=> {
//       url+= '&'+k+'='+args[k];
//     });
//     return this.http.get(url);
//   }
