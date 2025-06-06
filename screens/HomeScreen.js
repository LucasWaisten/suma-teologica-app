import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import sumaData from '../data/sumaTeologica.json';

export default function HomeScreen({ navigation }) {
  const handlePartPress = (part) => {
    navigation.navigate('PartScreen', { part });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{sumaData.title}</Text>
          <Text style={styles.author}>{sumaData.author}</Text>
          <Text style={styles.subtitle}>{sumaData.subtitle}</Text>
        </View>

        {/* Parts Cards */}
        <View style={styles.cardsContainer}>
          {sumaData.structure.parts.map((part) => (
            <Pressable
              key={part.id}
              style={styles.card}
              onPress={() => handlePartPress(part)}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{part.id}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardMainTitle}>{part.title}</Text>
                <Text style={styles.cardSubtitle}>{part.subtitle}</Text>
                <Text style={styles.cardDescription} numberOfLines={3}>
                  {part.description}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Lucas Waisten • 2025
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cardBody: {
    padding: 20,
  },
  cardMainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
}); 