//THIS IS A HOOK TYPE
import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    width: 200px;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px
`
const StyledInput = styled.input`
    border-radius: 4px;
    border: 2px solid grey;
    padding: 5px;
`
const StyledButton = styled.button`
    border: none;
    border-radius: 4px;
    background-color: blue;
    color: white;
    margin: 0 4px;
    padding: 5px;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
`
const ListItem = styled.li`
    font-size: 14px;

    &:hover {
        cursor: pointer;
        background-color: lightyellow;
    }
`

export const Typeahead = ({ suggestions, handleSelect }) => {
    const [value, setValue] = React.useState('');

    //CAN'T GET THE ALL CASES MATCHING TO WORK
    let matchingSuggestions = suggestions.filter(suggestion => {
        return suggestion.title.includes(value);
    })

    return (
        <StyledDiv>
            <InputContainer>
                <StyledInput type='text' value={value}
                    onChange={event => setValue(event.target.value)}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            handleSelect(event.target.value);
                        }
                    }}
                />
            
            <StyledButton onClick={() => setValue('')}>Clear</StyledButton>
        </InputContainer>

        <ul>
            {matchingSuggestions.map(suggestion => {
                if (value.length > 1) {
                    // let myIndex = value.length -1;
                    return <ListItem key={suggestion.id} onClick={() => handleSelect(suggestion.title
                    )}>{suggestion.title.slice(0, value.length)}<b>{suggestion.title.slice(value.length)}</b></ListItem>
                }
            })}
        </ul>

    </StyledDiv>
    );
};