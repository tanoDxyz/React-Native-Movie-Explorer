import React, { useState } from "react";
import { Image, StyleSheet, ImageStyle, StyleProp, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import dimens from "../assets/dimens.json"
type CastCardProps = {
    imageUrl: string;
    name: string;
    width?: number;
    height?: number;
    borderRadius?: number,
    marginRight?: number
};

export function CastCard({ name, imageUrl, width = styles.image.width, height = styles.image.height,
    borderRadius = styles.image.borderRadius, marginRight = styles.image.marginRight }: CastCardProps) {
    //0 for load start
    // 1 for success
    // -1 for failure
    const [showImagePlaceHolder, setShowImagePlaceHolder] = useState(0)
    return (
        // showImagePlaceHolder === 1 || showImagePlaceHolder === 0
        <View style={styles.container}>
            {(showImagePlaceHolder === 1 || showImagePlaceHolder === 0) && (
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
            )}
            <Text numberOfLines={2} style={styles.movieNameText}>{name}</Text>
            {(showImagePlaceHolder === 0) && (<ActivityIndicator size={32} style={{ justifyContent: "center", alignSelf: "center", position: "absolute", marginTop: 35 }} />)}
        </View>
        // showImagePlaceHolder == 0
    );
}

const styles = StyleSheet.create({
    container: {

    },
    image: {
        width: 80,
        height: 90,
        borderRadius: 12,
        resizeMode: "cover",
        marginRight: 12
    },
    movieNameText: {
        width: 80,
        paddingStart: 5,
        textAlign: "left",
        fontSize: dimens.movieCardMovieNameFontSize
    }
});
