import React, { Component } from "react";
import { View, Text } from 'react-native';

class DetailDogs extends Component {
    render() {
        return (
            <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
            >
                <Text>Dogs Details Screen</Text>
            </View>
        )
    }
}
export default DetailDogs;