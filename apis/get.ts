import gateway from './gateway';

const baseUrl = 'https://unifill.unicommerce.co.in/vas';
// const baseUrl = 'http://localhost:8080'; //'https://unifill.unicommerce.co.in';
// const baseUrl = "/apps/unifill";
/********************************************** BUYER ***********************************************************/
export async function fetchAddresses(phone: string): Promise<void> {
    const res = await gateway(`${baseUrl}/v1/addresses?mobile=${phone}`, 'GET');
    return res.json();

//     const apiInfo = {
//         path: `${baseUrl}/v1/addresses?mobile=${phone}`, 
//         data: {
//             method: 'GET',
//         }
//     };

//     window?.top?.postMessage({ type: "TURBO_CALL", apiInfo}, '*');
}

export async function fetchAddressWithOtp(otp: string, otp_request_id: string, mobile: string): Promise<Response> {
    // debugger;
    const res = await gateway(`${baseUrl}/v1/addresses?otp=${otp}&otp_request_id=${otp_request_id}&mobile=${mobile}`, 'GET');
    return res;
}

export async function getPostalAddress(pincode: string): Promise<any> {
    const res = await gateway(`${baseUrl}/v1/pincode/${pincode}`, 'GET');
    return res.json();
}

export async function getTurboAddressCount(phone: string): Promise<Response> {
    const res = await gateway(`http://localhost:4001/turbo/count?mobile=${phone}`, 'GET');
    return res;
}

/********************************************** PAYMENT ***********************************************************/
export async function getOrderById(id: string): Promise<Response> {
    const res = await gateway(`${baseUrl}/v1/order/${id}`, `GET`);
    return res;
}
