import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useStore} from '@store';
import {
  getNotification,
  putSeenNotification,
} from '@httpClient/notification.api';
import {StatusApiCall} from '@constants/global';
import dayjs from 'dayjs';
import {ScreenLoading} from '@components/Loading';

export const Notification: React.FC = () => {
  const [listNoti, setListNoti] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    authentication: {userInfo},
  } = useStore();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const {data} = await getNotification(userInfo.idUserSystem);
      if (data.status === StatusApiCall.Success) {
        const list = data.data.sort((a, b) => {
          return b.createdDateL - a.createdDateL;
        });
        setListNoti(list);
        putSeenNotification(userInfo.idUserSystem);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getNotification} />
        }
        style={{padding:10}}
        data={listNoti}
        keyExtractor={item => item.idNotification}
        renderItem={({item}) => (
          <View
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              backgroundColor: item.seen ? '#fff' : '#F0F0F0',
              marginBottom: 10,
              borderRadius:20
            }}>
            {!item.seen && (
              <View
                style={{
                  width: 4,
                  height: 4,
                  backgroundColor: 'red',
                  borderRadius: 100,
                  position: 'absolute',
                  top: 8,
                  right: 8,
                }}
              />
            )}
            <Text style={{fontSize: 13, fontFamily: 'SVN-Gilroy-XBold', marginBottom: 8}}>
              Hệ thống
            </Text>
            <Text style={{ fontFamily: 'SVN-Gilroy-SemiBold'}} >{item.description}</Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 11,
                fontFamily:'SVN-Gilroy-Medium',
                textAlign: 'right',
              }}>
              {dayjs.unix(item.createdDateL).format('HH:mm - DD/MM/YYYY')}
            </Text>
          </View>
        )}
        ListEmptyComponent={() => {
          if (loading) {
            return <ScreenLoading type="notification" />;
          }
          return (
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Icon
                name="notifications-paused"
                size={80}
                style={{color: 'black'}}
              />
              <Text style={{color: 'orange'}}>Bạn không có thông báo</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#DEDEDE',
  },
});
