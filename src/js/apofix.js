
const cp1256_codepoints = [8364, 1662, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 1657, 8249, 338, 1670, 1688, 1672, 1711, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 1705, 8482, 1681, 8250, 339, 8204, 8205, 1722, 160, 1548, 162, 163, 164, 165, 166, 167, 168, 169, 1726, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 1563, 187, 188, 189, 190, 1567, 1729, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 215, 1591, 1592, 1593, 1594, 1600, 1601, 1602, 1603, 224, 1604, 226, 1605, 1606, 1607, 1608, 231, 232, 233, 234, 235, 1609, 1610, 238, 239, 1611, 1612, 1613, 1614, 244, 1615, 1616, 247, 1617, 249, 1618, 251, 252, 8206, 8207, 1746];

const latin5_codepoints = [128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 286, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 304, 350, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 287, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 305, 351, 255];

/**
 * @param {string} s
 * @param {array} codepoints
 * @returns {Uint8Array}
 */
function _encode(s, codepoints){
    var result = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++){
        let c = s.charCodeAt(i);
        if (c < 128)
            result[i] = c;
        else {
            let idx = codepoints.indexOf(c)
            if (idx == -1)
                result[i] = 63;  //'?'
            else
                result[i] = 128 + codepoints.indexOf(s.charCodeAt(i));
        }
    }
    return result;
}

/**
 * @param {string} s
 * @returns {Uint8Array}
 */
function tocp1256(s){
    let result = _encode(s, cp1256_codepoints);
    return result;
}

/**
 * @param {string} s
 * @returns {Uint8Array}
 */
function tolatin5(s){
    let result = _encode(s, latin5_codepoints);
    return result;
}

/**
 * @param {string} s
 * @returns {string}
 */
function fixEncoding(s){
    let cp1256decoder = new TextDecoder('windows-1256');
    let bytes = tolatin5(s);
    let result = cp1256decoder.decode(bytes);
    return result;
}

/**
 * @param {string} s
 * @returns {string}
 */
function unfixEncoding(s){
    let latin5decoder = new TextDecoder('iso8859-9');
    let bytes = tocp1256(s);
    let result = latin5decoder.decode(bytes);
    return result;
}

