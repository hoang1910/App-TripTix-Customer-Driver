import {Text} from '@rneui/themed';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {formatPrice} from '@utils/price';

type TItem = {
  time: string;
  title: string;
  desc: string;
  desc2?: string;
  icon: {name: string; color: string};
  costsIncurred?: number;
  onPressItem?: (item?: any) => void;
  data?: any;
  disable?: boolean;
};

export const Steps: React.FC<{
  data: TItem[];
  showPrice?: boolean;
  onPressItem?: (item: any) => void;
  disable?: boolean;
}> = ({data = [], showPrice, onPressItem, disable}) => {
  return (
    <View style={{paddingVertical: 16}}>
      {data.map((item, index) => (
        <Item
          key={index}
          isLastItem={index === data.length - 1}
          time={item.time}
          title={item.title}
          desc={item.desc}
          icon={item.icon}
          costsIncurred={showPrice ? item.costsIncurred : 0}
          onPressItem={onPressItem}
          data={item}
          desc2={item.desc2}
          disable={disable}
        />
      ))}
    </View>
  );
};

const Item = ({
  isLastItem,
  time,
  title,
  desc,
  icon,
  costsIncurred,
  onPressItem,
  data,
  desc2,
  disable,
}: {
  isLastItem: boolean;
} & TItem) => {
  return (
    <TouchableOpacity
      onPress={() => onPressItem(data.stationDTO.idStation)}
      disabled={!onPressItem || disable}
      style={{flexDirection: 'row', minHeight: isLastItem ? 0 : 60}}>
      <View style={{flex: 1}}>
        <Text
          style={{
            textAlign: 'right',
            paddingHorizontal: 16,
            fontWeight: '600',
          }}>
          {time}
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          borderLeftWidth: 2,
          borderColor: isLastItem ? '#fff' : '#ccc',
          paddingHorizontal: 16,
        }}>
        <Icon1
          name={icon?.name}
          color={icon?.color}
          size={16}
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            left: -9,
          }}
        />

        <Text
          style={{
            marginBottom: 4,
          }}>
          <Text style={{fontFamily: "SVN-Gilroy-XBold", marginBottom: 4}}>{title}</Text>
          {!!costsIncurred && (
            <Text
              style={{
                fontWeight: '600',
                fontStyle: 'italic',
                fontSize: 12,
              }}>{` - ${formatPrice(costsIncurred)}`}</Text>
          )}
        </Text>
        <Text style={{fontSize: 12,fontFamily:'SVN-Gilroy-Medium', color: "grey", marginBottom: 4}}>
          {desc}
        </Text>
        {!!desc2 && (
          <Text style={{fontSize: 12,fontFamily:'SVN-Gilroy-Medium', color: 'grey', marginBottom: 16}}>
            * {desc2}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
