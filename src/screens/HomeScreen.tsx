import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, View, ViewBase } from "react-native";

import strings from '../assets/strings.json'
import dimens from '../assets/dimens.json'
import React, { useEffect, useState } from "react";
import { searchMovies, usePopularMovies, useTrendingMovies } from "../model/Api";
import { Spinner } from "../view/Spinner";
import { MovieCard } from "../view/MovieCard";
import { formatNumber } from "../_";
import { RootNavigator } from "./RootNavigator";
import { NavigationAction, NavigationProp, NavigationState, useNavigation } from "@react-navigation/native";



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },

    headerText: {
        fontSize: dimens.HeaderLevel1TextSize
    },
    header: {
    },
    trendingContainer: {
        marginTop: 36,
    },
    trendingTitle: {
        paddingBottom: 16,
        fontSize: dimens.HeaderLevel2TextSize
    },
    errorView: {
        width: "100%",
        height: 150,
        textAlign: "center"
    },
    trendingMoviesLoader: {
        width: 48,
        height: 48,
    },
    trendingMoviesLoaderContainer: {
        width: "100%",
        height: 200,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    popularityTextViewStyle: {
        width: "100%",
        textAlign: "left",
        fontSize: dimens.movieCardPopularityFontSize

    }
});

export function Header(): React.JSX.Element {
    const title = strings.AppName
    return (<View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
    </View>)
}

export function TrendingMovies(): React.JSX.Element {
    const title = strings.trendingTitle
    const { data, loading, error, refresh } = useTrendingMovies()
    const navigation:Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> = useNavigation()
    function onMovieClicked(id:number) {
        navigation.navigate("MovieDetails",{movieId:id})
    }
    return (<View style={styles.trendingContainer}>
        <Text style={styles.trendingTitle}>{title}</Text>

        {(data != null && error === null) && (<View>
            <FlatList
                data={data}
                horizontal
                keyExtractor={(item) => `${item.type}-${item.id}`}
                renderItem={({ item }) => (
                    <MovieCard imageUrl={item.posterUrl ?? ""} movieName={item.title} onClick={()=>{onMovieClicked(item.id)}}/>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>)}
        {(error != null) && (<View>
            <Text style={styles.errorView} onPress={refresh}>{strings.e1}</Text>
        </View>)}
        {(loading && error === null) && (<View style={styles.trendingMoviesLoaderContainer}>
            <ActivityIndicator style={styles.trendingMoviesLoader} />
        </View>)}
    </View>)
}

export function PopularMovies(): React.JSX.Element {
    const title = strings.popularTitle
    const { data, loading, error, refresh } = usePopularMovies()
    const navigation = useNavigation()
    function onMovieClicked(id:number) {
        navigation.navigate("MovieDetails",{movieId:id})

    }
    return (<View style={styles.trendingContainer}>
        <Text style={styles.trendingTitle}>{title}</Text>

        {(data != null && error === null) && (<View>
            <FlatList
                data={data}
                horizontal
                keyExtractor={(item) => `${item.id}-}`}
                renderItem={({ item }) => (
                    <View>
                        <MovieCard imageUrl={item.posterUrl ?? ""} movieName={item.title} onClick={()=>{onMovieClicked(item.id)}} />
                        <Text style={styles.popularityTextViewStyle}>{(`🔥${formatNumber(item.popularity)}`)}</Text>
                    </View>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>)}
        {(error != null) && (<View>
            <Text style={styles.errorView} onPress={refresh}>{strings.e1}</Text>
        </View>)}
        {(loading && error === null) && (<View style={styles.trendingMoviesLoaderContainer}>
            <ActivityIndicator style={styles.trendingMoviesLoader} />
        </View>)}
    </View>)
}
export function HomeScreen(): React.JSX.Element {


    return (<View style={styles.container}>
        <ScrollView>
            <Header />
            <TrendingMovies />
            <PopularMovies />
        </ScrollView>

    </View>)
}