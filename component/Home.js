

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Linking, BackHandler, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import PushNotification from 'react-native-push-notification';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ProfileData } from './model/ProfileData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Home({ navigation }) {
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Function to initialize notification channels
  const initializeNotificationChannels = () => {
    PushNotification.createChannel({
      channelId: 'reminder-channel',
      channelName: 'Reminder Channel',
      channelDescription: 'Channel for reminders',
      playSound: true,
      soundName: 'default',
      importance: 4,
      vibrate: true,
    });
  };

  // Call the function to initialize notification channels
  useEffect(() => {
    initializeNotificationChannels();

    // Add event listener for Android back button press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    // Clean up the event listener on component unmount
    return () => backHandler.remove();
  }, []);

  // Function to handle the back button press
  const handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit app?',
      [
        { text: 'No', onPress: () => {} },
        { text: 'Yes', onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
    return true; 
  };

  const handleDateConfirm = (date) => {
    if (selectedProfile) {
      scheduleReminder(selectedProfile, date);
      setSelectedProfile(null);
      Toast.show('Reminder Successfull');
    }
    setIsDateTimePickerVisible(false);
  };

  const showDateTimePicker = (profile) => {
    setSelectedProfile(profile);
    setIsDateTimePickerVisible(true);
  };

  const scheduleReminder = (profile, date) => {
    PushNotification.localNotificationSchedule({
      channelId: 'reminder-channel', 
      title: 'Reminder',
      message: `Don't forget to call ${profile.name} at ${profile.phno}`,
      date,
      repeatType: 'day',
    });
  };

  const makeCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerHead}>
        <Text style={styles.header1}><Text style={styles.header}>My </Text>Activities-Calls</Text>
      </View>
      {ProfileData.map((profile) => (
        <View key={profile.id} style={styles.profileContainer}>
          <View style={styles.profileInfo}>
            <View style={styles.textContainer}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileDetail1}>{profile.city}</Text>
              <Text style={styles.profileDetail}>{profile.profession}</Text>
              <Text style={styles.profileDetail1}>{profile.education}</Text>
            </View>
            <View>
              <View style={{ flex: 1, flexDirection: 'row', left: '50%' }}>
                <TouchableOpacity
                  style={{
                    // borderColor: '#7b68ee',
                    // borderWidth: 1,
                    // width: 30,
                    // height: 30,
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    // borderRadius: 15,
                  }}
                  onPress={() => showDateTimePicker(profile)}>
                  <FontAwesome name="clock-o" color="#7b68ee" size={30} />
                </TouchableOpacity>
              </View>
              <View style={{ width: 130 }}>
                <View style={styles.elevationContainer}>
                  <Image source={profile.profilepic} style={styles.profilePic} />
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity style={styles.Button1} onPress={() => navigation.navigate('Moreinfo', { profileData: profile })}>
              <Text style={styles.buttonText1}>More info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button2} onPress={() => makeCall(profile.phno)}>
              <Text style={styles.buttonText2}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={() => setIsDateTimePickerVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHead: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    backgroundColor: '#7b68ee',
    display: 'flex',
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header1: {
    color: 'white',
    fontSize: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },

  profileContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingVertical: 15,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  elevationContainer: {
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#F60F54',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  textContainer: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 10,
    margin: 0,
    paddingTop: 0,
  },
  profileDetail: {
    paddingBottom: 3,
    fontSize: 13,
    color: 'gray',
    fontWeight: 'bold',
    lineHeight: 21,
  },
  profileDetail1: {
    paddingBottom: 3,
    fontSize: 13,
    color: 'gray',
    fontWeight: 'bold',
  },
  Button1: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    marginHorizontal: 10,
    borderColor: '#7b68ee',
    borderWidth: 1,
    height: 40,
  },
  buttonText1: {
    color: '#7b68ee',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  Button2: {
    backgroundColor: '#7b68ee',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    height: 40,
    marginHorizontal: 10,
    elevation: 10,
    shadowColor: '#F60F54',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText2: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
});







