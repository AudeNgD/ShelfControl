import React from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, Image } from 'react-native';

const { width } = Dimensions.get('window');

const Carousel = ({ books }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
        <Image source={{uri:'https://i.pinimg.com/originals/68/57/09/685709a8b2632bef579219d54469f358.png'}} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: width,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
  },
  image: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
});

export default Carousel;
