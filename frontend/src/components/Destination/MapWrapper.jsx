import { Wrapper, Spinner, ErrorComponent } from "@googlemaps/react-wrapper";
import Location from "./Location";

export const GoogleMap = ({ destination }) => {
  const render = (status) => {
    console.log(status);
    switch (status) {
      case "LOADING":
        return <div>This thing is loading</div>;
      case "FAILURE":
        return <div>This thing is erroring</div>;
      case "SUCCESS":
        return <Location destination={destination} />;
      default:
        return <div>Something Else Happened, just in case</div>;
    }
  };

  return (
    <Wrapper
      apiKey={process.env.REACT_APP_MAPS_API_KEY}
      libraries={["drawing", "geometry", "destinations", "visualization"]}
      render={render}
      destination={destination}
    />
  );
};
