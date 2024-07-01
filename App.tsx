

///method 3


import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import Register from './component/Register';
import Forgot from './component/Forgot';
import AddProfile from './component/AddProfile';
import TabNavigator from './component/TabNavigator';
import Preference from './component/Preference';
import About from './component/About';
import Moreinfo from './component/Moreinfo';

const Stack = createNativeStackNavigator();

const SplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      <Image style={styles.splashLogo} source={require('./component/assets/splash_image.jpeg')} resizeMode='contain' />
      {/* <ActivityIndicator size="large" color="#7b68ee" /> */}
    </View>
  );
};

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Add your login logic here
    if (username && password) {
      // Example: Check credentials (to be replaced with actual logic)
      // Assuming successful login if username and password are not empty

      // Store the sign-in status
      await AsyncStorage.setItem('isSignedIn', 'true');
      navigation.navigate('Home1');
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerHead}>
        <Image style={styles.logo} source={require('./component/assets/telecrm_image1.png')} resizeMode='contain' />
      </View>
      <Text style={styles.label}>Email Address</Text>
      <View style={styles.inputbox}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email Address"
          placeholderTextColor="#B5AAAD"
          onChangeText={(text) => setUsername(text)}
          value={username}
          required
        />
      </View>
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputbox}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          placeholderTextColor="#B5AAAD"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          required
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <Text style={styles.bottomlabel}> Oh ! Not Register yet?</Text>
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerButtonText}>Register Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const prepareApp = async () => {
      // Simulating some loading time
      setTimeout(async () => {
        const signInStatus = await AsyncStorage.getItem('isSignedIn');
        setIsSignedIn(signInStatus === 'true');
        setIsAppReady(true);
      }, 2000);
    };

    prepareApp();
  }, []);

  if (!isAppReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"#B5AAAD"} />
      <Stack.Navigator initialRouteName={isSignedIn ? "Home1" : "Login"}>
        <Stack.Screen name="Login" component={Login} options={{ header: () => null }} />
        <Stack.Screen name="Register" component={Register} options={{ header: () => null }} />
        <Stack.Screen name="About" component={About} options={{ header: () => null }} />
        <Stack.Screen name="AddProfile" component={AddProfile} options={{ header: () => null }} />
        <Stack.Screen name="Home1" component={TabNavigator} options={{ header: () => null }} />
        <Stack.Screen name="Preference" component={Preference} options={{ header: () => null }} />
        <Stack.Screen name="Moreinfo" component={Moreinfo} options={{ header: () => null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  containerHead: {
    marginTop: 30,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginVertical: 10,
    height: 90,
    
    marginBottom: 10,
  },
  label: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
    fontWeight: '600',
  },
  inputbox: {
    borderBottomColor: '#B5AAAD',
    borderBottomWidth: 1,
    marginBottom: 20,
    marginHorizontal: 10,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    width: '85%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#7b68ee',
    padding: 10,
    borderRadius: 5,
    width: '95%',
    height: 50,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 5,
    fontWeight: 'bold',
  },
  bottomlabel: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  registerButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: '95%',
    marginHorizontal: 10,
    borderColor: '#7b68ee',
    borderWidth: 1,
    marginVertical: 20,
    height: 50,
  },
  registerButtonText: {
    color: '#7b68ee',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  splashContainer: {
   flex: 1,
   backgroundColor: 'white',
   justifyContent: 'center',
   alignItems: 'center',
 },
 splashLogo: {
   flex: 1,
   width: '100%',
   height: '100%',
 },
});






