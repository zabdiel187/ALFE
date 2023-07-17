app.post("api/createGroup3", (req, res) => {
    const tableName = req.body.groupName;
    const leaderId = req.body.leaderId;
    const groupLeader = req.body.groupLeader;
  
    const sqlAddToGroup = "INSERT INTO ".concat(
      tableName,
      "(groupId, isGroupLeader, userId, userName) VALUES(?,?,?,?);"
    );
  
    db.query(
      sqlAddToGroup,
      [groupId, 1, leaderId, groupLeader],
      (err, result) => {
        if (err) {
          console.log(err);
          console.log("User not inserted into group!!");
        } else {
          console.log("leader added");
        }
      }
    );
  });