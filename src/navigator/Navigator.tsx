import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../pages/MapScreen";
import PermissionsScreen from "../pages/PermissionsScreen";
import LoadingScreen from "../pages/LoadingScreen";
import { PermissionsContext } from "../context/PermissionsContext";

const Stack = createStackNavigator();

export const Navigator = () => {
  const { permissions } = useContext(PermissionsContext);

  if (permissions.locationStatus === "unavailable") {
    //COMO INICIALMENTE TENIAMOS UNAVAILABLE SE MUESTRA EL LOADING PERO DESPUES YA NOS MUESTRA LA PAGINA COMO ES
    return <LoadingScreen />;
  }
  return (
    <Stack.Navigator
      initialRouteName="PermissionsScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      {permissions.locationStatus === "granted" ? (
        <Stack.Screen name="MapScreen" component={MapScreen} />
      ) : (
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      )}
      {/* <Stack.Screen name="LoadingScreen" component={LoadingScreen} /> */}
    </Stack.Navigator>
  );
};
