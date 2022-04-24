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
    const { pickup, dropoff, description } = form;
    // { pickup, dropoff }
    // { pickup: form.pick, dropoff: form.dropoff }
    setDisabled(!pickup || !dropoff);
    onMap({ pickup, dropoff, description });
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
  const [description, setDescription] = useState();
  const [work, setWork] = useState();
  const [user, token] = useAuth();
  const [trip, setTrip] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  let userData;
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    console.log(storedUserData);
    userData = JSON.parse(storedUserData);
    console.log(userData);
  }

  let map, legs;
  const handleMapTrip = ({
    pickup: place,
    dropoff: destination,
    description: comments,
  }) => {
    /*  If its not defined create it */
    setTo(destination);
    setFrom(place);
    setDescription(comments);

    if (!googlePlacesService) {
      map = document.getElementById("map");
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

  const handleStartTrip = async () => {
    console.log("called handle start");
    if (pickup && dropoff) {
      const tripdetail = localStorage.getItem("tripdetail");
      if (tripdetail) {
        legs = JSON.parse(tripdetail);
      }

      console.log(pickup);
      console.log({
        pickup: from,
        dropoff: to,
        pickuplat: pickup.geometry.location.lat(),
        pickuplng: pickup.geometry.location.lng(),
        dropofflat: dropoff.geometry.location.lat(),
        dropofflng: dropoff.geometry.location.lng(),
        client_id: userData.id,
        driver_id: null,
        description,
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
            client_id: userData.id,
            driver_id: 0,
            description,
            accepted: false,
            completed: false,
          }
        );
        console.log(response.data);
        setTrip(response.data);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.error("No pick and/or dropoff added");
    }
  };

  console.log(legs);
  const distance = legs?.distance?.text;
  const duration = legs?.duration?.text;
  console.log(distance);
  console.log(duration);

  return (
    <Fragment>
      <MapPage pickup={pickup} dropoff={dropoff} work={work}></MapPage>
      {distance || duration ? (
        <div>
          <h2>Trip Detail</h2>
          <p>Pickup: {pickup}</p>
          <p>Destination: {dropoff}</p>
          <p>Distance: {distance}</p>
          <p>Time: {duration}</p>
          <div>{description}</div>
        </div>
      ) : (
        <JobForm onMap={handleMapTrip} onStart={handleStartTrip}></JobForm>
      )}
    </Fragment>
  );
};
export default JobPage;
