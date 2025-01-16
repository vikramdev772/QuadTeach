import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { ShowSearchResult } from './types';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [movies, setMovies] = useState<ShowSearchResult[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const data: ShowSearchResult[] = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: ShowSearchResult }) => (
    <Link href={{
      pathname: "/details",
      params: { show: JSON.stringify(item.show) }
    }} asChild>
      <TouchableOpacity style={styles.movieCard}>
        <Image
          source={{ 
            uri: item.show.image?.medium || 'https://via.placeholder.com/300x400'
          }}
          style={styles.movieImage}
        />
        <Text style={styles.movieTitle} numberOfLines={1}>
          {item.show.name}
        </Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Link href="/search" asChild>
        <TouchableOpacity style={styles.searchBar}>
          <Text style={styles.searchText}>Search Movies & TV Shows</Text>
        </TouchableOpacity>
      </Link>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.show.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.movieList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  searchBar: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchText: {
    color: '#999',
    textAlign: 'center',
  },
  movieList: {
    padding: 5,
  },
  movieCard: {
    width: (width - 40) / 2,
    margin: 5,
  },
  movieImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  movieTitle: {
    color: 'white',
    marginTop: 5,
    fontSize: 14,
  },
});