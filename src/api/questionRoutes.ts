export const questionRoute = {
    addQuestion: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/question/add`,
    getAllQuestion: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/question/all`,
    searchQuestion: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/question/search`,
    byCategories: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/question/get/byCategories`,
    byLevels: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/question/get/byLevels`,
    questionById: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/question/getById`,
    random: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/question/random`,
    updateQuestion: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/question/update`,
    updateLike: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/question/update/like`,
    delete: `${process.env.REACT_APP_BACKEND_APP_BASE_URL}/question/delete`,
};