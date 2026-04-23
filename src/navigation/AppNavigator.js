import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
import {HeaderStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';
import ArticleScreen from "../features/Midias/screens/ArticleScreen";
import BookmarksScreen from "../features/Perfil/screens/BookmarksScreen";
import ConfigurationScreen from "../features/Config/ConfigurationScreen";
import PasswordResetScreen from "../features/Auth/screens/PasswordResetScreen";
import EditionArticlesScreen from "../features/Midias/screens/EditionArticlesScreen";
import AccountDeactivationScreen from "../features/Config/YourAccountConfig/AccountDeactivationScreen";
import AccountInfoScreen from "../features/Config/YourAccountConfig/AccountInfoScreen";
import ChangePassScreen from "../features/Config/YourAccountConfig/ChangePassScreen";
import AccessibilityScreen from "../features/Config/AccessibilityScreen";
import NotificationsConfigScreen from "../features/Config/NotificationsConfigScreen";
import YourAccountScreen from "../features/Config/YourAccountScreen";
import AccessibilityConfigScreen from "../features/Config/AccessibilityConfig/AccessibilityConfigScreen";
import AboutScreen from "../features/Config/OtherResourcesConfig/AboutScreen";
import CookiesPolicyScreen from "../features/Config/OtherResourcesConfig/CookiesPolicyScreen";
import HelpScreen from "../features/Config/OtherResourcesConfig/HelpScreen";
import PrivacyPolicyScreen from "../features/Config/OtherResourcesConfig/PrivacyPolicyScreen";
import TermsOfServiceScreen from "../features/Config/OtherResourcesConfig/TermsOfServiceScreen";
import VersionNotesScreen from "../features/Config/OtherResourcesConfig/VersionNotesScreen";
import OtherResourcesScreen from "../features/Config/OtherResourcesScreen";
import PublishingScreen from "../features/Perfil/screens/PublishingScreen";

const Stack = createNativeStackNavigator();

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
                {/*AUTHENTICATION SCREENS*/}
                <Stack.Screen name="TypeSignUp" component={TypeSignUpScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="SignUpParticipant" component={SignUpParticipantScreen}/>
                <Stack.Screen name="SignUpReader" component={SignUpReaderScreen}/>
                <Stack.Screen name="PasswordReset" component={PasswordResetScreen}
                              options={{headerShown: true}}/>

                {/*MEDIA SCREENS*/}
                <Stack.Screen name="Home" component={HomeScreen}
                              options={{ headerShown: true }}/>
                <Stack.Screen name="Menu" component={MenuScreen}
                              options={{ headerShown: true }}/>
                <Stack.Screen name="Browse" component={BrowseScreen}
                              options={{ headerShown: true, }}/>
                <Stack.Screen name="ArticleScreen" component={ArticleScreen}
                              options={{ headerShown: true }}/>
                <Stack.Screen name={"EditionArticles"} component={EditionArticlesScreen}
                              options={{headerShown: true}}/>

                {/*PROFILE SCREENS*/}
                <Stack.Screen name="Notification" component={NotificationScreen}
                              options={{ headerShown: true }}/>
                <Stack.Screen name="Profile" component={ProfileScreen}
                              options={{ headerShown: true }}/>
                <Stack.Screen name ="Bookmarks" component={BookmarksScreen}
                              options={{headerShown: true}}/>
                <Stack.Screen name ="Publishing" component={PublishingScreen}
                              options={{headerShown: true, title: 'Publicar'}}/>

                {/*CONFIGURATION SCREENS*/}
                <Stack.Screen name="Configuration" component={ConfigurationScreen}
                              options={{headerShown: true}}/>
                <Stack.Screen name={"Accessibility"} component={AccessibilityScreen}
                              options={{headerShown: true}}/>
                <Stack.Screen name={"NotificationsConfig"} component={NotificationsConfigScreen}
                              options={{headerShown: true}}/>
                <Stack.Screen name={"OtherResources"} component={OtherResourcesScreen}
                              options={{headerShown: true}}/>
                <Stack.Screen name={"YourAccount"} component={YourAccountScreen}
                              options={{headerShown: true}}/>

                {/*YOUR ACCOUNT CONFIG SCREENS*/}
                <Stack.Screen name={"AccountDeactivation"} component={AccountDeactivationScreen}
                              options={{headerShown: true}}/>
                <Stack.Screen name={"AccountInfo"} component={AccountInfoScreen}
                              options={{headerShown: true}}/>
                <Stack.Screen name={"ChangePass"} component={ChangePassScreen}
                              options={{headerShown: true}}/>

                {/*ACCESSIBILITY SCREENS*/}
                <Stack.Screen name={"AccessibilityConfig"} component={AccessibilityConfigScreen}
                              options={{headerShown: true}}/>
                {/*<Stack.Screen name={"Frame"} component={FrameScreen}*/}
                {/*              options={{headerShown: true}}/>*/}

                {/*OTHER RESOURCES SCREENS*/}
                <Stack.Screen name={"About"} component={AboutScreen}
                              options={{headerShown: true}}/>
                <Stack.Screen name={"CookiesPolicy"} component={CookiesPolicyScreen}
                              options={{headerShown: true}}/>
                <Stack.Screen name={"Help"} component={HelpScreen}
                              options={{headerShown: true}}/>
                <Stack.Screen name={"PrivacyPolicy"} component={PrivacyPolicyScreen}
                              options={{headerShown: true}}/>
                <Stack.Screen name={"TermsOfService"} component={TermsOfServiceScreen}
                              options={{headerShown: true}}/>
                <Stack.Screen name={"VersionNotes"} component={VersionNotesScreen}
                              options={{headerShown: true}}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}