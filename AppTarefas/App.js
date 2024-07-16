import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform
} from "react-native";
import Login from "./src/Components/Login/Index";
import TaskList from "./src/Components/TaskList";
import firebase from "./src/services/firebaseConnection";
import Icon from "@expo/vector-icons/Feather"
import Feather from "@expo/vector-icons/Feather";
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);
  const [key, setKey] = useState("");
  useEffect(() => {
    function getUser() {}
    if (!user) {
      return;
    }
    firebase
      .database()
      .ref("tarefas")
      .child(user)
      .once("value", (snapshot) => {
        setTasks([]);

        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome,
          };
          setTasks((oldTasks) => [...oldTasks, data]);
        });
      });

    getUser();
  }, [user]);

  function handleAdd() {
    if (newTask === "") {
      return;
    }

    if (key !== "") {
      firebase
        .database()
        .ref("tarefas")
        .child(user)
        .child(key)
        .update({
          nome: newTask,
        })
        .then(() => {
          const taskIndex = tasks.findIndex(item=>item.key === key)
          const taskClone = tasks;
          taskClone[taskIndex].nnome = newTask

          setTasks([...taskClone])
        });
      Keyboard.dismiss();
      setNewTask("");
      setKey("");
      return;
    }

    let tarefas = firebase.database().ref("tarefas").child(user);
    let chave = tarefas.push().key;

    tarefas
      .child(chave)
      .set({
        nome: newTask,
      })
      .then(() => {
        const data = {
          key: chave,
          nome: newTask,
        };
        setTasks((oldTasks) => [...oldTasks, data]);
      });
    setNewTask("");
    Keyboard.dismiss();
  }

  function handleDelete(key) {
    firebase
      .database()
      .ref("tarefas")
      .child(user)
      .child(key)
      .remove()
      .then(() => {
        const findTasks = tasks.filter((item) => item.key !== key);
        setTasks(findTasks);
      });
  }

  function handleEdit(data) {
    setKey(data.key);
    setNewTask(data.nome);
    inputRef.current.focus();
  }

  function cancelEdit(){
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }


  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />;
  }

  return (
    <SafeAreaView style={styles.container}>

      {key.length>0&& (
        <View style={{flexDirection:'row',marginBottom:4,justifyContent:'space-between',alignItems:'center'}}>
        <Text style={{marginLeft:5,color:'#FF0000',textAlign:'center'}}>
        Você está editando uma tarefa!
        </Text>
        <TouchableOpacity onPress={cancelEdit}>
            <Feather name="x-circle" size={40} color="#FF0000"/>
        </TouchableOpacity>
      </View>
      )}



      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje ?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TaskList
            data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     paddingTop: Platform.OS === 'android' ? 20 : 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginTop: 40,
  },
  containerTask: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 1,
    borderWidth: 1,
    borderColot: "#141414",
    height: 45,
  },
  buttonAdd: {
    backgroundColor: "#141414",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
  },
});
