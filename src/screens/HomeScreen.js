import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoginScreen from './LoginScreen';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const HomeScreen = ({navigation}) => {
  const [userdata, setUserdata] = useState('');

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const handleLogout = async () => {
    try {
      const r = await GoogleSignin.signOut();
      console.log(r);
      navigation.replace('LoginScreen');

      await AsyncStorage.clear();
    } catch (error) {
      console.error('signouterror', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userinfo = await AsyncStorage.getItem('userinfo');
    const parseuserinfo = JSON.parse(userinfo);
    setUserdata(parseuserinfo);
    console.log('userinfodata', parseuserinfo);
  };

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            opacity: 0.8,
            fontWeight: '600',
          }}>
          Hello
        </Text>
        <Text
          style={{color: 'aqua', fontSize: 30, opacity: 0.8, marginTop: 10}}>
          {userdata?.user?.name}
        </Text>

        <Text
          style={{color: 'aqua', fontSize: 20, opacity: 0.8, marginTop: 10}}>
          {userdata?.user?.email}
        </Text>
        {userdata?.user?.photo ? (
          <Image
            source={{uri: userdata?.user?.photo}}
            style={{height: 100, width: 100, borderRadius: 50, marginTop: 30}}
            resizeMode="contain"
          />
        ) : (
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Octicons name={'feed-person'} size={100} />
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: 'black',
          height: 56,
          width: '90%',
          justifyContent: 'center',

          borderColor: 'aqua',
          borderWidth: 2,
          borderBottomWidth: 7,
          borderRadius: 10,
          position: 'absolute',
          bottom: 30,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
