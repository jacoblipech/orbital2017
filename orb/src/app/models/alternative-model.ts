export class AlternativeModel {

	constructor(public activity: any, public items: any[]) {

	}

	addItem(item) {
		this.items.push(item);
	}

	

}