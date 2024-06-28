import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text, Image, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const IP = '192.168.1.12';
const PORT = 3001;

export default function Feed({ navigation }) {
  const [posts, setPosts] = useState([]); 
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get(`http://${IP}:${PORT}/feed`);
      console.log('Fetched posts:', response.data);
      setPosts(response.data || []); // Garante que posts seja uma array mesmo em caso de erro
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]); // Garante que posts seja uma array mesmo em caso de erro
    }
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: undefined,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];
      const newPost = {
        urlToImage: uri,
        title: 'Nova História',
      };

      try {
        console.log('New post:', newPost);

        const response = await axios.post(`http://${IP}:${PORT}/feed`, newPost);
        setPosts([...posts, response.data]);
        fetchPosts()
        console.log('Created post:', response.data);
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  }

  async function addComment(index) {
    const post = posts[index];
    const newComment = {
      text: comment,
      postId: post.id, // Supondo que cada post tenha um ID
    };

    try {
      const response = await axios.put(`http://${IP}:${PORT}/feed/`, newComment);
      const updatedPosts = [...posts];
      updatedPosts[index].comments.push(response.data);
      setPosts(updatedPosts);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.historyContainer}>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((item, index) => (
            <View style={styles.historyFeed} key={index}>
              <View style={styles.historyNameContainer}>
                <Text style={styles.historyName}>{item.title}</Text>
              </View>
              <Image 
                source={{ uri: item.urlToImage }} 
                style={styles.image}
              />
              <View style={[styles.historyFeedInfo, { width: screenWidth }]}>
                {Array.isArray(item.comments) && item.comments.map((comment, commentIndex) => (
                  <View key={commentIndex} style={styles.comments}>
                    <Text style={styles.commentName}>User Name</Text>
                    <Text style={styles.commentText}>{comment.text}</Text>
                  </View>
                ))}
                <View style={styles.commentContainer}>
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Adicione um comentário"
                    placeholderTextColor="#ddd"
                    value={comment}
                    onChangeText={setComment}
                  />
                  <TouchableOpacity style={styles.commentButton} onPress={() => addComment(index)}>
                    <Text style={styles.commentButtonText}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noHistoryText}>Nenhuma história disponível</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={pickImage}>
        <Text style={styles.addButtonText}>Adicionar História</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('UserProfile')}>
        <Text style={styles.profileButtonText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  historyContainer: {
    flex: 1,
  },
  historyFeed: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
  },
  historyNameContainer: {
    padding: 10,
    backgroundColor: '#e6e6e6',
  },
  historyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
  },
  historyFeedInfo: {
    padding: 10,
  },
  comments: {
    marginBottom: 10,
  },
  commentName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#5e2abf',
    padding: 10,
    borderRadius: 10,
  },
  commentButtonText: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#5e2abf',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  profileButton: {
    backgroundColor: '#5e2abf',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  noHistoryText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#999',
  },
});
