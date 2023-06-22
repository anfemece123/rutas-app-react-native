import { View, Text, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";
import { PermissionsContext } from "../context/PermissionsContext";
import BlackButton from "../components/BlackButton";

const PermissionsScreen = () => {
  const { permissions, askLocationPermission } = useContext(PermissionsContext);

  //* Instruccion de permisos

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Es necesario el uso del GPS para usar esta aplicación
      </Text>

      <BlackButton title="Permiso" onPress={askLocationPermission} />
      <Text style={{ marginTop: 20 }}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: 250,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default PermissionsScreen;
