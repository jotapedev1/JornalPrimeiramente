import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "../features/Auth/screens/LoginScreen";
import SignUpParticipantScreen from "../features/Auth/screens/SignUpParticipantScreen";
import TypeSignUpScreen from "../features/Auth/screens/TypeSignUpScreen";
import SignUpReaderScreen from "../features/Auth/screens/SignUpReaderScreen";
import HomeScreen from "../features/Midias/screens/HomeScreen";
import MenuScreen from "../features/Midias/screens/MenuScreen";
import BrowseScreen from "../features/Midias/screens/BrowseScreen";
import NotificationScreen from "../features/Perfil/screens/NotificationScreen";
import ProfileScreen from "../features/Perfil/screens/ProfileScreen";

const Stack = createNativeStackNavigator();

import { TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import ArticleScreen from "../features/Midias/screens/ArticleScreen";
import BookmarksScreen from "../features/Perfil/screens/BookmarksScreen";
import ConfigurationScreen from "../features/Perfil/screens/ConfigurationScreen";
import PasswordResetScreen from "../features/Auth/screens/PasswordResetScreen";

const transitionAnimation = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
}


export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TypeSignUp">
                <Stack.Screen name="TypeSignUp" component={TypeSignUpScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="SignUpParticipant" component={SignUpParticipantScreen}/>
                <Stack.Screen name="SignUpReader" component={SignUpReaderScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}
                options={{ headerShown: true }}/>
                <Stack.Screen name="Menu" component={MenuScreen}
                options={{ headerShown: true }}/>
                <Stack.Screen name="Browse" component={BrowseScreen}
                options={{ headerShown: true }}/>
                <Stack.Screen name="Notification" component={NotificationScreen}
                options={{ headerShown: true  }}/>
                <Stack.Screen name="Profile" component={ProfileScreen}
                options={{ headerShown: true }}/>
                <Stack.Screen name="ArticleScreen" component={ArticleScreen}
                options={{ headerShown: true }}/>
                <Stack.Screen name="Configuration" component={ConfigurationScreen}
                options={{headerShown: true}}/>
                <Stack.Screen name ="Bookmarks" component={BookmarksScreen}
                options={{headerShown: true}}/>
                <Stack.Screen name="PasswordReset" component={PasswordResetScreen}
                options={{headerShown: true}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}