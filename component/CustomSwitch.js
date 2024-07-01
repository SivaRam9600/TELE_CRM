



///Method 2


import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';

const Moreinfo = ({ route, navigation }) => {
    const { profileData } = route.params;
};

const CustomSwitch = ({
    selectionMode,
    option1,
    option2,
    onSelectSwitch,
}) => {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);

    const updateSwitch = (value) => {
        setSelectionMode(value);
        onSelectSwitch(value);
    };

    // const openWhatsApp = () => {
    //     const phoneNumber = '9600207938';
    //     const message = 'Hi';
    //     const url = `whatsapp://send?text=${encodeURIComponent(message)}&phone=91${phoneNumber}`;

    //     Linking.openURL(url).catch(err => {
    //         console.error("Failed to open WhatsApp", err);
    //     });
    // };

    const openWhatsApp = () => {
        const phoneNumber = '9600207938'; // Phone number in international format
        const message = 'Hi'; // Message to send
        const url = `whatsapp://send?phone=91${phoneNumber}&text=${encodeURIComponent(message)}`;

        Linking.openURL(url).catch(err => {
            console.error("Failed to open WhatsApp", err);
        });
    };


  

    const openSms = () => {
        const phoneNumber = '9600207938';
        const message = 'Hi';
        const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

        Linking.openURL(url).catch(err => {
            console.error("Failed to open SMS app", err);
        });
    };



    const openEmail = () => {
        const emailAddress = 'sivaraman8253@gmail.com';
        const subject = 'Hello';
        const body = 'Hi';

        const url = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.openURL(url).catch(err => {
            console.error("Failed to open Email app", err);
        });
    };

  
    



    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity activeOpacity={1} onPress={() => updateSwitch(1)}>
                    <Text style={{ color: getSelectionMode === 1 ? '#7b68ee' : 'black', fontSize: 17, padding: 10, fontWeight: 'bold', marginLeft: 5 }}>{option1}</Text>
                </TouchableOpacity>
                {getSelectionMode === 1 && <View style={styles.line} />}
            </View>
            {/* 
            <View style={{ marginLeft: 30 }}>
                <TouchableOpacity activeOpacity={1} onPress={() => updateSwitch(2)}>
                    <Text style={{ color: getSelectionMode === 2 ? '#7b68ee' : 'black', fontSize: 17, padding: 10, fontWeight: 'bold', marginLeft: 5 }}>{option2}</Text>
                </TouchableOpacity>
                {getSelectionMode === 2 && <View style={styles.line} />}
            </View> 
            */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 40 }}>
                <TouchableOpacity onPress={openWhatsApp}>
                    <FontAwesome name="whatsapp" color="#7b68ee" size={30} />
                    
                </TouchableOpacity>


<View style={{left:20,}}>
<TouchableOpacity onPress={openSms}>
        
                <FontAwesome name="comment" color="#7b68ee" size={30} />
                </TouchableOpacity>
                </View>

                <View style={{left:40,}}>
<TouchableOpacity onPress={openEmail}>
                <FontAwesome name="envelope" color="#7b68ee" size={30} />
                </TouchableOpacity>
                </View>



            </View>
        </View>
    );
};

export default CustomSwitch;

const styles = StyleSheet.create({
    container: {
        height: 55,
        backgroundColor: '#E4E4E4',
        width: '100%',
        flexDirection: 'row',
    },
    line: {
        width: '40%',
        borderBottomWidth: 3,
        borderBottomColor: '#7b68ee',
        marginTop: 5,
        marginLeft: 20,
    },
});
