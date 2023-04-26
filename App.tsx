import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  DOMElement,
} from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';
import { StatusBar } from 'expo-status-bar';
import * as MediaLibrary from 'expo-media-library';
import domtoimage from 'dom-to-image';
import ImageViewer from './components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import Toolbox from './components/Toolbox';
import ToolboxOptions from './components/ToolboxOptions';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const PlaceholderImage: number = require('./assets/images/background-image.png');

export default function App() {
  const imageRef = useRef<any>(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [showAppOptions, setShowAppOptions] = useState(false);

  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const enableOptions = useCallback(() => setShowAppOptions(true), []);

  const pickImageAsync = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (result.canceled) {
      alert('You did not select any image.');
      return;
    }
    setSelectedImage(result.assets[0].uri);
    enableOptions();
  }, []);

  const onAddSticker = useCallback(() => setIsModalVisible(true), []);

  const isWeb = useMemo(() => Platform.OS === 'web', []);

  const onSaveImageAsync = useCallback(async () => {
    try {
      if (isWeb) {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
        return;
      }
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onModalClose = useCallback(() => setIsModalVisible(false), []);

  const [pickedEmoji, setPickedEmoji] = useState<null | number>(null);

  const onReset = useCallback(() => {
    setShowAppOptions(false);
    setPickedEmoji(null);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {!!pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>
      {showAppOptions ? (
        <ToolboxOptions
          onReset={onReset}
          onAddSticker={onAddSticker}
          onSaveImageAsync={onSaveImageAsync}
        />
      ) : (
        <Toolbox
          pickImageAsync={pickImageAsync}
          enableOptions={enableOptions}
        />
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
});
