import React from "react";
import library from "../data";
import { categories } from "../data";
import { Typeahead } from "./Typeahead";
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';

const App = () => {
  // TODO!
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Typeahead
          suggestions={library.books}
          handleSelect={suggestion => {
            window.alert(suggestion);
          }}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-content: center;
`;

export default App;
