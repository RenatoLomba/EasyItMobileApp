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
    LoadingIcon
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

export default () => {
    const navigator = useNavigation();
    const { userId, userFavorites, favoritesDispatch, darkMode } = useContext(UserContext);
    const router = useRoute();

    const [expertInfo, setExpertInfo] = useState({ ...router.params });
    const [showLoading, setShowLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [favoriteId, setFavoriteId] = useState('');

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
            const response = await Api.isFavorite(userId, expertInfo.id);
            if (response) {
                setFavoriteId(response.id);
                setFavorited(response);
            } else {
                setFavorited(false);
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setShowLoading(false);
        }
    }

    useEffect(() => {
        getExpertCompleteInfo();
        isFavorite();
    }, []);

    const handleFavButton = async () => {
        setShowLoading(true);
        try {
            const response = favorited ? await Api.removeFavorite(favoriteId) : await Api.addFavorite(userId, expertInfo.id);

            if (response) {
                let favorites = [...userFavorites];
                if (response.id) {
                    favorites.push(response);
                    setFavoriteId(response.id);
                } else {
                    favorites.splice(favorites.findIndex(v => v.id === favoriteId));
                    setFavoriteId('');
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

    return (
        <Container darkMode={darkMode}>
            <Scroller>

                {expertInfo.photos && expertInfo.photos.length > 0 ?
                    <Swiper
                        styles={{ height: 240 }}
                        dot={<SwipeDot color="#fff" />}
                        activeDot={<SwipeDot color="#000" />}
                        paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                        autoplay={true}
                    >
                        {expertInfo.photos.map((photo, key) => {
                            return (
                                <SwipeItem key={`swipe__${key}`}>
                                    <SwipeImage source={{
                                        uri: photo.url
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
                            uri: expertInfo.avatar
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

                            {expertInfo.services.map((service, key) => {
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

        </Container>
    );
};
