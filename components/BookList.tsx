import React from "react";
import { View, Pressable, Text } from "react-native";
import { FlatList } from "react-native";


type BookListCardProps = {
  styles: any;
  hideReadBooks: boolean;
  setHideReadBooks: (hide: boolean) => void;
  books: {title: string, rating: number, done: boolean}[];
  setBooks: React.Dispatch<React.SetStateAction<{ title: string; rating: number; done: boolean }[]>>;
  displayedBooks: { title: string; rating: number; done: boolean }[];
};

const BookListCard = ({styles, hideReadBooks, setHideReadBooks, books, setBooks, displayedBooks }: BookListCardProps) => {
  return (
    <View style={styles.bookListCard}>
            <View style={styles.bookListHeader}>
              <Text style={styles.text}>Total Books: {books.length}</Text>
              <Pressable
                style={[styles.toggleButton, hideReadBooks && styles.toggleButtonActive]}
                onPress={() => setHideReadBooks(!hideReadBooks)}
              >
                <Text style={[styles.toggleButtonText, hideReadBooks && styles.toggleButtonTextActive]}>
                  {hideReadBooks ? "Show Read" : "Hide Read"}
                </Text>
              </Pressable>
            </View>
    
            <FlatList
              data={displayedBooks}
              renderItem={({ item }) => (
                <View style={styles.bookRow}>
                  <Pressable
                    onPress={() =>
                      setBooks(prev =>
                        prev.map(b => b == item ? { ...b, done: !b.done } : b)
                      )}
                    style={[styles.checkbox, item.done && styles.checkboxChecked]}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: item.done }}
                  >
                    <Text style={styles.checkboxMark}>{item.done ? "✓" : ""}</Text>
                  </Pressable>

                  <Text style={[styles.bookTitle, item.done && styles.doneText]}>
                    {item.title}{" "}
                    <Text style={[styles.bookRating, item.done && styles.doneText]}>
                      {item.rating}/5
                    </Text>
                  </Text>
                </View>
              )}
            />

          </View>
  );
}

  


export default BookListCard; 