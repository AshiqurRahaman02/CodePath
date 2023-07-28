export const questionRoute = {
    addQuestion: `${process.env.HOST}/question/add`,
    getAllQuestion: `${process.env.HOST}/question/all`,
    searchQuestion: `${process.env.HOST}/question/search`,
    byCategories: `${process.env.HOST}/question/get/byCategories`,
    byLevels: `${process.env.HOST}/question/get/byLevels`,
    questionById: `${process.env.HOST}/question/getById`,
    random: `${process.env.HOST}/question/random`,
    updateQuestion: `${process.env.HOST}/question/update`,
    updateLike: `${process.env.HOST}/question/update/like`,
    delete: `${process.env.HOST}/question/delete`,
};