import React from "react";
import { View, Pressable, Text } from "react-native";
import { FlatList } from "react-native";

type Movie = { 
    title: string; 
    rating: number; 
    watched: boolean 
};

type MovieListCardProps = {
  styles: any;
  hideWatchedMovies: boolean;
  setHideWatchedMovies: (hide: boolean) => void;
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  displayedMovies: Movie[];
};

const MovieListCard = ({ styles, hideWatchedMovies, setHideWatchedMovies, movies, setMovies, displayedMovies }: MovieListCardProps) => {
  return (
    <View style={styles.movieListCard}>
      <View style={styles.movieListHeader}>
        <Text style={styles.text}>Total Movies: {movies.length}</Text>
        <Pressable
          style={[
            styles.toggleButton,
            hideWatchedMovies && styles.toggleButtonActive,
          ]}
          onPress={() => setHideWatchedMovies(!hideWatchedMovies)}
        >
          <Text
            style={[
              styles.toggleButtonText,
              hideWatchedMovies && styles.toggleButtonTextActive,
            ]}
          >
            {hideWatchedMovies ? "Show Watched" : "Hide Watched"}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={displayedMovies}
        renderItem={({ item }) => (
            <View style={styles.movieRow}>
            <Pressable
                onPress={() =>
                setMovies(prev =>
                    prev.map(m => (m == item ? { ...m, watched: !m.watched } : m))
                )}
                style={[styles.checkbox, item.watched && styles.checkboxChecked]}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: item.watched }}
            >
                <Text style={styles.checkboxMark}>{item.watched ? "✓" : ""}</Text>
            </Pressable>

            <Text style={[styles.text, item.watched && styles.doneText]}>
                {item.title} — {item.rating}/5
            </Text>
            </View>
        )}
        />
    </View>
  );
};

export default MovieListCard;