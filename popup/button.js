
function normalizenumber(number) {
  if (typeof number === 'string') {
    number = Number.parseInt(number);
  }
  return ((number < 10)?"0":"") + number;
}

function gmtnumber(number) {
  sign = "+";
  if (number < 0) {
    number = number * -1;
    sign = "-";
  } 
  return sign + ((number<10)?"0"+number:number) + "00";
}

function normalizeabbrv(abbrv) {
  return abbrv + ((abbrv.length < 3)?"&nbsp;":"");
}

function create_child(current) {
  var child = document.createElement("li");
  child.className = ((current)?"current ":"") + "timezone";
  return child;
}

function get_current_offset() {
  return (new Date().getTimezoneOffset()/60 * -1);
}

function get_offset(tz) {
  console.log(JSON.stringify(tz));
  if (typeof tz.dst !== 'undefined') {
    for (var i = 0; i < tz.dst.length; i++) {
      if (Date.now() > tz.dst[i][0] && Date.now() < tz.dst[i][1]) {
        return tz.dst_offset;
      }
    }
  }
  return tz.offset;
}

function populate_timezone_list() {
  var ul = document.getElementById("timezonelist");
  while (ul.lastChild) {
    ul.removeChild(ul.lastChild);
  }
  for (var i = 0; i < timezones.length; i++) {
    var offset = get_offset(timezones[i]);
    var utc = new Date();
    utc.setHours(utc.getHours() + offset);
    var child = create_child(offset == get_current_offset());
    child.innerHTML = normalizenumber(utc.getUTCHours()) + ":" + normalizenumber(utc.getUTCMinutes()) + " " + normalizeabbrv(timezones[i].abbr) + " GMT" + gmtnumber(offset);
    if (offset == get_current_offset()) {
      ul.insertBefore(child, ul.childNodes[0]);
    } else {
      ul.appendChild(child);
    }
  }
}

populate_timezone_list();
