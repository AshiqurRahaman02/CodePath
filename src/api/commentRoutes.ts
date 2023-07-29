export const commentRoute = {
    create: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/comment/create/`,
    commentsInQuestion: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/comment/get`,
    updateComment: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/comment/update`,
    deleteComment: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/comment/delete`
};