import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import sumaData from '../data/sumaTeologica.json';

export default function CustomDrawerContent({ onClose }) {
  const navigation = useNavigation();
  const [expandedParts, setExpandedParts] = useState({});
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const togglePart = (partId) => {
    setExpandedParts(prev => ({
      ...prev,
      [partId]: !prev[partId]
    }));
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handlePartPress = (part) => {
    onClose();
    navigation.navigate('PartScreen', { part });
  };

  const handleQuestionPress = (part, question) => {
    onClose();
    navigation.navigate('QuestionScreen', { part, question });
  };

  const handleArticlePress = (part, question, article) => {
    onClose();
    navigation.navigate('ArticleScreen', { part, question, article });
  };

  const handleHomePress = () => {
    onClose();
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Índice de la Suma de Teológia</Text>
        <Text style={styles.headerSubtitle}>{sumaData.author}</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color="#666666" />
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={true}>
        {/* Home Button */}
        <Pressable style={styles.homeButton} onPress={handleHomePress}>
          <MaterialIcons name="home" size={20} color="#007AFF" />
          <Text style={styles.homeButtonText}>Inicio</Text>
        </Pressable>

        {/* Parts Index */}
        {sumaData.structure.parts.map((part) => (
          <View key={part.id} style={styles.partContainer}>
            {/* Part Header */}
            <Pressable
              style={styles.partHeader}
              onPress={() => togglePart(part.id)}
            >
              <View style={styles.partTitleContainer}>
                <Text style={styles.partId}>{part.id}</Text>
                <View style={styles.partTextContainer}>
                  <Text style={styles.partTitle}>{part.title}</Text>
                  <Text style={styles.partSubtitle}>{part.subtitle}</Text>
                </View>
              </View>
              <MaterialIcons
                name={expandedParts[part.id] ? "expand-less" : "expand-more"}
                size={20}
                color="#666666"
              />
            </Pressable>

            {/* Part Questions */}
            {expandedParts[part.id] && (
              <View style={styles.questionsContainer}>
                <Pressable
                  style={styles.viewPartButton}
                  onPress={() => handlePartPress(part)}
                >
                  <Text style={styles.viewPartText}>Ver Parte Completa</Text>
                  <MaterialIcons name="arrow-forward" size={14} color="#007AFF" />
                </Pressable>

                {part.questions.map((question) => (
                  <View key={question.id} style={styles.questionContainer}>
                    {/* Question Header */}
                    <Pressable
                      style={styles.questionHeader}
                      onPress={() => toggleQuestion(`${part.id}-${question.id}`)}
                    >
                      <View style={styles.questionTitleContainer}>
                        <Text style={styles.questionId}>Q{question.id}</Text>
                        <Text style={styles.questionTitle} numberOfLines={2}>
                          {question.title}
                        </Text>
                      </View>
                      <MaterialIcons
                        name={expandedQuestions[`${part.id}-${question.id}`] ? "expand-less" : "expand-more"}
                        size={16}
                        color="#666666"
                      />
                    </Pressable>

                    {/* Question Articles */}
                    {expandedQuestions[`${part.id}-${question.id}`] && (
                      <View style={styles.articlesContainer}>
                        <Pressable
                          style={styles.viewQuestionButton}
                          onPress={() => handleQuestionPress(part, question)}
                        >
                          <Text style={styles.viewQuestionText}>Ver Cuestión Completa</Text>
                          <MaterialIcons name="arrow-forward" size={12} color="#007AFF" />
                        </Pressable>

                        {question.articles.map((article) => (
                          <Pressable
                            key={article.id}
                            style={styles.articleItem}
                            onPress={() => handleArticlePress(part, question, article)}
                          >
                            <Text style={styles.articleId}>Art. {article.id}</Text>
                            <Text style={styles.articleTitle} numberOfLines={2}>
                              {article.title}
                            </Text>
                            <MaterialIcons name="arrow-forward-ios" size={10} color="#999999" />
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#F8F9FA',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 6,
    marginRight: 40, // Space for close button
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 12,
  },
  partContainer: {
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },
  partHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  partTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  partId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    minWidth: 40,
    marginRight: 12,
  },
  partTextContainer: {
    flex: 1,
  },
  partTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  partSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  questionsContainer: {
    paddingBottom: 12,
  },
  viewPartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    margin: 12,
    backgroundColor: '#E8F4FD',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  viewPartText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginRight: 6,
  },
  questionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingLeft: 24,
  },
  questionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  questionId: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333',
    minWidth: 30,
    marginRight: 8,
  },
  questionTitle: {
    fontSize: 13,
    color: '#333333',
    flex: 1,
    lineHeight: 18,
  },
  articlesContainer: {
    paddingLeft: 24,
    paddingBottom: 12,
  },
  viewQuestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    margin: 8,
    backgroundColor: '#F5F8FF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  viewQuestionText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    marginRight: 4,
  },
  articleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#E0E0E0',
    marginLeft: 12,
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  articleId: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666666',
    minWidth: 40,
    marginRight: 8,
  },
  articleTitle: {
    fontSize: 11,
    color: '#666666',
    flex: 1,
    lineHeight: 14,
  },
}); 