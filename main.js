import { Configuration, OpenAIApi } from "openai";
import { SmartVoyage, functionsDefinition } from './smartVoyage.js';

// Configuring the OpenAI API
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);


async function run_conversation() {
    const smartVoyage = new SmartVoyage();
    const messages = [{ 'role': 'user', 'content': "get the fuel consumption of the vessel 1123" }];

    try {
        // send the request and get the response
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo-0613',
            messages: messages,
            functions: functionsDefinition,
            function_call: 'auto',
        });

        // clean the response
        const response_message = response.data.choices[0].message;
        // console.log(response_message)

        // if what gpt tells is to call the funcion, ie. the value of the key "function_call" is not null
        if (response_message.function_call) {


            // const available_functions = {
            //     'get_current_weather': get_current_weather,
            //     'track_my_package': track_my_package,
            // };

            // extract the function name and the arguments from the gpt response
            const function_name = response_message.function_call.name;
            // const function_to_call = available_functions[function_name];
            const function_args = JSON.parse(response_message.function_call.arguments);
            let function_response;

            // check whether the function exists in the SmartVoyage object
            if (typeof smartVoyage[function_name] === "function") {
                // console.log("YESSSSSSSSSSSSSS ITIS A FUNCTION");
                function_response = smartVoyage[function_name]({ ...function_args }); // Calls the function
            } else {
                console.log("Function not found");
            }

            // const function_response = function_to_call({ ...function_args });

            messages.push(response_message);
            messages.push({
                'role': 'function',
                'name': function_name,
                'content': function_response,
            });

            const second_response = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo-0613',
                messages: messages,
                functions: functionsDefinition,
                function_call: 'auto',
            });
            // console.log(second_response.data.choices[0].message)
            return second_response;
        } else {
            return response;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    } finally {
        console.log("FINAL MESSAGE LIST------------------\n", messages)
    }

}

async function x() {
    const result = await run_conversation();
    if (result) {
        console.log("FINAL OUTPUT ----------------\n", result.data.choices[0].message.content);
    }
};
x();

