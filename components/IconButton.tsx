import { StyleSheet, Pressable, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface Props {
  label: string;
  onPress: () => void;
  iconName: keyof typeof MaterialIcons.glyphMap;
}

const IconButton: React.FC<Props> = ({ label, onPress, iconName }) => (
  <Pressable style={styles.iconButton} onPress={onPress}>
    <MaterialIcons name={iconName} size={24} color="#fff" />
    <Text style={styles.iconButtonLabel}>{label}</Text>
  </Pressable>
);

export default IconButton;

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});
