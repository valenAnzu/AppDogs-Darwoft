import React from "react";
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParams } from "./homeStack";

interface Props extends NativeStackScreenProps<HomeStackParams, 'DogDetail'>{ };

const DogDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const { dogId } = route.params;
    console.log('dogId', dogId);
    
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text>Dogs Details Screen</Text>
        </View>
    );
}
export default DogDetailScreen;