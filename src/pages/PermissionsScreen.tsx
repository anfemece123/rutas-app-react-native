import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { PermissionsContext } from '../context/PermissionsContext';

const PermissionsScreen = () => {

  const {permissions,askLocationPermission} = useContext(PermissionsContext)

    //* Instruccion de permisos


  return (
    <View style={styles.container}>
      <Text>PermissionsScreen</Text>

      <Button title='Permiso' onPress={ askLocationPermission} />
      <Text>
        {JSON.stringify(permissions,null,5)}
      </Text>
    </View>
  )
}

const styles= StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default PermissionsScreen