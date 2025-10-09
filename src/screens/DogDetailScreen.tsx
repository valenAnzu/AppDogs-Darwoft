import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParams } from "./homeStack";
import useDogService from "../services/useDogService";
import { Dog } from "../services/Dog";
import { homeStyles } from "./homeStyles";

interface Props extends NativeStackScreenProps<HomeStackParams, 'DogDetail'>{ };

    const DogDetailScreen: React.FC<Props> = ({ navigation, route }) => {
        const { dogId } = route.params;
        const { getOneDog, isLoading, errorMessage } = useDogService();
        const [dogImageData, setDogImageData] = useState<any>(null);
        console.log('dogId', dogId);

    const getDogDetail = async () => {
        try {
            const fetchedDog = await getOneDog(dogId);
            setDogImageData(fetchedDog);
        }
        catch (error) {
            console.error('Error loading dog detail', error);
        }   
    }

    useEffect(() => {
        getDogDetail();
    }, [dogId]);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!dogImageData) {
        return (
            <View style={homeStyles.screenContent}>
                <Text>No se encontró información para esta raza.</Text>
            </View>
        );
    }

    const breedInfo: Dog | undefined = dogImageData?.breeds?.[0];

    return (
        <View style={homeStyles.screenContent}>
            {dogImageData?.url ? (
                <Image
                    source={{ uri: dogImageData.url }}
                    style={{ width: '100%', height: 300, marginBottom: 20 }}
                    resizeMode="cover"
                />
            ) : (
                <Text>Imagen no disponible</Text>
            )}
            {breedInfo ? (
                <>
                    <Text style={homeStyles.textName}>{breedInfo.name}</Text>
                    <Text style={homeStyles.subtitle}>
                        Height: <Text style={homeStyles.textInfo}>{breedInfo.height.metric} cm </Text>
                    </Text>
                    <Text style={homeStyles.subtitle}>
                        Weight: <Text style={homeStyles.textInfo}>{breedInfo.weight.metric} kg </Text>
                    </Text>
                    <Text style={homeStyles.subtitle}>
                        Life Span: <Text style={homeStyles.textInfo}>{breedInfo.life_span} </Text>
                    </Text>
                    <Text style={homeStyles.subtitle}>
                        Bred for: <Text style={homeStyles.textInfo}>{breedInfo.bred_for} </Text>
                    </Text>
                    <Text style={homeStyles.subtitle}>
                        Temperament: <Text style={homeStyles.textInfo}>{breedInfo.temperament} </Text>
                    </Text>
                    {breedInfo.origin ? (
                        <Text style={homeStyles.subtitle}>
                            Origen: <Text style={homeStyles.textInfo}>{breedInfo.origin} </Text>
                        </Text>
                    ) : null }
                </>
            ) : (
                <Text>Información de la raza no disponible.</Text>
            )}
        </View>
    )
}


export default DogDetailScreen;