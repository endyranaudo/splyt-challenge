import React from "react";
import "./App.css";
import '../node_modules/antd/dist/antd.css'

import Map from "./components/Map";
import IntegerStep from './components/Slider'
// import data from './data/taxiData.json'


import dotenv from "dotenv";
dotenv.config();


class App extends React.Component {
  
  state = {
    count: 1,
    totalDrivers: 50,
    drivers: [],
    allDrivers: []
  }

  fetchDrivers = () => {
    const url = `https://cors-anywhere.herokuapp.com/https://qa-interview-test.qa.splytech.io/api/drivers?latitude=51.5049375&longitude=-0.0964509&count=50`;
    return fetch(url, {
      headers: {
        "X-Requested-With": "none",
      }
    }).then(resp => resp.json());
  };

  componentDidMount() {
    this.fetchDrivers(this.state.count)
      .then(data => {
        this.setState({
        allDrivers: data.drivers,
        drivers: data.drivers
      })})
  };


  onChange = value => {
    this.setState({
      count: value
    })
    this.updateDrivers(value)
  };

  updateDrivers = (count) => {
    const {allDrivers} = this.state
    const updatedDrivers = allDrivers.filter(driver => allDrivers.indexOf(driver) <= count + 1)
    this.setState({drivers: updatedDrivers})
  }; 


  render() {
    const url = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    const lat = 51.5049375
    const lng = -0.0964509
    const drivers = this.state.drivers.slice(0, this.state.count)

    return (
      < div className="container" >
        <Map isMarkerShown={true}
          googleMapURL={url}
          lat={lat}
          lng={lng}
          drivers={drivers}
          loadingElement={<div style={{ height: `100%` }}> Loading... </div>}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />} />
        <div className="slider">
          <IntegerStep sliderCountChange={this.onChange} count={this.state.count} />
        </div>
      </div>
    )
  }
};

export default App;
