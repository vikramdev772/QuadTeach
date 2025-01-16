import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { ShowSearchResult } from './types';

const { width } = Dimensions.get('window');

// Mock data for UI development
const mockMovies: ShowSearchResult[] = [
  {
    score: 9.5,
    show: {
      id: 1,
      name: 'Breaking Bad',
      summary: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
      image: { 
        medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg',
        original: 'https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg'
      }
    }
  },
  {
    score: 9.3,
    show: {
      id: 2,
      name: 'Game of Thrones',
      summary: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
      image: { 
        medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg',
        original: 'https://static.tvmaze.com/uploads/images/original_untouched/190/476117.jpg'
      }
    }
  },
  {
    score: 8.7,
    show: {
      id: 3,
      name: 'Stranger Things',
      summary: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
      image: { 
        medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/482/1205622.jpg',
        original: 'https://static.tvmaze.com/uploads/images/original_untouched/482/1205622.jpg'
      }
    }
  },
  {
    score: 8.9,
    show: {
      id: 4,
      name: 'The Office',
      summary: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
      image: { 
        medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/85/213184.jpg',
        original: 'https://static.tvmaze.com/uploads/images/original_untouched/85/213184.jpg'
      }
    }
  }
];

export default function HomeScreen() {
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
        data={mockMovies}
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
