import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitial}>JD</Text>
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.title}>Software Developer</Text>
          <Text style={styles.company}>Tech Corporation</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>
              Passionate software developer with 5+ years of experience in mobile and web development. 
              I love creating innovative solutions and connecting with like-minded professionals.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              <View style={styles.skillTag}>
                <Text style={styles.skillText}>React Native</Text>
              </View>
              <View style={styles.skillTag}>
                <Text style={styles.skillText}>JavaScript</Text>
              </View>
              <View style={styles.skillTag}>
                <Text style={styles.skillText}>Python</Text>
              </View>
              <View style={styles.skillTag}>
                <Text style={styles.skillText}>Node.js</Text>
              </View>
              <View style={styles.skillTag}>
                <Text style={styles.skillText}>Firebase</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            <View style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>Senior Developer</Text>
              <Text style={styles.experienceCompany}>Tech Corporation</Text>
              <Text style={styles.experienceDuration}>2021 - Present</Text>
            </View>
            <View style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>Mobile Developer</Text>
              <Text style={styles.experienceCompany}>Startup Inc</Text>
              <Text style={styles.experienceDuration}>2019 - 2021</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.educationItem}>
              <Text style={styles.educationTitle}>Bachelor of Computer Science</Text>
              <Text style={styles.educationSchool}>University of Technology</Text>
              <Text style={styles.educationYear}>2015 - 2019</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileInitial: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  company: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1C1C1E',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#8E8E93',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#E5F2FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '500',
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 2,
  },
  experienceDuration: {
    fontSize: 12,
    color: '#8E8E93',
  },
  educationItem: {
    marginBottom: 15,
  },
  educationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  educationSchool: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 2,
  },
  educationYear: {
    fontSize: 12,
    color: '#8E8E93',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
