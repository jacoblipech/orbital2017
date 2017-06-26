export class AlternativeModel {

	constructor(public activity: any, public items: any[], public num:number) {
		this.num = 0;
	}

	addItem(item) {
		this.items.push(item);
		this.num++;
	}

	

}