
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/UserContext';
import { Text } from 'react-native';
import Api from '../../Api';
import {
    Modal,
    ModalArea,
    ModalBody,
    CloseModalButton,
    ModalItem,
    ModalExpertInfo,
    ModalExpertAvatar,
    ModalExpertName,
    ModalServiceInfo,
    ModalServiceName,
    ModalServicePrice,
    FinishAppointmentButton,
    FinishAppointmentButtonText,
    DateInfo,
    DatePrevButton,
    DateNextButton,
    DateTitleArea,
    DateTitleText,
    DateList,
    DateSelectButton,
    DateWeekDay,
    DateDay,
    HourList,
    HourSelectButton,
    HourText,
    LoadingRegisteringIcon,
    AppointmentDate,
    AppointmentDateArea,
    AppointmentDateTitle
} from './styles';
import { useNavigation } from '@react-navigation/native';

import ExpandIcon from '../../assets/expand.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

import configs from '../../appconfigs.json';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ExpertAppointmentModal = ({ service, showModal, setShowModal, expertInfo, appointment }) => {
    const { userId, userAppointments, appointmentsDispatch } = useContext(UserContext);
    const navigator = useNavigation();

    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);

    const [selectedDay, setSelectedDay] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedYear, setSelectedYear] = useState(1);
    const [selectedHour, setSelectedHour] = useState(null);

    const [allowEndAppointment, setAllowEndAppointment] = useState(false);

    const [showLoading, setShowLoading] = useState(false);

    const [date, hour] = appointment ? appointment.date.split('T') : '';

    const [year, month, day] = date.split('-');
    const [hours, minutes, seconds] = hour.split(':');

    useEffect(() => {
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        let newListDays = [];
        for (var i = 1; i <= daysInMonth; i++) {
            let day = new Date(selectedYear, selectedMonth - 1, i);
            let available;
            if (expertInfo.availableDates && expertInfo.availableDates.length > 0) {
                available = expertInfo.availableDates.find(avaDate => avaDate.day === i && avaDate.month === selectedMonth && avaDate.year === selectedYear);
                newListDays.push({
                    dateInfo: available ? { ...available } : { day: i },
                    available: available ? true : false,
                    weekDay: days[day.getDay()],
                });
            }
        }
        setListDays(newListDays);
        setSelectedDay(1);
        setListHours([]);
        setSelectedHour(null);
        setAllowEndAppointment(false);
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        selectedHour && setAllowEndAppointment(true);
    }, [selectedHour]);

    const handleDateNextPrevButton = (n) => {
        const mountDate = new Date(selectedYear, selectedMonth - 1, 1);
        mountDate.setMonth(mountDate.getMonth() + n);
        setSelectedDay(mountDate.getDate());
        setSelectedMonth(mountDate.getMonth() + 1);
        setSelectedYear(mountDate.getFullYear());
    };

    const handleDateSelectButton = (day) => {
        day.available && setSelectedDay(day.dateInfo.day);
        setListHours(day.dateInfo.availableHours);
        setSelectedHour(day.dateInfo.availableHours[0]);
    };

    const handleHourSelectButton = (hour) => {
        setSelectedHour(hour);
    };

    const handleFinishButton = async () => {
        setShowLoading(true);
        const appointmentDTOCreate = {
            userid: userId,
            expertid: expertInfo.id,
            serviceid: service.id,
            dateinfo: {
                day: selectedDay,
                month: selectedMonth,
                year: selectedYear,
                hour: selectedHour.hour,
                minutes: selectedHour.minutes,
                availablehourid: selectedHour.id
            }
        }

        try {
            const response = await Api.registerAppointment(appointmentDTOCreate);
            let appointments = [...userAppointments];
            if (response.id) {
                appointments.push(response);
                alert('Agendamento cadastrado com sucesso!');

                appointmentsDispatch(appointments);

                navigator.reset({
                    routes: [{ name: 'MainTab' }]
                });
            } else {
                alert(response);
            }
        } catch (e) {
            alert(e.message);
        } finally {
            setShowLoading(false);
        }
    };

    useEffect(() => {
        const today = new Date();
        setSelectedDay(today.getDate());
        setSelectedMonth(today.getMonth() + 1);
        setSelectedYear(today.getFullYear());

        // handleDateNextPrevButton(+1);
    }, []);

    return (
        <Modal
            transparent={true}
            visible={showModal}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>

                    <CloseModalButton onPress={() => { setShowModal(false) }}>
                        <ExpandIcon width="35" height="35" fill="#000" />
                    </CloseModalButton>

                    <ModalItem>
                        <ModalExpertInfo>
                            <ModalExpertAvatar source={{ uri: expertInfo.avatar }} />
                            <ModalExpertName>{expertInfo.name}</ModalExpertName>
                        </ModalExpertInfo>
                    </ModalItem>

                    <ModalItem>
                        <ModalServiceInfo>
                            <ModalServiceName>{service && service.name}</ModalServiceName>
                            <ModalServicePrice>R$ {service && service.price.toFixed(2).toString().replace('.', ',')}</ModalServicePrice>
                        </ModalServiceInfo>
                    </ModalItem>

                    {!appointment &&
                        <ModalItem>
                            <DateInfo>
                                <DatePrevButton onPress={() => handleDateNextPrevButton(-1)}>
                                    <NavPrevIcon width="35" height="35" fill="#000" />
                                </DatePrevButton>
                                <DateTitleArea>
                                    <DateTitleText>
                                        {selectedMonth && selectedYear && `${months[selectedMonth - 1]} ${selectedYear}`}
                                    </DateTitleText>
                                </DateTitleArea>
                                <DateNextButton onPress={() => handleDateNextPrevButton(+1)}>
                                    <NavNextIcon width="35" height="35" fill="#000" />
                                </DateNextButton>
                            </DateInfo>
                            <DateList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {listDays.map((day, key) => {
                                    return (
                                        <DateSelectButton
                                            style={{
                                                opacity: !day.available ? 0.5 : 1,
                                                backgroundColor: day.available && day.dateInfo.day === selectedDay ? "#1ABC9C" : "#FFF",
                                            }}
                                            key={key}
                                            disabled={!day.available}
                                            onPress={() => handleDateSelectButton(day)}
                                        >
                                            <DateWeekDay
                                                style={{ color: day.available && day.dateInfo.day === selectedDay ? "#FFF" : "#000" }}
                                            >
                                                {day.weekDay}
                                            </DateWeekDay>
                                            <DateDay
                                                style={{ color: day.available && day.dateInfo.day === selectedDay ? "#FFF" : "#000" }}
                                            >
                                                {day.dateInfo.day}
                                            </DateDay>
                                        </DateSelectButton>
                                    )
                                })}
                            </DateList>
                        </ModalItem>
                    }

                    {!appointment && listHours.length > 0 &&
                        <ModalItem>
                            <HourList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {listHours.map((hourItem, key) => {
                                    return (
                                        <HourSelectButton
                                            key={key}
                                            style={{
                                                backgroundColor: selectedHour && selectedHour.hour === hourItem.hour && selectedHour.minutes === hourItem.minutes ?
                                                    configs.colors.primary : "#FFF",
                                            }}
                                            onPress={() => handleHourSelectButton(hourItem)}
                                        >
                                            <HourText
                                                style={{
                                                    color: selectedHour && selectedHour.hour === hourItem.hour && selectedHour.minutes === hourItem.minutes ?
                                                        "#FFF" : "#000",
                                                }}
                                            >
                                                {`${hourItem.hour} : ${hourItem.minutes === 0 ? '00' : hourItem.minutes}`}
                                            </HourText>
                                        </HourSelectButton>
                                    )
                                })}
                            </HourList>
                        </ModalItem>
                    }

                    {appointment &&
                        (
                            <ModalItem>
                                <AppointmentDateArea>
                                    <AppointmentDateTitle>Data marcada: </AppointmentDateTitle>
                                    <AppointmentDate>{`${day}/${month}`} - {`${hours}:${minutes}h`}</AppointmentDate>
                                </AppointmentDateArea>
                            </ModalItem>
                        )
                    }

                    {showLoading && <LoadingRegisteringIcon size="large" color="#FFF" />}

                    {!appointment &&
                        <FinishAppointmentButton
                            style={{ opacity: !allowEndAppointment ? 0.5 : 1 }}
                            disabled={!allowEndAppointment}
                            onPress={handleFinishButton}>
                            <FinishAppointmentButtonText>Finalizar Agendamento</FinishAppointmentButtonText>
                        </FinishAppointmentButton>
                    }

                </ModalBody>
            </ModalArea>
        </Modal>
    )
};
export default ExpertAppointmentModal;
ExpertAppointmentModal.displayName = 'ExpertAppointmentModal';
ExpertAppointmentModal.propTypes = {
    service: PropTypes.object,
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
    expertInfo: PropTypes.object,
    appointment: PropTypes.object
};
