export default async (req, res) => {
    // on call: http://localhost:3000/api/example_api
    // get data from firebase for movie names based on search query

    //use functions contained in example_backend.js
    const { exampleAsyncFunction, exampleFunction } = require('../../backend/example_backend.js');
    const exampleFunctionResult = exampleFunction();
    const exampleAsyncFunctionResult = await exampleAsyncFunction();

    //return results
    res.status(200).json({ exampleFunctionResult, exampleAsyncFunctionResult });
};

