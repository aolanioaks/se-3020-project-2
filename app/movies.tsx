import { View, StyleSheet, Alert, Text } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/themeContext";
import useShake from "@/hooks/useShake";
import useAsyncStorageState from "@/hooks/useAsyncStorage"; 
import AddItem from "@/components/AddItem";
import ItemList from "@/components/ItemList";




type Movie = { title: string; rating: number; done: boolean };

export default function MovieScreen() {
  const { theme, cycleTheme } = useTheme(); 
    useShake(cycleTheme); 

    
  const [movies, setMovies] = useAsyncStorageState<Movie[]>("pp.movies", []); 
  const [titleInput, setTitleInput] = useState("");
  const [ratingInput, setRatingInput] = useState("");
  const [writerInput, setWriterInput] = useState("");
  const [hideWatchedMovies, setHideWatchedMovies] = useState(false);
  const { alertMsg } = useLocalSearchParams<{ alertMsg?: string }>();

  useEffect(() => {
    if (movies.length == 0) {
      setMovies([
        { title: "Clueless by Amy Heckerling", rating: 5, done: false },
        { title: "Harry Potter by David Heyman", rating: 4, done: true },
        { title: "Annabelle by John R. Leonetti", rating: 5, done: false },
      ]);
    }
    if (alertMsg) Alert.alert("From Books", String(alertMsg));
  }, [alertMsg]);

  const styles = useMemo(() => makeStyles(theme), [theme]);

  const addMovie = () => {
    const title = titleInput.trim();
    const rating = Number(ratingInput);
    if (title && rating >= 1 && rating <= 5) {
      setMovies([...movies, { title, rating, done: false }]);
      setTitleInput("");
      setRatingInput("");
      setWriterInput("");
    } else {
      Alert.alert("Please enter a valid title and rating (1-5).");
    }
  };

  const displayedMovies = hideWatchedMovies ? movies.filter(m => !m.done) : movies;
  return (
    <View style={styles.container}>
      <View style={styles.themeBadge}><Text style={styles.themeBadgeText}>Theme: {theme.name.toUpperCase()} (shake to change)</Text></View>

      <AddItem
        itemType="Movie"
        titleInput={titleInput}
        secondaryInput={writerInput}
        ratingInput={ratingInput}
        setTitleInput={setTitleInput}
        setSecondaryInput={setWriterInput}
        setRatingInput={setRatingInput}
        onAdd={addMovie}
      />

      <ItemList
      itemType="Movie"
        styles={styles}
        hideCompleted={hideWatchedMovies}
        setHideCompleted={setHideWatchedMovies}
        items={movies}
        setItems={setMovies}
        displayedItems={displayedMovies}
      />
    </View>
  );
}

const makeStyles = (theme: import("@/context/themeContext").Theme) =>
  StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: theme.background, 
      padding: 20, 
      gap: 20 
    },
    movieListCard: {
      backgroundColor: theme.card,
      padding: 20,
      borderRadius: 10,
      alignItems: "flex-start",
      gap: 12,
      alignSelf: "stretch",
      flex: 1,
    },
    movieListHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "stretch",
      marginBottom: 8,
    },
    text: { 
      fontSize: 18, 
      color: theme.text 
    },
    toggleButton: {
      backgroundColor: theme.toggleBg,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.border,
    },
    toggleButtonActive: { 
      backgroundColor: theme.toggleActive, 
      borderColor: theme.toggleActive 
    },
    toggleButtonText: { 
      fontSize: 14, 
      color: theme.subtext, 
      fontWeight: "500" 
    },
    toggleButtonTextActive: { 
      color: "#fff" 
    },
    movieRow: {
      alignSelf: "stretch",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 6,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxChecked: { 
      borderColor: "#4caf50", 
      backgroundColor: "#eaf7ec" 
    },
    checkboxMark: { 
      fontSize: 16, 
      color: "#4caf50", 
      fontWeight: "700" 
    },
    doneText: { 
      textDecorationLine: "line-through", 
      color: "#999" 
    },
    themeBadge: { 
      alignSelf: "flex-start", 
      paddingHorizontal: 10, 
      paddingVertical: 6, 
      borderRadius: 999, 
      backgroundColor: theme.card 
    },
    themeBadgeText: { 
      color: theme.subtext, 
      fontSize: 12, 
      fontWeight: "600" 
    },
  });

