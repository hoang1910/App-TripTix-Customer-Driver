import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import {Button, Text} from '@rneui/themed';
import {View} from 'react-native';
import {Images} from '@assets/images';
import {TAuthNavigation, TAuthRoute} from '@navigation/AuthNavigator.type';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ButtonApp} from '@components/Button';
import {EAccountType} from '@enums';

export const LoginOrRegisterForm: React.FC = () => {
  const navigation = useNavigation<TAuthNavigation<'LoginOrRegisterForm'>>();
  const {rule} = useRoute<TAuthRoute<'LoginOrRegisterForm'>>().params;
  const hideButtonSignUp = rule === EAccountType.Driver;

  const handlePressSignIn = () => {
    navigation.navigate('SignIn', {rule});
  };

  const handlePressSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Images.Banner01} style={styles.image} />
      <Text h4 h4Style={styles.textHeader}>
        Track your Orders
      </Text>
      <Text h4 h4Style={styles.textContent}>
        Track your orders in realtime from the app
      </Text>
      <Icon name="dots-three-horizontal" size={30} color="gray" />
      <View style={styles.formLoginOrRegister}>
        <ButtonApp
          title="Login"
          buttonStyle={styles.buttonLogin}
          containerStyle={styles.buttonLoginContainer}
          titleStyle={styles.titleButtonLogin}
          onPress={handlePressSignIn}
        />
        {!hideButtonSignUp && (
          <ButtonApp
            title="Register"
            buttonStyle={styles.buttonRegister}
            containerStyle={styles.buttonRegisterContainer}
            titleStyle={styles.titleButtonRegister}
            onPress={handlePressSignUp}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  textHeader: {
    fontWeight: '700',
    color: '#FF800B',
    fontSize: 16,
    marginBottom: 6,
  },
  textContent: {
    fontWeight: '400',
    color: '#595959',
    fontSize: 10,
    marginBottom: 60,
  },
  image: {
    width: 208,
    height: 250,
    marginBottom: 20,
    marginTop: 80,
    resizeMode: 'contain',
  },
  formLoginOrRegister: {
    backgroundColor: '#FF9B63',
    width: '100%',
    marginTop: 36,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 36,
  },
  buttonLogin: {
    backgroundColor: '#FFF',
    borderColor: 'white',
  },
  buttonLoginContainer: {
    width: '100%',
    marginBottom: 16,
  },
  titleButtonLogin: {fontWeight: '600', color: '#000'},
  buttonRegister: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 12,
  },
  buttonRegisterContainer: {
    width: '100%',
  },
  titleButtonRegister: {fontWeight: '600', color: '#fff'},
});
