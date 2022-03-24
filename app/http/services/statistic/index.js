const appError = require("../../../helpers/error");
const Blog = require("../../../models/Blog");
const User = require("../../../models/User");
const compare = (a, b) => {
    const countA = a.count;
    const countB = b.count;

    if (countA < countB) {
        return 1;
    } else {
        return -1;
    }
}
const getTopAuthor = async () => {
    const blogs = await Blog.find(
        {
            status: "enable"
        },
        { author: 1 }
    ).populate("author", "name avatar").exec();
    const result = [];
    const tmpId = [];
    blogs.forEach(e => {
        if (tmpId.includes(e.author._id.toString())) {
            for (let i = 0; i < result.length; i++) {
                if (result[i].author._id.toString() === e.author._id.toString()) {
                    result[i].count++;
                    break;
                }
            }
        } else {
            tmpId.push(e.author._id.toString());
            result.push({
                author: {
                    _id: e.author._id.toString(),
                    name: e.author.name,
                    avatar: e.author.avatar,
                },
                count: 1
            });
        }
    });
    result.sort(compare);

    return { data: result, status: 201, message: "success" };
};
const getTopCourse = async () => {
    const users = await User.find({
        status: "active"
    }, {
        courses: 1
    }).populate("courses", "name img").exec();
    let arr = users.map(e => e.courses).filter(e => {
        if (e.length <= 0) {
            return false
        }
        return true;
    })
    const result = [];
    const tmpId = [];
    arr = arr.flat();
    arr.forEach(e => {
        if (tmpId.includes(e._id.toString())) {
            for (let i = 0; i < result.length; i++) {
                if (result[i]._id.toString() === e._id.toString()) {
                    result[i].count++;
                    break;
                }
            }
        } else {
            tmpId.push(e._id.toString());
            result.push({
                _id: e._id.toString(),
                name: e.name,
                count: 1
            });
        }
    });
    result.sort(compare)
    return { data: result, status: 201, message: "success" };
}
module.exports = {
    getTopAuthor,
    getTopCourse
};
