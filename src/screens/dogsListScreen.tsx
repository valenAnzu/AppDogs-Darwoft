import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParams } from "./homeStack";
import useDogService from "../services/useDogService";
import { Dog } from "../services/Dog";
import { homeStyles } from "./homeStyles";

interface Props extends NativeStackScreenProps<HomeStackParams, 'DogsList'>{ };

const DogsListScreen: React.FC<Props> = ({ navigation, route }) => {
    const { getDogs } = useDogService();
    const [dogs, setDogs] = useState<Dog[]>([]);
    
    const getAllDogs = async () => {
        const fetchedDogs = await getDogs();
        // console.log('Fetched dogs:', fetchedDogs);
        setDogs(fetchedDogs);
    }

    useEffect(() => {
        getAllDogs();
    }, []);

    const renderItem = ({ item }: { item: Dog }) => (
        <Pressable style={{ marginHorizontal: 10 }} onPress={() => navigation.navigate('DogDetail', { dogId: item.id })}>
            <Image source={{ uri: item.image.url }} style={{ width: 100, height: 100 }} />
            <Text>{item.name}</Text>
        </Pressable>
    )

    return (
        <View style={homeStyles.screenContent}>
            <FlatList
                numColumns={2}
                data={dogs}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 10 }} /> // separador vertical de 10px
                )}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({

});

export default DogsListScreen;
