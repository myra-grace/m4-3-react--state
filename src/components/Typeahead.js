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

    background: ${props => props.theme.bg};

    &:hover {
        cursor: pointer;
        background-color: lightyellow;
    }
`

const theme = {
    bg: 'white'
};

const invertTheme = {
    bg: 'lightyellow'
}

export const Typeahead = ({ suggestions, handleSelect }) => {
    const [value, setValue] = React.useState('');
    const [choiceIndex, setChoiceIndex] = React.useState(0);

    //CAN'T GET THE ALL CASES MATCHING TO WORK
    let matchingSuggestions = suggestions.filter(suggestion => {
        return suggestion.title.includes(value);
    });

    let choice = matchingSuggestions[choiceIndex];
    console.log('choice: ', choice);

    return (
        <StyledDiv>
            <InputContainer>
                <StyledInput type='text' value={value}
                    onChange={event => setValue(event.target.value)}
                    onKeyDown={event => {
                        switch (event.key) {
                            case 'Enter': 
                                handleSelect(choice.title);
                                break;
                            
                            //CAN'T GET ARROW NAVIGATION TO WORK
                            case 'ArrowUp':
                                if (!(choiceIndex < 1)) {
                                    setChoiceIndex(choiceIndex -1)
                                }
                                break;
                            case 'ArrowDown':
                                if (choiceIndex < matchingSuggestions.length -1) {
                                    setChoiceIndex(choiceIndex +1)
                                }
                                break;
                        };
                    }
                    }
    
                />
            
            <StyledButton onClick={() => setValue('')}>Clear</StyledButton>
        </InputContainer>

        <ul>
            {matchingSuggestions.map((suggestion, index) => {
                const isSelected = (index === choiceIndex);
                if (value.length > 1) {
                    return <ListItem key={suggestion.id} theme={isSelected ? invertTheme : theme} onClick={() => handleSelect(suggestion.title
                    )}>{suggestion.title.slice(0, value.length)}<b>{suggestion.title.slice(value.length)}</b></ListItem>
                }
            })}
        </ul>

    </StyledDiv>
    );
};


// handleSelect(event.target.value);

//I got lost in git and nearly lost some files.. it was scary