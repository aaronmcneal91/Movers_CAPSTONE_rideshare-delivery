import { useEffect, useState, Fragment } from "react";
import { GoogleMap } from "../../components/Location/MapWrapper";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
let googlePlacesService;

const MapPage = ({ pickup, dropoff }) => {
  return <GoogleMap pickup={pickup} dropoff={dropoff}></GoogleMap>;
};
// const args = { one: 1, two: 2, three: 3 const};
const JobForm = ({ onMap, onStart }) => {
  const [disabled, setDisabled] = useState(false);
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
    setDisabled(!pickup || !dropoff);
    onMap({ pickup, dropoff });
  };

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
        <div>
          <button
            type="submit"
            style={{ borderColor: "orange", color: "orange" }}
          >
            Map Trip
          </button>
          <button
            type="button"
            style={{ borderColor: "green", color: "green", marginLeft: "15px" }}
            disabled={disabled}
            onClick={() => onStart()}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

const JobPage = ({ client }) => {
  const [pickup, setPickup] = useState();
  const [dropoff, setDropoff] = useState();
  const [work, setWork] = useState();
  const [user, token] = useAuth();
  const [trip, setTrip] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  console.log(client);
  const clientId =
    client?.id ||
    (localStorage.getItem("client") &&
      JSON.parse(localStorage.getItem("client"))?.id);
  console.log(client);

  const handleMapTrip = ({ pickup: place, dropoff: destination }) => {
    /*  If its not defined create it */
    setTo(destination);
    setFrom(place);

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

  const handleStartTrip = async (client) => {
    console.log("called handle start");
    if (pickup && dropoff) {
      console.log(pickup);
      console.log({
        pickup: from,
        dropoff: to,
        pickuplat: pickup.geometry.location.lat(),
        pickuplng: pickup.geometry.location.lng(),
        dropofflat: dropoff.geometry.location.lat(),
        dropofflng: dropoff.geometry.location.lng(),
        client_id: clientId,
      });
      try {
        let response = await axios.post(
          `http://127.0.0.1:8000/api/movers/trips`,
          {
            pickup: from,
            dropoff: to,
            pickuplat: pickup.geometry.location.lat(),
            pickuplng: pickup.geometry.location.lng(),
            dropofflat: dropoff.geometry.location.lat(),
            dropofflng: dropoff.geometry.location.lng(),
            client_id: clientId,
          }
        );
        console.log(response.data);
        // setTrip(response.data);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.error("No pick and/or dropoff added");
    }
  };

  return (
    <Fragment>
      <MapPage pickup={pickup} dropoff={dropoff} work={work}></MapPage>
      <JobForm onMap={handleMapTrip} onStart={handleStartTrip}></JobForm>
    </Fragment>
  );
};
export default JobPage;