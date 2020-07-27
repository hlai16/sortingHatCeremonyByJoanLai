// setup
const sort = {};

// Harry Potter API and url:
sort.ApiKey = '$2a$10$e.6ZpM7hXhLuJAIbZdiJ6.ZIlORf11tvpSG8vxYy3jmNI4OEyfmJi';

sort.Url = 'https://www.potterapi.com/v1';

// Doc ready
$(document).ready(function () {
    sort.init();
})

// Global var:
let studentName = $('input#name').val('');

// Initialize
sort.init = () => {
    sort.nextStudent();
    sort.getSorted();
    // sort.startSorting();
}

// getName with Event Listener?
sort.getSorted = () => {
    $('form').on('submit', function (e) {
        e.preventDefault();
        console.log('Name: ', studentName);
        studentName = $('input#name').val();
        sort.displayName();
        sort.startSorting();
    })
}

// displayName to DOM
sort.displayName = () => {
    // clearName first so that this sorting runs properly
    $('#name').val('');
    $('.sortTo').append(`
    <h4>${studentName}</h4>
    <p>You belong to the house of:</p>
    `);
}

// API for sorting hat
sort.startSorting = async (query) => {
    // console.log('ok');
    const sortingDetails = await $.ajax({
        url: `${sort.Url}/houses/?key=${sort.ApiKey}`,
        method: 'GET',
        dataType: 'json',
        data: {
            apiKey: sort.ApiKey,
        }
    })
    console.log('sortingDetails: ', sortingDetails);
    sort.displayHouse(sortingDetails);
}

// displayHouse to DOM
sort.displayHouse = (houses) => {
    // Making use of i to randomly spit out a house into DOM.... took me forever...
    const i = Math.floor(Math.random() * houses.length);
    $('.sortTo').append(`
         <div class="house">${houses[i].name}</div>
         <div><span class="houseValue">${houses[i].values}</span></div>
         <div>
         <div class="postResult">
         <p>Your founder is ${houses[i].founder}</p>
         </div>
         <div class="postResult">
         <p>Your Head of House is ${houses[i].headOfHouse}</p>
         </div>
         <div class="postResult">
         <p>Your House Ghost is ${houses[i].houseGhost}</p>
         </div>
         <div class="postResult">
         <p>Your mascot is the ${houses[i].mascot}</p>
         </div>
         </div>
         `);
    
    if (houses[i].name == "Gryffindor") {
        // $(".crest").css({ "background-color": "firebrick" });
        $(".crest").append(`<span class="firebrick"><img src="img/gryffindor.png" alt="gryffindor crest"></span>`);
    }
    if (houses[i].name == "Ravenclaw") {
        // $(".crest").css({ "background-color": "royalblue" });
        $(".crest").append(`<span class="royalblue"><img src="img/ravenclaw.png" alt="ravenclaw crest"></span>`);
    }
    if (houses[i].name == "Slytherin") {
        // $(".crest").css({ "background-color": "darkgreen" });
        $(".crest").append(`<span class="darkgreen"><img src="img/slytherin.png" alt="slytherin crest"></span>`);
    }
    if (houses[i].name == "Hufflepuff") {
        // $(".crest").css({ "background-color": "yellow" });
        $(".crest").append(`<span class="yellow"><img src="img/hufflepuff.png" alt="hufflepuff crest"></span>`);
    }
}

// Empty .sortTo for next Student to sort
sort.nextStudent = () => {
    $('.nextStudent').click(function () {
        $('.sortTo').empty();
        $('.crest').empty();
    });
}




