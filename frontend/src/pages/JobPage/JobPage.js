import { useEffect, useState, Fragment } from "react";
import { GoogleMap } from "../../components/Location/MapWrapper";
import axios from "axios";

let googlePlacesService;

const MapPage = ({ pickup, dropoff }) => {
  return <GoogleMap pickup={pickup} dropoff={dropoff}></GoogleMap>;
};
// const args = { one: 1, two: 2, three: 3 const};
const JobForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    description: "",
  });

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  // const form = { pickup: 'asdada', destination: 'asdadas' }
  const handleSubmit = (event) => {
    event.preventDefault();
    const { pickup, dropoff } = form;
    // { pickup, dropoff }
    // { pickup: form.pick, dropoff: form.dropoff }
    onSubmit({ pickup, dropoff });
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
          Dropoff:{" "}
          <input
            type="text"
            name="dropoff"
            value={form.dropoff}
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
  const [pickup, setPickup] = useState();
  const [dropoff, setDropoff] = useState();

  const handleFormSubmit = ({ pickup: place, dropoff: destination }) => {
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

    /* 
        Calls the places services to get list of places matching our query
    */
    if (place) {
      const pickupRequest = {
        query: place,
        fields: ["name", "geometry"],
      };

      try {
        googlePlacesService.findPlaceFromQuery(
          pickupRequest,
          function (results, status) {
            console.log(status);
            console.log(results?.[0]);
            if (status === "OK") {
              const nextPickup = results?.[0];
              console.log(nextPickup);
              if (nextPickup) {
                setPickup(nextPickup);
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
    }
    if (destination) {
      const dropoffRequest = {
        query: destination,
        fields: ["name", "geometry"],
      };

      try {
        googlePlacesService.findPlaceFromQuery(
          dropoffRequest,
          function (results, status) {
            console.log(status);
            console.log(results?.[0]);
            if (status === "OK") {
              const nextDropoff = results?.[0];
              console.log(nextDropoff);
              if (nextDropoff) {
                setDropoff(nextDropoff);
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
    }
  };

  return (
    <Fragment>
      <MapPage pickup={pickup} dropoff={dropoff}></MapPage>
      <JobForm onSubmit={handleFormSubmit}></JobForm>
    </Fragment>
  );
};
export default JobPage;
