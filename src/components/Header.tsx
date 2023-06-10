import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import DropDown from './Dropdown';
import getNumOfChapters from './numBooksInChapter';

import up from '../assets/up-small.png';
import down from '../assets/down-small.png';

function Header({handleTestament, handleBook, handleChapter, addBible}) {
  const [languageOptions, setLanguageOptions] = useState<string[]>([]);
  const [bibleOptions, setBibleOptions] = useState<string[]>([]);
  const [testamentOptions, setTestamentOptions] = useState<string[]>([]);
  const [bookOptions, setBookOptions] = useState<string[]>([]);
  const [chapterOptions, setChapterOptions] = useState<number[]>([0]);

  const [testament, setTestament] = useState<string>('Both');
  const [book, setBook] = useState<string>();
  const [chapter, setChapter] = useState<number>();

  const languageURL = 'https://4.dbt.io/api/languages?include_alt_names=true&country=US&v=4&page=1';

  const changeChapter = (chapter: number) => {
    setChapter(Number(chapter));
  };

  const chapterUp = () => {
    if (chapter < chapterOptions.at(-1)) {
      setChapter(chapter + 1);
    } else {
      setChapter(1);
    }
  }

  const chapterDown = () => {
    if (chapter > 1) {
      setChapter(chapter - 1);
    } else {
      setChapter(chapterOptions.at(-1));
    }
  }

  const handleAdd = () => {
    // Do something here
    fetch('http://localhost:3000/addBible')
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`Did not get bibles! ${response.body}`)
      }
    })
    .then((data) => {
      console.log('Bible Options Data:', data);
      setBibleOptions(data);
    })
    .catch(err => {
      console.error('Problem fetching bibles:', err);
    })
    .finally (() => {
      // addBible(bible);
    })
  }

  useEffect(() => {
    setTestamentOptions(['Old', 'New', 'Both']);
    if (languageOptions.length === 0) {
      fetch(languageURL)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(`Did not get languages! ${response.body}`);
        }
      })
      .then((data) => {
        setLanguageOptions(data);
      })
      .catch(err => {
        console.error('Problem fetching languages:', err);
      })
    }
  }, []);

  useEffect(() => {
    handleTestament(testament);
    handleBook(book);
    handleChapter(Number(chapter));
    }, [chapter]);

  useEffect(() => {
    const oldT: string[] = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua',
      'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
      'Ezra', 'Nehemiah', 'Tobit', 'Judith', 'Esther', '1 Maccabees', '2 Maccabees', 'Job', 'Psalms',
      'Proverbs', 'Ecclesiastes', 'Song of Songs', 'Wisdom', 'Sirach', 'Isaiah', 'Jeremiah',
      'Lamentations', 'Baruch', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah',
      'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
    ];
    const newT: string[] = ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
      '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians',
      'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy',
      'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John',
      '2 John', '3 John', 'Jude', 'Revelation'
    ];
    if (testament == 'Old') {
      setBookOptions(oldT);
    }
    else if (testament == 'New') {
      setBookOptions(newT);
    }
    else if (testament == 'Both') {
      setBookOptions([...oldT, ...newT]);
    }
  }, [testament]);

  useEffect(() => {
    const max = getNumOfChapters(book);
    const array: number[] = [];
    for (let i = 1; i <= max; i++) {
      array.push(i);
    }
    // console.log('array', array);
    setChapterOptions(array);
  }, [book]);

  return (
    <div className="header flex">
      <DropDown title='Testament' options={testamentOptions} onChange={setTestament} />
      <div className="center">
        <div className="flex">
          <DropDown title='Book' options={bookOptions} onChange={setBook} />
          {book != undefined ? (
            chapter == undefined ? (
              <DropDown title='Chapter' options={chapterOptions} onChange={changeChapter} />
            ) : (
              <DropDown title={chapter} options={chapterOptions} onChange={changeChapter} />
            )
          ) : null }
          { chapter ? (
            <div className="flex-stop">
              <img src={up} className='pointer button-up' alt='Chapter Up' onClick={chapterUp}/>
              <img src={down} className='pointer button-down' alt='Chapter Down' onClick={chapterDown}/>
            </div>
          ) : null }
        </div>
      </div>
      <button className="flex-end" onClick={handleAdd}>+</button>
    </div>
  )
}

Header.propTypes = {
  handleTestament: PropTypes.func.isRequired,
  handleBook: PropTypes.func.isRequired,
  handleChapter: PropTypes.func.isRequired
}

export default Header;