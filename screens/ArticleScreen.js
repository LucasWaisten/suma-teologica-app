import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

export default function ArticleScreen({ route }) {
  const { part, question, article } = route.params;
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  const currentContent = article.content[selectedLanguage];

  const LanguageSelector = () => (
    <View style={styles.languageSelector}>
      <TouchableOpacity
        style={[
          styles.languageButton,
          selectedLanguage === 'es' && styles.languageButtonActive,
        ]}
        onPress={() => setSelectedLanguage('es')}
      >
        <Text
          style={[
            styles.languageButtonText,
            selectedLanguage === 'es' && styles.languageButtonTextActive,
          ]}
        >
          Español
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.languageButton,
          selectedLanguage === 'la' && styles.languageButtonActive,
        ]}
        onPress={() => setSelectedLanguage('la')}
      >
        <Text
          style={[
            styles.languageButtonText,
            selectedLanguage === 'la' && styles.languageButtonTextActive,
          ]}
        >
          Latín
        </Text>
      </TouchableOpacity>
    </View>
  );

  const ObjectionSection = ({ objection }) => (
    <View style={styles.objectionContainer}>
      <Text style={styles.objectionNumber}>Objeción {objection.id}</Text>
      <Text style={styles.objectionText}>{objection.text}</Text>
    </View>
  );

  const ReplySection = ({ reply }) => (
    <View style={styles.replyContainer}>
      <Text style={styles.replyNumber}>Respuesta a la objeción {reply.to_objection}</Text>
      <Text style={styles.replyText}>{reply.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.breadcrumb}>
            {part.id} › Cuestión {question.id} › Artículo {article.id}
          </Text>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <LanguageSelector />
        </View>

        {currentContent && (
          <View style={styles.contentContainer}>
            {/* Objections */}
            {currentContent.objections && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Objeciones</Text>
                {currentContent.objections.map((objection, index) => (
                  <ObjectionSection key={`objection-${objection.id}-${index}`} objection={objection} />
                ))}
              </View>
            )}

            {/* Sed Contra */}
            {currentContent.sed_contra && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sed Contra</Text>
                <Text style={styles.sedContraText}>{currentContent.sed_contra}</Text>
              </View>
            )}

            {/* Corpus */}
            {currentContent.corpus && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Respondo</Text>
                <Text style={styles.corpusText}>{currentContent.corpus}</Text>
              </View>
            )}

            {/* Replies */}
            {currentContent.replies && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Respuestas a las objeciones</Text>
                {currentContent.replies.map((reply, index) => (
                  <ReplySection key={`reply-${reply.to_objection}-${index}`} reply={reply} />
                ))}
              </View>
            )}
          </View>
        )}
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
  articleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    lineHeight: 32,
    marginBottom: 20,
  },
  languageSelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  languageButtonActive: {
    backgroundColor: '#000000',
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  languageButtonTextActive: {
    color: '#FFFFFF',
  },
  contentContainer: {
    gap: 24,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#000000',
    paddingLeft: 12,
  },
  objectionContainer: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#E0E0E0',
  },
  objectionNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 8,
  },
  objectionText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    textAlign: 'justify',
  },
  sedContraText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    textAlign: 'justify',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    fontStyle: 'italic',
  },
  corpusText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 26,
    textAlign: 'justify',
    backgroundColor: '#FAFAFA',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  replyContainer: {
    backgroundColor: '#F0F0F0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#CCCCCC',
  },
  replyNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 8,
  },
  replyText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    textAlign: 'justify',
  },
}); 