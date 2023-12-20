import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TAuthStackParamList} from './AuthNavigator.type';
import {SignUp} from '@screens/SignUp';
import {BottomTabNavigator} from './BottomTabNavigator';
import {TAppStackParamList} from './AppNavigator.type';
import {TopUP} from '@screens/TopUp';
import {Settings} from '@screens/Profile/components/Settings';
import {Point} from '@screens/Profile/components/Point';
import {Info} from '@screens/Profile/components/Info';
import {SelectRoute} from '@screens/SelectRoute';
import {SearchRoute} from '@screens/SearchRoute';
import {DepartureInformation} from '@screens/DepartureInformation';
import {TicketInformation} from '@screens/TicketInformation';
import {SelectSeat} from '@screens/SelectSeat';
import {HomeDriver} from '@screens/Modules/Driver/Home';
import {HistoryDriver} from '@screens/Modules/Driver/History';
import {DetailRoute} from '@screens/Modules/Driver/History/components/DetailRoute';
import {Home} from '@screens/Home';
import {TransactionHistory} from '@screens/TransactionHistory';
import {News} from '@screens/News';

const Stack = createNativeStackNavigator<TAppStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'BottomTabNavigator'}
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'TopUp'}
        component={TopUP}
        options={{title: 'Nạp tiền vào ví'}}
      />
      <Stack.Screen
        name={'Home'}
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'SelectRoute'}
        component={SelectRoute}
        options={{title: 'Chọn chuyến'}}
      />
      <Stack.Screen
        name={'SelectSeat'}
        component={SelectSeat}
        options={{title: 'Vui lòng chọn ghế'}}
      />
      <Stack.Screen
        name={'SelectRouteRoundTrip'}
        component={SelectRoute}
        options={{title: 'Chọn chuyến'}}
      />
      <Stack.Screen
        name={'SelectSeatRoundTrip'}
        component={SelectSeat}
        options={{title: 'Vui lòng chọn ghế'}}
      />
      <Stack.Screen
        name={'Settings'}
        component={Settings}
        options={{title: 'Đổi mật khẩu'}}
      />
      <Stack.Screen
        name={'Point'}
        component={Point}
        options={{title: 'Đổi xu khuyến mãi'}}
      />
      <Stack.Screen
        name={'Info'}
        component={Info}
        options={{title: 'Thông tin người dùng'}}
      />
      <Stack.Screen
        name={'TransactionHistory'}
        component={TransactionHistory}
        options={{title: 'Lịch sử giao dịch'}}
      />
      <Stack.Screen
        name={'News'}
        component={News}
        options={{title: 'Tin tức'}}
      />
      <Stack.Screen
        name={'SearchRoute'}
        component={SearchRoute}
        options={{title: 'Tìm kiếm tuyến đường'}}
      />
      <Stack.Screen
        name={'DepartureInformation'}
        component={DepartureInformation}
        options={{title: 'Thông tin chuyến xe'}}
      />
      <Stack.Screen
        name={'TicketInformation'}
        component={TicketInformation}
        options={{title: 'Thông tin đặt vé'}}
      />
      {/* Driver */}
      <Stack.Screen
        name={'HomeDriver'}
        component={HomeDriver}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'HistoryDriver'}
        component={HistoryDriver}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'DetailRoute'}
        component={DetailRoute}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
