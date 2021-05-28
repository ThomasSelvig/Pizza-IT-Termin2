

class Pizza {
	constructor (name, price, image, text) {
		this.name = name;
		this.price = price;
		this.image = image;
		this.text = text;

		this.favourite = false;
	}
}


let money = 1000;
let pizzas = [
	new Pizza("Margherita", 100, "./assets/margherita.png", "Ostepizza med 19 ulike typer ost!"),
	new Pizza("Meat meat", 150, "./assets/tomatpizza.png", "Tomatpizza, perfekt for veganere"),
	new Pizza("Pepperoni", 25, "./assets/pepperoni.png", "Pepperonipizza for alle dine pepperoni nødvendigheter")
];


function _update_DOM() {
	// saldo
	document.getElementById("saldo").innerHTML = money;
	// pizzaer
	function set_table(table_body_name, favourite) {
		document.getElementById(table_body_name).innerHTML = "";
		for (let pizza of pizzas) {
			if (favourite ? true : pizza.favourite) {
				document.getElementById(table_body_name).innerHTML += `
					<tr>
						<td>${pizza.name}</td>
						<td>${pizza.price}kr</td>
						<td><a href='javascript:pizza_action("${pizza.name}", "buy")' class="btn btn-primary">Kjøp</a></td>
						<td><a href='javascript:pizza_action("${pizza.name}", "${favourite ? "" : "un"}favourite")' class="btn btn-${favourite ? "info" : "danger"}">${pizza.favourite ? "Fjern favoritt" : "Favoritt"}</a></td>
					</tr>`
			}
		}
	}
	// set_table("pizza_table_body", true);
	set_table("fav_pizza_table_body", false);

	$("#pizza_cards").html("");
	for (let pizza of pizzas) {
		let card = $("#pizza_card_template").html();
		for (let [tmpl, real] of [
			["IMAGE", pizza.image], 
			["TITLE", pizza.name], 
			["TEXT", pizza.text + `<br>Pris: ${pizza.price},-`]
		]) {
			card = card.replaceAll(tmpl, real);
		}
		$("#pizza_cards").append(card);
	}
}

function play_noise(noise) {
	const noises = {
		"success": "https://soundbible.com/mp3/Ta%20Da-SoundBible.com-1884170640.mp3",
		"failure": "https://soundbible.com/mp3/Computer%20Error-SoundBible.com-1655839472.mp3"
	};
	
	$("#audioplayer").attr("src", noises[noise]);
	$("#audioplayer").trigger("play");
}

function add_order(name, price) {
	// simulation of client -> server-database interaction
	
	if (money >= price * $("#inp_amount").val()) {
		// add pizza order and subtract money
		money -= price * $("#inp_amount").val();
		play_noise("success");
		alert(`Kjøpte ${$("#inp_amount").val()}x ${name} for ${price * $("#inp_amount").val()}kr!`);
		_update_DOM();
	}
	else {
		play_noise("failure");
		alert("Du har ikke råd!");
	}
	$.modal.close();
}

function pizza_action(pizza, action) {
	// button handler for pizza trade

	var pizza_found;
	for (let i of pizzas) {
		if (i.name === pizza) {
			pizza_found = i;
		}
	}

	if (pizza_found) {
		if (action == "buy") {
			var modal_filled = $("#order_m_template").html()
				.replaceAll("_template", "")
				.replaceAll("TITLE", pizza_found.name)
				.replaceAll("PRICE", pizza_found.price)

			$("#order_m_content").html(modal_filled);

			$("#order_m").modal();
		}
		else if (action == "favourite") {
			pizza_found.favourite = true;
			_update_DOM();
		}
		else if (action == "unfavourite") {
			pizza_found.favourite = false;
			_update_DOM();
		}
		
	}
	else {
		console.log("Fant ikke pizzaen");
	}
}


// init meny
_update_DOM();


// bilde-zoom funksjon
var bilde = $("#bilde");
var bilderamme = $("#bilderamme");

bilde.on("mousemove", (e) => {
	bilde.css("marginLeft", bilderamme.offset().left - e.clientX);
	bilde.css("marginTop", bilderamme.offset().top - e.clientY - window.pageYOffset);

	bilde.css("width", "90vh");
	bilde.css("height", "90vh");
});
bilde.on("mouseout", e => {
	bilde.css("marginLeft", 0);
	bilde.css("marginTop", 0);
	bilde.css("width", "45vh");
	bilde.css("height", "45vh");
});


// pizza video knapper
var video = document.getElementById("vid");
$("#btn_play").click(() => { video.play(); });
$("#btn_pause").click(() => { video.pause(); });
$("#btn_double").click(() => { video.playbackRate = 2; });
$("#btn_normal").click(() => { video.playbackRate = 1; });
$("#btn_skip").click(() => { video.currentTime = 55; });


// graf
const months = [
	"Januar",
	"Februar",
	"Mars",
	"April",
	"Mai",
	"Juni",
	"Juli",
	"August",
	"September",
	"Oktober",
	"November",
	"Desember"
];
const data = months.map(v => [Math.round(Math.random()*100), v]);

for (let [v, month] of data) {
	$("#graf").append(`
		<div style="height: ${Math.round(v/4)}vh">
			<span style="
				display: block; 
				text-align: center;
				padding-top: ${Math.round(v/4)}vh;">
				
				${month.slice(0, 3)}:<br>${v}m
			</span>
		</div>
	`);
}


// kundeliste
const kunder = [
	{
		"name": "Jon Kristian",
		"address": "Aaaaa 12a"
	},
	{
		"name": "Per Gundersen",
		"address": "Bbbbbb 14b"
	},
	{
		"name": "Hhgfd Adfgkjl Bernt",
		"address": "Eikenøtten 54c"
	}
];
for (let {name, address} of kunder) {
	$("#kundeliste").append(`
		<tr>
			<td>${name}</td>
			<td>${address}</td>
		</tr>
	`);
}
