import React from "react";
import { StyleSheet, View, Pressable, TextInput, Text, Keyboard } from "react-native";


type AddBookProps = {
    ratingInput: string;
    titleInput: string;
    authorInput: string;
    setTitleInput: (text: string) => void;
    setAuthorInput: (text: string) => void;
    setRatingInput: (text: string) => void;
    addBook: () => void;
    
}

const AddBookContainer = ({titleInput, authorInput, ratingInput, setAuthorInput, setRatingInput, setTitleInput, addBook}: AddBookProps) => {

    const handleAddBook = () => {
        Keyboard.dismiss(); 
        addBook();
    };

    return (
        <View style={styles.addBookCard}>
          <Text style={styles.text}>Add a New Book</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Book title"
                  value={titleInput}
                  onChangeText={setTitleInput}
                  returnKeyType="next"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              <TextInput
                  style={styles.input}
                  placeholder="Author"
                  value={authorInput}
                  onChangeText={setAuthorInput}
                  returnKeyType="next"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              <TextInput
                  style={styles.input}
                  placeholder="Rating (1-5)"
                  value={ratingInput}
                  onChangeText={setRatingInput}
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              <Pressable
                style={styles.button}
                onPress={handleAddBook}>
                <Text style={styles.buttonText}>Add Book</Text>
              </Pressable>
            </View>
    );
}




const styles = StyleSheet.create({
    addBookCard: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        gap: 12,
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


export default AddBookContainer;