'use strict';
var WxBase = require('co-wxbase');

class WxUser extends WxBase{
  constructor(config){
    super(config);
  }

  *createGroup(group, access_token){
    var accessToken = access_token;
    if ( !accessToken ) accessToken = yield this.provider.getAccessToken();
    var url = `https://api.weixin.qq.com/cgi-bin/groups/create?access_token=${accessToken}`;
    var result = yield this.jsonRequest(url, 'POST', {group: { name: group } });
    return result;
  }

  *listGroups(access_token){
    var accessToken = access_token;
    if ( !accessToken ) accessToken = yield this.provider.getAccessToken();
    var url = `https://api.weixin.qq.com/cgi-bin/groups/get?access_token=${accessToken}`;
    var result = yield this.jsonRequest(url, 'GET');
    return result;
  }

  *deleteGroup(group_id, access_token){
    var accessToken = access_token;
    if ( !accessToken ) accessToken = yield this.provider.getAccessToken();
    var url = `https://api.weixin.qq.com/cgi-bin/groups/delete?access_token=${accessToken}`;
    var result = yield this.jsonRequest(url, 'POST', {group: { id: group_id } });
    return result;
  }

  *updateGroup(group_id, group_name, access_token){
    var accessToken = access_token;
    if ( !accessToken ) accessToken = yield this.provider.getAccessToken();
    var url = `https://api.weixin.qq.com/cgi-bin/groups/update?access_token=${accessToken}`;
    var result = yield this.jsonRequest(url, 'POST', {group: { id: group_id, name: group_name} });
    return result;
  }

  *getUserGroup(openid, access_token){
    var accessToken = access_token;
    if ( !accessToken ) accessToken = yield this.provider.getAccessToken();
    var url = `https://api.weixin.qq.com/cgi-bin/groups/getid?access_token=${accessToken}`;
    var result = yield this.jsonRequest(url, 'POST', {openid: openid});
    return result;
  }

  *moveUser(openid, group_id, access_token){
    var accessToken = access_token;
    if ( !accessToken ) accessToken = yield this.provider.getAccessToken();
    var url, params;
    params = {to_groupid: group_id};
    if ( typeof openid == 'string' ) {
      url = `https://api.weixin.qq.com/cgi-bin/groups/members/update?access_token=${accessToken}`;
      params.openid = openid;
    }
    else {
      url = `https://api.weixin.qq.com/cgi-bin/groups/members/batchupdate?access_token=${accessToken}`;
      params.openid_list = openid;
    }
    var result = yield this.jsonRequest(url, 'POST', params);
    return result;
  }

  *setUserRemark(openid, remark, access_token){
    var accessToken = access_token;
    if ( !accessToken ) accessToken = yield this.provider.getAccessToken();
    var url = `https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token=${accessToken}`;
    var result = yield this.jsonRequest(url, 'POST', {openid: openid, remark: remark});
    return result;
  }

  *getUserInfo(openid, lang, access_token){
    var accessToken = access_token;
    if ( !accessToken ) accessToken = yield this.provider.getAccessToken();
    var locale = lang || 'zh_CN';
    var url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${accessToken}&openid=${openid}&lang=${locale}`;
    var result = yield this.jsonRequest(url, 'GET');
    return result;
  }

  *getUsers(next_openid, access_token){
    var nextId = next_openid || '';
    var accessToken = access_token;
    if ( !accessToken ) accessToken = yield this.provider.getAccessToken();
    var url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${accessToken}&next_openid=${nextId}`
    var result = yield this.jsonRequest(url, 'GET');
    return result;
  }
}

module.exports = function(config){
  var api = new WxUser(config);
  return api;
}
