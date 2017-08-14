const db = require('./dbconnection.js');



allUsers = (clientResponse) => {
    db.query("SELECT * FROM users", (err, resp) => {
        clientResponse.send(resp);
    })
}


createNewUser = (clientResponse, userObj) => {
    let sql = `INSERT INTO users (username, image) VALUES ("${userObj.username}", "${userObj.image}");`;
    db.query(sql, (err, res) => {
        clientResponse.send(res.insertId);
    });
};

deleteUser = (clientResponse, userObj) => {
    let sql = `DELETE FROM users WHERE users.id = "${userObj.userid}"`;
    db.query(sql, (err, resp) => {
        clientResponse.end();
    })
}

findAllTasksOfUser = (clientResponse, userObj) => {
    
    console.log(userObj, 'userObj');
    let sql = `SELECT * from users_tasks INNER JOIN tasks ON users_tasks.tasks_id = tasks.id
    WHERE users_tasks.user_id = ? GROUP BY users_tasks.id;`;

    db.query(sql, [userObj.userid], (err, resp) => {
        clientResponse.send(resp);
    });
};



allProjectsByUser = (clientResponse, userObj) => {
    let sql = `SELECT tasks.id FROM users
    INNER JOIN users_tasks ON users.id = users_tasks.user_id
    INNER JOIN tasks ON users_tasks.tasks_id = tasks.id
    WHERE users.id = "${userObj.userid}";`;

    db.query(sql, (err, resp) => {
        if (resp && resp.length) {
        var amountofTasks = resp.length;
        var count = 0;
        var projList = [];

        resp.forEach(task => {

            findProjectOfTask(task, (parent) => {
                count++;
                if (projList.indexOf(parent) === -1) {
                    projList.push(parent);
                }
                if (count === amountofTasks) {
                    var amountOfProj = projList.length;
                    var counter = 0;
                    var projData = [];
                    projList.forEach(proj => {
                        db.query(`select * from tasks where id = "${proj}"`, (err, resp) => {

                            counter++;
                            if(resp) {
                                projData.push(resp[0]);
                            }
                            if(counter === amountOfProj) {
                                clientResponse.send(projData);
                            }
                        })
                    });

                }
            });
        });
      } else {
        clientResponse.send([]);
      }
    });
};

findProjectOfTask = (taskObj, cb) => {
    // given a task id, find all their tasks, then from the list of tasks of a task go up the chain and find the root. group by root id to get rid of duplicates
    let sql = `select MIN(id) as parent from (select
  @parent:=parentid as parentid, name, id
from
  (select @parent:="${taskObj.id}") actual
join
  (select * from tasks order by id desc) total
where
  @parent=id) ours`;
    db.query(sql, (err, resp) => {
        cb(resp[0].parent);
    });
};


findAllTasksOfOwner = (clientResponse, ownerObj) => {
    console.log(ownerObj)
    let sql = `SELECT * FROM tasks WHERE tasks.owner = "${userObj.userid}";`;

    db.query(sql, (err, resp) => {
        clientResponse.send(resp);
    });
};


getUserInfo = (clientResponse, userObj) => {
    let sql = `SELECT * from users WHERE users.username = ?`;
    db.query(sql, [userObj.username], (err, resp) => {
        if(resp && resp.length){
            clientResponse.send(JSON.stringify(resp[0]));
        } else {
            db.query("insert into users (username, image) VALUES (?, ?)", [userObj.username, userObj.image], (err, response) => {

                db.query("SELECT * FROM users WHERE users.id = ?", response.insertId, (err, userInfo) => {
                  clientResponse.send(JSON.stringify(userInfo[0]));
                });


            })
        }
    })
}

openTasksOfUser = (clientResponse, userObj) => {

    let sql = `SELECT * from users_tasks INNER JOIN tasks ON users_tasks.tasks_id = tasks.id
    WHERE users_tasks.user_id = "${userObj.userid}" AND tasks.status IN (-1,0) GROUP BY users_tasks.id;`;

    db.query(sql, (err, resp) => {
        clientResponse.send(resp);
    })
};



module.exports = {
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    findAllTasksOfUser: findAllTasksOfUser,
    findAllTasksOfOwner: findAllTasksOfOwner,
    allProjectsByUser: allProjectsByUser,
    allUsers: allUsers,
    getUserInfo: getUserInfo,
    openTasksOfUser: openTasksOfUser,
}
