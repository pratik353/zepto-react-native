import {View, Text, Image} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {myColors} from '../utils/Themes/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductList = ({data}) => {
  const renderProduct = ({item, index}) => {
    const component =
      index === data.length - 1 ? (
        <View
          className="flex-row justify-center items-center"
          style={{
            backgroundColor: '#FC0965',
            height: 200,
            width: 160,
            elevation: 1,
            borderRadius: 10,
            padding: 8,
          }}>
          <Text className={`text-2xl font-semibold text-white`}>See all</Text>
          <Ionicons
            name="chevron-forward-outline"
            color={myColors.white}
            size={22}
          />
        </View>
      ) : (
        <View
          className=""
          style={{
            backgroundColor: myColors.white,
            height: 200,
            width: 160,
            elevation: 1,
            borderRadius: 10,
            padding: 8,
          }}>
          <Image
            source={{
              uri: item.image,
            }}
            style={{
              flex: 0.5,
              backgroundColor: myColors.white,
            }}
          />
          <View className="" style={{flex: 0.5}}>
            <Text
              className="text-black text-[18px] font-bold mt-1"
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.name}
            </Text>
            <Text className="text-gray-400 text-[16px] mt-1">
              {item.grams} g
            </Text>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-black text-[16px] line-through">
                ₹ {item.price}
                </Text>
                <Text className="text-violet-800 font-bold text-[16px]">
                ₹ {item.discounted_price}
                </Text>
              </View>
              <View className="self-end">
                <AntDesign name="plussquareo" size={20} color={'red'} />
              </View>
            </View>
          </View>
        </View>
      );
    return component;
  };
  return (
    <View className="mt-2">
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderProduct}
        ItemSeparatorComponent={() => <View style={{width: 10}}></View>}
      />
    </View>
  );
};

export default ProductList;
