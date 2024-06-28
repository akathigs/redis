import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PostItem({ post }) {
  return (
    <View style={styles.postContainer}>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <Text style={styles.postOwner}>{post.owner}</Text>
      <Text style={styles.postDescription}>{post.description}</Text>
      <Text style={styles.postLikes}>Likes: {post.likes}</Text>
      <View style={styles.commentsSection}>
        {post.comments.map((comment, index) => (
          <Text key={index} style={styles.comment}>{comment}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  postOwner: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  postDescription: {
    marginTop: 5,
    fontSize: 14,
  },
  postLikes: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  commentsSection: {
    marginTop: 10,
  },
  comment: {
    fontSize: 12,
    color: '#555',
  },
});
