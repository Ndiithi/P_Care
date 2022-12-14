import { settings } from './Settings'

const axios = require('axios');


export async function FetchRoles() {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/roles`);
        const rolesList = response.data;
        return rolesList;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}

export async function FetchAuthorities() {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/authorities`);
        const authoritiesList = response.data;
        return authoritiesList;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}

export async function FetchUserAuthorities() {

    try {
        let response = await axios.get(`${settings.rtcqiBaseApi}/user_authorities`);
        return response.data;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}

export async function SaveRole(roleName, authoritiesSelected) {
    try {
        const response = await axios({
            method: 'post',
            url: `${settings.rtcqiBaseApi}/save_role`,
            data: {
                name: roleName,
                authoritiesSelected: authoritiesSelected
            }
        });
        return response;
        //console.log("saved role");
    } catch (err) {
        // Handle Error Here
        //console.log(err);
        return err.response
    }
}

export async function DeleteRole(roleId) {
    let response = '';
    try {
        response = await axios({
            method: 'post',
            url: `${settings.rtcqiBaseApi}/delete_role`,
            data: {
                role_id: roleId,
            }

        });
        return response;
    } catch (err) {
        // Handle Error Here
        return err.response
    }
}


export async function UpdateRole(role_id, roleName, authoritiesSelected) {
    try {
        const response = await axios({
            method: 'post',
            url: `${settings.rtcqiBaseApi}/update_role`,
            data: {
                role_id: role_id,
                name: roleName,
                authoritiesSelected: authoritiesSelected
            }
        });
        return response;
    } catch (err) {
        // Handle Error Here
        return err.response
    }
}

export async function Saveuser(first_name, last_name, email, password, role, selectedViewableRoles) {

    try {


        const response = await axios({
            method: 'put',
            url: `${settings.rtcqiBaseApi}/save_user`,
            data: {
                name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                role: role,
                selected_viewable_roles: selectedViewableRoles
            }
        });
        return response;
    } catch (err) {
        // Handle Error Here
        //console.log(err);
        return err.response
    }
}

export async function Updateuser(first_name, last_name, email, password, role, userId, selectedViewableRoles) {

    try {

        let data = {
            name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            role: role,
            user_id: userId,
            selected_viewable_roles: selectedViewableRoles
        };
        const response = await axios.put(`${settings.rtcqiBaseApi}/update_user`, data, {});
        return response;

    } catch (err) {
        // Handle Error Here
        //console.log(err);
        return err.response
    }
}


export async function FetchUserDetails(userId) {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/users_details?id=${userId}`);
        const userDetails = response.data;
        return userDetails;
    } catch (err) {
        // Handle Error Here
        return err.response
    }
}

export async function FetchUsers() {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/users`);
        const userList = response.data;
        return userList;
    } catch (err) {
        // Handle Error Here
        return err.response
    }
}

export async function FetchUserProfile() {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/get_user_profile`);
        const userProfile = response.data;
        return userProfile;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}

export async function updateUserProfile(first_name, last_name, email, password) {
    try {
        const response = await axios({
            method: 'post',
            url: `${settings.rtcqiBaseApi}/update_user_profile`,
            data: {
                name: first_name,
                last_name: last_name,
                email: email,
                password: password
            }
        });
        return response;
    } catch (err) {
        return err.response
    }
}

export async function DeleteUser(user) {
    try {
        const response = await axios({
            method: 'delete',
            url: `${settings.rtcqiBaseApi}/delete_user`,
            data: {
                user: user,
            }
        });
        return response;
    } catch (err) {
        // Handle Error Here
        return err.response
    }
}

function uuidCompare(one, c) {
    return one.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


export async function SaveCatalog(
    productName,
    manufacturer,
    price,
    productID,
    productGroupID
) {
    try {
        const response = await axios({
            method: 'put',
            url: `${settings.rtcqiBaseApi}/save_catalog`,
            data: {
                name: productName,
                manufacturer: manufacturer,
                price: price,
                productID: productID,
                productGroupID: productGroupID
            }
        });
        return response;
    } catch (err) {
        return err.response
    }
}

export async function getCatalogs() {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/get_catalogs`);
        const data = response.data;
        return data;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}

export async function getStocks() {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/get_stocks`);
        const data = response.data;
        return data;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}

export async function saveProduct(
    productId,
    expiryDate,
    noOfItems,
    batchNo
) {
    try {
        const response = await axios({
            method: 'put',
            url: `${settings.rtcqiBaseApi}/save_product`,
            data: {
                productId: productId,
                expiryDate: expiryDate,
                noOfItems: noOfItems,
                batchNo: batchNo
            }
        });
        return response;
    } catch (err) {
        return err.response
    }
}

export async function saveSales(
    salesItems
) {
    try {
        const response = await axios({
            method: 'put',
            url: `${settings.rtcqiBaseApi}/save_sales`,
            data: {
                sales: salesItems
            }
        });
        return response;
    } catch (err) {
        return err.response
    }
}


export async function getSales() {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/get_sales`);
        const data = response.data;
        return data;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}

export async function getPurchases() {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/get_purchases`);
        const data = response.data;
        return data;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}

export async function getExpiry10_15() {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/getExpiry10_15`);
        const data = response.data;
        return data;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}

export async function getExpiry15_20() {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/getExpiry15_20`);
        const data = response.data;
        return data;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}

export async function getCurrentStock() {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/get_current_stock`);
        const data = response.data;
        return data;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}


export async function saveProductGroup(
    name
) {
    try {
        const response = await axios({
            method: 'put',
            url: `${settings.rtcqiBaseApi}/save_product_group`,
            data: {
                name: name,
            }
        });
        return response;
    } catch (err) {
        return err.response
    }
}

export async function getProductGroup() {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/get_product_group`);
        const data = response.data;
        return data;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}

export async function predict(product_id, periodspan, model) {

    try {
        const response = await axios.get(`${settings.rtcqiBaseApi}/predict/${product_id}/${periodspan}/${model}`);
        const data = response.data;
        return data;
    } catch (err) {
        // Handle Error Here
        return err.response
    }

}

export function isValidEmail(email) {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    } else {
        return false;
    }
}

export function isValidPassword(password) {
    if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)) {
        return true;
    } else {
        return false;
    }

}
