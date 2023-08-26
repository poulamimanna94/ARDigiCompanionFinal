import React from 'react'
import { View,StyleSheet} from 'react-native'

const Card = (props) => {
    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    )
}
const styles = StyleSheet.create({

    card: {
        shadowColor: '#1B1534',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
         elevation: 8,
        backgroundColor:'#1B1534',
        padding: 20,
        borderRadius:2
      }
})

export {Card}
