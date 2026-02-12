


import { RouteProp, useRoute } from "@react-navigation/native";
import { StyleSheet, View, Text, ScrollView, Platform, ActivityIndicator, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import strings from "../assets/strings.json";
import dimens from "../assets/dimens.json"
import { BackButton } from "../view/BackButton";
import { useMovieDetails } from "../model/Api";
import YoutubePlayer from "react-native-youtube-iframe";
import { MovieCard } from "../view/MovieCard";
import { CastCard } from "../view/CastCard";
import { Image } from "react-native-svg";
import { FavoriteButton } from "../view/FavoriteButton";
import StorageService from "../model/StorageManager";
import { useEffect, useState } from "react";
import { Favorite } from "../model/Favorite";
import { PlatformPressable } from "@react-navigation/elements";



type RouteParams = {
    MovieDetails: {
        movieId: number;
    };
};
import { useWindowDimensions } from 'react-native';
import { useIsOrientationPortrait } from "../_";



export function MovieDetailsScreen(): React.JSX.Element {
    const route = useRoute<RouteProp<RouteParams, "MovieDetails">>();
    const { movieId } = route.params;
    const showBackButton = Platform.OS === "ios"
    const firstElementMarginTop = showBackButton ? 30 : 10
    const { data, loading, error, refresh } = useMovieDetails(movieId)
    const runtime = data?.runtime ?? 0
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const runtimeStr = `${hours}h ${minutes}m`
    const [isFavorite, setIsFavorite] = useState(false);
    const orientationIsPortrait = useIsOrientationPortrait()
    useEffect(() => {
        StorageService.isFavorite(`${movieId}`).then(setIsFavorite);
    }, [movieId]);

    return (

    
        <View style={styles.root}>
            {showBackButton && (<BackButton />)}
            {(data != null) &&
                <ScrollView>
                    <View style={styles.viewContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: firstElementMarginTop, justifyContent: "space-between" }}>
                            <Text style={[styles.trailerText]}>{strings.trailer}</Text>
                            <FavoriteButton isFavorite={isFavorite} onToggle={() => { 
                                (async ()=> {
                                    await StorageService.makeFavorite(new Favorite(`${movieId}`,data.posterUrl ?? "",data.title,!isFavorite))
                                })()
                                setIsFavorite(!isFavorite)
                            }} />
                        </View>

                        <View style={styles.videoWrapper}>
                            <YoutubePlayer
                                height={orientationIsPortrait ? 220 : 420}
                                play={false}
                                videoId={data.trailerKey}
                            />
                        </View>

                        <Text style={styles.movieTitle}>{data?.title}</Text>
                        <View style={styles.metaRow}>
                            <Text style={{
                                color: "#BCBCBC", marginEnd: 18, fontSize: 15, fontWeight: "300"
                            }}>{data.releaseYear},</Text>
                            <Text style={{
                                color: "#BCBCBC", marginEnd: 18, fontSize: 15, fontWeight: "300"
                            }}>{runtimeStr}</Text>
                        </View>

                        <Text style={{
                            color: "#BCBCBC", marginEnd: 18, fontSize: 15, marginTop: 20, lineHeight: 22, fontWeight: "300"
                        }}>{data.overview}</Text>

                        <Text style={[styles.movieTitle]}>{strings.casetAndCrew}</Text>
                        <FlatList
                            horizontal
                            data={data.cast}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <CastCard
                                    name={item.name}
                                    imageUrl={item.profileUrl ?? ""}
                                />
                            )}
                            style={{ marginTop: 20 }}
                        />
                    </View>
                </ScrollView>}
            {error != null && (
                <Text style={styles.errorTv} onPress={refresh}>Failed to Load Details! Tap to Refresh</Text>
            )}

            {loading && (
                <ActivityIndicator style={styles.indicator} />
            )}

        </View>



    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    viewContainer: {
        backgroundColor: "#FFF"
    },
    trailerText: {
        fontSize: dimens.HeaderLevel1TextSize
    },
    errorTv: {
        flex: 1,
        textAlign: "center"
    },
    indicator: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
        width: 64,
        height: 64
    },
    videoWrapper: {
        borderRadius: 16,
        overflow: "hidden",   // 👈 THIS IS CRITICAL
        marginTop: 25,
        backgroundColor: "#000", // avoids white flash
    },
    movieTitle: {
        fontSize: dimens.HeaderLevel2TextSize,
        marginTop: 20
    },
    metaRow: {
        marginTop: 20,
        width: "100%",
        flexDirection: "row",
        alignContent: "space-between",
        flexWrap: "wrap",
    }
});
