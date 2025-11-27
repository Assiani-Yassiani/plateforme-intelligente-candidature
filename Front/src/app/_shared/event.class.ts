export class EventData {
  name: string;
  value: any;
  is_forget: any
  y: any
  

  constructor(name: string, value: any) {
    
    this.name = name;
    this.value = value;
    this.is_forget = false;
    this.y = false
  }
}