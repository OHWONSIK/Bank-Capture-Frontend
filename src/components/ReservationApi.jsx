//지도 디비 연결

import axios from "axios";
import { API } from "../config";

const ReservationApi = async(id)=>{
    let bankDetail =null;
    await axios.get(
        `${API.BANK_INQUIRY}`,
        {
            params:{bankId: id},
        },
        {withCredentials:true,}
    )
    .then((response)=>{
        bankDetail =response.data;
        sessionStorage.setItem("detail",JSON.stringify(bankDetail));
    })
    console.log(bankDetail)
    .catch(function (error){
        console.error(error);
    });
    return bankDetail;
}
export default ReservationApi;