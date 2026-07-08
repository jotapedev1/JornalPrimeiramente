    import * as React from 'react';
    import AppNavigator from "./src/navigation/AppNavigator";
    import { useFonts, Lalezar_400Regular } from '@expo-google-fonts/lalezar';
    import MediaProvider from "./src/context/MediaContext";
    import {AuthProvider} from "./src/context/AuthContext";
    import {LogBox} from "react-native";

     export default function App(){
        const [fontsLoaded] = useFonts({Lalezar_400Regular});
         LogBox.ignoreLogs([
             'hapticpatternlibrary.plist',
         ]);
         return (
             <AuthProvider>
                 <MediaProvider>
                     <AppNavigator/>
                 </MediaProvider>
             </AuthProvider>
         );
     }
