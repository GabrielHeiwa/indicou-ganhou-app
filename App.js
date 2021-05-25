import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from "./styles";


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      
      <View style={styles.header}>
        <Text> Hello world </Text>
      </View>


      {/* Main */}

      <View style={styles.main}>

      </View>

      {/* Footer */}
      <View style={styles.footer}>

      </View>


      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


