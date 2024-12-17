import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const IMAGES = [
  'https://img.freepik.com/premium-psd/plastic-milk-bottle-water-gallon-packaging-mockup_47987-8467.jpg?ga=GA1.1.1136994948.1724052848&semt=ais_hybrid',
  'https://img.freepik.com/premium-psd/psd-realistic-two-milk-pak-mockup_960010-203.jpg?ga=GA1.1.1136994948.1724052848&semt=ais_hybrid',
  'https://img.freepik.com/premium-psd/glossy-paper-milk-carton-packaging-mockup_439185-9545.jpg?ga=GA1.1.1136994948.1724052848&semt=ais_hybrid',
];

const SliderItem = ({item}) => {
  return (
    <Image
      source={{
        uri: item,
      }}
      style={{
        width: responsiveWidth(100),
        height:400
      }}
    />
  );
};

const Details = ({ route }) => {
  
  const { product } = route.params;

  console.log(product,'product')

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          borderWidth:1,
          // flex: 0.3,
        }}>
        <FlatList
          data={IMAGES}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment='center'
          renderItem={({item}) => <SliderItem item={item} />}
        />
      </View>
      <View>
        <Text style={{ fontSize:20, fontWeight:600}}>{product.name}</Text>
        <Text style={{ fontSize:20, fontWeight:600}}>{product.grams}</Text>
        <Text style={{ fontSize:20, fontWeight:600}}>{product.discounted_price}</Text>
        <Text style={{ fontSize:20, fontWeight:600}}>{product.price}</Text>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({});
