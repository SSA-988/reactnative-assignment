import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://random-data-api.com/api/users/random_user?size=80',
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextUser = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevUser = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const user = users[currentIndex];
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === users.length - 1;

  console.log('Dfd', user);

  return (
    <SafeAreaView style={styles.container}>
      {user && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{user.first_name} {user.last_name}</Text>
            <Text style={styles.subtitle}>@{user.username}</Text>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>ID:</Text>
              <Text style={styles.value}>{user.id}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{user.phone_number}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.value}>{user.gender}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>DOB:</Text>
              <Text style={styles.value}>{user.date_of_birth}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{user.address.street_address}, {user.address.city}, {user.address.state}, {user.address.country}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Employment:</Text>
              <Text style={styles.value}>{user.employment.title} ({user.employment.key_skill})</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Subscription:</Text>
              <Text style={styles.value}>{user.subscription.plan} ({user.subscription.status})</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, isPrevDisabled && styles.buttonDisabled]} 
              onPress={prevUser} 
              disabled={isPrevDisabled}>
              <Text style={[styles.buttonText, isPrevDisabled && styles.buttonTextDisabled]}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, isNextDisabled && styles.buttonDisabled]} 
              onPress={nextUser} 
              disabled={isNextDisabled}>
              <Text style={[styles.buttonText, isNextDisabled && styles.buttonTextDisabled]}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
      },
      scrollContainer: {
        alignItems: 'center',
        paddingVertical: 20,
      },
      avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 3,
        borderColor: '#FFD700',
        marginBottom: 15,
      },
      infoContainer: {
        width: '90%',
        backgroundColor: '#2A2A2A',
        padding: 20,
        borderRadius: 12,
        alignItems:"center",
        marginBottom:20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'left',
      },
      subtitle: {
        fontSize: 16,
        color: '#CCCCCC',
        marginBottom: 10,
        textAlign: 'left',
      },
      detailContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 8,
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFD700',
        width: 120,
      },
      value: {
        fontSize: 16,
        color: '#FFFFFF',
        flex: 1,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
      },
      button: {
        backgroundColor: '#FFD700',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 25,
        alignItems: 'center',
        width: '40%',
      },
      buttonDisabled: {
        backgroundColor: '#555555',
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E1E1E',
      },
      buttonTextDisabled: {
        color: '#A0A0A0',
      },
      loader: {
        flex: 1,
        justifyContent: 'center',
      },
});
