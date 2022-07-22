import request from './requests';
export function getAgreementByCode(code){
  return request({
    url: '/api/agreement/getAgreementByCode',
    method: 'GET',
    params: { code },
  })
}
