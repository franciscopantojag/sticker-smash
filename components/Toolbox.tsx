import { StyleSheet, View } from 'react-native';
import Button from './Button';

interface Props {
  enableOptions: () => void;
  pickImageAsync: () => Promise<void>;
}

const Toolbox: React.FC<Props> = ({ enableOptions, pickImageAsync }) => (
  <View style={styles.footerContainer}>
    <Button onPress={pickImageAsync} theme="primary" label="Choose a photo" />
    <Button onPress={enableOptions} label="Use this photo" />
  </View>
);

export default Toolbox;

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
