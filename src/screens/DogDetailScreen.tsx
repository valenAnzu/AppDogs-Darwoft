import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, FlatList, Dimensions, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParams } from "./homeStack";
import useDogService from "../services/useDogService";
import { Dog } from "../services/Dog";
import { homeStyles } from "./homeStyles";

const { width } = Dimensions.get("window");

interface Props extends NativeStackScreenProps<HomeStackParams, 'DogDetail'>{ };

    const DogDetailScreen: React.FC<Props> = ({ navigation, route }) => {
        const { dogId } = route.params;
        const { getOneDog, isLoading } = useDogService();
        const [dogImageData, setDogImageData] = useState<any[]>([]);
        const [ activeIndex, setActiveIndex ] = useState(0);

    const getDogDetail = async () => {
        try {
            const fetchedDog = await getOneDog(dogId);
            setDogImageData(fetchedDog);
        }
        catch (error) {
            console.error('Error loading dog detail', error);
        }   
    };

    useEffect(() => {
        getDogDetail();
    }, [dogId]);

    if (isLoading) {
        return (
            <View style={homeStyles.loadingStyle}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    if (!dogImageData) {
        return (
            <View style={homeStyles.screenContent}>
                <Text>No se encontró información para esta raza.</Text>
            </View>
        );
    }

    const breedInfo: Dog | undefined = dogImageData[0]?.breeds?.[0];

    const breedDetails = () => {
        if (!breedInfo)
            return <Text>Información de la raza no disponible.</Text>
        return (
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
                {breedInfo.bred_for ? (
                    <Text style={homeStyles.subtitle}>
                        Bred for: <Text style={homeStyles.textInfo}>{breedInfo.bred_for} </Text>
                    </Text>
                ) : null }
                <Text style={homeStyles.subtitle}>
                    Temperament: <Text style={homeStyles.textInfo}>{breedInfo.temperament} </Text>
                </Text>
                {breedInfo.origin ? (
                    <Text style={homeStyles.subtitle}>
                        Origen: <Text style={homeStyles.textInfo}>{breedInfo.origin} </Text>
                    </Text>
                ) : null }
            </>
        )
    }

    const ImageItem = ({ uri }: { uri: string }) => {
        const [loading, setLoading] = useState(true); //loader de la img

        return (
            <View style={styles.imageContainer}>
            {loading && (
                <View style={styles.spinnerLoader}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}

            <Image
                source={{ uri }}
                style={styles.image}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
            />
            </View>
        );
    };

    return (
        <View style={homeStyles.screenContent}>
            <FlatList
                data={dogImageData}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    setActiveIndex(index);
                }}
                renderItem={({ item }) => <ImageItem uri={item.url} />}
                keyExtractor={(_, index) => index.toString()}
                scrollEventThrottle={16}
                />

                <View style={styles.dotsContainer}>
                {dogImageData.map((_, index) => (
                    <View
                    key={index}
                    style={{
                        height: 8,
                        width: 8,
                        borderRadius: 4,
                        marginHorizontal: 4,
                        backgroundColor: index === activeIndex ? "#333" : "#ccc",
                    }}
                    />
                ))}
            </View>
            <View style={{ paddingHorizontal: 20 }}>{breedDetails()}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: "cover"
    },
    spinnerLoader: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        width,
        height: 350,
        backgroundColor: "#f2f2f2"
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10
    }
});

export default DogDetailScreen;