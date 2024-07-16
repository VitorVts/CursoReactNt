import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
 TouchableOpacity,
} from "react-native";
import firebase from "../../services/firebaseConnection";
import Icon from '@expo/vector-icons/FontAwesome'

export default function Login({changeStatus}) {
  const [type, setType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (type === "login") {
      // Login
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert("Ops,Algo deu errado");
          return;
        });
    } else {
      // Register
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert("Ops,Algo deu errado");
          return;
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>

        <Text style={{textAlign:'center',fontSize:40,fontWeight:'bold',marginBottom:30}}>App tarefas</Text>
      <TextInput
        placeholder="Seu Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        placeholder="********"
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity
        style={[
          styles.handleLogin,
          { backgroundColor: type === "login" ? "#3ea6f2" : "#141414" },
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>
          {type === "login" ? "Acessar" : "Cadastrar"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          setType((type) => (type === "login" ? "cadastrar" : "login"))
        }
      >
        <Text style={{ textAlign: "center" }}>
          {type === "login" ? "Criar uma Conta" : "Já Possuo uma conta."}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#f2f6fc",
    paddingHorizontal: 10,
    justifyContent:'center'
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#141414",
  },
  handleLogin: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
    height: 45,
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 17,
  },
});
