import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "../features/Auth/screens/LoginScreen";
import SignUpParticipantScreen from "../features/Auth/screens/SignUpParticipantScreen";
import TypeSignUpScreen from "../features/Auth/screens/TypeSignUpScreen";
import SignUpReaderScreen from "../features/Auth/screens/SignUpReaderScreen";
import HomeScreen from "../features/Midias/screens/HomeScreen";
import MenuScreen from "../features/Midias/screens/MenuScreen";

const Stack = createNativeStackNavigator();



export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TypeSignUp">
                <Stack.Screen name="TypeSignUp" component={TypeSignUpScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="SignUpParticipant" component={SignUpParticipantScreen}/>
                <Stack.Screen name="SignUpReader" component={SignUpReaderScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Menu" component={MenuScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}