import {Divider, Text} from '@rneui/themed';
import {Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Dimensions} from 'react-native';
import {getNews} from '@httpClient/global.api';
import {StatusApiCall} from '@constants/global';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@navigation/AppNavigator.type';
import Carousel from 'react-native-snap-carousel';
import {ScreenLoading} from '@components/Loading';

const {width} = Dimensions.get('screen');
const banner = [
  'https://www.hyundaivna.com/wp-content/uploads/2019/02/11.jpg',
  'https://i.ibb.co/0nZhntN/anhmomo.png',
  'https://homepage.momocdn.net/blogscontents/momo-upload-api-220803151053-637951362531172965.jpg',
  'https://i.ibb.co/LnPJpsq/bus.png'
];

export const Banner: React.FC = () => {
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
        setData(data.data?.slice(0, 3));
      }
    } finally {
      setLoading(false);
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <Image
        source={{uri: item}}
        style={{
          width: '100%',
          height: 150,
          backgroundColor: 'orange',
          borderRadius: 16,
        }}
      />
    );
  };

  return (
    <View style={{marginBottom: 60}}>
      <Carousel
        data={banner}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.8}
        loop
        autoplay
      />
      <View style={{paddingHorizontal: 16}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 24,
            marginBottom: 16,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily:'SVN-Gilroy-Bold',
              flex: 1,
            }}>
            Tin tức
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('News')}>
            <Text style={{color: '#e4613b', fontFamily:'SVN-Gilroy-Medium'}}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        {loading && data.length < 1 && (
          <ScreenLoading type="listNews" length={3} />
        )}
        {data.map((item, index) => {
          return (
            <Item
              key={index}
              title={item.title}
              content={item.description}
              showLine={index !== 0}
              image={item.listImg[0]}
            />
          );
        })}
      </View>
    </View>
  );
};

const Item: React.FC<{
  showLine?: boolean;
  title: string;
  content: string;
  image: string;
}> = ({showLine = true, title, content, image}) => {
  const navigation = useNavigation<TAppNavigation<'Home'>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('News')}
      style={{flexDirection: 'row', marginBottom: 16}}>
      <Image
        source={{uri: image}}
        style={{
          backgroundColor: 'orange',
          width: 70,
          height: 70,
          borderRadius: 8,
          marginTop: showLine ? 10 : 0,
        }}
      />
      <View style={{flex: 1, marginLeft: 8}}>
        {showLine && <Divider style={{marginBottom: 10}} />}
        <Text style={{ fontFamily:'SVN-Gilroy-Bold'}} numberOfLines={1}>{title}</Text>
        <Text style={{fontFamily:'SVN-Gilroy Medium', fontSize: 12}} numberOfLines={3}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};



