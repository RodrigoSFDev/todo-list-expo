import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage  from '@react-native-async-storage/async-storage';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novoTexto, setNovoTexto] = useState("");

  useEffect(() => {
    async function loadData() {
      const response = await AsyncStorage.getItem('tarefas');
      const storageTarefas = response ? JSON.parse(response) : [];
      setTarefas(storageTarefas);
    }
    loadData();
  }, []);
  useEffect(() => {
    async function updateTarefas() {
      await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
    updateTarefas();
  }, [tarefas]);
  async function handleAdd() {
    if (novoTexto === "") {
      return;
    }
    const id = uuid.v4();
  
    const novaTarefa = {
      id,
      texto: novoTexto,
      editando: false, 
    };
    
    setTarefas([...tarefas, novaTarefa]);
    await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
    setNovoTexto("");
  }

  function handleEditToggle(id) {
    const novasTarefas = tarefas.map((tarefa) =>
      tarefa.id === id
        ? { ...tarefa, editando: !tarefa.editando }
        : tarefa
    );
  
    setTarefas(novasTarefas);
  }
  
  function handleEdit(id, novoTexto) {
    const novasTarefas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, texto: novoTexto } : tarefa
    );
  
    setTarefas(novasTarefas);
  }
  
  function handleDelete(id) {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  
    setTarefas(novasTarefas);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>TO DO LIST</Text>
      <View style={styles.boxTarefa}>
        <TextInput
        style={styles.input} 
        placeholder="Digite uma tarefa" 
        value={novoTexto}
        onChangeText={(texto) => setNovoTexto(texto)} />
        <TouchableOpacity style={styles.btnAdd} onPress={handleAdd}>
          <Text style={{ color: '#fff' }}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>
  <Text>Lista de Tarefas:</Text>
      <View style={styles.linha}></View>
      <ScrollView style={styles.lista}>
  {tarefas.map((tarefa) => (
    <View key={tarefa.id} style={styles.listaTarefa}>
      {tarefa.editando ? (
        // Renderizar input para ediçãor
        <TextInput
          style={styles.input}
          value={tarefa.texto}
          onChangeText={(novoTexto) =>
            handleEdit(tarefa.id, novoTexto)
          }
        />
      ) : (
        // Renderizar texto da tarefa
        <Text style={styles.textoTarefa}>{tarefa.texto}</Text>
      )}
      <View style={styles.boxBtn}>
      <TouchableOpacity
        onPress={() => handleEditToggle(tarefa.id)}
      >
        <Text style={styles.editar}>
          {tarefa.editando ? "Salvar" : "Editar"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete(tarefa.id)}
      >
        <Text style={styles.excluir}>Excluir</Text>
      </TouchableOpacity>
      </View>
    </View>
  ))}
</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    margin: 20,
    padding: 10,
    width: '70%',
  },
  boxTarefa: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  listaTarefa: {
    width: '90%',
    height: 'auto',
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    elevation: 10,
    padding: 10,

  },
  btnAdd: {
    width: 110,
    height: 50,
    marginTop: 20,
    marginRight: 20,
    backgroundColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  linha: {
    borderBottomWidth: 1,
  },
  lista: {
    marginTop: 10,

  },
  editar: {
    color: 'blue',
    marginRight: 10,
  },
  excluir: {
    color: 'red',
  },
  boxBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textoTarefa: {
    fontSize: 16,
    maxWidth: '70%', // Defina a largura máxima desejada
  },
});
