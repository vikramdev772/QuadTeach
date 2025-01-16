import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ShowSearchResult } from '../types/api';

const { width } = Dimensions.get('window');

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ShowSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError('Failed to fetch search results');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: ShowSearchResult }) => (
    <TouchableOpacity 
      style={styles.movieCard}
      activeOpacity={0.7}
      onPress={() => router.push({
        pathname: "/details",
        params: { show: JSON.stringify(item.show) }
      })}
    >
      <Image
        source={{ 
          uri: item.show.image?.medium || 'https://via.placeholder.com/300x400'
        }}
        style={styles.movieImage}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradientOverlay}
      >
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.show.name}
        </Text>
        {item.show.rating?.average && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>
              {item.show.rating.average.toFixed(1)}
            </Text>
          </View>
        )}
        <Text style={styles.genreText} numberOfLines={1}>
          {item.show.genres.join(' • ')}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Movies & TV Shows"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#E50914" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E50914" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.show.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.movieList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {searchTerm ? 'No results found' : 'Search for movies and TV shows'}
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#2B2B2B',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: '#2B2B2B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#E50914',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  movieList: {
    padding: 6,
  },
  movieCard: {
    width: (width - 44) / 2,
    height: 250,
    margin: 6,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2B2B2B',
  },
  movieImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    padding: 12,
    justifyContent: 'flex-end',
  },
  movieTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
  },
  genreText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
});

