import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Text, View, Image, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { styles } from "./styles";
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import { Camera } from "expo-camera";
import * as Location from 'expo-location';
import Mailer from "@sendgrid/mail";

export default function App() {
  // Location variables.
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Camera variables.
  const [photo, set_photo] = useState();
  const [captured_image, set_captured_image] = useState(false);
  const [hasPermission, setHasPermission] = useState();
  const camRef = useRef();

  // Data variables.
  const [nome_indicador, set_nome_indicador] = useState("");
  const [nome_do_indicado, set_nome_do_indicado] = useState("");
  const [telefone_do_indicado, set_telefone_do_indicado] = useState("");
  const [imagem_da_fatura, set_imagem_da_fatura] = useState("");
  const [latitude, set_latitude] = useState();
  const [longitude, set_longitude] = useState();
  const [descricao, set_descricao] = useState("");

  // Camera functions...
  async function takePicture() {
    const data = await camRef.current.takePictureAsync();
    set_captured_image(curr => true);
    // console.log(data);;

    set_photo(curr => false);
  };

  async function request_location() {
    let { status: location_status } = await Location.requestForegroundPermissionsAsync();
    if (location_status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    set_latitude(curr => location.coords.latitude);
    set_longitude(curr => location.coords.longitude);
  }

  async function submit() {

  }

  // Solicitando permissão para usar a câmera.
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      let { status: location_status } = await Location.requestForegroundPermissionsAsync();
      if (location_status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      {photo &&
        <View>

          <Camera ref={camRef} style={styles.camera}>

          </Camera>

          <View style={styles.camera_options}>
            <View style={styles.camera_block} />

            <TouchableOpacity onPress={() => takePicture()}>
              <View style={styles.take_picture}></View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => set_photo(curr => !curr)}>
              <View style={styles.close_camera}>
                <AntDesign name="closecircleo" size={32} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      }

      {!photo && <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} source={require("./assets/logo.webp")} />
        </View>


        {/* Main */}

        <KeyboardAvoidingView behavior="padding" style={styles.main}>

          {/* Nome do indicador */}
          <View style={styles.input_block}>
            <Text style={styles.label_name_indicator}>Nome</Text>
            <TextInput style={styles.input}></TextInput>
          </View>


          {/* Nome do indicado */}
          <View style={styles.input_block}>
            <Text style={styles.label_name_indicated}>Indicado</Text>
            <TextInput style={styles.input}></TextInput>
          </View>


          {/* Telefone do indicado */}
          <View style={styles.input_block}>
            <Text style={styles.label_phone_indicated}>Indicado telefone</Text>
            <TextInput style={styles.input}></TextInput>
          </View>

          {/* Foto da fatura */}
          <View style={styles.input_group}>
            {
              !captured_image ?
                <TouchableOpacity onPress={() => set_photo(curr => !curr)}>
                  <Entypo name="camera" size={32} color="black" />
                </TouchableOpacity> :
                <AntDesign name="checkcircleo" size={32} color="green" />
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
              placeholder="Insira a descrição por gentileza"
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


