import { useState, useEffect, useRef, FC, MutableRefObject} from 'react';
import './dropdown.css';

interface DropdownProps {
  options: Array<string>;
  onChange: (newValue: string) => void;
  noneValue: string,
  placeholderText: string;
}

const Dropdown: FC<DropdownProps> = ({ options : items = [], 
                                       onChange = () => {}, 
                                       noneValue = null,
                                       placeholderText = null}) => {
  

  const [options, setOptions] = useState(noneValue ? [noneValue, ...items] : items);
  const [selected, setSelected] = useState(placeholderText ? placeholderText : items[0]);
  const [opened, setOpened] = useState(false);
  const container : MutableRefObject<HTMLDivElement | null> = useRef(null);

  const handleOutsideClick = (event : Event) => {
    if (!container.current?.contains(event.target as Node)) {
      setOpened(false);
    }  
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      console.log('dropdown unmounted');
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className='dropdown-container' ref={container}>
      <button
        className={opened ? 'selected' : 'selected closed'}
        onClick={() => {
          setOpened(!opened);
        }}>
        {selected}
        <span className={`icon ${opened ? 'arrow-up' : 'arrow-down'}`} />
      </button>
      {opened && (
        <div className='options'>
          {options
            .filter((option) => option !== selected)
            .map((option, index) => (
              <button
                key={index}
                className='option'
                onClick={() => {
                  setSelected(option);
                  setOpened(false);
                  onChange(option);
                }}>
                {option}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
