import React, {useEffect, useState} from 'react';
import {getNews} from '@httpClient/global.api';
import {StatusApiCall} from '@constants/global';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@navigation/AppNavigator.type';
import {SafeAreaView, FlatList, View, Text, Image} from 'react-native';
import {ScreenLoading} from '@components/Loading';
import { StyleSheet } from "react-native/Libraries/StyleSheet/StyleSheet";

export const News: React.FC = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation<TAppNavigation<'Home'>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {data} = await getNews();

      if (data.status === StatusApiCall.Success) {
        setData(data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          // borderWidth: 1,
    // paddingVertical: 45,
    // paddingHorizontal: 25,
          marginVertical: 10,

          borderRadius: 12,
          overflow: 'hidden',
          borderColor: 'grey',
          marginBottom: 16,
          backgroundColor: 'white',  
          borderRadius: 8,  
          marginVertical: 10,  
          

          shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 24,
        overflow: "hidden",
        marginHorizontal: 16,
        }}
      >
        <Image
          source={{uri: item.listImg[0]}}
          style={{width: '100%', height: 150}}
        />
        <View style={{
                  // borderWidth: 0.85,
                  paddingHorizontal: 12,
                  paddingVertical: 8 ,
                  borderBottomRightRadius:12,
                  borderBottomLeftRadius:12 ,
                  // borderLeftWidth: 0.75,
                  // borderBottomWidth: 0.75,
                  // borderRightWidth: 0.75,

                  }}>
          <Text
            style={{
              fontFamily:'SVN-Gilroy-Bold',
              fontSize: 16,
              textTransform: 'uppercase',
              marginBottom: 8,
              
            }}
          >
            {item.title}
          </Text>
          <Text style={{ fontSize: 12, fontFamily:'SVN-Gilroy-Medium'}} numberOfLines={3}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 16}}>
      <FlatList
        data={data}
        keyExtractor={item => item.idNews}
        renderItem={renderItem}
        ListEmptyComponent={loading ? <ScreenLoading type={'news'} /> : null}
      />
    </SafeAreaView>
  );
};

