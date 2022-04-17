import { useEffect, useState, Fragment } from "react";
import { GoogleMap } from "../../components/Location/MapWrapper";
import axios from "axios";

let googlePlacesService;

const MapPage = ({ place }) => {
  return <GoogleMap place={place}></GoogleMap>;
};
// const args = { one: 1, two: 2, three: 3 const};
const JobForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    address: "",
  });

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form.pickup);
  };

  useEffect(() => {});

  // hit submit calls api and gets lat/lng from address - useffect
  //  call setPlace and add { lat, lng }
  // everythig is re-renderd when you add setPlace
  // next render place is passed to <GoogleMap>

  return (
    <div className="container">
      <h1>Schedule Trip</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Pickup:{" "}
          <input
            type="text"
            name="pickup"
            value={form.pickup}
            onChange={inputChange}
          />
        </label>
        <label>
          Destination:{" "}
          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={inputChange}
          />
        </label>
        <label>
          Description:{" "}
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={inputChange}
          />
        </label>
        <li>
          <button style={{ borderColor: "orange", color: "orange" }}>
            Confirm
          </button>
        </li>
      </form>
    </div>
  );
};

const JobPage = () => {
  const [place, setPlace] = useState();

  const handleFormSubmit = (pickup) => {
    /*  If its not defined create it */

    if (!googlePlacesService) {
      const map = document.getElementById("map");
      console.log(window);
      console.log(map);
      googlePlacesService = new window.google.maps.places.PlacesService(map);
    }

    /* 
            We need to send request body to places api 
            https://developers.google.com/maps/documentation/javascript/places#find_place_from_query
            the places api request body looks like:
            { 
                query: 'Some types in text', - text from the form
                fields: ['name', 'geometry'] - some values you want to get back from api
            }
        */
    const request = {
      query: pickup,
      fields: ["name", "geometry"],
    };
    /* 
            Calls the places services to get list of places matching our query
        */
    try {
      googlePlacesService.findPlaceFromQuery(
        request,
        function (results, status) {
          console.log(status);
          console.log(results?.[0]);
          if (status === "OK") {
            const nextPlace = results?.[0];
            console.log(nextPlace);
            if (nextPlace) {
              setPlace(nextPlace);
            }
            console.log("this is working too");
          } else {
            console.log("Shit is broken bruh!!!!!");
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <MapPage place={place}></MapPage>
      <JobForm onSubmit={handleFormSubmit}></JobForm>
    </Fragment>
  );
};
export default JobPage;
