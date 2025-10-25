import React from "react";
import { StyleSheet, View, Pressable, TextInput, Text } from "react-native";

type AddMovieProps = {
  ratingInput: string;
  titleInput: string;
  writerInput: string;
  setTitleInput: (text: string) => void;
  setWriterInput: (text: string) => void;
  setRatingInput: (text: string) => void;
  addMovie: () => void;
  
};

const AddMovieContainer = ({ titleInput, writerInput, ratingInput, setWriterInput, setRatingInput, setTitleInput, addMovie }: AddMovieProps) => {
  return (
    <View style={styles.addMovieCard}>
      <Text style={styles.text}>Add a New Movie</Text>
        <TextInput
            style={styles.input}
            placeholder="Movie title"
            value={titleInput}
            onChangeText={setTitleInput}
        />
        <TextInput
            style={styles.input}
            placeholder="Writer"
            value={writerInput}
            onChangeText={setWriterInput}
        />
        <TextInput
            style={styles.input}
            placeholder="Rating (1-5)"
            value={ratingInput}
            onChangeText={setRatingInput}
            keyboardType="numeric"
        />
        <Pressable
            style={styles.button}
            onPress={addMovie}>
            <Text style={styles.buttonText}>Add Movie</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  addMovieCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    gap: 12,
    alignSelf: "stretch",
  },
  text: { 
    fontSize: 18, 
    color: "black" 
},
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff5ec4",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
});

export default AddMovieContainer;