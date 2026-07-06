import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'
import AppText from '../texts/AppText'

interface RadioInputAndTitle{
   selected: boolean;
    title: string;
    onPress: () => void
}

const RadioInputAndTitle = ({selected, title, onPress}: RadioInputAndTitle) => {
  return (
    <TouchableOpacity style={styles.radioContainer} activeOpacity={0.7} onPress={onPress} >
      <View style={styles.radioCircle}> 
        {selected && <View style={styles.selectionCircle}></View>}
        </View> 
        <AppText style={styles.styleTitle} variant='semiBold' >{title}</AppText>
    </TouchableOpacity>
  )
}

export default RadioInputAndTitle

const styles = StyleSheet.create({
    radioContainer:{
        flexDirection: "row",
        paddingVertical: vs(15),
        marginHorizontal: vs(5),
    },
    radioCircle:{
        height: vs(30),
        width: s(30),
        borderRadius: s(15),
        borderWidth: 2,
        borderColor: AppColors.primary,
        justifyContent: "center",
        alignItems: "center"
    },
    selectionCircle:{
        height: vs(15),
        width: s(15),
        borderRadius: s(7),
        backgroundColor: AppColors.primary
    },
    styleTitle:{
        marginLeft: s(10),
        marginTop: s(4)
    }
})