import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Dimensions} from 'react-native';

const GridCategories = ({data, col = 4}: {data: string[]; col?: number}) => {
  const gridItemRenderer = item => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://img.freepik.com/premium-psd/loaf-bread-with-sesame-seeds-it_1011097-17952.jpg?ga=GA1.1.1136994948.1724052848&semt=ais_hybrid',
          }}
          style={{height:100, width:`${100}%`, borderRadius: 10}}
        />
        <Text numberOfLines={1} ellipsizeMode='tail' className="text-black">{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              width: `${100 / col}%`,
            }}>
            <View style={{paddingHorizontal: 5}}>{gridItemRenderer(item)}</View>
          </View>
        );
      })}
    </View>
  );
};

export default GridCategories;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {
    // borderColor:'black',
    // borderWidth:1,
    height:120,
    // backgroundColor: '#f9c2ff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 14,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
