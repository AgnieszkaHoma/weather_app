import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Forecast = ({forecast, index, ...rest}) => {
  return (
    <View style={styles.forecast}>
      <Text>{getDayTitle(index)}</Text>
      <Text>Stan nieba: {forecast.day.condition.text}</Text>
      <Image
        source={{uri: 'http:' + forecast.day.condition.icon}}
        style={{width: 64, height: 64}}
      />
      <Text>Ciśnienie: {forecast.hour[0].pressure_mb}hPa</Text>
      <Text>Wilgotność: {forecast.hour[0].humidity}%</Text>
      <Text>Wschód słońca: {forecast.astro.sunrise}</Text>
      <Text>Zachód słońca: {forecast.astro.sunset}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  forecast: {
    opacity: 0.7,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingBottom: 20,
  },
});

const getDayTitle = index => {
  switch (index) {
    case 0:
      return 'Dzisiaj';
    case 1:
      return 'Jutro';
    case 2:
      return 'Pojutrze';
  }
};

export default Forecast;
