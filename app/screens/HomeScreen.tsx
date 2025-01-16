import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ShowSearchResult } from '../types/api';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [shows, setShows] = useState<ShowSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchShows = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setShows(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch shows');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchShows();
  }, []);

  const renderItem = ({ item }: { item: ShowSearchResult }) => (
    <Link 
      href={{
        pathname: "/details",
        params: { show: JSON.stringify(item.show) }
      }} 
      asChild
    >
      <TouchableOpacity 
        style={styles.movieCard}
        activeOpacity={0.7}
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
    </Link>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (error && !refreshing) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchShows}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Link href="/search" asChild>
        <TouchableOpacity 
          style={styles.searchBar}
          activeOpacity={0.8}
        >
          <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.searchText}>Search Movies & TV Shows</Text>
        </TouchableOpacity>
      </Link>
      <FlatList
        data={shows}
        renderItem={renderItem}
        keyExtractor={(item) => item.show.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.movieList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#E50914"
            colors={['#E50914']}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#E50914',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#E50914',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  searchBar: {
    backgroundColor: '#2B2B2B',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    flex: 1,
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

