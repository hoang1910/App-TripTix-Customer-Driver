import React, {useEffect, useState} from 'react';
import {getTransaction} from '@httpClient/payment.api';
import {useStore} from '@store/index';
import {StatusApiCall} from '@constants/global';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  RefreshControl,
} from 'react-native';
import {timeStampToUtc} from '@utils/time';
import {formatPrice} from '@utils/price';
import {ScreenLoading} from '@components/Loading';

export const TransactionHistory: React.FC = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    authentication: {userInfo},
  } = useStore();

  useEffect(() => {
    getTransactionHistory();
  }, []);
  const getTransactionHistory = async () => {
    try {
      setIsLoading(true);
      const {data} = await getTransaction(userInfo.idUserSystem);

      if (data.status === StatusApiCall.Success) {
        const list = data.data.sort(
          (a, b) => b.dateTimeStamp - a.dateTimeStamp,
        );
        setData(list);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 8,
          backgroundColor: index % 2 === 0 ? '#fff' : '#eeedf0',
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: item.amount > 0 ? '#03fce8' : 'orange',
            borderRadius: 200,
            padding: 10,
          }}>
          <Image
            source={
              item.amount > 0
                ? require('@assets/images/add-payment.png')
                : require('@assets/images/expenses.png')
            }
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', marginLeft: 12}}>
          <Text style={{fontWeight: '800'}}>{item.description}</Text>
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <Text
              style={{flex: 1, marginRight: 16, fontSize: 12, color: 'grey'}}>
              {timeStampToUtc(item.dateTimeStamp).format('DD/MM/YYYY - HH:mm')}
            </Text>
            <Text
              style={{
                fontWeight: '900',
                color: +item.amount < 0 ? 'red' : 'green',
                fontSize: 16,
              }}>
              {`${+item.amount > 0 ? '+' : ''}${formatPrice(item.amount)}`}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={data}
        keyExtractor={item => item.idTransaction}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getTransaction} />
        }
        ListEmptyComponent={
          isLoading ? (
            <ScreenLoading type="transaction" />
          ) : (
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('@assets/images/transaction-empty.png')}
                style={{width: 300, height: 300}}
              />
              <Text>Bạn chưa có giao dịch nào gần đây</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};
