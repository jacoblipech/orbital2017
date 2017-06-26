export class AlternativeModel {

	constructor(public activity: any, public items: any[], public num:number, public comments: string[]) {
		this.num = 0;
	}

	addItem(item) {
		this.items.push(item);
		this.num++;
	}

	addComment(comment) {
		this.comments.push(comment);
	}

	deleteComment(comment) {
    let index = this.comments.indexOf(comment);
 
      if(index > -1){
        this.comments.splice(index, 1);
      }
  }
	

}