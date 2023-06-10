import { useState } from 'react'

import Header from './Header';
import Display from './Display';

import '../css/App.css'

function App() {
  const [testament, setTestament] = useState<string>();
  const [book, setBook] = useState<string>();
  const [chapter, setChapter] = useState<number>();
  const [bibles, setBibles] = useState<string[]>(['KJV', 'NKJV', 'Test']);

  const addBible = (bible: string) => {
    const newBibleList = [...bibles, bible];
    setBibles(newBibleList);
  }

  const removeBible = (bible: string) => {
    const newBibleList: string[] = [];
    for (let i = 0; i < bibles.length; i++) {
      if (bibles[i] !== bible) {
        newBibleList.push(bibles[i]);
      }
    }
    setBibles(newBibleList);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header
          handleTestament={setTestament}
          handleBook={setBook}
          handleChapter={setChapter}
          addBible={addBible} />
      </header>
      <div className="flex wrap">
        {bibles.map((bible, index) => {
          return (
            <Display
              bibleVersion={bible}
              key={index}
              content={null}
              removeBible={removeBible}/>
          )
        })}
      </div>
    </div>
  );
}

export default App
