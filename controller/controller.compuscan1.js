var soap = require('soap');
var parseString = require('xml2js').parseString;

module.exports.Enquiry = function (req, res) {

    var url = 'https://webservices-uat.compuscan.co.za/NormalSearchService?wsdl';
    // var url = 'https://webservices-uat.compuscan.co.za/AVSService?wsdl'
    // var url = 'https://webservices-uat.compuscan.co.za/EVOService?wsdl'

// let enquiryparams = '<request xmlns="http://schemas.xmlsoap.org/wsdl/">' +
//                         '<pUsrnme>77816-1</pUsrnme>' +
//                         '<pPasswrd>devtest</pPasswrd>' +
//                         '<pVersion>1.0</pVersion>' +
//                         '<pOrigin>shnapp</pOrigin>' +
//                         '<pOrigin_Version>1.0</pOrigin_Version>' +
//                         '<pInput_Format>XML</pInput_Format>' +
//                         '<pTransaction></pTransaction>' +
//                     '</request>' 


    soap.createClient(url,function(err,client){
        if(err)
            console.error(err);
        else {

            let enquiryparams = {
                "pUsrnme": "77816-1",
                "pPasswrd": "devtest",
                "pVersion": "1.0",
                "pOrigin": "shnapp",
                "pOrigin_Version": "1.0",
                "pInput_Format": "XML",
                "pTransaction": ""
            }  

            // let xmlfile = "<AVS_TRANSACTIONS>" +
            //                 "<VERSION>1.0</VERSION>" +
            //                 "<DATE_CREATED>20170811</DATE_CREATED>" +
            //                 "<RECORDS>" +
            //                 "<RECORD num='1'>" +
            //                 "<BANK_BRANCH_CD>632005</BANK_BRANCH_CD>" +
            //                 "<BANK_ACC>4052059582</BANK_ACC>" +
            //                 "<BANK_ACC_TYPE>1</BANK_ACC_TYPE>" +
            //                 "<ID_NUMBER>7103045028086</ID_NUMBER>" +
            //                 "<INITIALS>TA</INITIALS>" +
            //                 "<SURNAME>VAN DEN HEEVER</SURNAME>" +
            //                 "</RECORD>" +
            //                 "</RECORDS>" +
            //                 "</AVS_TRANSACTIONS>"

            // let enquiryparams = {
            //     "pUsername": "77816-1",
            //     "pPassword": "devtst",
            //     "pMyOrigin": "shnapp",                
            //     "pVersion": "1.0",
            //     "pSubmissionType": "RS",
            //     "pFileContent": ""
            // }  
            
            //  let enquiryparams = {
            //     "pUsername": "77816-1",
            //     "pPassword": "devtest",
            //     "pResponseType": "Json",
            //     "pMyOrigin": "shnapp",                
            //     "pVersion": "1.0",
            //     "pInputType": "Json",
            //     "pTransaction": ""
            // }  

            // let x = client.describe();
            // console.log(x)
            
            // client.DoNormalEnquiry(enquiryparams, function(err,res,body){
                
            // client.SubmitFile(enquiryparams, function(err,res,body){

            // client.PingServer(function(err,res){

            //     if (err) {
            //         console.log(err)
            //     } else {
            //         console.log(res)
            //     }
            // })

            client.DoNormalEnquiry(enquiryparams, function(err,res){    
                
                console.log('last request: ', client.lastRequest)                
                
                if(err)
                    console.error(err);
                else {
                    console.log(res);
                }

                // console.log(err);

                // console.log(res);

                // console.log(body);

                // if(err) {
                //     console.log(err);
                // }
                // if(!res) {
                //     console.log('sets');;
                // }              
                // console.log(res)
                // console.log(body)

            //     parseString(body, function(err, result){
            //         // Get The Result From The Soap API and Parse it to JSON
            //         // console.log(result)
            //         // var requestResult = result['S:Envelope']['S:Body'][0]['ns2:Fault'][0]['faultstring'][0];
            //         var requestResult1 = result['S:Envelope']['S:Body'][0];
            //         // console.log(requestResult1);
            //         var requestResult2 = result['S:Envelope']['S:Body'][0]['ns2:Fault'][0]['faultcode'][0];
            //         var requestResult3 = result['S:Envelope']['S:Body'][0]['ns2:Fault'][0]['faultstring'][0];
            //         // console.log(result);
                    
            //         console.log(requestResult2);
            //         console.log(requestResult3);
            //     })                

            })

        }
    });

}


console.log('Loaded controller.compuscan.js');