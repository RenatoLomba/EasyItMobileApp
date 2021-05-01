import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import {
    Container,
    Scroller,
    FakeSwipper,
    PageBody,
    ExpertInfoArea,
    ExpertAvatar,
    ExpertInfo,
    ExpertNameText,
    ExpertFavButton,
    ServicesListArea,
    ServiceListAreaTitle,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseButtonText,
    TestimonialsArea,
    TestimonialItem,
    TestimonialHeader,
    TestimonialTitle,
    TestimonialDescription,
    SwipeDot,
    SwipeItem,
    SwipeImage,
    BackButton,
    LoadingIcon,
    TestimonialAddButton,
    TestimonialAddButtonText,
    TestimonialAddButtonArea
} from './styles';

import { Text } from 'react-native';
import StarsComponent from '../../components/StarsComponent';
import ExpertAppointmentModal from '../../components/ExpertAppointmentModal';

import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';

import { useNavigation, useRoute } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import animationData from '../../assets/animations/favorite.json';
import Swiper from 'react-native-swiper';
import Api from '../../Api';

import configs from '../../appconfigs.json';
import TestimonialAddModal from '../../components/TestimonialAddModal';

export default () => {
    const navigator = useNavigation();
    const {
        userId,
        userFavorites,
        favoritesDispatch,
        darkMode,
        userTestimonials
    } = useContext(UserContext);
    const router = useRoute();

    const [expertInfo, setExpertInfo] = useState({ ...router.params });
    const [showLoading, setShowLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showTestimonialModal, setShowTestimonialModal] = useState(false);
    const [disableTestimonialButton, setDisableTestimonialButton] = useState(false);

    const currentUserTestimonial = () => {
        const userTests = [...userTestimonials];
        // console.log(userTests);
        const testimonialExist = userTests.find(t => {
            // console.log(t["expert_id"])
            // console.log(expertInfo.id)
            return t["expert_id"] === expertInfo.id
        });
        // console.log(testimonialExist);
        if (testimonialExist) return setDisableTestimonialButton(true)
        setDisableTestimonialButton(false)
    }

    const getExpertCompleteInfo = async () => {
        setShowLoading(true);
        try {
            const response = await Api.getExpertComplete(expertInfo.id);
            if (response.id) {
                setExpertInfo(response);
            } else {
                alert(response);
            }
        } catch (err) {
            alert(err.message);
            navigator.reset({
                routes: [{ name: 'Home' }]
            });
        } finally {
            setShowLoading(false);
        }
    };

    const isFavorite = async () => {
        setShowLoading(true);
        try {
            const response = await Api.isFavorite(expertInfo.id, userId);
            setFavorited(response);
        } catch (err) {
            alert(err.message);
        } finally {
            setShowLoading(false);
        }
    }

    useEffect(() => {
        getExpertCompleteInfo();
        isFavorite();
        currentUserTestimonial();
    }, []);

    const handleFavButton = async () => {
        setShowLoading(true);
        try {
            const response = favorited
                ? await Api.removeFavorite(expertInfo.id, userId)
                : await Api.addFavorite(userId, expertInfo.id);

            if (response) {
                let favorites = [...userFavorites];
                if (response.id) {
                    response.expert = {
                        id: expertInfo.id,
                        name: expertInfo.name,
                        email: expertInfo.email,
                        location: expertInfo.location,
                        stars: expertInfo.stars,
                        avatar: expertInfo.avatar
                    }
                    favorites.push(response);
                } else {
                    favorites.splice(favorites
                        .findIndex(v => v['expert_id'] === expertInfo.id && v['user_id'] === userId));
                }

                favoritesDispatch(favorites);

                setFavorited(!favorited);
            } else {
                alert(response);
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setShowLoading(false);
        }
    };

    const handleServiceChooseButton = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const handleTestimonialAddButton = () => {
        setShowTestimonialModal(true);
    }

    return (
        <Container darkMode={darkMode}>
            <Scroller>

                {expertInfo.thumbnails && expertInfo.thumbnails.length > 0 ?
                    <Swiper
                        styles={{ height: 240 }}
                        dot={<SwipeDot color="#fff" />}
                        activeDot={<SwipeDot color="#000" />}
                        paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                        autoplay={true}
                    >
                        {expertInfo.thumbnails.map((thumbnail, key) => {
                            return (
                                <SwipeItem key={`swipe__${key}`}>
                                    <SwipeImage source={{
                                        uri: thumbnail.image
                                    }} resizeMode="cover" />
                                </SwipeItem>
                            );
                        })}
                    </Swiper>
                    :
                    <Swiper
                        styles={{ height: 240 }}
                        dot={<SwipeDot color="#fff" />}
                        activeDot={<SwipeDot color="#000" />}
                        paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                    >
                        <SwipeItem>
                            <FakeSwipper />
                        </SwipeItem>
                    </Swiper>
                }

                <PageBody darkMode={darkMode}>

                    <ExpertInfoArea>
                        <ExpertAvatar darkMode={darkMode} source={{
                            uri: expertInfo.avatar.image
                        }} />
                        <ExpertInfo>
                            <ExpertNameText darkMode={darkMode}>{expertInfo.name}</ExpertNameText>
                            <StarsComponent stars={expertInfo.stars} showScore={true} />
                        </ExpertInfo>
                        <ExpertFavButton onPress={handleFavButton}>
                            {favorited ?
                                <FavoriteFullIcon width="24" height="24" fill={configs.colors['red-wine']} />
                                :
                                <FavoriteIcon width="24" height="24" fill={configs.colors['red-wine']} />
                            }
                        </ExpertFavButton>
                    </ExpertInfoArea>

                    {showLoading && <LoadingIcon size="large" color={configs.colors.primary} />}

                    {expertInfo.services &&
                        <ServicesListArea>
                            <ServiceListAreaTitle darkMode={darkMode}>Lista de serviços</ServiceListAreaTitle>

                            {expertInfo.services.length > 0 && expertInfo.services.map((service, key) => {
                                return (
                                    <ServiceItem key={key}>
                                        <ServiceInfo>
                                            <ServiceName darkMode={darkMode}>{service.name}</ServiceName>
                                            <ServicePrice darkMode={darkMode}>R$ {service.price.toFixed(2).toString().replace('.', ',')}</ServicePrice>
                                        </ServiceInfo>
                                        <ServiceChooseButton
                                            onPress={() => handleServiceChooseButton(service)}
                                            darkMode={darkMode}
                                        >
                                            <ServiceChooseButtonText darkMode={darkMode}>Agendar</ServiceChooseButtonText>
                                        </ServiceChooseButton>
                                    </ServiceItem>
                                )
                            })}

                        </ServicesListArea>
                    }

                    <TestimonialAddButtonArea>
                        <TestimonialAddButton
                            style={{ opacity: disableTestimonialButton ? 0.5 : 1 }}
                            disabled={disableTestimonialButton}
                            onPress={handleTestimonialAddButton}>
                            <TestimonialAddButtonText>Avaliar</TestimonialAddButtonText>
                        </TestimonialAddButton>
                    </TestimonialAddButtonArea>

                    {expertInfo.testimonials && expertInfo.testimonials.length > 0 &&
                        <TestimonialsArea>
                            <Swiper
                                style={{ height: 110 }}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<NavPrevIcon width="35" height="35" fill="#999" />}
                                nextButton={<NavNextIcon width="35" height="35" fill="#999" />}
                            >
                                {expertInfo.testimonials.map((testimonial, key) => {
                                    return (
                                        <TestimonialItem key={key}>
                                            <TestimonialHeader>
                                                <TestimonialTitle>{testimonial.user.name}</TestimonialTitle>
                                                <StarsComponent stars={testimonial.stars} showScore={false} />
                                            </TestimonialHeader>
                                            <TestimonialDescription>{testimonial.description}</TestimonialDescription>
                                        </TestimonialItem>
                                    )
                                })}
                            </Swiper>
                        </TestimonialsArea>
                    }

                </PageBody>
            </Scroller>
            <BackButton onPress={() => navigator.goBack()}>
                <BackIcon width="44" height="44" fill="#fff" />
            </BackButton>

            <ExpertAppointmentModal
                service={selectedService}
                showModal={showModal}
                setShowModal={setShowModal}
                expertInfo={expertInfo}
            />

            <TestimonialAddModal
                showModal={showTestimonialModal}
                setShowModal={setShowTestimonialModal}
                expertInfo={expertInfo}
                getExpertCompleteInfo={getExpertCompleteInfo}
                disableButton={setDisableTestimonialButton}
            />

        </Container>
    );
};
