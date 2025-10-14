import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable, StyleSheet, Dimensions, ActivityIndicator, Modal, TextInput } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParams } from "./homeStack";
import useDogService from "../services/useDogService";
import { Dog } from "../services/Dog";
import { homeStyles } from "./homeStyles";
import HeaderFilter from "../components/HeaderFilter";

interface Props extends NativeStackScreenProps<HomeStackParams, 'DogsList'>{ };

const screenWidth = Dimensions.get('window').width;

const DogsListScreen: React.FC<Props> = ({ navigation, route }) => {
    const { getDogs, isLoading } = useDogService();
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [ actualFilter, setActualFilter ] = useState("");
    const [ filteredDogs, setFilteredDogs ] = useState<Dog[]>([]);
    const [ searchModalVisible, setSearchModalVisible ] = useState(false);
    const [ searchText, setSearchText ] = useState("");
    
    const getAllDogs = async () => {
        const fetchedDogs = await getDogs();
        setDogs(fetchedDogs);
        setFilteredDogs(fetchedDogs);
    }

    useEffect(() => {
        getAllDogs();
    }, []);

    useEffect(() => {
        if (actualFilter.trim() === "") {
            setFilteredDogs(dogs);
        } else {
            const filtered = dogs.filter((dog) =>
                dog.name.toLowerCase().includes(actualFilter.toLowerCase())
            );
            setFilteredDogs(filtered);
        }
    }, [actualFilter, dogs]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            // Se reemplaza el título por un componente de filtro
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <Text style={{ fontSize: 30, fontWeight: "600" }}>Dogs List</Text>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <HeaderFilter 
                            actualValue={actualFilter}
                            // Esta es la clave: pasamos el setter del estado al Header
                            onFilterChange={setActualFilter} 
                        />
                    </View>
                </View>
            ),
        });
    }, [navigation, actualFilter]);

    if (isLoading) {
        return (
            <View style={homeStyles.loadingStyle}>
                <ActivityIndicator size="large" color="#0000ff"/>;
            </View>
        );
    }

    const renderItem = ({ item }: { item: Dog }) => (
        <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('DogDetail', { dogId: item.id })}
        >
            <Image source={{ uri: item.image.url }} style={styles.image} />
            <Text style={homeStyles.textName}>{item.name}</Text>
            {item.bred_for ? (
                <Text style={homeStyles.subtitle}>
                    Bred for: <Text style={homeStyles.textInfo}>{item.bred_for} </Text>
                </Text>
            ) : null }
        </Pressable>
    )

    return (
        <View style={homeStyles.screenContent}>
            <FlatList
                numColumns={2}
                data={filteredDogs}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 10 }} /> // separador vertical de 10px
                )}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        No se encontraron razas que coincidan.
                    </Text>
                )}
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
