import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import axios from "axios";

export default class WeatherScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWeather: null,
      data: null,
      loading: true,
      temp: null,
      color: "#fff"
    };
  }

  componentDidMount() {
    this.getWeather()
  }

  getWeather = () => {
    this.setState({ loading: true });
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.post["Content-Type"] = "application/json";
    console.log("juhu");
    const url =
      "http://api.apixu.com/v1/current.json?key=5f104bb262854271bb3180525190801&q=43.5160,16.3788";
    axios
      .get(url)
      .then(response => {
        console.log(response.data);
        this.setState({ data: response.data });
        this.setState({ temp: response.data.current.temp_c });
      })
      .then(() => {
        const temp = this.state.temp;
        let color = "";
        console.log(this.state)
        if (temp < 5) color = "#ABCDEF";
        if (temp > 5 && temp < 15) color = "#FFC1C1";
        if (temp > 15) color = "#FF275D";

        this.setState({ color: color });
        console.log(this.state.color);
      })

      .catch(error => console.log(error));
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }  
  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.color }]}>
        {!this.state.loading ? (
          <View>
            <Text style={{ fontSize: 30 }}>
              Grad:{" "}
              <Text style={{ fontSize: 20 }}>
                {this.state.data.location.name}
              </Text>
            </Text>
            <Text style={{ fontSize: 30 }}>
              Temperatura: <Text>{this.state.data.current.temp_c} °C</Text>
            </Text>
            <Text style={{ fontSize: 30 }}>
              Vlaznost: <Text>{this.state.data.current.humidity}</Text>
            </Text>
            <TouchableOpacity style={{backgroundColor: '#000'}} onPress={()=>this.getWeather()}><Text style={{color: 'white',fontSize: 30}}>Trenutno vrijeme</Text></TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
