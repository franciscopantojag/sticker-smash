import { StyleSheet, View } from 'react-native';
import CircleButton from './CircleButton';
import IconButton from './IconButton';

interface Props {
  onReset: () => void;
  onAddSticker: () => void;
  onSaveImageAsync: () => void;
}

const ToolboxOptions: React.FC<Props> = ({
  onReset,
  onAddSticker,
  onSaveImageAsync,
}) => (
  <View style={styles.optionsContainer}>
    <View style={styles.optionsRow}>
      <IconButton iconName="refresh" label="Reset" onPress={onReset} />
      <CircleButton onPress={onAddSticker} />
      <IconButton iconName="save-alt" label="Save" onPress={onSaveImageAsync} />
    </View>
  </View>
);

export default ToolboxOptions;

const styles = StyleSheet.create({
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
