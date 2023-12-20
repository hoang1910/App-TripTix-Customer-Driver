import {Text, Avatar} from '@rneui/themed';
import React from 'react';
import {View, TouchableOpacity, Linking, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@navigation/AppNavigator.type';
import {StyleSheet} from 'react-native';
import {useStore} from '@store/index';
import {deleteDataUser} from '@storage/common';
import {observer} from 'mobx-react-lite';
export const Content: React.FC = observer(() => {
  const navigation = useNavigation<TAppNavigation<'Home'>>();
  const {
    authentication: {setIsLogin, userInfo},
  } = useStore();
  const onClickSettings = () => {
    navigation.navigate('Settings');
  };
  const onClickPoint = () => {
    navigation.navigate('Point');
  };
  const onClickInfo = () => {
    navigation.navigate('Info');
  };
  const onClickSelectRoute = () => {
    navigation.navigate('SelectRoute');
  };
  const openFacebookPage = () => {
    Linking.openURL('https://www.facebook.com/profile.php?id=61554950033197&is_tour_dismissed=true'); // Thay thế link này bằng đường dẫn đến fanpage của bạn
  };
  const onClickLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng?', [
      {text: 'Đăng xuất', onPress: handleLogout},
      {text: 'Đóng'},
    ]);
  };

  const handleLogout = async () => {
    await deleteDataUser();
    setIsLogin(false);
  };

  return (
    <View style={styles.listProfileWrapper}>
      <View style={styles.itemMedium}>
        <Avatar
          source={require('@assets/images/bus/bus.png')}
          rounded
          size={60}
          containerStyle={{backgroundColor: '#ccc'}}
        />
        <View style={styles.textWrapper}>
          <Text
            onPress={onClickInfo}
            style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
            {userInfo.fullName}
          </Text>
          <Text onPress={onClickInfo} style={{color: '#000'}}>
            {userInfo.phone}
          </Text>
        </View>
        <Icon
          onPress={onClickInfo}
          name="chevron-right"
          size={18}
          color="gray"
        />
      </View>
      <View style={styles.itemNormal}>
        <Icon name="credit-card" size={18} color="#D2691E" />
        <View style={styles.textWrapper}>
          <Text style={{color: '#000', fontSize: 14}}>Thẻ</Text>
        </View>
        <Icon name="chevron-right" size={18} color="gray" />
      </View>
      <View style={styles.itemNormal}>
        <Icon onPress={onClickPoint} name="star" size={18} color="#DC143C" />
        <View style={styles.textWrapper}>
          <Text onPress={onClickPoint} style={{color: '#000', fontSize: 14}}>
            Đổi điểm
          </Text>
        </View>
        <Icon
          onPress={onClickPoint}
          name="chevron-right"
          size={18}
          color="gray"
        />
      </View>
      <View style={styles.itemNormal}>
        <Icon name="notifications-none" size={18} color="#FFA07A" />
        <View style={styles.textWrapper}>
          <Text style={{color: '#000', fontSize: 14}}>Thông báo</Text>
        </View>
        <Icon name="chevron-right" size={18} color="gray" />
      </View>
      <View style={styles.itemNormal}>
        <Icon name="edit-location" size={18} color="green" />
        <View style={styles.textWrapper}>
          <Text style={{color: '#000', fontSize: 14}}>Địa điểm ưa thích</Text>
        </View>
        <Icon name="chevron-right" size={18} color="gray" />
      </View>
      <View style={styles.itemNormal}>
        <Icon name="block" size={18} color="black" />
        <View style={styles.textWrapper}>
          <Text style={{color: '#000', fontSize: 14}}>Danh sách chặn</Text>
        </View>
        <Icon name="chevron-right" size={18} color="gray" />
      </View>
      <View style={styles.itemMedium}>
        <Icon name="wallet-giftcard" size={18} color="red" />
        <View style={styles.textWrapper}>
          <Text style={{color: '#000', fontSize: 14}}>Khuyến mãi</Text>
        </View>
        <Icon name="chevron-right" size={18} color="gray" />
      </View>
      <View style={styles.itemMedium}>
        <Icon
          onPress={onClickSettings}
          name="settings"
          size={18}
          color="#6495ED"
        />
        <View style={styles.textWrapper}>
          <Text onPress={onClickSettings} style={{color: '#000', fontSize: 14}}>
            Đổi mật khẩu
          </Text>
        </View>
        <Icon
          onPress={onClickSettings}
          name="chevron-right"
          size={18}
          color="gray"
        />
      </View>
      <View style={styles.itemNormal}>
        <Icon name="support-agent" size={18} color="#008B8B" />
        <View style={styles.textWrapper}>
          <Text style={{color: '#000', fontSize: 14}}>Hỗ trợ</Text>
        </View>
        <Icon name="chevron-right" size={18} color="gray" />
      </View>
      <View style={styles.itemNormal}>
        <Icon name="person-add" size={18} color="#FF1493" />
        <View style={styles.textWrapper}>
          <Text style={{color: '#000', fontSize: 14}}>Thêm bạn bè</Text>
        </View>
        <Icon name="chevron-right" size={18} color="gray" />
      </View>
      <View style={styles.itemMedium}>
        <Icon name="groups" size={18} color="#00FF00" />
        <TouchableOpacity style={styles.textWrapper} onPress={openFacebookPage}>
      <View >
        <Text style={{ color: '#000', fontSize: 14 }}>Cộng đồng</Text>
      </View>
    </TouchableOpacity>
        <Icon name="chevron-right" size={18} color="gray" />
      </View>
      <TouchableOpacity onPress={onClickLogout} style={styles.itemNormal}>
        <Icon name="logout" size={18} color="black" />
        <View style={styles.textWrapper}>
          <Text style={{color: '#000', fontSize: 14}}>Đăng xuất</Text>
        </View>
        <Icon name="chevron-right" size={18} color="gray" />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  listProfileWrapper: {
    backgroundColor: '#F5F0F6',
    flexDirection: 'column',
    display: 'flex',
    zIndex: 100,
  },
  itemMedium: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    display: 'flex',
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  itemNormal: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    display: 'flex',
    paddingLeft: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F0F6',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textWrapper: {
    flex: 1,
    marginLeft: 16,
  },
});
