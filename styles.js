import { Dimensions, StyleSheet } from "react-native";

const window = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        flex: 1,
        width: window.width,
        height: window.height * 0.1,
        backgroundColor: "blue",
    },

    main: {
        backgroundColor: "green",
        width: window.width,
        height: window.height * 0.8,
    },

    footer: {
        backgroundColor: "yellow",
        width: window.width,
        height: window.height * 0.1,
    },
});