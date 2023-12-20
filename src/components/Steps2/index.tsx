import {Text} from '@rneui/themed';
import React, {useState} from 'react';
import {Touchable, TouchableOpacity, View} from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {formatPrice} from '@utils/price';
import {ListCustomer} from './ListCustomer';
import { Modal, TouchableHighlight } from 'react-native';

type TItem = {
  time: string;
  title: string;
  desc: string;
  desc2: string;
  icon: {name: string; color: string};
  customers: string;
  customers2: string;
  getCusTomers: string;
  getCusTomers2: string;
  costsIncurred?: number;
  numberOfticket?: number;
};

export const Steps2: React.FC<{data: TItem[]; showPrice?: boolean}> = ({
  data = [],
  showPrice,

}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

  const openModal = (item: TItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };




  return (
    <View style={{paddingVertical: 16}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        {/* Your modal content here */}
        {selectedItem && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
            {/* Display the selected item's details */}
            <Text>{selectedItem.title}</Text>
            <Text>Danh sách Khách hàng lên</Text>
            <Text>{selectedItem.getCusTomers2}-{selectedItem.numberOfticket}</Text>
            <Text>Danh sách khách hàng xuống</Text>
            <Text>{selectedItem.getCusTomers}</Text>
            {/* You can add more details here */}
            <TouchableHighlight onPress={closeModal}>
              <Text>Close Modal</Text>
            </TouchableHighlight>
          </View>
        )}
      </Modal>



      {data.map((item, index) => (
        <Item
          key={index}
          isLastItem={index === data.length - 1}
          time={item.time}
          title={item.title}
          customers={item.customers}
          customers2={item.customers2}
          desc={item.desc}
          desc2={item.desc2}
          icon={item.icon}
          getCusTomers={item.getCusTomers}
          costsIncurred={showPrice ? item.costsIncurred : 0}
          numberOfticket={item.numberOfticket}
          onPress={() => openModal(item)} 
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
  desc2,
  icon,
  costsIncurred,
  numberOfticket,
  getCusTomers,
  getCusTomers2,
  onPress
}: {
  isLastItem: boolean;
} & TItem & { onPress: () => void }) => {
  return (


    <TouchableOpacity
    onPress={onPress}
    
    >
    <View style={{flexDirection: 'row', minHeight: isLastItem ? 0 : 60}}>
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
        <Text style={{fontSize: 12,fontFamily:'SVN-Gilroy-Medium', color: "grey", marginBottom: 4}}>
          {desc2}
        </Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};
