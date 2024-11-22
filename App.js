import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const App = () => {
  const [animals, setAnimals] = useState([
    { id: 1, name: "Rex", type: "Cachorro", breed: "Labrador" },
    { id: 2, name: "Mimi", type: "Gato", breed: "Siamês" },
  ]);

  const [newAnimal, setNewAnimal] = useState({ name: "", type: "", breed: "" });
  const [menuVisible, setMenuVisible] = useState(false);

  // Função para adicionar novos animais
  const addAnimal = () => {
    if (newAnimal.name && newAnimal.type && newAnimal.breed) {
      setAnimals([...animals, { id: animals.length + 1, ...newAnimal }]);
      setNewAnimal({ name: "", type: "", breed: "" });
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Menu Superior */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adote um Pet</Text>
      </View>

      {/* Menu Hambúrguer */}
      {menuVisible && (
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Filtro por tipo</Text>
          <Text style={styles.menuItem}>Casas de Adoção/Pet Shops</Text>
        </View>
      )}

      {/* Lista de Animais */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Animais Disponíveis para Adoção</Text>
        <FlatList
          data={animals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.animalItem}>
              <Text style={styles.animalName}>{item.name}</Text>
              <Text style={styles.animalDetails}>
                Tipo: {item.type} - Raça: {item.breed}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Formulário para Adicionar Animais */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Adicionar Novo Animal</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={newAnimal.name}
          onChangeText={(text) => setNewAnimal({ ...newAnimal, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo (ex: Gato, Cachorro)"
          value={newAnimal.type}
          onChangeText={(text) => setNewAnimal({ ...newAnimal, type: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Raça"
          value={newAnimal.breed}
          onChangeText={(text) => setNewAnimal({ ...newAnimal, breed: text })}
        />
        <Button title="Adicionar" onPress={addAnimal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4CAF50",
    padding: 15,
  },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  menu: { backgroundColor: "#4CAF50", padding: 10 },
  menuItem: { color: "white", fontSize: 16, marginVertical: 5 },
  listContainer: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  animalItem: { backgroundColor: "#fff", padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  animalName: { fontSize: 16, fontWeight: "bold" },
  animalDetails: { fontSize: 14, color: "#555" },
  formContainer: { padding: 20, backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#ddd" },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
});

export default App;
