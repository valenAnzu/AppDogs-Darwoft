import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParams } from "./homeStack";
import useDogService from "../services/useDogService";
import { Dog } from "../services/Dog";
import { homeStyles } from "./homeStyles";

interface Props extends NativeStackScreenProps<HomeStackParams, 'DogsList'>{ };

const screenWidth = Dimensions.get('window').width;

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
        <Pressable style={styles.card} onPress={() => navigation.navigate('DogDetail', { dogId: item.id })}>
            <Image source={{ uri: item.image.url }} style={styles.image} />
            <Text style={homeStyles.textName}>{item.name}</Text>
            <Text style={homeStyles.subtitle}>
                Bred for: <Text style={homeStyles.textInfo}>{item.bred_for} </Text>
            </Text>
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

const CARD_MARGIN = 10;
const CARD_WIDTH = (screenWidth / 2) - CARD_MARGIN * 3;

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#a1ecff',
        padding: 10,
        borderRadius: 10,
        //alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 10,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
});

export default DogsListScreen;
