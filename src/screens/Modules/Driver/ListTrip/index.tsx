import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {Screen} from './components/Screen';

const Screens = [
  {id: '1', title: 'Đã hoàn thành', type: 'finished'},
  {id: '2', title: 'Chưa hoàn thành', type: 'unfinished'},
];

export const ListTrip: React.FC = () => {
  const [indexActive, setIndexActive] = useState(0);
  const tabRef = useRef<FlatList>();

  const handleClickChangeTab = (index: number) => {
    setIndexActive(index);
    tabRef.current?.scrollToIndex({index, animated: true});
  };

  const onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    if (viewableItems.length > 0) {
      const focusedIndex = viewableItems[0].index;
      setIndexActive(focusedIndex);
    }
  });

  return (
    <View style={{flex: 1, paddingTop: 8}}>
      <View style={{flexDirection: 'row'}}>
        {Screens.map((item, index) => (
          <TouchableOpacity
            onPress={() => handleClickChangeTab(index)}
            key={index}
            style={[
              styles.buttonTab,
              {borderColor: index === indexActive ? 'red' : '#fff'},
            ]}>
            <Text
              style={{
                fontWeight: '900',
                color: index === indexActive ? 'red' : '#000',
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        ref={tabRef}
        data={Screens}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={indexActive}
        renderItem={({item}) => (
          <View style={{width: Dimensions.get('screen').width}}>
            <Screen type={item.type} />
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonTab: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
});
