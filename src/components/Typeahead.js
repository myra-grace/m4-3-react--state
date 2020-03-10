//THIS IS A HOOK TYPE
import React from 'react';
import styled from 'styled-components';
import { clamp } from '../utils';

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
    const [choiceIndex, setChoiceIndex] = React.useState(0);

    //CAN'T GET THE ALL CASES MATCHING TO WORK
    let matchingSuggestions = suggestions.filter(suggestion => {
        return suggestion.title.includes(value);
    });

    let choice = matchingSuggestions[choiceIndex];

    return (
        <StyledDiv>
            <InputContainer>
                <StyledInput type='text' value={value}
                    onChange={event => setValue(event.target.value)}
                    onKeyDown={event => {
                        switch (event.key) {
                            case 'Enter': {
                                handleSelect(choice);
                                return;
                            }
                            case 'ArrowUp':
                            case 'ArrowDown': {
                                event.preventDefault();

                                let direction = event.key === 'ArrowDown' ? 'down' : 'up';
                                let next = choiceIndex;

                                next = direction === 'down'
                                    ? next +1
                                    : next -1;

                                next = clamp(
                                    next, 0,
                                    matchingSuggestions.length -1
                                );

                                setChoiceIndex(next);
                                
                                return;
                            }

                            default:
                                return;
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


// handleSelect(event.target.value);
