const logging = require('../utils/logging');
let canvas = require('canvas-lms-api');
//import canvas from 'canvas-lms-api';
const config = require('../utils/config');

const NAMESPACE = 'yeet';

// req should have canvasDomain, canvasId, canvasToken, 

const importAssignments = async (req) => {
    const canvasClient = new canvas("https://" + req.body.canvasDomain, {
        accessToken: req.body.canvasToken
    });

    let courses;

    try {
        course = await canvasClient.get("courses/" + req.body.canvasId);
        courses = courses.map(course => {
            return {
                id: course.id
            }
        });
    } catch(error) {
        logging.error(NAMESPACE, 'Could not get courses', error)
    }

    let assignments;


    // get assignments from the canvas API and extract useful info
    try {
        var courseDict = await getCourseDict(courses);
        var list = [];
        for (let i = 0; i < courses.length; i++) {
            //var assignments = await axios.get(`https://csufullerton.instructure.com/api/v1/courses/${courses[i].id}/assignments`, authConfig);
            const assignments = await canvasClient.get('courses/' + req.body.canvasId + "/assignments");

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
        assignments = list;
    } catch(error) {
        logging.error(NAMESPACE, 'Could not get assignments', error);
    }

    // format assignments and post to notion
    for (const assignment of assignments) {
        await Promise.all(
            assignment.map(result => {
                notion.pages.create({
                    parent: { database_id: config.notion.db },
                    properties: formatAssignment(result),
                });
                logging.info(NAMESPACE, `Completed import of ${result.name}`);
            }
        ));
    }
};

// retrieves ID of student whose access token is being used
const getId = async () => {
    let resp = await axios.get('https://csufullerton.instructure.com/api/v1/users/self', authConfig);
    return resp.data.id;
};

// create dictionary of course id to course name
const getCourseDict = async (courses) => {
    var mapped = courses.map((course) => {
        return { [course.id]: course.name };
    });
    return Object.assign({}, ...mapped);
};

// Returns list of course ids
const getCourseIds = async () => {
    try {
        course = await canvas.get("courses/" + req.body.canvasId);
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
            //var assignments = await axios.get(`https://csufullerton.instructure.com/api/v1/courses/${courses[i].id}/assignments`, authConfig);
            const assignments = await canvas.get('courses/' + req.body.canvasId + "/assignments");

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

const formatAssignment = (assignment) => {
    const { name, course, description, due_date, points, link } = assignment;

    return {
        'Name': {
          'title': [
            {
              'type': 'text',
              'text': {
                'content': name
              }
            }
          ]
        },
        'Class': {
            'rich_text': [
              {
                'type': 'text',
                'text': {
                  'content': course
                }
              }
            ]
          },
        'Due Date': {
          'date': {
            'start': new Date(due_date).toISOString()
          }
        },
        'Points': {
          'number': points
        },
        'Link': {
          'url': link
        }
    }
}

export default importAssignments;
