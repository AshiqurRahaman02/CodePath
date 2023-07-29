export const userRoutes = {
    getUser: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/user/get/`,
    login: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/user/login`,
    register: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/user/register`,
    changePassword: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/user/change_password`,
    forgotPassword: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/user/forgot_password`,
    logout: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/user/logout`,
    delete: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/user/delete`,
};
