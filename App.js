import React, { // React imports.
  useEffect,
  useState,
  useRef
} from 'react';
import {        // React Native imports.
  SafeAreaView,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  LogBox
} from 'react-native';
import { styles } from "./styles";          // Styles of page. 
import {
  Entypo,
  Feather,
  AntDesign,
  MaterialIcons
} from '@expo/vector-icons';                      // Icons imports.
import { Camera } from "expo-camera";             // Camera imports.
import * as Location from 'expo-location';        // Location imports.
import axios from "axios";                        // Import Axios for make requests.
import firebase from "firebase";                  // Import firebase to send image from cloud.
import * as ImagePicker from "expo-image-picker";

const firebaseConfig = {
  apiKey: 'AIzaSyBQr2Pevsk4W48EjVoMl9sjx-AxHJOazmI',
  authDomain: 'engfor-117b0.firebaseapp.com',
  databaseURL: 'https://engfor-117b0.firebaseio.com',
  storageBucket: 'engfor-117b0.appspot.com',
  messagingSernderId: '828521921263',
  appId: "1:828521921263:android:66470705b924b412da791a",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
};

LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default function App() {

  // Location variables.
  const [location, setLocation] = useState(false);

  // Camera variables.
  const [photo, set_photo] = useState();
  const [captured_image, set_captured_image] = useState(false);
  const [hasPermissionCamera, setHasPermissionCamera] = useState(false);
  const camRef = useRef();

  // Data Variables.
  const [fatura_do_indicado_uri, set_imagem_da_fatura_uri] = useState("");
  const [latitude_do_indicado, set_latitude] = useState();
  const [longitude_do_indicado, set_longitude] = useState();
  const [nome_do_indicado, set_nome_do_indicado] = useState();
  const [nome_do_indicador, set_nome_do_indicador] = useState();
  const [telefone_do_indicado, set_telefone_do_indicado] = useState();
  const [descricao_do_indicado, set_descricao_do_indicado] = useState();

  const [indication_status_view, set_indication_status_view] = useState(false);
  const [indication_status, set_indication_status] = useState(null);
  const [indication_message, set_indication_message] = useState(false);
  const [loading, set_loading] = useState(false);

  // Camera function take picture.
  async function takePicture() {
    if (!hasPermissionCamera) await request_camera();

    const { uri } = await ImagePicker.launchCameraAsync();
    if (uri) {
      set_imagem_da_fatura_uri(curr => uri);
      set_captured_image(curr => true);
      set_photo(curr => false);
    }
  };

  // Request location authorization to use.
  async function request_location() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      setLocation(curr => true);
      let location = await Location.getCurrentPositionAsync({});
      set_latitude(curr => location.coords.latitude);
      set_longitude(curr => location.coords.longitude);
    } else {
      setLocation(curr => false);
    }
  };

  // Request camera authorization to use.
  async function request_camera() {
    let { status } = await Camera.requestPermissionsAsync();
    return status === "granted" ? setHasPermissionCamera(curr => true) : setHasPermissionCamera(curr => false);
  };

  // Upload of imagem for firebase store.
  async function upload_image() {
    if (!fatura_do_indicado_uri) return;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", fatura_do_indicado_uri, true);
      xhr.send(null);
    });

    const uri_ = fatura_do_indicado_uri.split("/");
    const filename = uri_[uri_.length - 1];

    const ref = firebase.storage().ref();
    const child = ref.child(filename);
    const snapshot = await child.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  // Submetendo os dados para a serverless function na vercel.
  async function submit() {
    set_loading(curr => true);

    const url_image = await upload_image();

    const indication_data = {
      nome_do_indicador,
      nome_do_indicado,
      telefone_do_indicado,
      longitude_do_indicado,
      latitude_do_indicado,
      descricao_do_indicado,
      url_image,
    };

    try {
      const url = "https://indicou-ganhou-web.vercel.app/api/save";
      const { data } = await axios.post(url, indication_data);
      if (data.status === 200) {
        console.log("Indicação feita com sucesso!");
        set_indication_status(curr => true);
      } else {
        console.log("Erro ao fazer a indicação!");
        set_indication_status(curr => false);
      };
      set_indication_status_view(curr => true);
      set_indication_message(curr => true);

      const timeout = setTimeout(() => {
        set_loading(curr => false);
        set_indication_status_view(curr => false);
        set_indication_message(curr => false);
        clearTimeout(timeout);
      }, 5000);

    } catch (err) {
      return console.error(err);
    }

  };

  // Solicitando permissão para usar a câmera e localização ao iniciar o app.
  useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await request_location();
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      {loading &&
        <View style={styles.loading}>
          { }
          {!indication_message &&
            <>
              <Text style={styles.text_loading}>Enviando indicação </Text>
            </>}

          {
            indication_status_view &&
            <View style={styles.indication_message_container}>
              {
                indication_status === true ?
                  <>
                    <Text style={styles.indication_status_text}>Indicação feita com sucesso!</Text>
                    <AntDesign style={styles.indication_message_icon} name="checkcircleo" size={64} color="green" />
                  </> :
                  <>
                    <Text style={styles.indication_status_text}>Erro ao fazer a indicação!</Text>
                    <MaterialIcons style={styles.indication_message_icon} name="error" size={64} color="red" />
                  </>
              }
            </View>
          }
        </View>}

      {!photo && <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} source={require("./assets/logo.webp")} />
        </View>


        {/* Main */}
        <KeyboardAvoidingView behavior="height" style={styles.main}>

          {/* Nome do indicador */}
          <View style={styles.input_block}>
            <Text style={styles.label_name_indicator}>Nome</Text>
            <TextInput
              placeholder="Nome do indicador"
              defaultValue={nome_do_indicador}
              onChangeText={(value) => set_nome_do_indicador(curr => value)}
              style={styles.input}></TextInput>
          </View>

          {/* Nome do indicado */}
          <View style={styles.input_block}>
            <Text style={styles.label_name_indicated}>Indicado</Text>
            <TextInput
              placeholder="Nome do indicado"
              defaultValue={nome_do_indicado}
              onChangeText={(value) => set_nome_do_indicado(curr => value)}
              style={styles.input}></TextInput>
          </View>


          {/* Telefone do indicado */}
          <View style={styles.input_block}>
            <Text style={styles.label_phone_indicated}>Indicado telefone</Text>
            <TextInput
              placeholder="Número do indicado"
              keyboardType="numeric"
              defaultValue={telefone_do_indicado}
              onChangeText={(value) => set_telefone_do_indicado(curr => value)}
              style={styles.input}></TextInput>
          </View>

          {/* Foto da fatura */}
          <View style={styles.input_group}>
            {
              !captured_image ?
                <TouchableOpacity onPress={() => takePicture()}>
                  <Entypo name="camera" size={32} color="black" />
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => takePicture()}>
                  <AntDesign name="checkcircleo" size={32} color="green" />
                </TouchableOpacity>

            }

            {
              !location ?
                <TouchableOpacity onPress={() => request_location()}>
                  <Feather name="map-pin" size={32} color="black" />
                </TouchableOpacity> :
                <AntDesign name="checkcircleo" size={32} color="green" />
            }
          </View>


          {/* Descrição */}
          <View style={styles.input_block}>
            <Text style={styles.label_description}>Descrição</Text>
            <TextInput
              defaultValue={descricao_do_indicado}
              onChangeText={(value) => set_descricao_do_indicado(curr => value)}
              placeholder="Insira uma descrição"
              multiline
              numberOfLines={10}
              style={styles.input_description}></TextInput>
          </View>


        </KeyboardAvoidingView>

        {/* Footer */}
        <View style={styles.footer}>

          <View style={styles.footer_container}>

            <TouchableOpacity style={styles.button_submit} onPress={() => submit()}>
              <Text style={styles.button_text}>Enviar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
      }

      <StatusBar style="auto" />

    </SafeAreaView>
  );
}


