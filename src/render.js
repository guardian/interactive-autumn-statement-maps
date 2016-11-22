import chart from './src/templates/chart.html!text'
import copy from './src/templates/copy.html!text'
import map from './src/templates/map.html!text'
import main from './src/templates/main.html!text'
import rp from 'request-promise'
import Handlebars from 'handlebars'

Handlebars.registerPartial({
    chart: chart,
    copy: copy,
    map: map
});

var template = Handlebars.compile(main);

export async function render() {

	let options = {
		"uri":'https://interactive.guim.co.uk/docsdata-test/1QA_lLyY0rMS5P8coNqbUYEPt1tELguXMyYhSoq5IA3c.json',
		"json": true
	}

	let promise = await rp(options)
	let html = template(promise);

	return html;

}



