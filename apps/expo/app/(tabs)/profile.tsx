import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, Avatar } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/theme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Icon 
            size={80} 
            icon="account" 
            style={styles.avatar}
            color={colors.light.primaryForeground}
          />
          <Text variant="headlineMedium" style={styles.email}>
            {user?.email}
          </Text>
          <Button
            mode="contained"
            onPress={handleLogout}
            style={styles.button}
            icon="logout"
          >
            Logout
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.light.background,
  },
  card: {
    padding: 20,
    backgroundColor: colors.light.card,
  },
  cardContent: {
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: colors.light.primary,
  },
  email: {
    marginBottom: 24,
    color: colors.light.foreground,
  },
  button: {
    width: '100%',
  },
});