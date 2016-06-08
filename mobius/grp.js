/**
 * Copyright (c) 2015, OCEAN
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. The name of the author may not be used to endorse or promote products derived from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @file
 * @copyright KETI Korea 2016, OCEAN
 * @author Il Yeup Ahn [iyahn@keti.re.kr]
 */

var url = require('url');
var xml2js = require('xml2js');
var xmlbuilder = require('xmlbuilder');
var util = require('util');
var responder = require('./responder');

var db = require('./db_action');


function check_mtv(request, response, mt, mid, callback) {
    var sql = util.format("select ri from lookup where where ty = \'%s\' and ri in ("+JSON.stringify(mid).replace('[','').replace(']','')+")", mt);
    db.getResult(sql, '', function (err, results_mid) {
        if(!err) {
            if (results_mid.length == mid.length) {
                callback('1', results_mid);
            }
            else {
                callback('0', results_mid);
            }
        }
        else {
            callback('2', results_mid);
        }
    });
}

exports.build_grp = function(request, response, resource_Obj, body_Obj, callback) {
    var rootnm = request.headers.rootnm;

    // check NP
    if(body_Obj[rootnm].ty) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'ty as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].ri) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'ri as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].pi) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'pi as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].ct) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'ct as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].lt) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'lt as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].st) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'st as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].cnm) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'cni as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].mtv) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'cbs as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    // check M
    if(!body_Obj[rootnm].mnm) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'mnm as M Tag should be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(!body_Obj[rootnm].mid) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'mid as M Tag should be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    // body
    resource_Obj[rootnm].mnm = body_Obj[rootnm].mnm;
    resource_Obj[rootnm].mid = body_Obj[rootnm].mid;

    resource_Obj[rootnm].acpi = (body_Obj[rootnm].acpi) ? body_Obj[rootnm].acpi : [];
    resource_Obj[rootnm].et = (body_Obj[rootnm].et) ? body_Obj[rootnm].et : '';
    resource_Obj[rootnm].lbl = (body_Obj[rootnm].lbl) ? body_Obj[rootnm].lbl : [];
    resource_Obj[rootnm].at = (body_Obj[rootnm].at) ? body_Obj[rootnm].at : [];
    resource_Obj[rootnm].aa = (body_Obj[rootnm].aa) ? body_Obj[rootnm].aa : [];

    resource_Obj[rootnm].cr = (body_Obj[rootnm].cr) ? body_Obj[rootnm].cr : '';
    resource_Obj[rootnm].macp = (body_Obj[rootnm].macp) ? body_Obj[rootnm].macp : [];
    resource_Obj[rootnm].mt = (body_Obj[rootnm].mt) ? body_Obj[rootnm].mt : '24';
    resource_Obj[rootnm].csy = (body_Obj[rootnm].csy) ? body_Obj[rootnm].csy : '1'; // default : ABANDON_MEMBER
    resource_Obj[rootnm].cnm = body_Obj[rootnm].mid.length.toString();
    resource_Obj[rootnm].gn = (body_Obj[rootnm].gn) ? body_Obj[rootnm].gn : '';

    if (resource_Obj[rootnm].et != '') {
        if (resource_Obj[rootnm].et < resource_Obj[rootnm].ct) {
            body_Obj = {};
            body_Obj['rsp'] = {};
            body_Obj['rsp'].cap = 'expiration time is before now';
            responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
            callback('0', resource_Obj);
            return '0';
        }
    }

    if(resource_Obj[rootnm].mt != '24') {
        check_mtv(resource_Obj[rootnm].mt, resource_Obj[rootnm].mid, function(rsc, results_mid) {
            if(rsc == '0') { // mt inconsistency
                if(results_mid.length == '0') {
                    body_Obj = {};
                    body_Obj['rsp'] = {};
                    body_Obj['rsp'].cap = 'can not create group because mid is empty after validation check of mt requested';
                    responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
                    callback('0', body_Obj);
                    return '0';
                }
                else {
                    if (resource_Obj[rootnm].csy == '1') { // ABANDON_MEMBER
                        resource_Obj[rootnm].mid = results_mid;
                        resource_Obj[rootnm].mtv = 'true';
                    }
                    else if (resource_Obj[rootnm].csy == '2') { // ABANDON_GROUP
                        body_Obj = {};
                        body_Obj['rsp'] = {};
                        body_Obj['rsp'].cap = 'can not create group because csy is ABANDON_GROUP when MEMBER_TYPE_INCONSISTENT';
                        responder.response_result(request, response, 400, body_Obj, 6011, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
                        callback('0', body_Obj);
                        return '0';
                    }
                    else { // SET_MIXED
                        resource_Obj[rootnm].mt = '24';
                        resource_Obj[rootnm].mtv = 'false';
                    }
                }
            }
            else if(rsc == '1') {
                resource_Obj[rootnm].mtv = 'true';
            }
            else { // db error
                body_Obj = {};
                body_Obj['rsp'] = {};
                body_Obj['rsp'].cap = results_mid.code;
                responder.response_result(request, response, 500, body_Obj, 5000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
                callback('0', body_Obj);
                return '0';
            }

            callback('1', resource_Obj);
        });
    }
    else {
        resource_Obj[rootnm].mtv = 'false';
        callback('1', resource_Obj);
    }
};



exports.update_grp = function(request, response, resource_Obj, body_Obj, callback) {
    var rootnm = request.headers.rootnm;

    // todd
    // check NP
    if(body_Obj[rootnm].rn) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'rn as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].ty) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'ty as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].ri) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'ri as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].pi) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'pi as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].ct) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'ct as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].lt) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'lt as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].st) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'st as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].cr) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'cr as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].cni) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'cni as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    if(body_Obj[rootnm].cbs) {
        body_Obj = {};
        body_Obj['rsp'] = {};
        body_Obj['rsp'].cap = 'cbs as NP Tag should not be included';
        responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
        callback('0', resource_Obj);
        return '0';
    }

    // check M

    // body
    if(body_Obj[rootnm].acpi) {
        resource_Obj[rootnm].acpi = body_Obj[rootnm].acpi;
    }

    if(body_Obj[rootnm].et) {
        resource_Obj[rootnm].et = body_Obj[rootnm].et;
    }

    if(body_Obj[rootnm].lbl) {
        resource_Obj[rootnm].lbl = body_Obj[rootnm].lbl;
    }

    resource_Obj[rootnm].st = (parseInt(resource_Obj[rootnm].st, 10) + 1).toString();

    if(body_Obj[rootnm].at) {
        resource_Obj[rootnm].at = body_Obj[rootnm].at;
    }

    if(body_Obj[rootnm].aa) {
        resource_Obj[rootnm].aa = body_Obj[rootnm].aa;
    }

    if(body_Obj[rootnm].mni) {
        resource_Obj[rootnm].mni = body_Obj[rootnm].mni;
        if(parseInt(resource_Obj[rootnm].mni) >= 9007199254740991) {
            resource_Obj[rootnm].mni = '9007199254740991';
        }
    }

    if(body_Obj[rootnm].mbs) {
        resource_Obj[rootnm].mbs = body_Obj[rootnm].mbs;
    }

    if(body_Obj[rootnm].mia) {
        resource_Obj[rootnm].mia = body_Obj[rootnm].mia;
    }

    if(body_Obj[rootnm].li) {
        resource_Obj[rootnm].li = body_Obj[rootnm].li;
    }

    if(body_Obj[rootnm].or) {
        resource_Obj[rootnm].or = body_Obj[rootnm].or;
    }

    var cur_d = new Date();
    resource_Obj[rootnm].lt = cur_d.toISOString().replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '').replace(/\..+/, '');

    if (resource_Obj[rootnm].et != '') {
        if (resource_Obj[rootnm].et < resource_Obj[rootnm].ct) {
            body_Obj = {};
            body_Obj['rsp'] = {};
            body_Obj['rsp'].cap = 'expiration time is before now';
            responder.response_result(request, response, 400, body_Obj, 4000, url.parse(request.url).pathname.toLowerCase(), body_Obj['rsp'].cap);
            callback('0', resource_Obj);
            return '0';
        }
    }

    callback('1', resource_Obj);
};
