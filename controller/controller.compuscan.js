var request     = require("request");
var fs          = require('fs');
var DOMParser   = require('xmldom').DOMParser;
var parseString = require('xml2js').parseString;
var AdmZip      = require('adm-zip');
var shell       = require('shelljs');
var xml2js      = require('xml2js');
var util        = require('util');
var Q           = require('q');

module.exports.Enquiry = function (req, res) {

    let xmlString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webServices/">' + "\n" +
                    '<soapenv:Header/>' + "\n" +
                    '<soapenv:Body>' + "\n" +
                    '<web:DoNormalEnquiry>' + "\n" +
                    '<request>' + "\n" +
                    '<pUsrnme>77816-1</pUsrnme>' + "\n" +
                    '<pPasswrd>devtest</pPasswrd>' + "\n" +
                    '<pVersion>1.0</pVersion>' + "\n" +
                    '<pOrigin>AVDH</pOrigin>' + "\n" +
                    '<pOrigin_Version>1.0</pOrigin_Version>' + "\n" +
                    '<pInput_Format>XML</pInput_Format>' + "\n" +
                    '<pTransaction><![CDATA[' + "\n" +
            	    '<Transactions>' + "\n" +
         		   	'<Search_Criteria>' + "\n" +
                    '<CS_Data>Y</CS_Data>' + "\n" +
                    '<CPA_Plus_NLR_Data>Y</CPA_Plus_NLR_Data>' + "\n" +
            		'<Deeds_Data>N</Deeds_Data>' + "\n" +
            		'<Directors_Data>N</Directors_Data>' + "\n" +
            		'<Identity_number>7103045028086</Identity_number>' + "\n" +
            		'<Surname>Van den Heever</Surname>' + "\n" +
            		'<Forename>Thomas</Forename>' + "\n" +
            		'<Forename2>Arnoldus</Forename2>' + "\n" +
            		'<Forename3></Forename3>' + "\n" +
            		'<Gender>M</Gender>' + "\n" +
            		'<Passport_flag>N</Passport_flag>' + "\n" +
            		'<DateOfBirth>19710304</DateOfBirth>' + "\n" +
            		'<Address1>9 Leeukloof Drive</Address1>' + "\n" +
            		'<Address2>Tamboerskloof</Address2>' + "\n" +
            		'<Address3>Cape Town</Address3>' + "\n" +
            		'<Address4></Address4>' + "\n" +
            		'<PostalCode>8001</PostalCode>' + "\n" +
            		'<HomeTelCode></HomeTelCode>' + "\n" +
            		'<HomeTelNo></HomeTelNo>' + "\n" +
            		'<WorkTelCode></WorkTelCode>' + "\n" +
            		'<WorkTelNo></WorkTelNo>' + "\n" +
            		'<CellTelNo>0832702246</CellTelNo>' + "\n" +
            		'<ResultType>XPDF2</ResultType>' + "\n" +
            		'<RunCodix>N</RunCodix>' + "\n" +
            		'<CodixParams></CodixParams>' + "\n" +
            		'<Adrs_Mandatory>Y</Adrs_Mandatory>' + "\n" +
            		'<Enq_Purpose>12</Enq_Purpose>' + "\n" +
            		'<Run_CompuScore>Y</Run_CompuScore>' + "\n" +
            		'<ClientConsent>Y</ClientConsent>' + "\n" +
         		   	'</Search_Criteria>' + "\n" +
            	    '</Transactions>' + "\n" +
                    ']]></pTransaction>' + "\n" +
                    '</request>' + "\n" +
                    '</web:DoNormalEnquiry>' + "\n" +
                    '</soapenv:Body>' + "\n" +
                    '</soapenv:Envelope>'

    request.post({
        url:"https://webservices-uat.compuscan.co.za/NormalSearchService", 
        method:"POST",
        keepAlive: false,
        headers:{
            'Content-Type': 'text/xml'
        },
        body: xmlString
        },
        function(error, response, body){
  
            parseString(body, function (err, result) {

                if (err){
                    console.dir(err);
                } else {

                    let base64String = result['S:Envelope']['S:Body'][0]['ns2:DoNormalEnquiryResponse'][0].TransReplyClass[0].retData[0];

                    let result_decoded = Buffer.from(base64String, 'base64');

                    let zip = new AdmZip(result_decoded);

                    

                    let zipEntries = zip.getEntries(); // an array of ZipEntry records

                    zipEntries.forEach(function(zipEntry) {

                        if (zipEntry.name.split('.')[1] == "xml"){                    

                            let fileName = zipEntry.name.split('.')[0];

                            let curdir = shell.pwd()                       
                            let dir = curdir.stdout + '/8209147250087/CS_Enquiries/' + fileName + '.zip';

                            fs.writeFileSync(dir, result_decoded);

                            zipEntry.getDataAsync(function (data) {
                                var parser = new xml2js.Parser({explicitArray : false});
                                parser.parseString(data, function (err, result) {

                                    console.log(result)
                                    console.log(result.ROOT.EnqCC_NLR_ACCOUNTS)

                                });
                            });    
                            
                            // getJSON(zipEntry)
                            // .then(function(result){
                            //     console.log(result);
                            // })
                            // .catch(function(err){
                            //     console.log(err);
                            // })
                            
                        }
                    });

                }
                
            });            

    });


}
function getJSON(zipEntry) {
    var deferred = Q.defer();
    console.log(zipEntry)
    zipEntry.getDataAsync(function (data) {
        var parser = new xml2js.Parser({explicitArray : false});
        parser.parseString(data, function (err, result) {
            if(err){
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(result);
                console.log(util.inspect(result, false, null))
                console.log(JSON.stringify(result));
                deferred.resolve(JSON.stringify(result));
            }
        });
    });      

    return deferred.promise;
}
console.log('Loaded controller.compuscan.js');