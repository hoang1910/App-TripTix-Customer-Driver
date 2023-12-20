import {Button, Input, Text} from '@rneui/themed';
import React, {useDeferredValue, useEffect, useMemo, useState} from 'react';
import {View, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import ReactNativeModal from 'react-native-modal';

export const ChooseProvince: React.FC<{
  data: {id: string; title: string}[];
  value: string;
  onChange: (value: string) => void;
  renderButton?: (title: string, onPress: () => void) => React.ReactNode;
  title?: string;
  placeholder?: string;
}> = ({data = [], value, onChange, renderButton, title, placeholder}) => {
  const dataNew = useMemo(() => {
    return data.map(item => {
      const textSearch = item.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return {...item, textSearch};
    });
  }, [data]);
  const [showPopup, setShowPopup] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const defferedValue = useDeferredValue(valueSearch);
  const dataFilter = useMemo(() => {
    const search = defferedValue
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    return dataNew.filter(item => item.textSearch.includes(search));
  }, [defferedValue, dataNew]);
  const selected = useMemo(() => {
    return data.find(item => item.id === value);
  }, [value, dataFilter]);

  const onClose = () => {
    setShowPopup(false);
  };

  const handleChoose = (value: string) => {
    onChange(value);
    onClose();
  };

  return (
    <>
      {renderButton ? (
        renderButton(selected?.title, () => setShowPopup(true))
      ) : (
        <TouchableOpacity onPress={() => setShowPopup(true)}>
          <Text>{selected?.title || placeholder}</Text>
        </TouchableOpacity>
      )}
      <ReactNativeModal
        isVisible={showPopup}
        onBackdropPress={onClose}
        avoidKeyboard>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: 16,
            maxHeight: 500,
          }}>
          <Text style={{fontSize: 16, fontFamily: 'SVN-Gilroy-Bold', textAlign: 'center'}}>
            {title ?? 'Chọn điểm đến'}
          </Text>
          <Input
            placeholder="Tìm kiếm"
            onChangeText={text => setValueSearch(text)}
            value={valueSearch}
          />
          <FlatList
            data={dataFilter}
            keyExtractor={({id}) => id}
            style={{maxHeight: 500, marginVertical: 16}}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => handleChoose(item.id)}
                key={index}
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderColor: '#ccc',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    color: item.id === value ? 'red' : '#4b4b4b',
                    textAlign: 'center',
                  }}>
                  {item.title}
                </Text>
                {!!item.desc && (
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: 12,
                      textAlign: 'center',
                    }}>
                    {item.desc}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
          <Button
            title="Đóng"
            buttonStyle={{borderRadius: 8}}
            onPress={onClose}
          />
        </View>
      </ReactNativeModal>
    </>
  );
};
