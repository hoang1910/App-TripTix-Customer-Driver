import {useStore} from '@store/index';
import React, {useState} from 'react';
import {TouchableOpacity, View, ImageBackground} from 'react-native';
import {StyleSheet, ScrollView} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Text} from '@rneui/base';
import {ButtonApp} from '@components/Button';
import Sidebar from '@components/Sidebar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ContentSidebar} from './components/ContentSidebar';

export const HomeDriver: React.FC = () => {
  const {
    authentication: {userInfo},
  } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('@assets/images/map.png')}>
        <View
          style={{
            width: '100%',
            height: '100%',
            padding: 10,
          }}>
          <TouchableOpacity onPress={toggleSidebar}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                top: 20,
                left: 15,
              }}>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Avatar
                  source={require('@assets/images/user/Customer.png')}
                  rounded
                  size={50}
                  containerStyle={{
                    backgroundColor: '#DEB887',
                    position: 'relative',
                    padding: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: '#000',
              fontSize: 26,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 100,
              textShadowColor: 'orange',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 10,
            }}>
            Welcome tài xế{' '}
            <Text
              style={{
                color: 'red',
                fontSize: 26,
                fontWeight: 'bold',
                textShadowColor: 'yellow',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
              }}>
              {userInfo.fullName}
            </Text>
          </Text>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              bottom: 55,
              right: 15,
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <Avatar
                source={require('@assets/images/user/support.png')}
                rounded
                size={25}
                containerStyle={{
                  backgroundColor: 'white',
                  position: 'relative',
                  padding: 0,
                }}
              />
              <Text style={{color: 'green'}}>Support</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              bottom: '50%',
              right: '10%',
            }}></View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              bottom: 30,
              left: 15,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <ButtonApp
              title="Xe hợp đồng"
              titleStyle={{color: 'red'}}
              buttonStyle={{
                backgroundColor: 'white',
                margin: 10,
              }}
            />
          </View>
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}>
            <ContentSidebar handleToggleSidebar={toggleSidebar} />
          </Sidebar>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 0,
    position: 'relative',
    zIndex: -1,
  },
});
