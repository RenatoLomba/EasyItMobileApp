import React, { useState, useEffect } from 'react';

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
import Swiper from 'react-native-swiper';
import Api from '../../Api';

export default () => {
    const navigator = useNavigation();
    const router = useRoute();

    const [expertInfo, setExpertInfo] = useState({ ...router.params });
    const [showLoading, setShowLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getExpertCompleteInfo = async () => {
            setShowLoading(true);
            try {
                const response = await Api.getExpertComplete(expertInfo.id);
                if (response.id) {
                    // console.log(response);
                    setExpertInfo(response);
                    // setFavorited(response.favorited);
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
        getExpertCompleteInfo();
    }, []);

    const handleFavButton = () => {
        setFavorited(!favorited);
    };

    const handleServiceChooseButton = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    return (
        <Container>
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

                <PageBody>

                    <ExpertInfoArea>
                        <ExpertAvatar source={{
                            uri: expertInfo.avatar
                        }} />
                        <ExpertInfo>
                            <ExpertNameText>{expertInfo.name}</ExpertNameText>
                            <StarsComponent stars={expertInfo.stars} showScore={true} />
                        </ExpertInfo>
                        <ExpertFavButton onPress={handleFavButton}>
                            {favorited ?
                                <FavoriteFullIcon width="24" height="24" fill="#FF00FF" />
                                :
                                <FavoriteIcon width="24" height="24" fill="#FF00FF" />
                            }
                        </ExpertFavButton>
                    </ExpertInfoArea>

                    {showLoading && <LoadingIcon size="large" color="#1ABC9C" />}

                    {expertInfo.services &&
                        <ServicesListArea>
                            <ServiceListAreaTitle>Lista de serviços</ServiceListAreaTitle>

                            {expertInfo.services.map((service, key) => {
                                return (
                                    <ServiceItem key={key}>
                                        <ServiceInfo>
                                            <ServiceName>{service.name}</ServiceName>
                                            <ServicePrice>R$ {service.price.toFixed(2).toString().replace('.', ',')}</ServicePrice>
                                        </ServiceInfo>
                                        <ServiceChooseButton onPress={() => handleServiceChooseButton(service)}>
                                            <ServiceChooseButtonText>Agendar</ServiceChooseButtonText>
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
