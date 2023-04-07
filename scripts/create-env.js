const fs = require("fs");

fs.writeFileSync("./.env", `API=${proccess.env.API}\n`)