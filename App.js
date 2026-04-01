    import * as React from 'react';
    import AppNavigator from "./src/navigation/AppNavigator";
    import { useFonts, Lalezar_400Regular } from '@expo-google-fonts/lalezar';
    import {ArticleProvider} from "./src/context/ArticleContext";

     export default function App(){
        const [fontsLoaded] = useFonts({Lalezar_400Regular});
         return (
         <ArticleProvider>
             <AppNavigator/>
         </ArticleProvider>
         );
     }
