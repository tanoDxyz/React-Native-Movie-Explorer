import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import dimens from "../assets/dimens.json"
import strings from "../assets/strings.json"
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../view/BackButton";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { SearchIcon } from "@hugeicons/core-free-icons";
import StorageService from "../model/StorageManager";
import { useEffect, useState } from "react";
import { Favorite } from "../model/Favorite";
import { MovieCard } from "../view/MovieCard";
export function FavoritesScreen(): React.JSX.Element {
    const title = strings.favorite
    const canShowBackButton = Platform.OS === "ios"
    const navigation = useNavigation()
    // const [favoritesChanged, setFavoritesChanged] = useState(true)
    const [favoritesData, setFavoritesData] = useState<Favorite[] | null>(null)

    StorageService.getAllFavorites().then((data) => { setFavoritesData(data) })

    return (<View style={styles.container}>
        <View style={{
            flexDirection: "row", justifyContent: "space-between",
            alignItems: "center"
        }}>
            <View style={{ flexDirection: "row" }}>
                {canShowBackButton && <BackButton />}
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>

        {favoritesData && favoritesData.length > 0 && (
            <FlatList
                data={favoritesData}
                keyExtractor={(item) => item.getMovieId().toString()}
                numColumns={3}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <MovieCard
                        imageUrl={item.getMovieImageUrl() ?? ""}
                        movieName={item.getMovieTitle()}
                        onClick={() => {
                            navigation.navigate("MovieDetails", { movieId: item.getMovieId() })
                        }}
                        marginRight={0}
                    />
                )}
                showsVerticalScrollIndicator={false}
                style={styles.recycler}
            />

        )}
    </View>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },

    headerText: {
        fontSize: dimens.HeaderLevel1TextSize,
        textAlign: "center",
        width: "60%"
    },
    header: {
    }, icon: {
        marginRight: 10,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 16,
    },
    recycler: {
        marginTop: 20,
    }
})