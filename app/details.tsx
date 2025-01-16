import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Show } from './types';

export default function DetailsScreen() {
  const { show } = useLocalSearchParams();
  const showData: Show = JSON.parse(show as string);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: showData.image?.original || 'https://via.placeholder.com/800x450' }}
        style={styles.heroImage}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{showData.name}</Text>
        {showData.rating?.average && (
          <Text style={styles.rating}>Rating: {showData.rating.average}/10</Text>
        )}
        {showData.genres && (
          <View style={styles.genres}>
            {showData.genres.map((genre) => (
              <Text key={genre} style={styles.genre}>{genre}</Text>
            ))}
          </View>
        )}
        <Text style={styles.summary}>
          {showData.summary?.replace(/<[^>]+>/g, '') || 'No summary available'}
        </Text>
        {showData.schedule && (
          <Text style={styles.schedule}>
            Airs: {showData.schedule.days.join(', ')} at {showData.schedule.time}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  genre: {
    color: '#fff',
    backgroundColor: '#e50914',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  summary: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  schedule: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
});
