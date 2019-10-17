window.onload = init;

function init() {
    var res;
    var rand;
    var html;
    var rand2;
    var temp;
    var country;
    var arr;
    var output2 = document.getElementById('output2');
    var score = document.getElementById('score');
    var myscore;
    myscore = Number(score.innerHTML);
    output2.innerHTML = "?";

    function loadJson(m, u, c) {
        var xHR = new XMLHttpRequest;
        xHR.open(m, u, true);
        xHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                res = JSON.parse(this.response);
                c(res);
            }
        }
        xHR.send();
    }
    // data = [{ "name": "china" }, { "name": "brazil" }, { "name": "canada" }, { "name": "spain" }, { "name": "italy" }, { "name": "korea" }, { "name": "afghanistan" }, { "name": "aland islands" }];
    document.getElementById('shuffle').addEventListener('click', function() {
        shuffle(res, rand, 'output1');
        // shuffle(data, rand, 'output1');
    });
    document.getElementById('new_country').addEventListener('click', function() {
        newCountry();
    });
    document.getElementById('guess').addEventListener('click', function() {
        guess(res, rand);
        // guess(data, rand);
    });
    document.getElementById('help').addEventListener('click', function() {
        help();
    });

    function help() {
        if (myscore >= 10) {
            myscore = myscore - 10;
            score.innerHTML = myscore;
            var country3 = country.split('');
            var val_input2 = output2.innerHTML;
            var h = [];
            var idx = [];
            var idx2 = []
            if (val_input2 == '?' || val_input2 == 'enter letters in box') {
                var r4 = Math.floor(Math.random() * (country3.length));
                for (var j = 0; j < country3.length; j++) {
                    if (r4 == j) {
                        idx2[j] = country3[j];
                    } else {
                        idx2[j] = '-';
                    }
                }
                idx2 = idx2.join('');
                output2.innerHTML = idx2;
            } else {
                val_input2 = val_input2.split('');
                for (var i = 0; i < country3.length; i++) {
                    if (val_input2[i] == '-') {
                        idx.push(i);
                        h.push(country3[i]);
                    }
                }
                r1 = Math.floor(Math.random() * (idx.length));
                r3 = r1;
                r1 = idx[r1];
                val_input2[r1] = h[r3];
                val_input2 = val_input2.join('');
                output2.innerHTML = val_input2;
            }
        } else {
            false;
        }

    };

    function guess(d, random) {
        output2.innerHTML = "";
        var country2 = country.split('');
        var val = document.getElementById('myinput').value;
        val = val.toLowerCase();
        val = val.split('');
        if (val.length != country2.length) {
            output2.innerHTML = "enter letters in box";
        } else {
            for (var i = 0; i < country2.length; i++) {
                if (val[i] == country2[i]) {
                    output2.innerHTML += country2[i];
                } else {
                    output2.innerHTML += "-";
                }
            }
        }
        if (output2.innerHTML == country) {
            output2.style.backgroundColor = "green";
            myscore = myscore + 20;
            score.innerHTML = myscore;
            setTimeout(function() {
                newCountry();
            }, 700);
            output2.innerHTML = "you guess correct";
        } else {
            output2.style.backgroundColor = "red";
        }

    };




    function shuffle(d, random, id) {
        arr = country.split("");
        for (var i = 0; i < arr.length; i++) {
            rand2 = Math.floor(Math.random() * (arr.length));
            temp = arr[i];
            arr[i] = arr[rand2];
            arr[rand2] = temp;

        }
        arr = arr.join('');
        d[random].name = arr;
        var source = document.getElementById('guessingCountry-template').innerHTML;
        var template = Handlebars.compile(source);
        html = template(d[random]);
        document.getElementById(id).innerHTML = html;
        d[random].name = country;

    }

    function build(d, id) {
        rand = Math.floor(Math.random() * (d.length));
        country = d[rand].name;
        shuffle(d, rand, id);


    }

    function newCountry() {
        build(res, 'output1');
        // build(data, 'output1');
        output2.innerHTML = "?";
        output2.style.backgroundColor = "#17a2b8";
    }
    // build(data, 'output1');
    // loadJson("GET", "https://restcountries.eu/rest/v2/all", function(r) {
    //     build(r, 'output');
    // });
    loadJson("GET", "https://api.myjson.com/bins/11kr3c", function(r) {
        build(r, 'output1');
    });
}