import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';

export default function PartScreen({ route, navigation }) {
  const { part } = route.params;

  const handleQuestionPress = (question) => {
    navigation.navigate('QuestionScreen', { part, question });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.partId}>{part.id}</Text>
          <Text style={styles.partTitle}>{part.title}</Text>
          <Text style={styles.partSubtitle}>{part.subtitle}</Text>
          <Text style={styles.partDescription}>{part.description}</Text>
        </View>

        {/* Questions List */}
        <View style={styles.questionsContainer}>
          <Text style={styles.sectionTitle}>Cuestiones</Text>
          {part.questions.map((question) => (
            <Pressable
              key={question.id}
              style={styles.questionCard}
              onPress={() => handleQuestionPress(question)}
              activeOpacity={0.7}
            >
              <View style={styles.questionHeader}>
                <Text style={styles.questionId}>Cuestión {question.id}</Text>
                <Text style={styles.articleCount}>
                  {question.articles.length} artículo{question.articles.length !== 1 ? 's' : ''}
                </Text>
              </View>
              <Text style={styles.questionTitle}>{question.title}</Text>
            </Pressable>
          ))}
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
    marginBottom: 30,
    paddingTop: 10,
  },
  partId: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  partTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  partSubtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  partDescription: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    textAlign: 'justify',
  },
  questionsContainer: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingBottom: 8,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
  },
  articleCount: {
    fontSize: 12,
    color: '#999999',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  questionTitle: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 22,
  },
}); 