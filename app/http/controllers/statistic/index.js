
const statisticService = require("../../services/statistic");
/* By USER */
const getTopAuthor = async (req, res, next) => {
    const response = await statisticService.getTopAuthor();
    return res.json({
        data: response.data,
        status: response.status,
        message: response.message,
    });
};
const getTopCourse = async (req, res, next) => {
    const response = await statisticService.getTopCourse();
    return res.json({
        data: response.data,
        status: response.status,
        message: response.message,
    });
}
module.exports = {
    getTopAuthor,
    getTopCourse,
};
// => [
// {user, imd, count}
//]