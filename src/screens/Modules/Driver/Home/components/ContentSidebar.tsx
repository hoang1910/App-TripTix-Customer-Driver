import {useStore} from '@store/index';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Text} from '@rneui/base';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@navigation/AppNavigator.type';
import {deleteDataUser} from '@storage/common';

export const ContentSidebar = ({handleToggleSidebar}) => {
  const navigation = useNavigation<TAppNavigation<'HomeDriver'>>();

  const {
    authentication: {setIsLogin, userInfo},
  } = useStore();

  const handleRedirect = () => {};
  const handleRedirectHistory = () => {
    handleToggleSidebar();
    navigation.navigate('HistoryDriver');
  };

  const OnLogout = async () => {
    await deleteDataUser();
    setIsLogin(false);
  };

  return (
    <>
      <TouchableOpacity onPress={handleRedirect}>
        <View
          style={{
            width: '100%',
            borderTopColor: 'white',
            borderTopWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 15,
            backgroundColor: '#228B22',
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
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
              }}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginLeft: 15,
              }}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>
                {userInfo.fullName}
              </Text>
              <Text style={{color: 'white'}}>Xem đánh giá</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRedirect}>
        <View
          style={{
            width: '100%',
            borderTopColor: 'white',
            borderTopWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 15,
            backgroundColor: '#228B22',
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 15,
              }}>
              <Icon
                size={16}
                style={{marginRight: 10, color: 'white'}}
                name="barschart"
              />
              <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
                Xem thống kế thường
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRedirect}>
        <View
          style={{
            width: '100%',
            borderTopColor: 'black',
            borderTopWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 15,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: 15,
              }}>
              <Icon size={16} style={{marginRight: 10}} name="car" />
              <Text
                style={{
                  fontWeight: '200',
                  fontSize: 16,
                  color: 'black',
                  marginRight: 10,
                }}>
                Gara của tôi
              </Text>
              <Text
                style={{
                  fontWeight: '200',
                  padding: 5,
                  borderColor: 'orange',
                  fontSize: 16,
                  color: 'black',
                  borderWidth: 1,
                  borderRadius: 5,
                }}>
                Tạo xe
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRedirect}>
        <View
          style={{
            width: '100%',
            borderTopColor: 'black',
            borderTopWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 15,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 15,
              }}>
              <Icon size={16} style={{marginRight: 10}} name="wallet" />
              <Text style={{fontWeight: '200', fontSize: 16, color: 'black'}}>
                Doanh thu lái xe
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRedirectHistory}>
        <View
          style={{
            width: '100%',
            borderTopColor: 'black',
            borderTopWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 15,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 15,
              }}>
              <Icon size={16} style={{marginRight: 10}} name="bars" />
              <Text style={{fontWeight: '200', fontSize: 16, color: 'black'}}>
                Lịch sử chuyến đi
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRedirect}>
        <View
          style={{
            width: '100%',
            borderTopColor: 'black',
            borderTopWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 15,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 15,
              }}>
              <Icon size={16} style={{marginRight: 10}} name="bells" />
              <Text style={{fontWeight: '200', fontSize: 16, color: 'black'}}>
                Notifications
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRedirect}>
        <View
          style={{
            width: '100%',
            borderTopColor: 'black',
            borderTopWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 15,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 15,
              }}>
              <Icon size={16} style={{marginRight: 10}} name="frowno" />
              <Text style={{fontWeight: '200', fontSize: 16, color: 'black'}}>
                Danh sach chặn
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRedirect}>
        <View
          style={{
            width: '100%',
            borderTopColor: 'black',
            borderTopWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 15,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 15,
              }}>
              <Icon size={16} style={{marginRight: 10}} name="addusergroup" />
              <Text style={{fontWeight: '200', fontSize: 16, color: 'black'}}>
                Giới thiệu bạn bè
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRedirect}>
        <View
          style={{
            width: '100%',
            borderTopColor: 'black',
            borderTopWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 15,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 15,
              }}>
              <Icon size={16} style={{marginRight: 10}} name="hearto" />
              <Text style={{fontWeight: '200', fontSize: 16, color: 'black'}}>
                Điểm tín nhiệm
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={OnLogout}>
        <View
          style={{
            width: '100%',
            borderTopColor: 'black',
            borderTopWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 15,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 15,
              }}>
              <Icon size={16} style={{marginRight: 10}} name="poweroff" />
              <Text style={{fontWeight: '200', fontSize: 16, color: 'black'}}>
                Đăng xuất
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
