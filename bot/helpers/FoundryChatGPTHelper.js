const axios = require('axios');
require('isomorphic-fetch');

class FoundryChatGPTHelper {
    constructor() {
        this._token = this.GetAccessToken  }

    /**
     * Gets application token.
     * @returns Application token.
     */
    GetAccessToken() {
        let qs = require('qs')
        const data = qs.stringify({
            'grant_type': 'client_credentials',
            'client_id': process.env.MicrosoftAppId,
            'scope': 'https://graph.microsoft.com/.default',
            'client_secret': process.env.MicrosoftAppPassword
        });

        return new Promise(async (resolve) => {
            const config = {
                method: 'post',
                url: 'https://login.microsoftonline.com/' + process.env.MicrosoftAppTenantId + '/oauth2/v2.0/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };

            await axios(config)
                .then(function (response) {
                    resolve((response.data).access_token)
                })
                .catch(function (error) {
                    resolve(error)
                });
        })
    } 

    /**
     * Gets the chat GPT completion
     * @param {string} text text you want to ask chat GPT foundry
     * @returns Answers!!.
     */
    async SubmitPost(text)
    {
        try
        {
            var access_Token = "eyJ0eXAiOiJKV1QiLCJyaCI6IjAuQWdBQXY0ajVjdkdHcjBHUnF5MTgwQkhiUjlabWxSRy1iNUpIbUI2eVRadGtOaU1hQUtBLiIsImFsZyI6IlJTMjU2IiwieDV0IjoiLUtJM1E5bk5SN2JSb2Z4bWVab1hxYkhaR2V3Iiwia2lkIjoiLUtJM1E5bk5SN2JSb2Z4bWVab1hxYkhaR2V3In0.eyJhdWQiOiJhcGk6Ly8xMTk1NjZkNi02ZmJlLTQ3OTItOTgxZS1iMjRkOWI2NDM2MjMiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwiaWF0IjoxNjc1MjAwMzg2LCJuYmYiOjE2NzUyMDAzODYsImV4cCI6MTY3NTIwNTAwOSwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQWtwSXR5Qi9JbTdKZXFZV0ZTVnNJL2xkQVh0cnNNWENMWG54eGhxTGlwbHUyRGduZE1QNlBtSlgyTmI3K1Uyc0hWYkVNQ3lGN3A1Q2g3Nm9xUzBpY2hRV1M1REFEQUZuOUVoVFRjUWZGVVE4PSIsImFtciI6WyJwd2QiLCJyc2EiLCJtZmEiXSwiYXBwaWQiOiIxMTk1NjZkNi02ZmJlLTQ3OTItOTgxZS1iMjRkOWI2NDM2MjMiLCJhcHBpZGFjciI6IjAiLCJkZXZpY2VpZCI6Ijg4MzFhMzM3LTQzMmMtNGY1Mi1iNGE2LTlhMzkxMGYxZTE5NiIsImZhbWlseV9uYW1lIjoiUm9vcGFuaSAoUkFKVSkiLCJnaXZlbl9uYW1lIjoiUmFqdSIsImluX2NvcnAiOiJ0cnVlIiwiaXBhZGRyIjoiNzMuMjM5Ljc5LjI1MSIsIm5hbWUiOiJSYWp1IFJvb3BhbmkgKFJBSlUpIiwib2lkIjoiNTFmZGNlZDctNWJlNS00ZmM0LTg2ZjMtZTM3NDZjYjJiZWU4Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIxNDY3NzMwODUtOTAzMzYzMjg1LTcxOTM0NDcwNy0yMzg2OTI4IiwicmgiOiJJIiwic2NwIjoiRm91bmRyeVRvb2xraXQuVXNlIiwic3ViIjoieGQ3eGxIVjdMS1JPUEx2YXpqb003eWdfMjMycFY1TTB5N0FJZ0taVUhHayIsInRpZCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsInVuaXF1ZV9uYW1lIjoicnJvb3BhbmlAbWljcm9zb2Z0LmNvbSIsInVwbiI6InJyb29wYW5pQG1pY3Jvc29mdC5jb20iLCJ1dGkiOiJGYld0c1IwbjMwcWxIWUNfQlA4QUFBIiwidmVyIjoiMS4wIn0.H4UueivuVx9w1JqR3qPpQZRBVcjguREmiQN-yWWOMrODTt1LE7o-JDYAXE3RcT6h_AqXb9PFegcxzw_7p5hWTBXBoKVJN0LOr1yyekiWtl1ozN3K-S0nx5OywZg-6hsiA1CsylETtR1o-0Zc2LJq7DjQjhSRn1Vtif0T1M4y6ZIzpMnFdX-BTQno9I3W8pnzsN4wQPAv6Wa1qtEtWHyHMta2MausF7P4RdeKswzlhg796NA3cEGOuSA_qDH1VWNAdMo04lkZDbnNR1EOoosRG8WMxlejXzB1SOGd_5ZMUTVmSv9dR5r7kU-UWDmvmLx2cU2Sc1nzwH-2V1hlYj99og";
            var submitPostUrl = `${process.env.FoundryChatGPTBaseURL}`+"?hostingEndpoint=Azure";
            var data ={
                "prompt":
                {
                    "id": "",
                    "temperature": 0.7,
                    "max_tokens": 400,
                    "top_p": 1,
                    "frequency_penalty": 0,
                    "presence_penalty": 0,
                    "model": "text-davinci-002",
                    "prompt": text,
                    "title": "",
                    "description": "",
                    "exampleInput": "",
                    "exampleOutput": "",
                    "author": "Raju Roopani (RAJU)",
                    "owners": [],
                    "isApproved": false,
                    "isPublic": true,
                    "n": 1,
                    "stop": null
                }
            }
            const submitPostConfig = {
                method: 'post',
                url: submitPostUrl,
                headers: {
                    'Authorization': `Bearer ${access_Token}`
                },
                data: data
            }

            var completion = (await axios(submitPostConfig))
            console.log("completion:" + completion);
            return completion.data.output.completions[0];
        }
        catch (ex)
        {
            console.log(ex);
            return "";
        }
    }

}
module.exports = FoundryChatGPTHelper;