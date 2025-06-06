import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import sumaData from '../data/sumaTeologica.json';

const { width, height } = Dimensions.get('window');

export default function DrawerMenu({ navigation, isVisible, onClose }) {
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
    if (navigation) {
      onClose();
      navigation.navigate('PartScreen', { part });
    }
  };

  const handleQuestionPress = (part, question) => {
    if (navigation) {
      onClose();
      navigation.navigate('QuestionScreen', { part, question });
    }
  };

  const handleArticlePress = (part, question, article) => {
    if (navigation) {
      onClose();
      navigation.navigate('ArticleScreen', { part, question, article });
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Índice de la Suma Teológica</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="#000000" />
          </Pressable>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={true}>
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
                  size={24}
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
                    <MaterialIcons name="arrow-forward" size={16} color="#007AFF" />
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
                          size={20}
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
                            <MaterialIcons name="arrow-forward" size={14} color="#007AFF" />
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
                              <MaterialIcons name="arrow-forward-ios" size={12} color="#999999" />
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  partContainer: {
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  partHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
    minWidth: 30,
    marginRight: 12,
  },
  partTextContainer: {
    flex: 1,
  },
  partTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  partSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  questionsContainer: {
    paddingBottom: 8,
  },
  viewPartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    margin: 8,
    backgroundColor: '#F0F8FF',
    borderRadius: 6,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    minWidth: 30,
    marginRight: 8,
  },
  questionTitle: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    lineHeight: 18,
  },
  articlesContainer: {
    paddingLeft: 24,
    paddingBottom: 8,
  },
  viewQuestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    margin: 8,
    backgroundColor: '#F8F8FF',
    borderRadius: 4,
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
    padding: 8,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#E0E0E0',
    marginLeft: 8,
  },
  articleId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    minWidth: 40,
    marginRight: 8,
  },
  articleTitle: {
    fontSize: 12,
    color: '#666666',
    flex: 1,
    lineHeight: 16,
  },
}); 