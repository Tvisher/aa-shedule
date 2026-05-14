import axios from "axios";


export function getServices() {
    return axios.post("/wp-content/themes/sp-theme-master/ajax/services.php");
}


export function getNearestDate(serviceId) {
    return axios.post("/wp-content/themes/sp-theme-master/ajax/datefree.php", { id: serviceId });
}

export function getCurrentDate({ serviceId, date }) {
    return axios.post("/wp-content/themes/sp-theme-master/ajax/datefree.php",
        {
            id: serviceId,
            date: date
        });
}


export function setAppoitmentData(data) {
    return axios.post("/wp-admin/admin-ajax.php?action=create_tochka_payment", data);
}




export const mokServices = [
    {
        "id": "49",
        "name": "Установочная встреча «Личный разбор»",
        "description": "Разберем вашу ситуацию и получите пошаговый план решения вашей проблемы.Разберем вашу ситуацию и получите пошаговый план решения вашей проблемы.",
        "meetingInfo": {
            "typeOfMeeting": "Онлайн-встреча",
            "timeOfMeeting": "50 мин"
        },
        "serviceData": {
            "appointmentsCount": 1,
            "isSpecial": true,
            "priceData": {
                "currentPrice": "4900",
                "oldPrice": "6000"
            }
        }
    },
    {
        "id": "50",
        "name": "Знакомство",
        "description": "Сможете рассказать о вашей проблеме, познакомиться со мной, моими методами и узнать, как я могу вам помочь.",
        "meetingInfo": {
            "typeOfMeeting": "Онлайн-встреча",
            "timeOfMeeting": "20 мин"
        },
        "serviceData": {
            "appointmentsCount": 1,
            "isSpecial": false,
            "priceData": {
                "currentPrice": "0",
                "oldPrice": null
            }
        }
    },
    {
        "id": "51",
        "name": "Консультация",
        "description": "Разовая индивидуальная онлайн-консультация",
        "meetingInfo": {
            "typeOfMeeting": "Онлайн-встреча",
            "timeOfMeeting": "60-90 мин"
        },
        "serviceData": {
            "appointmentsCount": 1,
            "isSpecial": false,
            "priceData": {
                "currentPrice": "7700",
                "oldPrice": "9000"
            }
        }
    },
    {
        "id": "52",
        "name": "Пакет из 4-х консультаций с гарантией результата!",
        "description": "4 индивидуальных консультаций. Покупая пакет, вы получаете гарантию результата",
        "meetingInfo": {
            "typeOfMeeting": "Онлайн-встреча",
            "timeOfMeeting": "60-90 мин"
        },
        "serviceData": {
            "appointmentsCount": 4,
            "isSpecial": false,
            "priceData": {
                "currentPrice": "28000",
                "oldPrice": "30000"
            }
        }
    },
    {
        "id": "53",
        "name": "Парная консультация",
        "description": "Консультация когда во встрече принимают участие оба партнера",
        "meetingInfo": {
            "typeOfMeeting": "Онлайн-встреча",
            "timeOfMeeting": "90 мин"
        },
        "serviceData": {
            "appointmentsCount": 1,
            "isSpecial": false,
            "priceData": {
                "currentPrice": "100",
                "oldPrice": null
            }
        }
    },
    {
        "id": "54",
        "name": "Оффлайн консультация",
        "description": "В Москве",
        "meetingInfo": {
            "typeOfMeeting": "Личная встреча г. Москва",
            "timeOfMeeting": "90 мин"
        },
        "serviceData": {
            "appointmentsCount": 1,
            "isSpecial": false,
            "priceData": {
                "currentPrice": "100",
                "oldPrice": null
            }
        }
    }
];

export const mokDateData = { "nearestDate": "04-05-2026", "timeList": ["12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00"], "blockedDates": ["06-05-2026"] }

