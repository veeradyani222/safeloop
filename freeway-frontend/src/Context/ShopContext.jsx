import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allincidents, setallincidents] = useState([]);
  const [allvolunteers, setallvolunteers] = useState([]);
  const [all_sliders, setAllSliders] = useState([]);
  const [all_Content, setAllContent] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/allincidents_admin')
      .then(response => response.json())
      .then(data => setallincidents(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/allsliderImages')
      .then(response => response.json())
      .then(data => setAllSliders(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/allvolunteers')
      .then(response => response.json())
      .then(data => setallvolunteers(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/allContent')
      .then(response => response.json())
      .then(data => setAllContent(data));
  }, []);

  const contextValue = { allincidents, all_sliders,allvolunteers, all_Content };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
