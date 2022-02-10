import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';

import axios from 'axios';
import Forecast from './components/Forecast';

const image = {
  uri: 'https://www.wallpapertip.com/wmimgs/76-769513_dark-weather.jpg',
};

// docs https://www.weatherapi.com/docs
const App: () => Node = () => {
  const [forecastWeather, setForecastWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        'http://api.weatherapi.com/v1/forecast.json?key=5fd8298eda074d4cbf8220348220602&q=auto:ip&aqi=yes&days=3&lang=pl',
      )
      .then(res => {
        setForecastWeather(res.data);
      });
  }, []);

  return forecastWeather ? (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Lokalizacja: {forecastWeather.location.name},{' '}
            {forecastWeather.location.country}
          </Text>
          <Text>Aktualny czas: {forecastWeather.location.localtime}</Text>
          <Text>
            Jakość powietrza(1-6):{' '}
            {forecastWeather.current.air_quality['us-epa-index']}
          </Text>
        </View>
        {forecastWeather.forecast.forecastday.map((forecast, index) => (
          <Forecast key={index} index={index} forecast={forecast} />
        ))}
      </ImageBackground>
    </SafeAreaView>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    'text-shadow': '2px 0 black',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    opacity: 0.7,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 25,
  },
});

export default App;
