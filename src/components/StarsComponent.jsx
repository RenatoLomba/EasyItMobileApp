import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import StarFull from '../assets/star.svg';
import StarEmpty from '../assets/star_empty.svg';
import StarHalf from '../assets/star_half.svg';

import configs from '../appconfigs.json';

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

const StarButton = styled.TouchableOpacity`
    width: 18px;
    height: 18px;
`;

// eslint-disable-next-line react/prop-types
const StarsComponent = ({ stars, showScore, setStarRate = null }) => {
    let s = [0, 0, 0, 0, 0];
    const floor = Math.floor(stars);
    const left = stars - floor;

    for (let i = 0; i < floor; i++) {
        s[i] = 2;
    }
    s[s.length - 1] = left > 0 ? 1 : 0;
    if (floor === 5) {
        s[s.length - 1] = 2;
    }

    return (
        <StarArea>
            {s.map((value, key) => {
                return (
                    <StarView key={`star__${key}`}>
                        <StarButton onPress={() => setStarRate ? setStarRate(key + 1) : console.log('')}>
                            {value === 0 && <StarEmpty width="18" height="18" fill={configs.colors['yellow-star']} />}
                            {value === 1 && <StarHalf width="18" height="18" fill={configs.colors['yellow-star']} />}
                            {value === 2 && <StarFull width="18" height="18" fill={configs.colors['yellow-star']} />}
                        </StarButton>
                    </StarView>
                );
            })}
            { showScore && <ScoreText>{stars}</ScoreText>}
        </StarArea>
    );
};

export default StarsComponent;
