var queryResult = '';
var launchYear = '';
var successfulLaunch = '';
var successfulLand = '';

var selectedYear = '';
var selectedSuccessfulLaunch = '';
var selectedSuccessfulLand = '';

function onYearClick(e) {
    if(!isNaN(e.target.id)){
        selectedYear = e.target.id;
    } 
    spaceXUrl(selectedYear, selectedSuccessfulLaunch, selectedSuccessfulLand);
}

function onLaunchClick(e) {
    if(e.target.id) {
        if(e.target.id === 'launch-true') {
            selectedSuccessfulLaunch = 'true';
        } else if (e.target.id === 'launch-false') {
            selectedSuccessfulLaunch = 'false';
        }
        spaceXUrl(selectedYear, selectedSuccessfulLaunch, selectedSuccessfulLand);
    }
}

function onLandClick(e) {
    if (e.target.id) {
        if (e.target.id === 'land-true') {
            selectedSuccessfulLand = 'true';
        } else if (e.target.id === 'land-false') {
            selectedSuccessfulLand = 'false';
        }
        spaceXUrl(selectedYear, selectedSuccessfulLaunch, selectedSuccessfulLand);
    }
}

function spaceXUrl(year, launch, land) {
    if(year!='') {
        launchYear = year;
    }
    if (launch != successfulLaunch) {
        successfulLaunch = launch;
    }
    if (land != successfulLand) {
        successfulLand = land;
    }
    let url = 'https://api.spacexdata.com/v3/launches?limit=100'
    if (launchYear !== '') {
        url = url + `&launch_year=${launchYear}`;
        var allClasses = document.getElementsByClassName('year-button');
        for (let i = 0; i < allClasses.length; i++) {
            allClasses[i].classList.remove("active");
        }
        document.getElementById(launchYear).classList.add('active')
    }
    if (successfulLaunch !== '') {
        url = url + `&launch_success=${successfulLaunch}`;
        var allClasses = document.getElementsByClassName('launch-button');
        for (let i = 0; i < allClasses.length; i++) {
            allClasses[i].classList.remove("active");
        }
        document.getElementById('launch-' + successfulLaunch).classList.add('active')
    }
    if (successfulLand !== '') {
        url = url + `&land_success=${successfulLand}`;
        var allClasses = document.getElementsByClassName('land-button');
        for (let i = 0; i < allClasses.length; i++) {
            allClasses[i].classList.remove("active");
        }
        document.getElementById('land-' + successfulLand).classList.add('active')
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            queryResult = data;
            var myUl = document.getElementById('programListUl');
            var myLi = '';
            if(queryResult.length === 0 ) {
                myLi = '<li>NO DATA FOUND</li>';
            }
            for (i = 0; i < queryResult.length; i++) {
                const {links, mission_name, mission_id, launch_year, launch_success,rocket} = queryResult[i];
                var mi = mission_id && mission_id.length ? mission_id.join(', ') : 'NA';
                myLi += '<li>' +
                    '<div class="imageBox"><img src=' + links.mission_patch_small + ' alt="aircraftImage" /></div>' +
                    '<div class="boxContent">' +
                    '<h5>' + mission_name + '</h5>' +
                    '<div class="missionIds">' +
                    '<strong>Mission Ids:</strong>' +
                    '<ul>' +
                    '<li>' + mi + '</li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="listStyle clearfix">' +
                    '<strong>Launch Year:</strong>' +
                    '<span>' + launch_year + '</span>' +
                    '</div>' +
                    '<div class="listStyle clearfix">' +
                    '<strong>Successful Launch: </strong>' +
                    '<span>' + launch_success + '</span>' +
                    '</div>' +
                    '<div class="listStyle clearfix">' +
                    '<strong>Successful Landing:</strong>' +
                    '<span>' + rocket.first_stage.cores[0].land_success+ '</span>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
                }
                myUl.innerHTML = myLi;    
        }, error => {console.log(error)})
}

spaceXUrl('', '', '');
