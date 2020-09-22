
// document.getElementsByTagName('filterinnerWrapId').childNodes.on('hover', function(){
//     document.getElementById('filterinnerWrapId').childNodes.addClass("active")
// })
var year = '';
var launch = '';
var land = '';
function spaceXUrl(year, launch, land) {

    let url = 'https://api.spacexdata.com/v3/launches?limit=100'
    if (year !== '') {
        url = url + `&launch_year=${year}`;
        var allClasses = document.getElementsByClassName('year-button');
        for (let i = 0; i < allClasses.length; i++) {
            allClasses[i].classList.remove("active");
        }
        document.getElementById(year).classList.add('active')
    }
    if (launch !== '') {
        url = url + `&launch_success=${launch}`;
        var allClasses = document.getElementsByClassName('launch-button');
        for (let i = 0; i < allClasses.length; i++) {
            allClasses[i].classList.remove("active");
        }
        document.getElementById('launch-'+launch).classList.add('active')
    }
    if (land !== '') {
        url = url + `&land_success==${land}`;
        var allClasses = document.getElementsByClassName('land-button');
        for (let i = 0; i < allClasses.length; i++) {
            allClasses[i].classList.remove("active");
        }
        document.getElementById('land-'+land).classList.add('active')
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            dataItem = data;
            var myLi = '';
            for (i = 0; i < dataItem.length; i++) {
                var myUl = document.getElementById('programListUl');
                myLi += '<li>' +
                    '<div class="imageBox"><img src=' + dataItem[i].links.mission_patch_small + ' alt="aircraftImage" /></div>' +
                    '<div class="boxContent">' +
                    '<h5>' + dataItem[i].mission_name + '</h5>' +
                    '<div class="missionIds">' +
                    '<strong>Mission Ids:</strong>' +
                    '<ul>' +
                    '<li>' + dataItem[i].mission_id + '</li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="listStyle clearfix">' +
                    '<strong>Launch Year:</strong>' +
                    '<span>' + dataItem[i].launch_year + '</span>' +
                    '</div>' +
                    '<div class="listStyle clearfix">' +
                    '<strong>Successful Launch: </strong>' +
                    '<span>' + dataItem[i].launch_success + '</span>' +
                    '</div>' +
                    '<div class="listStyle clearfix">' +
                    '<strong>Successful Landing:</strong>' +
                    '<span>' + dataItem[i].launch_success + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
                myUl.innerHTML = myLi;

            }
        })
}

spaceXUrl('', '', '');



