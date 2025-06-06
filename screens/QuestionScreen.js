import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';

export default function QuestionScreen({ route, navigation }) {
  const { part, question } = route.params;

  const handleArticlePress = (article) => {
    navigation.navigate('ArticleScreen', { part, question, article });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.breadcrumb}>
            {part.id} › Cuestión {question.id}
          </Text>
          <Text style={styles.questionTitle}>{question.title}</Text>
        </View>

        {/* Articles List */}
        <View style={styles.articlesContainer}>
          <Text style={styles.sectionTitle}>Artículos</Text>
          {question.articles.map((article) => (
            <Pressable
              key={article.id}
              style={styles.articleCard}
              onPress={() => handleArticlePress(article)}
              activeOpacity={0.7}
            >
              <View style={styles.articleHeader}>
                <Text style={styles.articleId}>Artículo {article.id}</Text>
                <View style={styles.languageIndicator}>
                  <Text style={styles.languageText}>ES • LA</Text>
                </View>
              </View>
              <Text style={styles.articleTitle}>{article.title}</Text>
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
  breadcrumb: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  questionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    lineHeight: 36,
  },
  articlesContainer: {
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
  articleCard: {
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
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  articleId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
  },
  languageIndicator: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  languageText: {
    fontSize: 10,
    color: '#666666',
    fontWeight: 'bold',
  },
  articleTitle: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 22,
  },
}); 