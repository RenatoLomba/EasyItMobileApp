import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import StarFull from '../assets/star.svg';
import StarEmpty from '../assets/star_empty.svg';
import StarHalf from '../assets/star_half.svg';

const StarArea = styled.View`
    flex-direction: row;
`;

const StarView = styled.View``;

const ScoreText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: #737373;
    margin-left: 5px;
`;

const StarsComponent = ({ stars, showScore }) => {
    let s = [0, 0, 0, 0, 0];
    const floor = Math.floor(stars);
    const left = stars - floor;

    for (var i = 0; i < floor; i++) {
        s[i] = 2;
    }
    s[i] = left > 0 && 1;

    return (
        <StarArea>
            {s.map((value, key) => {
                return (
                    <StarView key={`star__${key}`}>
                        {value === 0 && <StarEmpty width="18" height="18" fill="#FF9200" />}
                        {value === 1 && <StarHalf width="18" height="18" fill="#FF9200" />}
                        {value === 2 && <StarFull width="18" height="18" fill="#FF9200" />}
                    </StarView>
                );
            })}
            { showScore && <ScoreText>{stars}</ScoreText>}
        </StarArea>
    );
};

export default StarsComponent;
