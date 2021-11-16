import React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import "./app.css";
import { format } from "timeago.js";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

const App = () => {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [currPlace, setCurrPlace] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4,
  });
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, lon) => {
    setCurrPlace(id);
    setViewport({ ...viewport, latitide: lat, longitude: lon });
  };

  const handleAddClick = (e) => {
    console.log(e);
    const [lon, lat] = e.lngLat;
    setNewPlace({
      lon,
      lat,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      description,
      rating,
      lat: newPlace.lat,
      lon: newPlace.lon,
    };
    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/jordan-123/ckw0r5deh3pee14nxxmfwlurn"
        onDblClick={handleAddClick}
        transitionDuration="400"
      >
        {pins.map((i) => {
          return (
            <div key={i._id}>
              <Marker
                latitude={i.lat}
                longitude={i.lon}
                offsetLeft={-viewport.zoom * 3.5}
                offsetTop={-viewport.zoom * 7}
              >
                <Room
                  style={{
                    fontSize: viewport.zoom * 7,
                    color: i.username === currentUser ? "tomato" : "slateblue",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMarkerClick(i._id, i.lat, i.lon)}
                />
              </Marker>
              {i._id === currPlace && (
                <Popup
                  latitude={i.lat}
                  longitude={i.lon}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                  onClose={() => setCurrPlace(null)}
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{i.title}</h4>
                    <label>Review</label>
                    <p className="DESC">{i.description}</p>
                    <label>Rating</label>
                    <div>{Array(i.rating).fill(<Star className="star" />)}</div>
                    <label>Information</label>
                    <span className="username">
                      Created by <b>{i.username}</b>
                    </span>
                    <span className="date">{format(i.createdAt)}</span>
                  </div>
                </Popup>
              )}
            </div>
          );
        })}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.lon}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Write Something about the place"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="sbutton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </ReactMapGL>
    </div>
  );
};

export default App;
