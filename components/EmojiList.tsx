import { useMemo } from 'react';
import { useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  Platform,
  Pressable,
  ListRenderItem,
} from 'react-native';

const emojiData = [
  require('../assets/images/emoji1.png'),
  require('../assets/images/emoji2.png'),
  require('../assets/images/emoji3.png'),
  require('../assets/images/emoji4.png'),
  require('../assets/images/emoji5.png'),
  require('../assets/images/emoji6.png'),
];

interface Props {
  onSelect: React.Dispatch<React.SetStateAction<number | null>>;
  onCloseModal: () => void;
}

const EmojiList: React.FC<Props> = ({ onSelect, onCloseModal }) => {
  const showsHorizontalScrollIndicator = useMemo(
    () => Platform.OS === 'web',
    []
  );
  const renderItem = useCallback<ListRenderItem<any>>(
    ({ item, index }) => (
      <Pressable
        onPress={() => {
          onSelect(item);
          onCloseModal();
        }}
      >
        <Image source={item} key={index} style={styles.image} />
      </Pressable>
    ),
    []
  );

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      data={emojiData}
      contentContainerStyle={styles.listContainer}
      renderItem={renderItem}
    />
  );
};

export default EmojiList;

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
