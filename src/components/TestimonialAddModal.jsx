/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';

import Api from '../Api';
import { UserContext } from '../contexts/UserContext';

import {
    CloseModalButton,
    FinishAppointmentButton as RateButton,
    FinishAppointmentButtonText as RateButtonText,
    LoadingRegisteringIcon,
    Modal, ModalArea, ModalBody, ModalItem,
    ModalServiceName as RateTitleText
} from '../components/ExpertAppointmentModal/styles';
import ExpandIcon from '../assets/expand.svg';
import StarsComponent from './StarsComponent';

const RatingArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const DescriptionArea = styled.View`
    flex-direction: column;
`;

const DescriptionTextTitle = styled.Text`
    color: #000000;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
`;

const DescriptionInput = styled.TextInput`
    border: 1px solid #eeeeee;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 10px;
    color: #aaaaaa;
    font-size: 14px;
`;

const LetterCount = styled.Text`
    color: #aaaaaa;
    font-size: 14px;
    padding: 5px;
`;

const TestimonialAddModal = ({
    showModal,
    setShowModal,
    expertInfo,
    getExpertCompleteInfo,
    disableButton
}) => {
    const { userId, userTestimonials, testimonialsDispatch } = useContext(UserContext);

    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [letterCount, setLetterCount] = useState(0);
    const [showLoading, setShowLoading] = useState(false);

    const handleAvaliateButton = async () => {
        setShowLoading(true);
        try {
            const result = await Api.registerTestimonial(userId, expertInfo.id, description, rating);
            if (result.id) {
                const testimonials = [...userTestimonials];
                testimonials.push(result);
                testimonialsDispatch(testimonials);
                setShowModal(false);
                await getExpertCompleteInfo();
                disableButton(true)
            } else {
                alert(result);
            }
        } catch (ex) {
            alert(ex.message);
        } finally {
            setShowLoading(false);
        }
    }

    const selectStarRate = (value) => {
        const val = value > 5 ? 5 : value;
        setRating(val);
    }

    function handleChangeText(t) {
        if (String(t).length > 100) return;
        setDescription(t);
    }

    useEffect(() => {
        setLetterCount(description.length);
    }, [description]);

    return (
        <Modal
            transparent={true}
            visible={showModal}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseModalButton onPress={() => setShowModal(false)}>
                        <ExpandIcon width="35" height="35" fill="#000" />
                    </CloseModalButton>

                    <ModalItem>
                        <RatingArea>
                            <RateTitleText>Avalie: </RateTitleText>
                            <StarsComponent
                                showScore={true}
                                stars={rating}
                                setStarRate={selectStarRate}
                            />
                        </RatingArea>
                    </ModalItem>

                    <ModalItem>
                        <DescriptionArea>
                            <DescriptionTextTitle>Comente: </DescriptionTextTitle>
                            <DescriptionInput
                                multiline
                                numberOfLines={3}
                                value={description}
                                onChangeText={handleChangeText}
                                placeholder="Digite um comentário..."
                            />
                            <LetterCount>{letterCount}/100</LetterCount>
                        </DescriptionArea>
                    </ModalItem>

                    {showLoading && <LoadingRegisteringIcon size="large" color="#fff" />}

                    <RateButton
                        onPress={handleAvaliateButton}
                    >
                        <RateButtonText>Avaliar</RateButtonText>
                    </RateButton>

                </ModalBody>
            </ModalArea>
        </Modal >
    )
}
export default TestimonialAddModal;
