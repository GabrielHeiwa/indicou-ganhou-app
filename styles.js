import { Dimensions, StyleSheet } from "react-native";
const window = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    header: {
        flex: 1,
        width: window.width,
        height: window.height * 0.15,
        height: "100%",
        backgroundColor: "#fff",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row"
    },

    logo: {
        width: "40%",
        height: "100%",

    },

    main: {
        backgroundColor: "#fff",
        width: window.width,
        height: window.height * 0.75,
    },

    input_block: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",

        marginVertical: window.height * 0.03,
        marginHorizontal: window.width * 0.04,

        width: window.width - window.width * 0.08,
        height: ((window.height * 0.8) / 16),
    },

    input_group: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",

        marginVertical: window.height * 0.03,
        marginHorizontal: window.width * 0.04,

        width: window.width - window.width * 0.08,
        height: ((window.height * 0.8) / 16),
    },

    input: {
        backgroundColor: "#fff",

        width: "100%",
        height: "120%",

        borderWidth: 1,
        borderRadius: 4,

        paddingLeft: 14,
    },

    input_description: {
        backgroundColor: "#fff",

        height: window.height * .1,
        marginTop: "12%",

        borderWidth: 1,
        borderRadius: 4,

        fontSize: 18,

        paddingLeft: 14,

        display: "flex",
    },

    description: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",

        marginVertical: window.height * 0.03,
        marginHorizontal: window.width * 0.04,

        width: window.width - window.width * 0.08,
        // height: window.height * 0.02,
    },

    label_name_indicator: {
        width: "20%",
        marginHorizontal: 16,
        zIndex: 1,

        marginBottom: "5%",

        fontSize: 20,
        textAlign: "center",

        marginLeft: 4,

        backgroundColor: "#fff",
    },

    label_name_indicated: {
        width: "25%",
        marginHorizontal: 16,
        zIndex: 1,

        marginBottom: "5%",

        fontSize: 20,
        textAlign: "center",

        marginLeft: 4,

        backgroundColor: "#fff",
    },

    label_phone_indicated: {
        width: "50%",
        marginHorizontal: 16,
        zIndex: 1,

        marginBottom: "5%",

        fontSize: 20,
        textAlign: "center",

        marginLeft: 4,

        backgroundColor: "#fff",
    },

    label_description: {
        position: "relative",
        top: "4%",
        width: "35%",
        marginHorizontal: 16,
        zIndex: 1,

        fontSize: 20,
        textAlign: "center",

        marginLeft: 4,

        backgroundColor: "#fff",
    },

    footer: {
        backgroundColor: "yellow",
        width: window.width,
        height: window.height * 0.1,
    },

    footer_container: {
        width: window.width,
        height: "100%",
        backgroundColor: "#333",

        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },

    buttton_submit: {
        width: window.width,
        height: window.height,
    },

    button_text: {
        fontSize: 28,
    },

    camera_open: {
        width: window.width,
        height: window.height,
        display: "flex",
    },

    camera_close: {
        display: "none"
    },

    camera: {
        flex: 1,
        width: window.width,
        height: window.height * .85,
        zIndex: 100,
    },

    camera_options: {
        backgroundColor: "#fff",
        height: window.height * .15,

        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row"
    },

    take_picture: {
        backgroundColor: "red",
        height: 80,
        width: 80,
        borderRadius: 50
    },

    close_camera: {
        width: 80,
    },

    camera_block: {
        width: 80,
        height: 80,
    }
});