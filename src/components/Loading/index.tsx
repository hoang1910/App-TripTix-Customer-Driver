import React from 'react';
import {Skeleton} from '@rneui/themed';
import {View} from 'react-native';

export const Loading: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 24,
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Skeleton style={{marginBottom: 8}} width={80} height={16} />
        <Skeleton style={{marginBottom: 16}} width={50} height={16} />
        <Skeleton width={30} height={16} />
      </View>
      <View style={{flex: 2}}>
        <Skeleton style={{marginBottom: 10}} width={'100%'} height={16} />
        <Skeleton style={{marginBottom: 10}} width={'100%'} height={16} />
        <Skeleton style={{marginBottom: 10}} width={'100%'} height={16} />
        <Skeleton style={{marginBottom: 10}} width={'100%'} height={16} />
      </View>
    </View>
  );
};

const NotificationLoading: React.FC = () => {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      }}>
      <Skeleton style={{marginBottom: 8}} width={30} height={16} />
      <Skeleton style={{marginBottom: 6}} width={'100%'} height={12} />
      <Skeleton style={{marginBottom: 6}} width={'50%'} height={12} />
      <Skeleton style={{marginBottom: 6}} width={'80%'} height={12} />
      <View style={{alignItems: 'flex-end'}}>
        <Skeleton width={50} height={10} />
      </View>
    </View>
  );
};

const TransactionLoading: React.FC = () => {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
      }}>
      <View style={{marginRight: 16}}>
        <Skeleton circle width={50} height={50} />
      </View>
      <View style={{flex: 1}}>
        <Skeleton style={{marginBottom: 6}} width={'100%'} height={12} />
        <Skeleton style={{marginBottom: 6}} width={'50%'} height={12} />
        <Skeleton style={{marginBottom: 6}} width={'80%'} height={12} />
        <View style={{alignItems: 'flex-end'}}>
          <Skeleton width={50} height={10} />
        </View>
      </View>
    </View>
  );
};

const SearchRouteLoading: React.FC = () => {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Skeleton style={{marginBottom: 8}} width={50} height={16} />
        <Skeleton style={{marginBottom: 8}} width={50} height={16} />
      </View>
      <Skeleton style={{marginBottom: 6}} width={'70%'} height={20} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Skeleton style={{marginRight: 20}} width={'20%'} height={50} />
        <Skeleton width={'60%'} height={50} />
      </View>

      <Skeleton width={50} height={10} />
    </View>
  );
};

const BannerLoading: React.FC = () => {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Skeleton style={{marginBottom: 8}} width={50} height={16} />
        <Skeleton style={{marginBottom: 8}} width={50} height={16} />
      </View>
      <Skeleton style={{marginBottom: 6}} width={'70%'} height={20} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Skeleton style={{marginRight: 20}} width={'20%'} height={50} />
        <Skeleton width={'60%'} height={50} />
      </View>

      <Skeleton width={50} height={10} />
    </View>
  );
};

const ListNewsLoading: React.FC = () => {
  return (
    <View
      style={{
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ccc',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Skeleton
          style={{borderRadius: 12, marginRight: 8}}
          width={70}
          height={70}
        />
        <View style={{flex: 1}}>
          <Skeleton style={{marginBottom: 8}} height={20} />
          <Skeleton style={{marginBottom: 4}} width={'30%'} height={10} />
          <Skeleton style={{marginBottom: 4}} width={'80%'} height={10} />
          <Skeleton height={10} />
        </View>
      </View>
    </View>
  );
};
const NewsLoading: React.FC = () => {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      }}>
      <Skeleton
        style={{borderTopRightRadius: 20, borderTopLeftRadius: 20}}
        height={100}
      />
      <Skeleton style={{marginVertical: 8}} height={20} />
      <Skeleton style={{marginBottom: 4}} width={'30%'} height={10} />
      <Skeleton style={{marginBottom: 4}} width={'80%'} height={10} />
      <Skeleton height={10} />
    </View>
  );
};

type Props = {
  type?:
    | 'notification'
    | 'transaction'
    | 'searchRoute'
    | 'banner'
    | 'listNews'
    | 'news';
  length?: number;
};
export const ScreenLoading: React.FC<Props> = ({type, length = 10}) => {
  const render = () => {
    switch (type) {
      case 'notification':
        return <NotificationLoading />;
      case 'transaction':
        return <TransactionLoading />;
      case 'searchRoute':
        return <SearchRouteLoading />;
      case 'banner':
        return <BannerLoading />;
      case 'listNews':
        return <ListNewsLoading />;
      case 'news':
        return <NewsLoading />;
      default:
        return <Loading />;
    }
  };
  return (
    <>
      {Array.from({length}).map((item, index) => (
        <View key={index}>{render()}</View>
      ))}
    </>
  );
};
