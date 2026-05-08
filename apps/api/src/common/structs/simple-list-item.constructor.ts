export class SimpleListItem {
  constructor(data: { id: string; name: string }) {
    this.id = data.id;
    this.name = data.name;
  }

  id: string;

  name: string;
}
