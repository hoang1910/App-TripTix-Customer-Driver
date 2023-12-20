import {View, Text, TouchableOpacity} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {formatPrice} from '@utils/price';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native';

export const PopupConfirm = ({coin, onClose = () => {}, onConfirm, show}) => {
  return (
    <ReactNativeModal isVisible={show}>
      <View style={{backgroundColor: '#fff', borderRadius: 20}}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            padding: 4,
            position: 'absolute',
            right: 10,
            top: 10,
            zIndex: 10,
          }}>
          <Icon name="close-circle" size={24} color={'#ccc'} />
        </TouchableOpacity>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 18, fontWeight: '800', textAlign: 'center'}}>
            Đổi xu
          </Text>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('@assets/images/changeCoin.png')}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>
          <Text style={{textAlign: 'center', marginBottom: 16, marginTop: 24}}>
            Bạn có chắc chắn muốn đổi {formatPrice(coin)} khuyến mãi vào Tiền
            trong ví
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#ccc',
          }}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 4,
              flex: 1,
              alignItems: 'center',
              borderRightWidth: 1,
              borderRightColor: '#ccc',
            }}>
            <Text>Huỷ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 4,
              flex: 1,
              alignItems: 'center',
              borderLeftWidth: 1,
              borderLeftColor: '#ccc',
            }}>
            <Text style={{fontWeight: '600'}}>Đổi xu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};
