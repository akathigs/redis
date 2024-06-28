import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import PostItem from '../ui/components/PostItem.js';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const IP = '192.168.1.12';
const PORT = 3001;

export default function UserProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    birthday: '',
    profilePicture: '',
    bio: '',
  });
  const [posts, setPosts] = useState([]);
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(`http://${IP}:${PORT}/users/${user.name}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    async function fetchPosts() {
      try {
        const response = await axios.get(`http://${IP}:${PORT}/feed/${user.name}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchProfile();
    fetchPosts();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile({ ...profile, profilePicture: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://${IP}:${PORT}/users/${user.username}`, profile);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profile.profilePicture }} style={styles.profileImage} />
        </TouchableOpacity>
        {['username', 'email', 'password', 'birthday', 'bio'].map((field) => (
          <TouchableOpacity key={field} onPress={() => setEditingField(field)}>
            <View style={styles.profileField}>
              <Text style={styles.fieldLabel}>{field.charAt(0).toUpperCase() + field.slice(1)}:</Text>
              {editingField === field ? (
                <TextInput
                  style={styles.fieldValue}
                  value={profile[field]}
                  onChangeText={(text) => setProfile({ ...profile, [field]: text })}
                  onBlur={() => setEditingField(null)}
                  autoFocus
                />
              ) : (
                <Text style={styles.fieldValue}>{profile[field]}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postsContainer}>
        <Text style={styles.postsTitle}>My Posts</Text>
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostItem post={item} />}
          keyExtractor={item => item.id.toString()}
          style={styles.postsList}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingLeft: 20,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileField: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldLabel: {
    fontWeight: 'bold',
  },
  fieldValue: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
    textAlign: 'right',
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#5e2abf',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  postsContainer: {
    padding: 20,
  },
  postsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postsList: {
    flex: 1,
  },
});