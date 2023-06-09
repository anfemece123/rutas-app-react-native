import React, { createContext, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import {
  PERMISSIONS,
  PermissionStatus,
  check,
  request,
  openSettings,
} from "react-native-permissions"; //OPENSETTINGS: abre los ajustes de la aplicacion

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
  locationStatus: "unavailable",
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps); //TODO: QUE EXPORTA

export const PermissionsProvider = ({ children }: any) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  useEffect(() => {
    AppState.addEventListener("change", (state) => {
      console.log(state); //verifica en que estado esta la pantalla del dispositivo
      if (state !== "active") return; //SI NO ESTA ACTIVE SE SALE

      checkLocationPermission(); //si esta active
    });
  }, []);

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus; //* VARIABLE SOLA

    if (Platform.OS === "ios") {
      //    permissionStatus = await  check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      // permissionStatus = await  check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); /}
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      ); //el request pregunta no solo REVISA COMO EL CHACK
    }

    if (permissionStatus === "blocked") {
      openSettings();
    }

    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  };
  const checkLocationPermission = async () => {
    // cuando la persona regresa a la aplicacion
    let permissionStatus: PermissionStatus; //* VARIABLE SOLA

    if (Platform.OS === "ios") {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE); //el check revisa el estado NO PREGUNTA
      // permissionStatus = await  request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      // permissionStatus = await  request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        askLocationPermission,
        checkLocationPermission,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};
