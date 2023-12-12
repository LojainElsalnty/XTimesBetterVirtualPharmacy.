import React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './chatBar.module.css';

// Hooks
import { useState, useEffect } from 'react';

// User Defined Hooks
import { ChatTab } from '../chatTab/chatTab';

// User Defined Components
import { SelectVariants } from '../../components/selectVariants/selectVariants';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// MUI
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const ChatBar = ({ selectedUser, userType }) => {
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('');
  const [selectfilter, setSelectFilter] = useState(false);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    handleSearch(inputValue);
  }, [users, inputValue])

  async function getUsers() {
      await axios ({
        method: 'get',
        url: `http://localhost:8000/${userType}/chat/users`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': accessToken,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        console.log("users");
        console.log(res.data.users);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(event) {
    // handleSearch(inputValue);
    setInputValue(event.target.value);
  }

  function handleClick() {
    selectfilter ? setSelectFilter(false) : setSelectFilter(true);
  }

  // eslint-disable-next-line no-redeclare
  function handleSearch(name) {
    const list = [];
    console.log(users);

    if (users !== undefined && users != []) {
        for (let i = 0; i < users.length; i++) {
            let name1 = name.toUpperCase();
            let name2 = users[i].name.toUpperCase();
            console.log(`Name 1: ${name1}`);
            console.log(`Name 2: ${name2}`);

            if (name2.indexOf(name1) === 0) {
                list.push(users[i]);
            }

            console.log(`Index: ${name2.indexOf(name1)}`);
            console.log(list);
        }

        setSearchedUsers(list);
    }
  }

  return (
    <div className={styles['chat__sidebar']}>
      <div>
        <h4 className={styles['chat__header']}>USERS</h4>
        <div className="chat__users">
        <div className={styles['searchbar-main-div']}>
            <div className={styles['searchbar-sub-div']}>
                <div className={styles['searchbar-input-div']}>
                    <input className={styles['searchbar-input']} value={inputValue} placeholder="Search for ..." type="text"  onChange={handleChange}/>
                </div>
                
                <div className={styles['searchbar-icon-div']}>
                    <button 
                        data-tooltip-id="my__search__icon"
                        data-tooltip-content="Search"
                        data-tooltip-place="top"
                        className={styles['searchbar-button']} 
                        onClick={handleClick}
                >
                        {selectfilter ? <ArrowRightIcon></ArrowRightIcon> : <ArrowDropDownIcon></ArrowDropDownIcon>}
                    </button>
                </div>
            </div>
          </div>
            {
              selectfilter && userType === 'doctor' && (
                <div className={styles['criteria__main']}>
                  <button className={styles['criteria__btn']} onClick={() => setSelectFilter(!selectfilter)}></button>
                  <div className={styles['criteria__div']}>
                    <ul className={styles['criteria__ul']}>
                      <li className={styles['criteria__li']} onClick={() => {
                        setFilter('');
                        setSelectFilter(false);
                      }}>None</li>
                      <li className={styles['criteria__li']} onClick={() => {
                        setFilter('patient');
                        setSelectFilter(false);
                      }}>Patients</li>
                      <li className={styles['criteria__li']} onClick={() => {
                        setFilter('pharmacist');
                        setSelectFilter(false);
                      }}>Pharmacists</li>
                    </ul>
                  </div>
                </div>
              )
            }
            {
              selectfilter && userType === 'patient' && (
                <div className={styles['criteria__main']}>
                  <button className={styles['criteria__btn']} onClick={() => setSelectFilter(!selectfilter)}></button>
                  <div className={styles['criteria__div']}>
                    <ul className={styles['criteria__ul']}>
                      <li className={styles['criteria__li']} onClick={() => {
                        setFilter('');
                        setSelectFilter(false);
                        }}>None</li>
                      <li className={styles['criteria__li']} onClick={() => {
                        setFilter('doctor');
                        setSelectFilter(false);
                        }}>Doctors</li>
                      <li className={styles['criteria__li']} onClick={() => {
                        setFilter('pharmacist');
                        setSelectFilter(false);
                        }}>Pharmacists</li>
                    </ul>
                  </div>
                </div>
              )
            }
            {
              selectfilter && userType === 'pharmacist' && (
                <div className={styles['criteria__main']}>
                  <button className={styles['criteria__btn']} onClick={() => setSelectFilter(!selectfilter)}></button>
                  <div className={styles['criteria__div']}>
                    <ul className={styles['criteria__ul']}>
                      <li className={styles['criteria__li']} onClick={() => {
                        setFilter('');
                        setSelectFilter(false);
                      }}>None</li>
                      <li className={styles['criteria__li']} onClick={() => {
                        setFilter('patient');
                        setSelectFilter(false);
                      }}>Patients</li>
                      <li className={styles['criteria__li']} onClick={() => {
                        setFilter('doctor');
                        setSelectFilter(false);
                      }}>Doctors</li>
                    </ul>
                  </div>
                </div>
              )
}
          {
            searchedUsers.map((user) => {
              return (
                (filter === '' || filter === user.type) && (
                <ChatTab
                  key={user.username}
                  username={user.username}
                  type={user.type}
                  name={user.name}
                  onClick={selectedUser}
                />
                )
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default ChatBar;