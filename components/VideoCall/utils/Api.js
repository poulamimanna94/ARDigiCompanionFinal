/*
 * @author : Chahat chugh
 * @description : Video call API integration
 */

const SERVER_URL = 'http://127.0.0.1:8080';
const SERVER_REGION = 'ap-south-1'

export async function createMeetingRequest (meetingName, attendeeName) {
var myHeaders = new Headers();
myHeaders.append("X-Amz-Security-Token", "IQoJb3JpZ2luX2VjEOP//////////wEaCWV1LXdlc3QtMSJHMEUCIG38EpBTOnrQkKCo/NqGljmMOnbPN7SYzFQXmUhYMwYjAiEApHgQpVNt2n7HvzPEMbYgWHFKRkpdjxOkicd37WmS8HYqrQIInP//////////ARACGgw5Nzg0OTIxMTY1OTQiDNrpn2LfA6Y8oWgjeSqBAnnAx46xc55nL03oZV1ZmNMvPeCEMrUZbYKnm6OBlitJTGZqtmTCmCbEnaf/KRPFydpRqDOgBx6iMNSOQS2tEXIIfXwXQdT9SIji39o5VhIiZihrFKLXneJ8CPdXDdtHXB918jpx8ErUq5iL/oKeLjffaLfCwRQjp8NJ1jXA7iQeOf7bOX4pF+6vlfknupayNxn+/D6VipWagJCsv+odIgjLn+rU+QktG0Ys2RS9+RnV1DOgwupIZgT7lz6/mRpKYG6DwUBEwi7uD9CdcdSP3b2jJ8FowO3a4cJLNcnoqKIjw1+/fSUgYq+ffXQjxe+t57lDy15PI65N9G+3hL9onCNQMNK9nZMGOp0BCECmXcUvs21FcgdlGrjB3026dvUdCPyVCP6rY+taLeKD3MH7D7JvxgeOGosJt64TMz3CeKoqdGntdud1pehrMkZbccFPGbfJsbzGt80ty4IOsewEQYfrVlgufzi64RXoP04VwuMov3nUXKtGzPzJNrsVRkAZfQGwxnP/avBH+Yolb4DG7w/hMNGgHrrwtYJF9d6fVTURcFTGLIwK/w==");
myHeaders.append("X-Amz-Date", "20220426T063526Z");
myHeaders.append("Authorization", "AWS4-HMAC-SHA256 Credential=ASIA6HUVMZZZI5ZOBCSV/20220426/ap-south-1/s1/aws4_request, SignedHeaders=host;x-amz-date;x-amz-security-token, Signature=13c47e95b4a077922f590bb774d457d12aba0682368878b3e0117a6f700adf49");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
};

return fetch(`https://uovr605d8b.execute-api.us-east-1.amazonaws.com/Prod/join?title=${meetingName}&name=${attendeeName}&region=ap-south-1&ns_es=false`, requestOptions)
  .then(response => response.json())
  .catch(error => console.log('error', error));
}


export async function endMeetingRequest (meetingName) {

  var myHeaders = new Headers();
  myHeaders.append("X-Amz-Security-Token", "IQoJb3JpZ2luX2VjEOP//////////wEaCWV1LXdlc3QtMSJHMEUCIG38EpBTOnrQkKCo/NqGljmMOnbPN7SYzFQXmUhYMwYjAiEApHgQpVNt2n7HvzPEMbYgWHFKRkpdjxOkicd37WmS8HYqrQIInP//////////ARACGgw5Nzg0OTIxMTY1OTQiDNrpn2LfA6Y8oWgjeSqBAnnAx46xc55nL03oZV1ZmNMvPeCEMrUZbYKnm6OBlitJTGZqtmTCmCbEnaf/KRPFydpRqDOgBx6iMNSOQS2tEXIIfXwXQdT9SIji39o5VhIiZihrFKLXneJ8CPdXDdtHXB918jpx8ErUq5iL/oKeLjffaLfCwRQjp8NJ1jXA7iQeOf7bOX4pF+6vlfknupayNxn+/D6VipWagJCsv+odIgjLn+rU+QktG0Ys2RS9+RnV1DOgwupIZgT7lz6/mRpKYG6DwUBEwi7uD9CdcdSP3b2jJ8FowO3a4cJLNcnoqKIjw1+/fSUgYq+ffXQjxe+t57lDy15PI65N9G+3hL9onCNQMNK9nZMGOp0BCECmXcUvs21FcgdlGrjB3026dvUdCPyVCP6rY+taLeKD3MH7D7JvxgeOGosJt64TMz3CeKoqdGntdud1pehrMkZbccFPGbfJsbzGt80ty4IOsewEQYfrVlgufzi64RXoP04VwuMov3nUXKtGzPzJNrsVRkAZfQGwxnP/avBH+Yolb4DG7w/hMNGgHrrwtYJF9d6fVTURcFTGLIwK/w==");
  myHeaders.append("X-Amz-Date", "20220426T063526Z");
  myHeaders.append("Authorization", "AWS4-HMAC-SHA256 Credential=ASIA6HUVMZZZI5ZOBCSV/20220426/ap-south-1/s1/aws4_request, SignedHeaders=host;x-amz-date;x-amz-security-token, Signature=13c47e95b4a077922f590bb774d457d12aba0682368878b3e0117a6f700adf49");
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  return fetch(`https://uovr605d8b.execute-api.us-east-1.amazonaws.com/Prod/end?title=${meetingName}`, requestOptions)
    .then(response => response.json())
    // .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }