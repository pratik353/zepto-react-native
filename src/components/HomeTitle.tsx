import {View, Text} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeTitle = ({
  title,
  subtitle,
  color = 'black',
}: {
  title: string;
  subtitle: string;
  color?: string;
}) => {
  return (
    <View className="flex-row justify-between items-center pt-1">
      <Text className={`text-2xl font-bold`} style={{color: color}}>
        {title}
      </Text>
      {subtitle ? (
        <View className="flex-row items-center">
          <Text className={`text-2xl font-semibold text-[#FC0965]`}>
            {subtitle}
          </Text>
          <Ionicons
            name="chevron-forward-outline"
            color={'#FC0965'}
            size={22}
          />
        </View>
      ) : null}
    </View>
  );
};

export default HomeTitle;
