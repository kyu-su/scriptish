
// JSM exported symbols
var EXPORTED_SYMBOLS = ["GM_sha1"];

const Cu = Components.utils;
Cu.import("resource://scriptish/constants.js");
Cu.import("resource://scriptish/utils/GM_memoize.js");

// UTF-8 encodes input, SHA-1 hashes it and returns the 40-char hex version.
const GM_sha1 = GM_memoize(function(aUnicode) {
  var unicodeConverter = Cc["@mozilla.org/intl/scriptableunicodeconverter"]
      .createInstance(Ci.nsIScriptableUnicodeConverter);
  unicodeConverter.charset = "UTF-8";

  var data = unicodeConverter.convertToByteArray(aUnicode, {});
  var ch = Cc["@mozilla.org/security/hash;1"]
      .createInstance(Ci.nsICryptoHash);
  ch.init(ch.SHA1);
  ch.update(data, data.length);
  var hash = ch.finish(false); // hash as raw octets

  var hex = [];
  for (var i = 0; i < hash.length; i++) {
    hex.push( ("0" + hash.charCodeAt(i).toString(16)).slice(-2) );
  }
  return hex.join('');
});
