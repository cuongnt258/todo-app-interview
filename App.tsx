/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

import Loading from "@components/common/Loading";

import { RXStoreComponent } from "@store/actions";

import { NavigationContainer, RootStack } from "./src/navigation";
import store from "./src/store";

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack />
          <Loading />
          <RXStoreComponent />
          <Toast />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
