import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function PostSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.skeletonAvatar} />
        <View style={styles.userInfo}>
          <View style={[styles.skeletonLine, styles.skeletonUsername]} />
          <View style={[styles.skeletonLine, styles.skeletonTime]} />
        </View>
      </View>
      
      <View style={[styles.skeletonLine, styles.skeletonContent]} />
      <View style={[styles.skeletonLine, styles.skeletonContentShort]} />
      
      <View style={styles.skeletonImage} />
      
      <View style={styles.actions}>
        <View style={styles.skeletonAction} />
        <View style={styles.skeletonAction} />
        <View style={styles.skeletonAction} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  skeletonAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  skeletonLine: {
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  skeletonUsername: {
    height: 16,
    width: 120,
    marginBottom: 4,
  },
  skeletonTime: {
    height: 12,
    width: 60,
  },
  skeletonContent: {
    height: 16,
    width: '100%',
    marginBottom: 8,
  },
  skeletonContentShort: {
    height: 16,
    width: '70%',
    marginBottom: 12,
  },
  skeletonImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  skeletonAction: {
    width: 60,
    height: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
});