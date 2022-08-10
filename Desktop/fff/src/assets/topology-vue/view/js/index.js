function fetch(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      cb && cb(xhr.responseText);
    }
  };
}

new Le5leTopology.Topology('topology');

fetch('/data.json', function(text) {
  var data = JSON.parse(text);
  data.locked = 1;
  topology.open(data);
});
