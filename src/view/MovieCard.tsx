import React, { useState } from "react";
import { Image, StyleSheet, ImageStyle, StyleProp, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import dimens from "../assets/dimens.json"
type MovieCardProps = {
    imageUrl: string;
    movieName: string;
    onClick: () => void;
    width?: number;
    height?: number;
    borderRadius?: number,
    marginRight?: number
};

export function MovieCard({ movieName, imageUrl, onClick, width = styles.image.width, height = styles.image.height,
    borderRadius = styles.image.borderRadius, marginRight = styles.image.marginRight }: MovieCardProps) {
    //0 for load start
    // 1 for success
    // -1 for failure
    const [showImagePlaceHolder, setShowImagePlaceHolder] = useState(0)
    return (
        // showImagePlaceHolder === 1 || showImagePlaceHolder === 0
        <View style={styles.container}>
            {(showImagePlaceHolder === 1 || showImagePlaceHolder === 0) && (
                <TouchableOpacity onPress={onClick}>

                    <FastImage
                        style={[styles.image, { width: width, height: height, borderRadius: borderRadius, marginRight }]}
                        source={{
                            uri: imageUrl,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        onLoadStart={() => {
                            setShowImagePlaceHolder(0)
                        }}
                        onLoad={() => {
                            setShowImagePlaceHolder(1)
                        }}
                        onLoadEnd={() => {
                            setShowImagePlaceHolder(1)
                        }}
                        onError={() => { setShowImagePlaceHolder(-1) }}

                    />
                </TouchableOpacity>
            )}
            <Text numberOfLines={2} style={styles.movieNameText}>{movieName}</Text>
            {(showImagePlaceHolder === 0) && (<ActivityIndicator size={32} style={{ justifyContent: "center", alignSelf: "center", position: "absolute", marginTop: 65 }} />)}
        </View>
        // showImagePlaceHolder == 0
    );
}

const styles = StyleSheet.create({
    container: {

    },
    image: {
        width: 110,
        height: 170,
        borderRadius: 12,
        resizeMode: "cover",
        marginRight: 12
    },
    movieNameText: {
        width: 100,
        paddingStart: 5,
        textAlign: "left",
        fontSize: dimens.movieCardMovieNameFontSize
    }
});
