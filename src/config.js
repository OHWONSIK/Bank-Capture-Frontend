export const BASE_URL = "https://localhost:8082/api"

export const API = {

    //회원관리 API
    CUSTOMER_LOGIN: `${BASE_URL}/customer-login`,
    BANKER_LOGIN: `${BASE_URL}/banker-login`,
    REGISTER: `${BASE_URL}/register`,

    //예약관리 API
    BANK_INQUIRY: `${BASE_URL}/reservation/`,
    BANKER_INQUIRY: `${BASE_URL}/reservation/bankerAll`,
    BANKER_INFO: `${BASE_URL}/reservation/bankerInfo`,
    RESERVATION_BOOK: `${BASE_URL}/reservation/book`,
    RESERVATION_CANCEL: `${BASE_URL}/reservation/cancle`,

    //고객 마이페이지 API
    REVIEW_INSERT: `${BASE_URL}/myPage/customer/review`,
    REVIEW_DELETE: `${BASE_URL}/myPage/customer/reviewdelete`,
    CUSTOMER_SCHEDULE_INQUIRY: `${BASE_URL}/myPage/customer/schedule`,

    //행원 마이페이지 API
    SCHEDULE_INSERT: `${BASE_URL}/myPage/banker/checkTime`,
    BANKER_TOP3: `${BASE_URL}/myPage/banker/ranking`,
    SCHEDULE_INQUIRY: `${BASE_URL}/myPage/banker/ranking`,
    BANKER_SCHEDULE_INQUIRY: `${BASE_URL}/myPage/banker/schedule`,
    SCHEDULE_DONE: `${BASE_URL}/myPage/banker/schedule/done`

}