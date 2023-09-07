import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novoTexto, setNovoTexto] = useState("");
  function handleAdd() {
    if (novoTexto === "") {
      return;
    }
  
    const novaTarefa = {
      id: Date.now(),
      texto: novoTexto,
      editando: false, 
    };
    console.log(novaTarefa);
  
    setTarefas([...tarefas, novaTarefa]);
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
    <View style={styles.container}>
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
      <View style={styles.linha}></View>
      <View style={styles.lista}>
  <Text>Lista de Tarefas:</Text>
  {tarefas.map((tarefa) => (
    <View key={tarefa.id} style={styles.tarefa}>
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
        <Text>{tarefa.texto}</Text>
      )}
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
  ))}
</View>
    </View>
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
    width: '60%',
  },
  boxTarefa: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
});
