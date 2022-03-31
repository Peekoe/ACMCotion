const logging = require('../utils/logging');
const axios = require('axios');
const config = require('../utils/config');

const NAMESPACE = 'yeet';

const authConfig = {
    headers: {
        Authorization: 'Bearer ' + config.canvas.token
    }
};

// retrieves ID of student whose access token is being used
const getId = async () => {
    let resp = await axios.get('https://csufullerton.instructure.com/api/v1/users/self', authConfig);
    return resp.data.id;
};

// create dictionary of course id to course name
const getCourseDict = async () => {
    var courses = getCourses();
    var mapped = courses.map((course) => {
        return { [course.id]: course.name };
    });
    return Object.assign({}, ...mapped);
};

const getCourses = async () => {
    try {
        var id = await getId();
        var courses = await axios.get('https://csufullerton.instructure.com/api/v1/courses', authConfig);
        var mapped = courses.map(course => {
            return {
                id: course.id
            }
        });
        return mapped;
    } catch(error) {
        logging.error(NAMESPACE, 'Could not get courses', error)
    }
}

// gets a list of assignments based on the access token
const getAssignmentsFromCourses = async () => {
    try {
        var courseDict = await getCourseDict();
        var list = [];
        var courses = await getCourses();
        for (let i = 0; i < courses.length; i++) {
            var assignments = await axios.get(`https://csufullerton.instructure.com/api/v1/courses/${courses[i].id}/assignments`, authConfig);

            var mapped = assignments.map(result => {
                return {
                    id: result.id,
                    name: result.name,
                    course: courseDict[result.course_id],
                    due_date: result.due_at,
                    points: result.points_possible,
                    link: result.html_url
                }
            });
            list.push(mapped);
        }
        
        console.log(list);
        return list;
    } catch(error) {
        logging.error(NAMESPACE, 'Could not get assignments', error);
    }
};

module.exports = {
    getAssignmentsFromCourses
};
