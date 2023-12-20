import {Chip} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {ButtonSwitch} from './components/ButtonSwitch';
import {Item} from './components/Item';
import {styles} from './styles';
import {ChooseProvince} from '@components/ChooseProvince';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@navigation/AppNavigator.type';
import {storage} from '@storage/index';
import {Keys} from '@constants/storage';
import {getRouteInfo} from '@httpClient/trip.api';
import {StatusApiCall} from '@constants/global';
import {useToast} from 'react-native-toast-notifications';
import {Banner} from './components/Banner';

const banners = [
  {
    from: {id: '1', title: 'Thành phố Hà Nội'},
    to: {
      id: '33',
      title: 'Hưng Yên',
    },
    image:
      'https://limody.vn/wp-content/uploads/2021/08/xe-hung-yen-ha-noi-1.jpg',
    desc: 'Bạn đang muốn di chuyển tới Hưng Yên. Bạn lo lắng không biết lựa chọn nhà xe nào cho chuyến đi hành trình của mình. Bạn muốn tìm hiểu thông tin nhà xe khách Hà Nội Hưng Yên limousine giường nằm',
  },
  {
    from: {id: '52', title: 'Tỉnh Bình Định'},
    to: {
      id: '48',
      title: 'Thành phố Đà Nẵng',
    },
    image:
      'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/06/ben-xe-da-nang-vntrip.jpg',
    desc: 'Đến Đà Nẵng, ngoài việc đi bằng máy bay, tàu hỏa thì xe khách cũng là phương tiện được rất nhiều du khách lựa chọn, ở các bến xe Đà Nẵng bạn có thể tìm cho mình rất nhiều các nhà xe với những lộ trình đi tới nhiều tỉnh thành trên cả nước, điều đó khiến xe khách trở thành một trong những phương tiện đem lại sự thuận tiện cho những chuyến đi xa',
  },
  {
    from: {id: '75', title: 'Tỉnh Đồng Nai'},
    to: {
      id: '87',
      title: 'Tỉnh Đồng Tháp',
    },
    image:
      'https://toquoc.mediacdn.vn/upload/oldcinetvn/userfiles/image/2014/dong%20thap%201.jpg',
    desc: 'Bạn đang tìm xe khách Đồng Nai đi Đồng Tháp truy cập ngay tại đây để xem số điện thoại lịch trình di chuyển của các nhà xe qua các địa điểm như Gành Hào, Giá Rai, Phước Long, Hòa Bình, Vĩnh Lợi hoàn toàn miễn phí.',
  },
];

export const SearchRoute: React.FC = () => {
  const toast = useToast();
  const navigation = useNavigation<TAppNavigation<'SearchRoute'>>();
  const {control, setValue, getValues, handleSubmit} = useForm({
    defaultValues: {
      from: '68',
      to: '79',
    },
  });

  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProvinces();
  }, []);

  const getProvinces = async () => {
    const jsonProvinces = await storage.getItem(Keys.Provinces);

    const _provinces = JSON.parse(jsonProvinces ?? '');
    const _provincesConvert = _provinces
      ? _provinces.map(item => ({
          id: item.idProvince.toString(),
          title: item.name,
        }))
      : [];
    setProvinces(_provincesConvert);
  };

  const handleSwitch = () => {
    const from = getValues('from');
    const to = getValues('to');
    setValue('from', to);
    setValue('to', from);
  };

  const handleSearch = handleSubmit(async (dataForm: any) => {
    navigation.navigate('SelectRoute', {
      fromId: dataForm.from,
      toId: dataForm.to,
    });
  });

  const handleChooseBanner = (fromId: string, toId: string) => {
    setValue('from', fromId);
    setValue('to', toId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.routeWrap}>
          <View style={{flex: 1}}>
            <Controller
              control={control}
              name="from"
              render={({field: {value, onChange}}) => (
                <ChooseProvince
                  value={value}
                  renderButton={(title, onPress) => (
                    <Item label="Điểm đi" value={title} onPress={onPress} />
                  )}
                  data={provinces}
                  onChange={onChange}
                />
              )}
            />
          </View>
          <View style={{marginHorizontal: 8}}>
            <ButtonSwitch onPress={handleSwitch} />
          </View>
          <View style={{flex: 1}}>
            <Controller
              control={control}
              name="to"
              render={({field: {value, onChange}}) => (
                <ChooseProvince
                  value={value}
                  renderButton={(title, onPress) => (
                    <Item
                      label="Điểm đến"
                      value={title}
                      onPress={onPress}
                      style={{alignItems: 'flex-end'}}
                      textStyle={{textAlign: 'right'}}
                    />
                  )}
                  data={provinces}
                  onChange={onChange}
                />
              )}
            />
          </View>
        </View>

        <Chip
          title={'Tìm kiếm'}
          containerStyle={styles.buttonSearch}
          buttonStyle={{backgroundColor: '#ef5222'}}
          onPress={handleSearch}
          disabled={isLoading}
        />
      </View>
      <ScrollView>
        {banners.map((item, index) => (
          <Banner
            key={index}
            from={item.from}
            to={item.to}
            onPress={handleChooseBanner}
            image={item.image}
            desc={item.desc}
          />
        ))}
      </ScrollView>
    </View>
  );
};
