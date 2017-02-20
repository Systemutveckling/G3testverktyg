class Pet extends Organism {

  static defaultPropertyValues(){
    return {
      name: 'Fluffy',
      birthDate: new Date('2010-01-01')
    }
  }

  constructor(propertyValues = {}){
    super(propertyValues);

    // Convert the birthDate property
    // from String to Date if needed
    if(typeof this.birthDate == 'string'){
      this.birthDate = new Date(this.birthDate);
    }
  }

  talk(){
    new Modal({
      title: this.name,
      content: `Hej, jag heter ${this.name}!`
    });
    //this.$$.toggleClass('big-border');
  }

  tellAge(e){
    new Modal({
      title: this.name,
      content: `Jag är ${this.age} gammal...`
    });
    e.stopPropagation();
  }

}
