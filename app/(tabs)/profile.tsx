import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  ActivityIndicator,
  Button,
  Dialog,
  PaperProvider,
  Portal,
  Text,
} from "react-native-paper";
import API_URL from "@/config/config";
import { Animated } from "react-native";

type UserProfile = {
  username: string;
  email: string;
  bio?: string;
  profilePicture?: string;
};

const ProfileScreen = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
    fetchUsername();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [profile]);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get<{ data: UserProfile }>(
        `${API_URL}/api/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsername = async () => {
    const storedUsername = await AsyncStorage.getItem("username");
    setUsername(storedUsername);
  };

  const handleLogout = () => {
    setDialogVisible(true);
  };

  const confirmLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("username");
    router.replace("/auth/LoginScreen");
  };

  if (loading) {
    return (
      <PaperProvider>
        <ThemedView style={styles.container}>
          <ActivityIndicator animating={true} />
        </ThemedView>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        {profile ? (
          <Animated.View
            style={[styles.profileContainer, { opacity: fadeAnim }]}
          >
            {profile.profilePicture && (
              <Image
                source={{ uri: profile.profilePicture }}
                style={styles.profilePicture}
              />
            )}
            <ThemedText style={styles.title}>Profile</ThemedText>
            <ThemedText style={styles.label}>Username:</ThemedText>
            <ThemedText style={styles.value}>
              {username || profile.username}
            </ThemedText>
            <ThemedText style={styles.label}>Email:</ThemedText>
            <ThemedText style={styles.value}>{profile.email}</ThemedText>
            {profile.bio && (
              <>
                <ThemedText style={styles.label}>Bio:</ThemedText>
                <ThemedText style={styles.value}>{profile.bio}</ThemedText>
              </>
            )}
            <Button
              mode="contained"
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              Log Out
            </Button>
          </Animated.View>
        ) : (
          <ThemedText>No profile data available</ThemedText>
        )}
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
          >
            <Dialog.Title>Logout</Dialog.Title>
            <Dialog.Content>
              <Text>Are you sure you want to logout?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
              <Button onPress={confirmLogout}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ThemedView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  profileContainer: {
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#6200ea",
    overflow: "hidden",
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#6200ea",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    color: "#333",
  },
  value: {
    fontSize: 18,
    color: "#666",
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: "#e53935",
  },
});

export default ProfileScreen;
