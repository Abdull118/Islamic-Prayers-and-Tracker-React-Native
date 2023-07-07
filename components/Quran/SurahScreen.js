import { View, Text, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import quranData from './quran.json'; 
import quranTransliteration from './quranEnglishTransliteration.json'; 

const SurahScreen = ({route}) => {
  const {surahNumber} = route.params;
  
  const [showTransliteration, setShowTransliteration] = useState(true);

  // Get the surah from the local data
  const surah = quranData.data.surahs.find(surah => surah.number === surahNumber);

  // Get the transliterated surah from the local data
  const surahTransliteration = quranTransliteration.data.surahs.find(surah => surah.number === surahNumber);

  // Function to handle Bismillah and first verse split
  const handleTextSplit = (text) => {
    const bismillah = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
    if (text.includes(bismillah)) {
      const restOfTheText = text.replace(bismillah, '');
      return (
        <>
          <Text style={{ fontSize: 20, textAlign: 'right' }}>{bismillah}</Text>
          <Text style={{ fontSize: 20, textAlign: 'right' }}>{restOfTheText}</Text>
        </>
      )
    } else {
      return <Text style={{ fontSize: 20, textAlign: 'right' }}>{text}</Text>
    }
  }

  return (
    <View>
      <Button 
        title={showTransliteration ? "Hide Transliteration" : "Show Transliteration"}
        onPress={() => setShowTransliteration(!showTransliteration)}
      />
      <ScrollView>
        {surah.ayahs.map((ayah, index) => (
          <>
            {handleTextSplit(ayah.text)}
            {showTransliteration && 
              <Text style={{ fontSize: 18, textAlign: 'right', color: 'gray' }}>
                {surahTransliteration.ayahs[index].text} 
              </Text>
            }
          </>
        ))}
      </ScrollView>
    </View>
  )
}

export default SurahScreen