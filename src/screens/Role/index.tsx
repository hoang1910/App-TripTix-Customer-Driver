import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import {Button, Text} from '@rneui/themed';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Images} from '@assets/images';
import {TAuthNavigation} from '@navigation/AuthNavigator.type';
import {EAccountType} from '@enums';
export const Role: React.FC = () => {
  const navigation = useNavigation<TAuthNavigation<'Role'>>();

  const handleChooseRole = (rule: EAccountType) => {
    navigation.navigate('LoginOrRegisterForm', {rule});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Images.BusFace} style={styles.image} />
      <Text h4 h4Style={styles.textHeader}>
        TripTix
      </Text>
      <Text h4 h4Style={styles.textContent}>
        Choose your job type
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => handleChooseRole(EAccountType.Driver)}
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 45,
            flex: 1,
            height: 200,
            justifyContent: 'center',
            marginRight: 16,
          }}>
          <View
            style={{
              padding: 20,
              borderRadius: 35,
              backgroundColor: '#C1D6FF',
            }}>
            <Image source={Images.Driver} style={styles.imageDriver} />
          </View>
          <Text style={{fontSize: 18, fontWeight: '700'}}>Driver</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleChooseRole(EAccountType.Customer)}
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 45,
            flex: 1,
            height: 200,
            justifyContent: 'center',
            marginLeft: 16,
          }}>
          <View
            style={{
              padding: 20,
              borderRadius: 35,
              backgroundColor: '#FFCA99',
            }}>
            <Image source={Images.Customer} style={styles.imageCustomer} />
          </View>
          <Text style={{fontSize: 18, fontWeight: '700'}}>Customer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 40,
    alignItems: 'center',
  },
  textHeader: {fontWeight: '700', color: '#000', fontSize: 40},
  textContent: {
    fontWeight: '700',
    color: '#000',
    fontSize: 38,
    marginVertical: 50,
  },
  image: {width: 208, height: 215, resizeMode: 'contain'},
  imageDriver: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  imageCustomer: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  buttonContainer: {
    width: '50%',
    marginHorizontal: 35,
    marginVertical: 10,
  },
  titleButton: {fontWeight: 'bold', color: '#000'},
});
