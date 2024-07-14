import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Keyboard,
} from "react-native-web";
import api from "./src/services/api";

export default function App() {
  const [cep, setCep] = useState("");
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  async function buscar() {
    if (cep == "") {
      alert("Digite um cep valido");
      setCep("");
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss(); 
    } catch (error) {
      console.log("ERROR: " + error);
    }
  }

  function limpar() {
    setCep("");
    inputRef.current.focus();
    setCepUser(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 23075006"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#1d75cd" }]}
          onPress={buscar}
        >
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={limpar}
          style={[styles.btn, { backgroundColor: "#cd3e1d" }]}
        >
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && 
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  areaBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  btn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  btnText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  resultado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
});
