import React from "react";
import "./App.css";
import '../node_modules/antd/dist/antd.css'

import Map from "./components/Map";
import IntegerStep from './components/Slider'
// import data from './data/taxiData.json'


import dotenv from "dotenv";
dotenv.config();

// const API_KEY = "AIzaSyClQCAWogPIMdz1Od4YsXT0MTDk9fe3r9E"


// ####### OLD FETCH ######
// const fetchDrivers = (count = 15) => {
//   const url = `https://qa-interview-test.qa.splytech.io/api/drivers?latitude=51.5049375&longitude=-0.0964509&count=${count}`
//   return fetch(url)
//     .then(resp => resp.json)
// }

// ####### NEW FETCH CORS ######
// const fetchDrivers = () => {
//   const url = `https://cors-anywhere.herokuapp.com/https://qa-interview-test.qa.splytech.io/api/drivers?latitude=51.5049375&longitude=-0.0964509&count=50`;
//   return fetch(url, {
//     headers: {
//       "X-Requested-With": "none",
//     }
//   }).then(resp => resp.json());
// };



class App extends React.Component {
  
  state = {
    count: 0,
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
    this.fetchDrivers()
      .then(data => {
        this.setState({
        allDrivers: data.drivers
      })})
    // this.setState({
    //   drivers: data.drivers
    // })
  }


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
  } 


  render() {
    // console.log('ENV KEY', process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    const url = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    // const url = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`
    const lat = 51.5049375
    const lng = -0.0964509
    const drivers = this.state.drivers.slice(0, this.state.count)

    return (
      < div className="App" >
        <Map isMarkerShown={true}
          googleMapURL={url}
          lat={lat}
          lng={lng}
          drivers={drivers}
          loadingElement={<div style={{ height: `100%` }}> Loading... </div>}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />} />
        < IntegerStep sliderCountChange={this.onChange} count={this.state.count} />
      </div>
    );
  }
}

export default App;
