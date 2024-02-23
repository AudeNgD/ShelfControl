import React,{ useState, useEffect } from 'react';
import {StyleSheet, Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default navigationBar= () =>{
    const navigation = useNavigation()
    return(
        <View style={styles.navbar}>
            <Button title='Library'onPress={()=>{navigation.navigate()}}/>
            <Button title='Friends'onPress={()=>{navigation.navigate()}}/>
            <Button title='Account'onPress={()=>{navigation.navigate()}}/>
        </View>
    )
}
const styles = StyleSheet.create({
navbar:{
    display:'flex'
    
}
})