import { useState, useEffect } from 'react';

function Display({bibleVersion, content, removeBible}) {
  const [chapter, setChapter] = useState([]);

  const handleRemove = () => {
    console.log('Removed', bibleVersion, 'bible from display');
    removeBible(bibleVersion);
  }

  useEffect(() => {
    if (content == null) {
      setChapter([
        {num: 1, content: 'Something, something'},
        {num: 2, content: 'Something, something'},
        {num: 3, content: 'Something, something'}
      ]);
    }
  }, []);
  return (
    <div className="bible-display">
      <div className="header flex">
        <button className="center">{bibleVersion}</button>
        <button className="flex-end" onClick={handleRemove}>-</button>
      </div>
      {chapter.map((verse, index) => {
        return (
          <div key = {index}>
            <b>{verse.num}:</b> {verse.content}
          </div>
        )
      })}
    </div>
  )
}

export default Display;
