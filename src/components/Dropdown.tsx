import {useState, useEffect} from 'react';

function DropDown({title, options, onChange}) {
  const [open, setOpen] = useState(false);
  const [thisTitle, setThisTitle] = useState(title);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelect = (event) => {
    console.log('Changed', thisTitle, 'to', event.target.value);
    setThisTitle(event.target.value);
    onChange(event.target.value);
    handleOpen();
  }

  useEffect(() => {
    setThisTitle(title);
  }, [title]);

  return (
    <div className="dropdown">
      <button onClick={handleOpen}>{thisTitle}</button>
      {open ? (
        <ul className="menu">
          {options.map((option:string | number, index:number) => (
              <li key={index} className="dropdown-item">
                <button value={option} onClick={handleSelect}>{option}</button>
              </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DropDown;