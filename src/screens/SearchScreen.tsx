import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, View } from "react-native";
import strings from "../assets/strings.json"
import dimens from "../assets/dimens.json"
import { SearchBar } from "../view/SearchBar";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { SearchIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { useSearchMovies, useTrendingMovies } from "../model/Api";
import { MovieCard } from "../view/MovieCard";
import { BackButton } from "../view/BackButton";
import { useNavigation } from "@react-navigation/native";
export function SearchScreen(): React.JSX.Element {
    return (
        <Content />
    )
}

export function Content(): React.JSX.Element {
    const title = strings.search
    const [searchText, setSearchText] = useState<null | string>(null)
    const canShowBackButton = Platform.OS === "ios"
    function onTextChange(text: string) {
        setSearchText(text)
    }
    const navigation = useNavigation()
    const searchResult = useSearchMovies(searchText ?? "");

    const {
        data,
        error,
        loading,
        refresh,
    } = searchResult

    return (<View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
                {canShowBackButton && <BackButton />}
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <HugeiconsIcon
                icon={SearchIcon}
                size={20}
                color="#999"
                style={styles.icon}
            />
        </View>
        <View style={{ marginTop: 20, marginLeft: 5, marginEnd: 5 }}>
            <SearchBar onTextChange={onTextChange} />
        </View>
        {loading && <View style={{ width: "100%", height: "100%", position: "absolute", justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator style={{}} />
        </View>}

        {data && data.length > 0 && (
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <MovieCard
                        imageUrl={item.posterUrl ?? ""}
                        movieName={item.title}
                        onClick={() => {
                            navigation.navigate("MovieDetails", { movieId: item.id })
                        }}
                        marginRight={0}
                    />
                )}
                showsVerticalScrollIndicator={false}
                style={styles.recycler}
            />

        )}

        {!loading && data?.length === 0 && (
            <Text style={{ textAlign: "center", margin: "auto" }}>No results found</Text>
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