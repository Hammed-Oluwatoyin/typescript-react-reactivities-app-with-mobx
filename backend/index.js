const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const activities = [
  { id: "1",
    category: "drinks",
    city:"London",
    date: "2019-05-01T13:47:30.6008.33",
    description:"Activity 8 months Ago",
    title:"Past Activity 1",
    venue:"pub"
     },

     { id: "2",
      category: "culture",
      city:"Paris",
      date: "2019-05-01T13:47:30.6008.33",
      description:"Activity 7 months Ago",
      title:"Past Activity 2",
      venue:"museum"
       },
       { id:"3",
        category: "film",
        city:"Chicago",
        date: "2019-05-01T13:47:30.6008.33",
        description:"Activity 6 months Ago",
        title:"Past Activity 3",
        venue:"stadium"
         },
         { id: "4",
          category: "food",
          city:"madrid",
          date: "2019-05-01T13:47:30.6008.33",
          description:"Activity 5 months Ago",
          title:"Past Activity 4",
          venue:"santiago bernabau"
           },
           { id: "5",
            category: "travel",
            city:"stockholm",
            date: "2019-05-01T13:47:30.6008.33",
            description:"Activity 4 months Ago",
            title:"Past Activity 5",
            venue:"Art Museums"
             },
             { id: "6",
              category: "music",
              city:"miami",
              date: "2019-05-01T13:47:30.6008.33",
              description:"Activity 3 months Ago",
              title:"Past Activity 6",
              venue:"Beach"
               },
               { id: "7",
                category: "drinks",
                city:"inglewood",
                date: "2019-05-01T13:47:30.6008.33",
                description:"Activity 2 months Ago",
                title:"Past Activity 7",
                venue:"Central Park"
                 },
                 { id: "8",
                  category: "culture",
                  city:"Las Vegas",
                  date: "2019-05-01T13:47:30.6008.33",
                  description:"Activity 2 months Ago",
                  title:"Past Activity 8",
                  venue:"MGM Grand"
                   },
                   { id: "9",
                    category: "travel",
                    city:"NewYork",
                    date: "2019-05-01T13:47:30.6008.33",
                    description:"Activity 1 months Ago",
                    title:"Past Activity 9",
                    venue:" Arena"
                     }
  
];

app.get("/api/activities", (req, res) => {
  res.json(activities);
});

app.post("/api/activities", (req, res) => {
  const activity = { id: Date.now(),  ...req.body };
  activities.push(activity);

  res.json(activity);
});

app.put("/api/activities/:id", (req, res) => {
  const index = activities.findIndex(activities => activities.id === parseInt(req.params.id));
  const activity = activities[index];
  // if ("resolved" in req.body) bug.resolved = req.body.resolved;
  // if ("userId" in req.body) bug.userId = req.body.userId;

  res.json(activity);
});

app.delete("/api/activities/:id", (req, res) => {
  const index = activities.findIndex(activities => activities.id === parseInt(req.params.id));
  const activity = activities[index];
  // if ("resolved" in req.body) bug.resolved = req.body.resolved;
  // if ("userId" in req.body) bug.userId = req.body.userId;

  res.json(activity);
});

app.listen(9000, () => {
  console.log("Node server started on port 9000.");
});
