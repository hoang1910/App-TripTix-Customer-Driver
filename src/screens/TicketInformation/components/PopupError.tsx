import {View, Text, TouchableOpacity} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native';
import React from 'react';
import {Chip} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from 'navigation/AppNavigator.type';

export const PopupError = ({
  show,
  message,
  onBack,
}: {
  show: boolean;
  message?: string;
  onBack: () => void;
}) => {
  const navigation = useNavigation<TAppNavigation<'TicketInformation'>>();

  return (
    <ReactNativeModal isVisible={show}>
      <View style={{backgroundColor: '#fff', borderRadius: 20}}>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 18, fontWeight: '800', textAlign: 'center'}}>
            Opps!
          </Text>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('@assets/images/cancel.png')}
              style={{
                width: 100,
                height: 100,
                transform: [{scale: 2}],
              }}
            />
          </View>
          <Text style={{fontSize: 18, fontWeight: '800', textAlign: 'center'}}>
            {`Có lỗi xảy ra:\n`}
            {message}
          </Text>
        </View>
        <View style={{padding: 16}}>
          <Chip title={'Quay lại'} onPress={onBack} />
        </View>
      </View>
    </ReactNativeModal>
  );
};
